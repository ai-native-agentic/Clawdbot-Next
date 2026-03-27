import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { getMemorySearchManager, type MemoryIndexManager } from "./index.js";

let shouldFail = false;

vi.mock("chokidar", () => ({
  default: {
    watch: vi.fn(() => ({
      on: vi.fn(),
      close: vi.fn(async () => undefined),
    })),
  },
}));

vi.mock("./sqlite.js", () => {
  const mockData: Record<string, any[]> = {};
  return {
    requireNodeSqlite: () => ({
      DatabaseSync: class {
        public filepath: string;
        constructor(filepath: string) {
          this.filepath = filepath;
        }
        prepare(sql: string) {
          const stmt = {
            run: () => {},
            get: () => undefined,
            all: () => mockData[sql] || [],
            bind: () => stmt,
            iterate: () => [],
          };
          return stmt;
        }
        exec(sql: string) {
          if (sql.includes("CREATE TABLE")) {
            const tableName = sql.match(/CREATE TABLE (\w+)/)?.[1];
            if (tableName) mockData[sql] = [];
          }
        }
        close() {}
        enableLoadExtension(_enabled: boolean) {}
        loadExtension(_path: string) {}
      },
    }),
  };
});

vi.mock("./sqlite-vec.ts", () => ({
  loadSqliteVecExtension: async () => ({ ok: true }),
}));

vi.mock("./embeddings.js", () => {
  return {
    createEmbeddingProvider: async () => ({
      requestedProvider: "openai",
      provider: {
        id: "mock",
        model: "mock-embed",
        embedQuery: async () => [1, 0, 0],
        embedBatch: async (texts: string[]) => {
          if (shouldFail) {
            throw new Error("embedding failure");
          }
          return texts.map((_, index) => [index + 1, 0, 0]);
        },
      },
    }),
  };
});

vi.mock("../agents/model-auth.js", () => ({
  requireApiKey: (key: string) => {
    if (!key) throw new Error('No API key found for provider "openai"');
    return "test-api-key-for-mock";
  },
  resolveApiKeyForProvider: async () => "openai",
}));

describe("memory manager atomic reindex", () => {
  let workspaceDir: string;
  let indexPath: string;
  let manager: MemoryIndexManager | null = null;

  beforeEach(async () => {
    shouldFail = false;
    workspaceDir = await fs.mkdtemp(path.join(os.tmpdir(), "clawdbot-mem-"));
    indexPath = path.join(workspaceDir, "index.sqlite");
    await fs.mkdir(path.join(workspaceDir, "memory"));
    await fs.writeFile(path.join(workspaceDir, "MEMORY.md"), "Hello memory.");
  });

  afterEach(async () => {
    if (manager) {
      await manager.close();
      manager = null;
    }
    await fs.rm(workspaceDir, { recursive: true, force: true });
  });

  it("keeps the prior index when a full reindex fails", async () => {
    const cfg = {
      agents: {
        defaults: {
          workspace: workspaceDir,
          memorySearch: {
            provider: "openai",
            model: "mock-embed",
            store: { path: indexPath },
            cache: { enabled: false },
            sync: { watch: false, onSessionStart: false, onSearch: false },
          },
        },
        list: [{ id: "main", default: true }],
      },
    };

    const result = await getMemorySearchManager({ cfg, agentId: "main" });
    expect(result.manager).not.toBeNull();
    if (!result.manager) throw new Error("manager missing");
    manager = result.manager;

    await manager.sync({ force: true });
    const before = await manager.search("Hello");
    expect(before.length).toBeGreaterThan(0);

    shouldFail = true;
    await expect(manager.sync({ force: true })).rejects.toThrow("embedding failure");

    const after = await manager.search("Hello");
    expect(after.length).toBeGreaterThan(0);
  });
});

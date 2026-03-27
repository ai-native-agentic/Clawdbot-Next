const mockDatabases: Map<string, { data: Map<string, any[]> }> = new Map();

export function requireNodeSqlite(): typeof import("node:sqlite") {
  return {
    DatabaseSync: class {
      public filepath: string;
      constructor(filepath: string) {
        this.filepath = filepath;
        if (!mockDatabases.has(filepath)) {
          mockDatabases.set(filepath, { data: new Map() });
        }
      }
      prepare(sql: string) {
        const db = mockDatabases.get(this.filepath)!;
        return {
          run: (params?: Record<string, unknown>) => {},
          get: () => undefined,
          all: () => db.data.get(sql) || [],
          bind: function (this: any, ...args: any[]) {
            return this;
          },
          iterate: () => [],
        };
      }
      exec(sql: string) {
        const db = mockDatabases.get(this.filepath)!;
        if (sql.includes("CREATE TABLE")) {
          db.data.set(sql, []);
        }
      }
      close() {}
      enableLoadExtension(_enabled: boolean) {}
      loadExtension(_path: string) {}
    },
  };
}

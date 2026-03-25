import { buildAgentSystemPrompt } from "../system-prompt.js";
import { describe, expect, it } from "vitest";

describe("ClawdMatrix Engine Integration", () => {
  it("should detect Finance domain and inject Financial skills", async () => {
    const userBuffer = "Analyze the PE ratio of Apple stock.";
    const prompt = await buildAgentSystemPrompt({
      workspaceDir: "/tmp/clawd",
      userPrompt: userBuffer,
    });

    expect(prompt).toContain("specialist in Finance");
    expect(prompt).toContain("Active Skills Library");
    expect(prompt).toContain("DTI > 40%");
  });

  it("should detect Coding domain from keywords", async () => {
    const userBuffer = "Write a typescript function to parse JSON.";
    const prompt = await buildAgentSystemPrompt({
      workspaceDir: "/tmp/clawd",
      userPrompt: userBuffer,
    });

    expect(prompt).toContain("specialist in Coding");
  });

  it("should trigger Guide Mode when context is vague", async () => {
    const prompt = await buildAgentSystemPrompt({
      workspaceDir: "/tmp/clawd",
      userPrompt: "Help me.",
    });

    expect(prompt).toContain("Role");
  });
});

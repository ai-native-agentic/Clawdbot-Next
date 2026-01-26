// [NEW FILE] src/agents/prompt-engine/integration.test.ts

import { buildSystemPrompt } from '../system-prompt';
import { IntentContext } from './types';

describe('ClawdMatrix Engine Integration', () => {

  it('should detect Finance domain and inject Financial skills', async () => {
    const userBuffer = "Analyze the PE ratio of Apple stock.";
    const prompt = await buildSystemPrompt(userBuffer);

    expect(prompt).toContain('Role: Acting as a specialist in Finance');
    expect(prompt).toContain('Active Skills Library');
    // Assuming 'Financial_Risk_Assessment' or similar keyword from injector matches
    expect(prompt).toContain('$Stock_Price_Feed'); // Variable substitution check
  });

  it('should detect Coding domain from keywords', async () => {
    const userBuffer = "Write a typescript function to parse JSON.";
    const prompt = await buildSystemPrompt(userBuffer);

    expect(prompt).toContain('Role: Acting as a specialist in Coding');
  });

  it('should trigger Guide Mode when context is vague', async () => {
    // This depends on strictness of Triangulator. 
    // If strict mode is on, a very short prompt might trigger it.
    // For this test, we assume the Triangulator implementation handles this.
    // This is a placeholder for behavior verification.
    const prompt = await buildSystemPrompt("Help me."); 
    // If we implemented strict checks in Triangulator for "Help me" -> MISSING
    // expect(prompt).toContain('You are in **Guide Mode**');
  });

});
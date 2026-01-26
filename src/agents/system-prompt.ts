// [REFACTOR] src/agents/system-prompt.ts

import { SkillsLoader } from './prompt-engine/skills-loader.js';
import { Triangulator } from './prompt-engine/triangulator.js';
import { SkillInjector } from './prompt-engine/injector.js';
import { SYSTEM_DIRECTIVES } from './prompt-engine/system-directives.js';
import { IntentContext, SkillDefinition } from './prompt-engine/types.js';

/**
 * The new dynamic system prompt builder using ClawdMatrix Engine.
 * This replaces the static string concatenation logic.
 */
export async function buildSystemPrompt(userRawText: string): Promise<string> {
  // 1. Initialize the Knowledge Base (Data Layer)
  const library = await SkillsLoader.loadLibrary();

  // 2. Phase 1: Input Analysis & Triangulation (Cognitive Layer)
  // Determines domain, user level, and tone from raw input.
  const context: IntentContext = await Triangulator.analyze(userRawText);

  // 3. Gate Check: Guide Mode
  // If critical info is missing, we interrupt the prompt generation to ask for clarification.
  // Note: In a real agent loop, this might trigger a specific 'clarification' tool or response.
  // For the system prompt, we inject instructions to ask these questions.
  if (context.status === 'MISSING' && context.missingFields) {
    const clarificationPrompt = Triangulator.generateClarification(context.missingFields);
    return buildClarificationPrompt(clarificationPrompt);
  }

  // 4. Phase 2: Skill Selection (Matrix Retrieval)
  // Based on the detected domain, select appropriate skills.
  const selectedSkills = selectSkillsForContext(library, context);

  // 5. Phase 3: Logic Injection (Compiler Layer)
  // Instantiate skills with concrete variables.
  const instantiatedSkills = selectedSkills.map(skill =>
    SkillInjector.instantiate(skill, context)
  ).join('\n\n');

  // 6. Phase 5: Assembly (Presentation Layer)
  return assembleFinalPrompt(context, instantiatedSkills);
}

/**
 * Helper to select skills based on the IntentContext.
 * Implements the "Skill Matrix Retrieval" logic.
 */
function selectSkillsForContext(library: any, context: IntentContext): SkillDefinition[] {
  const skills: SkillDefinition[] = [];

  // Always include Core Cognitive Skills
  const coreSkill = SkillsLoader.findSkill(library, 'Context_Audit_&_Triage');
  if (coreSkill) skills.push(coreSkill);

  // Domain specific routing
  if (context.domain === 'Finance') {
    const financeSkill = SkillsLoader.findSkill(library, 'Financial_Risk_&_Deployment');
    if (financeSkill) skills.push(financeSkill);
  } else if (context.domain === 'Coding') {
    // "Workflow_to_Code_Mapping" covers logic-to-code transformation
    const codingSkill = SkillsLoader.findSkill(library, 'Workflow_to_Code_Mapping');
    if (codingSkill) skills.push(codingSkill);
  }

  // Fallback / General skills
  if (skills.length === 0) {
    const generalSkill = SkillsLoader.findSkill(library, 'General_Reasoning');
    if (generalSkill) skills.push(generalSkill);
  }

  return skills;
}

/**
 * Constructs the final prompt string structure.
 */
function assembleFinalPrompt(context: IntentContext, skillBody: string): string {
  return `
# System Prompt: ${SYSTEM_DIRECTIVES.PERSONA.ROLE}

## 1. Role & Identity
* **Role**: Acting as a specialist in ${context.domain}.
* **Tone**: ${context.tone || 'Professional and Adaptive'}.
* **Core Philosophy**: ${SYSTEM_DIRECTIVES.PERSONA.CORE_PHILOSOPHY}

## 2. Constraints & Quality Gates
${SYSTEM_DIRECTIVES.QUALITY_GATES.NEGATIVE_CONSTRAINTS.map(c => `- ${c}`).join('\n')}

## 3. Active Skills Library
The following skills have been instantiated for this specific session:

${skillBody}

## 4. Execution Workflow
1. Analyze the user's request using [Skill: Requirement_Triangulation].
2. Execute domain-specific logic found in the Active Skills Library.
3. Verify output against Constraints before responding.
`;
}

/**
 * Fallback prompt when information is missing.
 */
function buildClarificationPrompt(question: string): string {
  return `
You are in **Guide Mode**.
The user's request is ambiguous or lacks context.
Your ONLY goal right now is to politely ask for clarification.

Instruction:
${question}
`;
}
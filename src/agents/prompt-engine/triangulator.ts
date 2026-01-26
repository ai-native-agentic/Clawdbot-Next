// [NEW FILE] src/agents/prompt-engine/triangulator.ts

import { IntentContext } from './types';

/**
 * Configuration for the Rule-Based Router (Layer 1).
 * Fast, deterministic patterns to detect domain without burning LLM tokens.
 */
const KEYWORD_RULES = [
  { 
    domain: 'Coding', 
    pattern: /\b(function|const|import|class|=>|return|npm|pip|git|docker|sudo)\b/i 
  },
  { 
    domain: 'Finance', 
    pattern: /\b(stock|price|market|cap|pe ratio|dividend|etf|crypto|bitcoin|bull|bear|forecast)\b/i 
  },
  { 
    domain: 'Occult', 
    pattern: /\b(tarot|horoscope|zodiac|astrology|fortune|spirit|manifest|mercury retrograde)\b/i 
  },
  { 
    domain: 'Gaming', 
    pattern: /\b(rpg|npc|dps|tank|healer|raid|dungeon|speedrun|meta|build|nerf|buff)\b/i 
  }
];

/**
 * Interface for a lightweight LLM used for classification.
 * This decouples the engine from the specific LLM implementation of Clawdbot.
 */
export interface IDomainClassifier {
  classify(input: string): Promise<Partial<IntentContext>>;
}

export class Triangulator {
  
  /**
   * Phase 1: Input Analysis & Requirement Triangulation
   * Executes the Hybrid Routing Architecture.
   */
  static async analyze(input: string, classifier?: IDomainClassifier): Promise<IntentContext> {
    // 1. Layer 1: Rule-Based Fast Path (Deterministic)
    // Checks for strong keywords to instantly lock the domain.
    for (const rule of KEYWORD_RULES) {
      if (rule.pattern.test(input)) {
        return this.createContext(rule.domain, 'COMPLETE', 'RULE_BASED');
      }
    }

    // 2. Layer 2: LLM Inference (Semantic)
    // Only engaged if no rules matched and a classifier is provided.
    if (classifier) {
      try {
        const llmResult = await classifier.classify(input);
        
        // Merge LLM result with defaults
        const domain = llmResult.domain || 'General';
        const status = this.evaluateCompleteness(llmResult) ? 'COMPLETE' : 'MISSING';
        
        return {
            domain,
            userLevel: llmResult.userLevel || null,
            tone: llmResult.tone || null,
            status,
            missingFields: status === 'MISSING' ? this.findMissingFields(llmResult) : [],
            source: 'LLM_INFERENCE'
        };

      } catch (error) {
        console.warn('[Triangulator] LLM classification failed, falling back.', error);
        // Fallthrough to
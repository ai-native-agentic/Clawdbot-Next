# src/cli — CLI Program + Prompts

**Generated:** 2026-03-11
**169 TypeScript files** — Commander.js program wiring, DI container, interactive prompts, update CLI.

## OVERVIEW
Builds the `clawdbot` CLI program. Wires commands to handlers via dependency injection (`createDefaultDeps`). Manages interactive prompts, progress indicators, and the self-update mechanism.

## STRUCTURE
```
src/cli/
├── program.ts                 # Commander.js program builder — registers all commands
├── deps.ts                    # createDefaultDeps() — DI container for all commands
├── progress.ts                # Progress indicators (osc-progress + @clack/prompts spinner)
├── update-cli.ts              # Self-update logic (1200 LOC — largest file)
├── wizard.ts                  # Setup wizard entry
└── *.ts                       # Per-feature CLI utilities
```

## WHERE TO LOOK
| Task | File |
|------|------|
| Register a new command | `program.ts` |
| Add a shared dependency | `deps.ts` (`createDefaultDeps`) |
| Progress spinners/bars | `progress.ts` |
| Self-update flow | `update-cli.ts` |

## CONVENTIONS
- **All CLI progress**: use `src/cli/progress.ts` (`osc-progress` + `@clack/prompts`) — never hand-roll spinners
- **DI pattern**: pass deps via `createDefaultDeps()`; commands receive `deps` param — no global state
- New CLI options: follow existing `program.ts` patterns (`.option()`, `.argument()`)
- `update-cli.ts` is 1200 LOC — read carefully before touching; self-update is complex

## ANTI-PATTERNS
- Hand-rolled spinners/progress bars — use `progress.ts`
- Global singletons in command handlers — inject via `deps`
- Direct `process.exit()` in commands — throw errors, let program handle

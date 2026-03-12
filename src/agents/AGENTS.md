# src/agents — Agent Framework Core

**Generated:** 2026-03-11
**444 TypeScript files** — largest module in the codebase.

## OVERVIEW
Pi agent integration layer: runs embedded Pi sessions, manages tools, sandboxes, auth profiles, skills, and subagents. All AI interaction flows through here.

## STRUCTURE
```
src/agents/
├── pi-embedded-runner.ts      # Main session runner — starts/stops Pi sessions
├── pi-embedded-subscribe.ts   # Stream subscriber — handles Pi event stream (messages, tools, lifecycle)
├── pi-embedded-helpers.ts     # Message sanitization, error classification, turn ordering
├── bash-tools.ts              # Bash execution tool definition + PTY support
├── bash-tools.exec.ts         # Actual bash exec (approval gates, PTY fallback, background abort)
├── clawdbot-tools.ts          # Clawdbot-specific tools (sessions, cameras, subagents)
├── pi-tools.ts                # Tool registration + schema adaptation for Pi
├── sandbox.ts                 # Sandbox context resolution (Docker/native)
├── skills.ts                  # Workspace skill loading, syncing, prompt injection
├── auth-profiles.ts           # Auth profile rotation, cooldowns, external CLI sync
├── model-catalog.ts           # Model discovery, scanning, provider enumeration
├── model-selection.ts         # Model resolution, alias expansion, fallback chains
├── subagent-registry.ts       # Subagent spawn registry + session tracking
├── system-prompt.ts           # System prompt assembly with skill/context injection
├── workspace.ts               # Workspace root resolution
├── identity.ts                # Agent identity (avatar, file, scope)
├── compaction.ts              # Session compaction logic
├── sandbox/                   # Sandbox config per agent
├── tools/                     # Tool implementations
├── schema/                    # Tool schema definitions
├── skills/                    # Skill runtime utilities
├── pi-embedded-helpers/       # Helper sub-modules
├── pi-embedded-runner/        # Runner sub-modules
└── auth-profiles/             # Auth profile sub-modules
```

## WHERE TO LOOK
| Task | File |
|------|------|
| Start/stop a Pi session | `pi-embedded-runner.ts` |
| Handle Pi stream events | `pi-embedded-subscribe.ts` |
| Add a new tool | `pi-tools.ts` + `tools/` |
| Auth profile rotation | `auth-profiles.ts` |
| Model resolution/fallback | `model-selection.ts`, `model-fallback.ts` |
| Sandbox config | `sandbox.ts`, `sandbox-agent-config.*` |
| Skill prompt injection | `skills.ts` |
| Subagent spawning | `subagent-registry.ts`, `clawdbot-tools.ts` |
| System prompt assembly | `system-prompt.ts`, `system-prompt-params.ts` |
| Session compaction | `compaction.ts` |

## CONVENTIONS
- Tool schemas: `Type.Object({...})` with `stringEnum`/`optionalStringEnum` — **NO** `Type.Union`, `anyOf`, `oneOf`, `allOf`
- Tool input `format` property: forbidden (some validators reject it as reserved keyword)
- Pi session lifecycle: always subscribe via `pi-embedded-subscribe.ts`; never poll
- Auth profile cooldowns: automatic via `auth-profiles.ts`; never hardcode fallback logic
- Model IDs: always resolve via `model-selection.ts`; never pass raw model strings directly
- `bash-tools.exec.ts`: goes through approval manager — do not bypass
- `system-prompt.ts.bak` exists — ignore it, it's a leftover backup

## ANTI-PATTERNS
- `Type.Union` in tool schemas → breaks google-antigravity validation
- Raw `format` key in tool schema properties → rejected by validators  
- Hardcoded model IDs — use `model-catalog.ts` + `model-selection.ts`
- Direct Pi SDK calls outside `pi-embedded-*.ts` — always use the runner/subscriber layer
- Spawning bash without `bash-tools.exec.ts` approval gate

## COMMANDS
```bash
pnpm test src/agents          # Run agent tests
pnpm test:live                # Live tests (CLAWDBOT_LIVE_TEST=1 required)
```

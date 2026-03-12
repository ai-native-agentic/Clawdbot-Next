# src/auto-reply — Inbound Message Processing Engine

**Generated:** 2026-03-11
**205 TypeScript files** — handles all inbound messages, triggers, directives, and reply dispatch.

## OVERVIEW
Receives inbound channel messages, evaluates triggers (activation rules, sender allowlists), processes directives (model switches, thinking levels), and dispatches replies through Pi agent sessions.

## STRUCTURE
```
src/auto-reply/
├── reply/                     # Core reply orchestration
│   ├── reply.ts               # Main reply entry point
│   ├── reply.directive.*.ts   # Directive parsing + behavior (model, thinking, verbose)
│   ├── reply.triggers.*.ts    # Trigger evaluation (group activation, sender auth, commands)
│   ├── reply.block-streaming.ts  # Block-level streaming to channels
│   ├── reply.queue.ts         # Reply queue management
│   └── reply.heartbeat-typing.ts # Typing indicators during agent runs
├── chunk.ts                   # Message chunking (split long replies)
├── command-detection.ts       # Inline command detection (!reset, !compact, etc.)
├── commands-registry.ts       # Registered commands + handlers
├── dispatch.ts                # Final dispatch to channel
├── envelope.ts                # Inbound message envelope normalization
├── heartbeat.ts               # Heartbeat scheduling
├── inbound.ts                 # Inbound message entry (per-channel normalization)
├── inbound-debounce.ts        # Debounce consecutive messages
├── model.ts                   # Model state per session
├── send-policy.ts             # Send gating (allowlists, pairing)
├── skill-commands.ts          # Skill-triggered commands
├── status.ts                  # Status reply formatting
├── templating.ts              # Reply template engine
├── thinking.ts                # Thinking/reasoning level management
└── types.ts                   # Shared types
```

## WHERE TO LOOK
| Task | File |
|------|------|
| Add a new directive (e.g. `!model`) | `reply/reply.directive.*.ts` |
| Add a new trigger condition | `reply/reply.triggers.trigger-handling.*.ts` |
| Add a new inline command | `commands-registry.ts` |
| Change chunking behavior | `chunk.ts` |
| Modify send gating rules | `send-policy.ts` |
| Heartbeat response logic | `heartbeat.ts` |
| Typing indicators | `reply/reply.heartbeat-typing.ts` |

## CONVENTIONS
- All inbound messages enter via `inbound.ts` per channel — normalize there, not in channels
- Directives parsed in `reply.directive.parse.ts` before trigger evaluation
- E2E tests use `.e2e.test.ts` suffix — these spin up a real gateway, slow
- `group-activation.ts`: controls whether agent responds in group chats — check before adding group-specific trigger logic

## ANTI-PATTERNS
- Sending partial/streaming replies to external channels (WhatsApp, Telegram) — **only final replies**
- Bypassing `send-policy.ts` allowlist checks
- Adding channel-specific logic here — keep channels in `src/telegram/`, `src/discord/`, etc.

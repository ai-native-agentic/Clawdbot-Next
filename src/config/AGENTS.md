# src/config — Configuration Loading + Sessions

**Generated:** 2026-03-11
**128 TypeScript files** — config file loading, validation, session management, and live reload.

## OVERVIEW
Loads and validates `~/.clawdbot/config.json`. Manages named sessions (per-agent key → session history). Handles config schema migration and live reload signals from gateway.

## WHERE TO LOOK
| Task | File |
|------|------|
| Config schema / defaults | `config.ts` (or nearest `*.schema.ts`) |
| Session key resolution | `session-key.ts` or `sessions/` |
| Config migrations | `migrations.ts` |
| Config file path | `config-path.ts` or `clawdbot-root.ts` in `src/infra/` |

## CONVENTIONS
- Config stored at `~/.clawdbot/config.json`; use `clawdbot config set` to modify
- Pi sessions stored at `~/.clawdbot/agents/<agentId>/sessions/*.jsonl` (not `sessions.json`)
- Session logs: when asked to "open session file", use `agents/<agentId>/sessions/*.jsonl` (newest unless specific ID given)
- `gateway.mode=local` must be set for local gateway usage
- Discord token: store raw token only — no `DISCORD_BOT_TOKEN=` prefix

## ANTI-PATTERNS
- Reading Pi session logs from `sessions.json` — use `agents/<id>/sessions/*.jsonl`
- Mutating config directly in tests — use temp config dir

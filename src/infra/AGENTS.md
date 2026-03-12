# src/infra — Runtime Infrastructure

**Generated:** 2026-03-11
**177 TypeScript files** — low-level runtime utilities used across the whole codebase.

## OVERVIEW
Cross-cutting infrastructure: binary management, environment loading, port scanning, update checking, heartbeat scheduling, provider usage tracking, exec approval gates, shell environment, SSH, Tailscale, and system events.

## STRUCTURE
```
src/infra/
├── binaries.ts                # Binary detection + download (playwright, etc.)
├── env.ts / dotenv.ts         # Environment variable loading
├── errors.ts                  # Error types + formatting
├── exec-approvals.ts          # Bash exec approval manager (approval gates)
├── exec-approval-forwarder.ts # Forwards approval requests to gateway
├── heartbeat-runner.ts        # Heartbeat scheduling + lifecycle
├── heartbeat-visibility.ts    # Heartbeat suppression rules (quiet hours)
├── ports.ts / ports-inspect.ts # Port scanning + process detection
├── provider-usage.ts          # LLM provider usage tracking
├── provider-usage.fetch.*/    # Per-provider usage fetchers (claude, gemini, codex...)
├── restart.ts / restart-sentinel.ts  # Graceful restart + sentinel file
├── retry.ts                   # Retry policy with backoff
├── runtime-guard.ts           # Runtime environment assertions
├── shell-env.ts               # Shell PATH + env resolution
├── ssh-config.ts              # SSH config parsing
├── tailscale.ts               # Tailscale integration
├── system-events.ts           # OS-level event emission
├── update-check.ts            # Version update detection
├── update-runner.ts           # Update execution
├── voicewake.ts               # Voice wake word forwarding
├── outbound/                  # Outbound connection utilities
└── net/                       # Network utilities
```

## WHERE TO LOOK
| Task | File |
|------|------|
| Exec approval gate | `exec-approvals.ts` |
| Env var loading | `env.ts`, `dotenv.ts`, `env-file.ts` |
| Port conflict detection | `ports.ts`, `ports-inspect.ts` |
| Provider usage stats | `provider-usage.ts` + `provider-usage.fetch.*.ts` |
| Heartbeat scheduling | `heartbeat-runner.ts` |
| Update check/install | `update-check.ts`, `update-runner.ts` |
| SSH tunnel | `ssh-tunnel.ts`, `ssh-config.ts` |
| Shell PATH resolution | `shell-env.ts`, `path-env.ts` |
| Voice wake command | `voicewake.ts` |

## CONVENTIONS
- `exec-approvals.ts` is the **single source of truth** for bash execution gates — never bypass
- `runtime-guard.ts` assertions fire at startup — add guards here, not in feature code
- Provider usage fetchers are per-provider files: add new provider in `provider-usage.fetch.<name>.ts`
- `voicewake.ts` command template: `clawdbot-mac agent --message "${text}" --thinking low` — `VoiceWakeForwarder` handles escaping; don't add extra quotes
- launchd PATH is minimal — include `$HOME/Library/pnpm` in PATH for pnpm/clawdbot to resolve

## ANTI-PATTERNS
- Bypassing `exec-approvals.ts` for bash commands
- Hardcoding paths — use `shell-env.ts` / `path-env.ts`
- Spinning up update processes without `update-runner.ts`

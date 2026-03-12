# src/gateway — Gateway Server

**Generated:** 2026-03-11
**186 TypeScript files** — the central HTTP/WebSocket server connecting all channels, nodes, and clients.

## OVERVIEW
Runs as a local daemon (menubar app on macOS). Manages WebSocket connections from channel nodes, serves the control UI, handles chat sessions, hooks, config reload, and exposes OpenAI-compatible HTTP endpoints.

## STRUCTURE
```
src/gateway/
├── server.ts                  # Main server entry point
├── server.impl.ts             # Core server implementation
├── server-startup.ts          # Startup sequence + initial config load
├── server-channels.ts         # Channel registration + routing
├── server-chat.ts             # Chat session management
├── server-sessions.ts         # Session persistence
├── server-broadcast.ts        # Event broadcasting to connected nodes
├── server-discovery.ts        # Bonjour/mDNS discovery
├── server-node-events.ts      # Node connection/disconnection events
├── server-plugins.ts          # Plugin lifecycle (load/unload extensions)
├── server-cron.ts             # Cron job scheduling
├── server-methods.ts          # RPC method registry
├── server-methods/            # Individual RPC method handlers
├── server/                    # Server sub-components
├── protocol/                  # Wire protocol definitions
├── openai-http.ts             # OpenAI-compatible HTTP API
├── openresponses-http.ts      # Open Responses API
├── control-ui.ts              # Control UI serving
├── hooks.ts                   # Hook evaluation + dispatch
├── auth.ts                    # Node authentication
├── client.ts                  # Gateway client (used by CLI)
├── config-reload.ts           # Live config reload
└── test-helpers*.ts           # E2E test utilities (gateway spin-up)
```

## WHERE TO LOOK
| Task | File |
|------|------|
| Add a new RPC method | `server-methods/` + `server-methods-list.ts` |
| Add a new HTTP endpoint | `openai-http.ts` or `openresponses-http.ts` |
| Modify hook behavior | `hooks.ts`, `hooks-mapping.ts` |
| Config reload logic | `config-reload.ts` |
| Discovery (LAN) | `server-discovery.ts` |
| Plugin load/unload | `server-plugins.ts` |
| Control UI | `control-ui.ts`, `control-ui-shared.ts` |
| E2E tests | `test-helpers.server.ts` + `*.e2e.test.ts` |

## CONVENTIONS
- Gateway runs as menubar app only — **no LaunchAgent/helper label**
- Restart: via Clawdbot Mac app or `scripts/restart-mac.sh`; not ad-hoc tmux
- Kill/verify: `launchctl print gui/$UID | grep clawdbot` (not fixed label assumption)
- macOS logs: `./scripts/clawlog.sh` (unified log, passwordless sudo required)
- E2E test helpers in `test-helpers.server.ts` — reuse; don't spin up gateway ad-hoc
- `server.impl.ts` is the real implementation; `server.ts` is the thin public entry

## ANTI-PATTERNS
- Rebuilding macOS app over SSH — must be done directly on Mac
- Killing gateway via ad-hoc tmux instead of app UI
- Adding live/real-key tests without `.live.test.ts` suffix

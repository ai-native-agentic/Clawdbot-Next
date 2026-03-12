# extensions/ — Channel + Feature Plugins

**Generated:** 2026-03-11
**28 workspace packages** — optional channel integrations and feature plugins.

## OVERVIEW
pnpm workspace packages. Each extension is an independent npm package that exports a Clawdbot plugin via the plugin-sdk. Channel extensions add new messaging backends; feature extensions add capabilities (memory, TTS, auth proxies).

## PACKAGES
| Package | Type | Description |
|---------|------|-------------|
| `bluebubbles` | Channel | BlueBubbles iMessage server integration |
| `matrix` | Channel | Matrix/Element messaging |
| `msteams` | Channel | Microsoft Teams |
| `googlechat` | Channel | Google Chat |
| `mattermost` | Channel | Mattermost |
| `nextcloud-talk` | Channel | Nextcloud Talk |
| `nostr` | Channel | Nostr protocol |
| `zalo` / `zalouser` | Channel | Zalo (Vietnam) |
| `tlon` | Channel | Tlon/Urbit |
| `line` | Channel | LINE (separate from core `src/line/`) |
| `discord` | Channel | Discord extension variant |
| `slack` | Channel | Slack extension variant |
| `telegram` | Channel | Telegram extension variant |
| `signal` | Channel | Signal extension variant |
| `whatsapp` | Channel | WhatsApp extension variant |
| `imessage` | Channel | iMessage extension variant |
| `voice-call` | Channel | Voice call support |
| `memory-core` | Feature | Core memory/context backend |
| `memory-lancedb` | Feature | LanceDB vector memory backend |
| `llm-task` | Feature | LLM task abstraction |
| `lobster` | Feature | Lobster integration |
| `open-prose` | Feature | Prose writing skills |
| `copilot-proxy` | Auth | GitHub Copilot auth proxy |
| `google-antigravity-auth` | Auth | Google AntiGravity auth |
| `google-gemini-cli-auth` | Auth | Google Gemini CLI auth |
| `qwen-portal-auth` | Auth | Qwen portal auth |
| `diagnostics-otel` | Infra | OpenTelemetry diagnostics |

## CONVENTIONS
- Runtime deps in `dependencies` (not `devDependencies`) — `npm install --omit=dev` runs at install
- `clawdbot` itself: put in `devDependencies` or `peerDependencies` — runtime resolves via jiti alias
- **Never** use `workspace:*` in `dependencies` — breaks `npm install`
- Plugin-only deps stay in extension `package.json` — don't pollute root `package.json`
- Connection providers: when adding a new extension, update all UI surfaces + docs (macOS, web UI, onboarding)

## ANTI-PATTERNS
- `workspace:*` in `dependencies` — npm install breaks for users
- Adding root deps for extension-only functionality
- Skipping UI/docs update when adding a new connection provider

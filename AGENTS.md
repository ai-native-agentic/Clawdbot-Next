# CLAWDBOT-NEXT - KNOWLEDGE BASE

**Generated:** 2026-03-13
**Project:** ClawdMatrix-enhanced chatbot gateway

## OVERVIEW

TypeScript multi-channel AI gateway with ClawdMatrix cognition engine. Supports 22+ channels (Telegram, Discord, Slack, Signal, iMessage, WhatsApp, Matrix, MS Teams, Zalo, voice) and 42 extensions. Multi-stage reasoning pipeline with routing, pairing, command gating, and onboarding flows.

Stack: TypeScript (ESM), Node 22+, Bun, pnpm, Vitest, oxlint/oxfmt, Mintlify docs

## STRUCTURE

```
Clawdbot-Next/
├── src/
│   ├── cli/                        — CLI wiring + progress utilities
│   ├── commands/                   — Command handlers
│   ├── provider-web.ts             — Web provider
│   ├── infra/                      — Infrastructure utilities
│   ├── media/                      — Media pipeline
│   ├── telegram/                   — Telegram channel
│   ├── discord/                    — Discord channel
│   ├── slack/                      — Slack channel
│   ├── signal/                     — Signal channel
│   ├── imessage/                   — iMessage channel
│   ├── web/                        — WhatsApp web channel
│   ├── channels/                   — Channel abstractions
│   ├── routing/                    — Message routing
│   ├── terminal/                   — Terminal UI (palette, table, progress)
│   └── canvas-host/a2ui/           — A2UI bundle (auto-generated .bundle.hash)
├── extensions/                     — Plugin packages (msteams, matrix, zalo, voice-call)
├── docs/                           — Mintlify docs (channels/, platforms/, reference/)
├── tests/                          — Colocated *.test.ts, *.e2e.test.ts
├── scripts/                        — Build/package/release scripts
├── dist/                           — Built output
└── package.json                    — CLI version, deps, scripts
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| CLI entry | `src/cli` | Command wiring, progress utilities |
| Commands | `src/commands` | Command handlers |
| Web provider | `src/provider-web.ts` | Credentials at `~/.clawdbot/credentials/` |
| Channels (core) | `src/telegram`, `src/discord`, `src/slack`, `src/signal`, `src/imessage`, `src/web` | Built-in implementations |
| Channels (plugins) | `extensions/*` | MS Teams, Matrix, Zalo, voice-call |
| Terminal UI | `src/terminal/` | Shared palette, tables, spinners |
| Docs | `docs/` | Mintlify-hosted at docs.clawd.bot |
| Tests | `*.test.ts`, `*.e2e.test.ts` | Colocated with source |
| Mac packaging | `scripts/package-mac-app.sh` | Release: `docs/platforms/mac/release.md` |
| Installers | `../clawd.bot/public/` | Served from https://clawd.bot/* |
| Config | `clawdbot config set ...` | Sessions at `~/.clawdbot/sessions/` |

## COMMANDS

```bash
# Install dependencies
pnpm install

# Pre-commit hooks
prek install

# Run CLI in dev
pnpm clawdbot ...

# Type-check + build
pnpm build

# Lint + format
pnpm lint
pnpm format

# Tests
pnpm test
pnpm test:coverage

# Live tests (real keys)
CLAWDBOT_LIVE_TEST=1 pnpm test:live
LIVE=1 pnpm test:live

# Docker live tests
pnpm test:docker:live-models
pnpm test:docker:live-gateway
pnpm test:docker:onboard

# Mac packaging
scripts/package-mac-app.sh

# Commit helper
scripts/committer "<msg>" <file...>

# Update contributors
bun scripts/update-clawtributors.ts
```

## CONVENTIONS

### Coding Style
- TypeScript (ESM), strict typing, avoid `any`; oxlint + oxfmt (run `pnpm lint` before commits)
- Keep files under ~500 LOC; split/refactor for clarity; brief comments for tricky logic
- Naming: **Clawdbot** (product/docs), `clawdbot` (CLI/package/paths)

### Testing
- Vitest with V8 coverage (70% thresholds); `*.test.ts` (unit), `*.e2e.test.ts` (e2e)
- Run `pnpm test` before pushing logic changes; max 16 workers
- Pure test additions skip changelog unless user-facing

### Docs (Mintlify)
- Hosted at docs.clawd.bot; internal links root-relative, no `.md`/`.mdx`
- Avoid em dashes/apostrophes in headings (breaks anchors)
- README: use absolute URLs (`https://docs.clawd.bot/...`)

### Plugins
- Live under `extensions/*`; plugin-only deps in extension `package.json`, not root
- Runtime deps in `dependencies`; avoid `workspace:*` (breaks npm install)

### Commits & PRs
- Use `scripts/committer "<msg>" <file...>` to scope staging
- Concise messages (e.g., `CLI: add verbose flag to send`)
- Changelog: latest version at top (no `Unreleased`)
- PR merge: prefer **rebase** (clean) or **squash** (messy); add author as co-contributor; include PR # + thanks
- New contributor: run `bun scripts/update-clawtributors.ts`, commit regenerated README

### Release Channels
- **stable**: `vYYYY.M.D`, npm `latest` | **beta**: `vYYYY.M.D-beta.N`, npm `beta` | **dev**: `main` head

### Multi-Agent Safety
- No `git stash`, `git worktree`, or branch switching unless requested
- "push" → `git pull --rebase`; "commit" → scope to your changes; "commit all" → grouped chunks
- Focus reports on your edits; avoid disclaimers unless blocked

## ANTI-PATTERNS

| Forbidden | Why |
|-----------|-----|
| `any` / `@ts-ignore` without explanation | Type safety required |
| Hardcoded API keys / secrets | Use env vars or config files |
| `print()` in production code | Use structured logging |
| Editing `node_modules` | Updates overwrite; put notes in `tools.md` or `AGENTS.md` |
| Updating Carbon dependency | Explicitly forbidden |
| Patching deps without approval | Requires explicit approval |
| Hand-rolled spinners/bars | Use `src/cli/progress.ts` |
| Committing real phone numbers/videos/config | Use fake placeholders |
| Skipping QA gates | Mechanical enforcement required |
| Streaming/partial replies to external channels | Only final replies to WhatsApp/Telegram |
| Changing version numbers without consent | Always ask permission before npm publish/release |
| `Type.Union` in tool schemas | Use `stringEnum`/`optionalStringEnum` instead |
| Raw `format` property in tool schemas | Reserved keyword in some validators |

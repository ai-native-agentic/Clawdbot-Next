# CLAWDBOT-NEXT - KNOWLEDGE BASE

**Generated:** 2026-03-13
**Project:** ClawdMatrix-enhanced chatbot gateway

## OVERVIEW

TypeScript multi-channel AI gateway with ClawdMatrix cognition engine. Supports 22+ channels (Telegram, Discord, Slack, Signal, iMessage, WhatsApp, Matrix, MS Teams, Zalo, voice) and 42 extensions. Multi-stage reasoning pipeline with routing, pairing, command gating, and onboarding flows.

Stack: TypeScript (ESM), Node 22+, Bun, pnpm, Vitest, oxlint/oxfmt, Mintlify docs

## STRUCTURE

Clawdbot-Next/
├── Swabble/
│   ├── Sources/
│   ├── Tests/
│   ├── docs/
│   ├── scripts/
│   ├── README.md
├── apps/
│   ├── android/
│   ├── ios/
│   ├── macos/
│   └── shared/
├── assets/
│   ├── chrome-extension/
├── docs/
│   ├── _layouts/
│   ├── assets/
│   ├── automation/
│   ├── channels/
│   ├── cli/
│   ├── concepts/
│   ├── debug/
│   ├── diagnostics/
│   ├── experiments/
│   ├── gateway/
│   ├── help/
│   ├── hooks/
│   ├── images/
│   ├── install/
│   ├── nodes/
│   ├── platforms/
│   ├── plugins/
│   ├── providers/
│   ├── refactor/
│   ├── reference/
│   ├── start/
│   ├── tools/
│   ├── web/
├── extensions/
│   ├── bluebubbles/
│   ├── copilot-proxy/
│   ├── diagnostics-otel/
│   ├── discord/
│   ├── google-antigravity-auth/
│   ├── google-gemini-cli-auth/
│   ├── googlechat/
│   ├── imessage/
│   ├── line/
│   ├── llm-task/
│   ├── lobster/
│   ├── matrix/
│   ├── mattermost/
│   ├── memory-core/
│   ├── memory-lancedb/
│   ├── msteams/
│   ├── nextcloud-talk/
│   ├── nostr/
│   ├── open-prose/
│   ├── qwen-portal-auth/
│   ├── signal/
│   ├── slack/
│   ├── telegram/
│   ├── tlon/
│   ├── voice-call/
│   ├── whatsapp/
│   ├── zalo/
│   ├── zalouser/
│   └── AGENTS.md
├── git-hooks/
├── patches/
├── scripts/
│   ├── docker/
│   ├── e2e/
│   ├── pre-commit/
│   ├── repro/
│   ├── systemd/
├── skills/
│   ├── 1password/
│   ├── apple-notes/
│   ├── apple-reminders/
│   ├── bear-notes/
│   ├── bird/
│   ├── blogwatcher/
│   ├── blucli/
│   ├── bluebubbles/
│   ├── camsnap/
│   ├── canvas/
│   ├── clawdhub/
│   ├── coding-agent/
│   ├── discord/
│   ├── eightctl/
│   ├── food-order/
│   ├── gemini/
│   ├── gifgrep/
│   ├── github/
│   ├── gog/
│   ├── goplaces/
│   ├── himalaya/
│   ├── imsg/
│   ├── local-places/
│   ├── mcporter/
│   ├── model-usage/
│   ├── nano-banana-pro/
│   ├── nano-pdf/
│   ├── notion/
│   ├── obsidian/
│   ├── openai-image-gen/
│   ├── openai-whisper/
│   ├── openai-whisper-api/
│   ├── openhue/
│   ├── oracle/
│   ├── ordercli/
│   ├── peekaboo/
│   ├── sag/
│   ├── session-logs/
│   ├── sherpa-onnx-tts/
│   ├── skill-creator/
│   ├── slack/
│   ├── songsee/
│   ├── sonoscli/
│   ├── spotify-player/
│   ├── summarize/
│   ├── things-mac/
│   ├── tmux/
│   ├── trello/
│   ├── video-frames/
│   ├── voice-call/
│   ├── wacli/
│   └── weather/
├── src/
│   ├── acp/
│   ├── agents/
│   ├── auto-reply/
│   ├── browser/
│   ├── canvas-host/
│   ├── channels/
│   ├── cli/
│   ├── commands/
│   ├── config/
│   ├── cron/
│   ├── daemon/
│   ├── discord/
│   ├── docs/
│   ├── gateway/
│   ├── hooks/
│   ├── imessage/
│   ├── infra/
│   ├── line/
│   ├── link-understanding/
│   ├── logging/
│   ├── macos/
│   ├── markdown/
│   ├── media/
│   ├── media-understanding/
│   ├── memory/
│   ├── node-host/
│   ├── pairing/
│   ├── plugin-sdk/
│   ├── plugins/
│   ├── process/
│   ├── providers/
│   ├── routing/
│   ├── security/
│   ├── sessions/
│   ├── shared/
│   ├── signal/
│   ├── slack/
│   ├── telegram/
│   ├── terminal/
│   ├── test-helpers/
│   ├── test-utils/
│   ├── tts/
│   ├── tui/
│   ├── types/
│   ├── utils/
│   ├── web/
│   ├── whatsapp/
│   ├── wizard/
│   ├── index.ts
├── test/
│   ├── fixtures/
│   ├── helpers/
│   ├── mocks/
├── ui/
│   ├── public/
│   ├── src/
│   ├── package.json
├── vendor/
│   └── a2ui/
├── AGENTS.md
├── README.md
├── package.json

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
pnpm android:assemble                           # cd apps/android && ./gradlew :app:assembleDebug
pnpm android:install                           # cd apps/android && ./gradlew :app:installDebug
pnpm android:run                           # cd apps/android && ./gradlew :app:installDebug && adb shell am start -n com.clawdbot.android/.MainActivity
pnpm android:test                           # cd apps/android && ./gradlew :app:testDebugUnitTest
pnpm build                           # tsc -p tsconfig.json && node --import tsx scripts/canvas-a2ui-copy.ts && node --import tsx scripts/copy-hook-metadata.ts && node --import tsx scripts/write-build-info.ts
pnpm canvas:a2ui:bundle                           # bash scripts/bundle-a2ui.sh
pnpm check:loc                           # node --import tsx scripts/check-ts-max-loc.ts --max 500
pnpm clawdbot                           # node scripts/run-node.mjs
pnpm clawdbot:rpc                           # node scripts/run-node.mjs agent --mode rpc --json
pnpm dev                           # node scripts/run-node.mjs
pnpm docs:bin                           # node scripts/build-docs-list.mjs
pnpm docs:build                           # cd docs && pnpm dlx --reporter append-only mint broken-links
pnpm docs:dev                           # cd docs && mint dev
pnpm docs:list                           # node scripts/docs-list.js
pnpm format                           # oxfmt --check src test
pnpm format:all                           # pnpm format && pnpm format:swift
pnpm format:fix                           # oxfmt --write src test
pnpm format:swift                           # swiftformat --lint --config .swiftformat apps/macos/Sources apps/ios/Sources apps/shared/ClawdbotKit/Sources
pnpm gateway:dev                           # CLAWDBOT_SKIP_CHANNELS=1 node scripts/run-node.mjs --dev gateway
pnpm gateway:dev:reset                           # CLAWDBOT_SKIP_CHANNELS=1 node scripts/run-node.mjs --dev gateway --reset
pnpm gateway:watch                           # node scripts/watch-node.mjs gateway --force
pnpm ios:build                           # bash -lc 'cd apps/ios && xcodegen generate && xcodebuild -project Clawdbot.xcodeproj -scheme Clawdbot -destination "${IOS_DEST:-platform=iOS Simulator,name=iPhone 17}" -configuration Debug build'
pnpm ios:gen                           # cd apps/ios && xcodegen generate
pnpm ios:open                           # cd apps/ios && xcodegen generate && open Clawdbot.xcodeproj
pnpm ios:run                           # bash -lc 'cd apps/ios && xcodegen generate && xcodebuild -project Clawdbot.xcodeproj -scheme Clawdbot -destination "${IOS_DEST:-platform=iOS Simulator,name=iPhone 17}" -configuration Debug build && xcrun simctl boot "${IOS_SIM:-iPhone 17}" || true && xcrun simctl launch booted com.clawdbot.ios'
pnpm lint                           # oxlint --type-aware src test
pnpm lint:all                           # pnpm lint && pnpm lint:swift
pnpm lint:fix                           # pnpm format:fix && oxlint --type-aware --fix src test
pnpm lint:swift                           # swiftlint lint --config .swiftlint.yml && (cd apps/ios && swiftlint lint --config .swiftlint.yml)
pnpm mac:open                           # open dist/Clawdbot.app
pnpm mac:package                           # bash scripts/package-mac-app.sh
pnpm mac:restart                           # bash scripts/restart-mac.sh
pnpm plugins:sync                           # node --import tsx scripts/sync-plugin-versions.ts
pnpm postinstall                           # node scripts/postinstall.js
pnpm prepack                           # pnpm build && pnpm ui:build
pnpm protocol:check                           # pnpm protocol:gen && pnpm protocol:gen:swift && git diff --exit-code -- dist/protocol.schema.json apps/macos/Sources/ClawdbotProtocol/GatewayModels.swift
pnpm protocol:gen                           # node --import tsx scripts/protocol-gen.ts
pnpm protocol:gen:swift                           # node --import tsx scripts/protocol-gen-swift.ts
pnpm release:check                           # node --import tsx scripts/release-check.ts
pnpm start                           # node scripts/run-node.mjs
pnpm test                           # node scripts/test-parallel.mjs
pnpm test:all                           # pnpm lint && pnpm build && pnpm test && pnpm test:e2e && pnpm test:live && pnpm test:docker:all
pnpm test:coverage                           # vitest run --coverage
pnpm test:docker:all                           # pnpm test:docker:live-models && pnpm test:docker:live-gateway && pnpm test:docker:onboard && pnpm test:docker:gateway-network && pnpm test:docker:qr && pnpm test:docker:doctor-switch && pnpm test:docker:plugins && pnpm test:docker:cleanup
pnpm test:docker:cleanup                           # bash scripts/test-cleanup-docker.sh
pnpm test:docker:doctor-switch                           # bash scripts/e2e/doctor-install-switch-docker.sh
pnpm test:docker:gateway-network                           # bash scripts/e2e/gateway-network-docker.sh
pnpm test:docker:live-gateway                           # bash scripts/test-live-gateway-models-docker.sh
pnpm test:docker:live-models                           # bash scripts/test-live-models-docker.sh
pnpm test:docker:onboard                           # bash scripts/e2e/onboard-docker.sh
pnpm test:docker:plugins                           # bash scripts/e2e/plugins-docker.sh
pnpm test:docker:qr                           # bash scripts/e2e/qr-import-docker.sh
pnpm test:e2e                           # vitest run --config vitest.e2e.config.ts
pnpm test:force                           # node --import tsx scripts/test-force.ts
pnpm test:install:e2e                           # bash scripts/test-install-sh-e2e-docker.sh
pnpm test:install:e2e:anthropic                           # CLAWDBOT_E2E_MODELS=anthropic bash scripts/test-install-sh-e2e-docker.sh
pnpm test:install:e2e:openai                           # CLAWDBOT_E2E_MODELS=openai bash scripts/test-install-sh-e2e-docker.sh
pnpm test:install:smoke                           # bash scripts/test-install-sh-docker.sh
pnpm test:live                           # CLAWDBOT_LIVE_TEST=1 vitest run --config vitest.live.config.ts
pnpm test:ui                           # pnpm --dir ui test
pnpm test:watch                           # vitest
pnpm tui                           # node scripts/run-node.mjs tui
pnpm tui:dev                           # CLAWDBOT_PROFILE=dev node scripts/run-node.mjs tui
pnpm ui:build                           # node scripts/ui.js build
pnpm ui:dev                           # node scripts/ui.js dev
pnpm ui:install                           # node scripts/ui.js install
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

### QA Gates (`.harness/run-gates.sh`)

The project uses a 6-gate QA system to ensure code quality:

| Gate | Name | Status | Description |
|------|------|--------|-------------|
| A | format | ✅ Enabled | Prettier formatting check |
| B | lint | ✅ Enabled | TypeScript linting (oxlint/oxfmt) |
| C | test | ✅ Enabled | Unit tests (Vitest) |
| D | integration | ✅ Enabled | Integration tests |
| E | e2e | ✅ Enabled | End-to-end tests |
| F | security | ✅ Enabled | Security audit (pnpm audit) |

#### Running QA Gates

```bash
# Run all enabled gates
bash .harness/run-gates.sh

# Expected output:
# === Clawdbot-Next QA Gates ===
#   format              ... PASS
#   lint                ... PASS
#   build               ... PASS
#   test                ... PASS
#   e2e                 ... PASS
#   security            ... PASS
# === Results ===
#   PASS: 6  FAIL: 0
```

#### Gate Configuration

Edit `.harness/config.yaml` to enable/disable gates:

```yaml
gates:
  gate_a: true   # format check (prettier)
  gate_b: true   # type check (tsc)
  gate_c: true   # unit tests (vitest)
  gate_d: true   # integration tests
  gate_e: true   # e2e tests
  gate_f: true   # security audit
```

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

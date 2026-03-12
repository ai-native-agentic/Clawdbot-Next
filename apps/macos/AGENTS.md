# apps/macos — macOS Menu Bar App

**Generated:** 2026-03-11
**187 Swift files** — native SwiftUI menubar app, IPC client, and macOS CLI bridge.

## OVERVIEW
The macOS gateway host. Runs Clawdbot gateway as a menubar app, exposes IPC for CLI-to-app communication, and provides the `clawdbot-mac` binary for voice wake + agent invocation.

## STRUCTURE
```
apps/macos/
├── Sources/
│   ├── Clawdbot/              # Main menubar app (SwiftUI)
│   ├── ClawdbotIPC/           # IPC protocol + client
│   ├── ClawdbotProtocol/      # Shared gateway models (Swift)
│   ├── ClawdbotDiscovery/     # Bonjour discovery
│   └── ClawdbotMacCLI/        # clawdbot-mac binary (voice wake, agent command)
└── Tests/
    └── ClawdbotIPCTests/      # IPC unit tests
```

## WHERE TO LOOK
| Task | File |
|------|------|
| Menubar UI | `Sources/Clawdbot/` |
| IPC message types | `Sources/ClawdbotIPC/` |
| Gateway wire models | `Sources/ClawdbotProtocol/GatewayModels.swift` |
| Voice wake CLI | `Sources/ClawdbotMacCLI/` |
| Bonjour discovery | `Sources/ClawdbotDiscovery/` |

## CONVENTIONS
- **SwiftUI state**: prefer `@Observable` / `@Bindable` (Observation framework, Swift 5.9+) — never introduce new `ObservableObject`/`@StateObject`; migrate when touching related code
- **Restart**: via app UI or `scripts/restart-mac.sh` — never ad-hoc tmux sessions
- **Kill/verify**: `launchctl print gui/$UID | grep clawdbot` (no fixed label assumption)
- **Logs**: `./scripts/clawlog.sh` (needs passwordless sudo for `/usr/bin/log`)
- **Rebuild**: must run directly on Mac — never over SSH
- Swift indent: 4 spaces, max 120 chars (`swiftformat` enforced)
- SwiftLint: configured at `.swiftlint.yml` (analyzer rules enabled)
- Voice wake command: `clawdbot-mac agent --message "${text}" --thinking low` — already shell-escaped; no extra quotes

## VERSION LOCATIONS
- `apps/macos/Sources/Clawdbot/Resources/Info.plist` — CFBundleShortVersionString + CFBundleVersion
- Also: Peekaboo Xcode projects/Info.plists (MARKETING_VERSION/CURRENT_PROJECT_VERSION)

## ANTI-PATTERNS
- New `ObservableObject` / `@StateObject` — use `@Observable` instead
- Rebuilding over SSH
- Killing gateway from tmux instead of app UI
- Hardcoding launchd label — check dynamically with `launchctl`

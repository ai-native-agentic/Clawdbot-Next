# src/commands — CLI Command Implementations

**Generated:** 2026-03-11
**221 TypeScript files** — one subdirectory per top-level CLI command.

## OVERVIEW
Handlers for every `clawdbot <command>`. Each command lives in its own subdirectory. Commands receive deps from `createDefaultDeps()` (see `src/cli/deps.ts`).

## STRUCTURE
```
src/commands/
├── agent/          # clawdbot agent [run|list|stop|logs...]
├── channels/       # clawdbot channels [status|add|remove|pair...]
├── config/         # clawdbot config [get|set|list...]
├── send/           # clawdbot message send
├── gateway/        # clawdbot gateway [run|stop|restart...]
├── skills/         # clawdbot skills [install|list|update...]
├── sandbox/        # clawdbot sandbox [...]
├── models/         # clawdbot models [list|scan...]
└── ...             # other top-level commands
```

## WHERE TO LOOK
| Task | File |
|------|------|
| Add a new subcommand | `<command>/index.ts` + register in `src/cli/program.ts` |
| Channel management logic | `channels/` |
| Agent run/spawn | `agent/` |
| Status output formatting | use `src/terminal/table.ts` |

## CONVENTIONS
- `status --all` = read-only/pasteable output; `status --deep` = probes live services
- Status tables: use `src/terminal/table.ts` with ANSI-safe wrapping — no custom table code
- Colors/palette: use `src/terminal/palette.ts` — no hardcoded ANSI codes
- All channel refactors: consider **all** channels (core + extensions) — see root `AGENTS.md`

## ANTI-PATTERNS
- Hardcoded ANSI color codes — use `palette.ts`
- Custom table rendering — use `table.ts`
- Business logic inside command handlers — extract to `src/<feature>/`

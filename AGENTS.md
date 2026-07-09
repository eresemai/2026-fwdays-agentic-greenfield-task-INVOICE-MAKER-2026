<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:design-system-rules -->
# WEG3D Fin Design System  

Invoice Maker uses the **WEG3D Fin** light theme. Read `Design.md` before changing UI.

## Quick reference

| Concern | Location |
| --- | --- |
| Full design docs | `Design.md` |
| Runtime CSS tokens | `src/styles/design-tokens.css` |
| Theme + Tailwind mapping | `src/app/globals.css` |
| Status badge mappings | `src/lib/design-system.ts` |
| Visual gallery | `docs/Design System/Canvas.dc.html` |
| Design handoff tokens | `docs/Design System/design-tokens.css` |

## Rules for agents

1. **Light theme by default** — do not add `dark` to `<html>` unless explicitly requested.
2. **No raw hex in components** — use shadcn semantic tokens (`primary`, `muted-foreground`, …) or Tailwind `wf-*` colors (`text-wf-text-2`, `bg-wf-surface-2`).
3. **Typography** — page titles: `wf-display`; field labels: `wf-label`; money/amounts: `wf-mono`.
4. **Controls** — buttons and inputs target **36px** height (`h-9`); base radius **8px**.
5. **Primary actions** — `<Button>` default variant (brand red `#ef4136`).
6. **Invoice statuses** — use `<InvoiceStatusBadge status="…" />` from `@/components/invoices/invoice-status-badge`.
7. **Invoice preview surfaces** — use `wf-doc` or `wf-panel` utility classes.
8. **Token changes** — edit `src/styles/design-tokens.css` first; mirror to `docs/Design System/design-tokens.css` if the handoff file must stay in sync.

## Fonts

Geist Sans and Geist Mono are loaded in `src/app/layout.tsx` via `next/font/google`. CSS variables: `--font-geist-sans`, `--font-geist-mono`.
<!-- END:design-system-rules -->

<!-- BEGIN:openspec-rules -->
# OpenSpec (Spec-Driven Development)

Invoice Maker uses **OpenSpec** for feature planning and living specifications.
**Read `openspec/specs/<capability>/spec.md` first** for behavior; use this
file for agent rules and UI conventions.

## Quick reference

| Concern | Location |
| --- | --- |
| **Authoritative specs (read first)** | `openspec/specs/<capability>/spec.md` |
| **Capability order + gates** | `openspec/capability-map.yaml` (`npm run capability:check`) |
| OpenSpec config + injected context | `openspec/config.yaml` |
| In-flight changes | `openspec/changes/<change-name>/` |
| Numbered FR traceability | `docs/requirements.md` |
| Architecture (browser-first MVP) | `docs/ARCHITECTURE.md` |
| ADR (current stack) | `docs/adr/0002-browser-first-mvp.md` |
| Domain glossary | `CONTEXT.md` |
| Decisions tracker | `.scratch/mvp-spec-coherence/map.md` |

## Workflow (Cursor)

Use slash commands for the SDD loop:

1. **`/opsx:propose <change-name>`** — create a change (proposal, delta specs, design, tasks)
2. **`/opsx:explore`** — think through ideas without implementing
3. **`/opsx:apply`** — implement tasks from the active change
4. **`/opsx:sync`** — merge delta specs into `openspec/specs/` after implementation
5. **`/opsx:archive`** — archive a completed change

CLI equivalents: `openspec new change <name>`, `openspec status`, `openspec list`.

## Rules for agents

1. **Read specs first** — before changing behavior, check `openspec/specs/` for the relevant capability. If empty (brownfield), infer from code and `docs/requirements.md`, then capture in a change.
2. **Respect capability gates** — run `npm run capability:check -- --capability <id>` before starting work; if blocked, finish dependencies and mark them `shipped` in `openspec/capability-map.yaml`.
3. **Non-trivial features go through a change** — use `openspec/changes/` for proposal → design → tasks → delta specs before coding.
4. **Respect existing agent rules** — `AGENTS.md` design-system and Next.js rules still apply during `/opsx:apply`.
5. **Use domain language** — terms from `CONTEXT.md` (Invoice, Client, LineItem, statuses).
6. **Archive when done** — after tasks are complete and verified, run `/opsx:sync` then `/opsx:archive`.
<!-- END:openspec-rules -->

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
| **Agent skill (UI workflow)** | `.agents/skills/weg3d-fin-design/SKILL.md` |
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
9. **UI work** — invoke `.agents/skills/weg3d-fin-design`; on activation, post the 🎨 session banner from that skill before other output.

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
| **Session handoff (read first)** | `docs/current-state.md` |
| **Authoritative specs (read first)** | `openspec/specs/<capability>/spec.md` |
| **Capability map (order + deps)** | `docs/capability.md` |
| **Capability detail (expanded)** | `docs/capabilities/<id>.md` |
| **Capability gates (machine)** | `openspec/capability-map.yaml` (`npm run capability:check`) |
| OpenSpec config + injected context | `openspec/config.yaml` |
| In-flight changes | `openspec/changes/<change-name>/` |
| Numbered FR traceability | `docs/requirements.md` |
| Product narrative | `docs/product-brief.md` |
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

1. **Read handoff first** — open `docs/current-state.md`, then specs for the active capability.
2. **Read specs first** — before changing behavior, check `openspec/specs/` for the relevant capability. If empty (brownfield), infer from code and `docs/requirements.md`, then capture in a change.
3. **Respect capability gates** — run `npm run capability:check -- --capability <id>` before starting work; if blocked, finish dependencies and mark them `shipped` in `openspec/capability-map.yaml`.
4. **Non-trivial features go through a change** — use `openspec/changes/` for proposal → design → tasks → delta specs before coding.
5. **Respect existing agent rules** — `AGENTS.md` design-system and Next.js rules still apply during `/opsx:apply`.
6. **Use domain language** — terms from `CONTEXT.md` (Invoice, Client, LineItem, statuses).
7. **Archive when done** — after tasks are complete and verified, run `/opsx:sync` then `/opsx:archive`.
8. **Update handoff** — before ending a session, update `docs/current-state.md` (see docs-rules below).
<!-- END:openspec-rules -->

<!-- BEGIN:docs-rules -->
# Project documentation (`docs/`)

Invoice Maker keeps **human-readable project docs** in `docs/`. Use them for
context, traceability, and session continuity. They complement — but do not
replace — OpenSpec specs in `openspec/specs/`.

## Quick reference

| Concern | Location | When to read |
| --- | --- | --- |
| **Session handoff (read first)** | `docs/current-state.md` | Start of every agent session |
| **Numbered requirements (FR/NFR/TC/BC)** | `docs/requirements.md` | Before implementing or changing behavior |
| **Product narrative & workflows** | `docs/product-brief.md` | When you need *why* and end-to-end flows |
| **Runtime architecture** | `docs/ARCHITECTURE.md` | Before structural or stack changes |
| **ADR (current stack)** | `docs/adr/0002-browser-first-mvp.md` | When a decision conflicts with training data |
| **Original discovery notes (UA)** | `docs/research.md` | Deep domain context; not translated |
| **Invoice document layout** | `docs/invoice-template.html` | PDF/HTML output work |
| **NACE 2.1-UA reference** | `docs/191_2025.pdf` | NACE catalog and service descriptions |
| **Domain glossary** | `CONTEXT.md` (repo root) | Naming and terminology |

## Authority order

When documents disagree, follow this precedence:

1. `openspec/specs/<capability>/spec.md` — authoritative behavior
2. `docs/requirements.md` — numbered IDs and capability ownership
3. `docs/product-brief.md` — business narrative (may lag; never overrides specs)
4. `docs/research.md` — historical discovery; some items are Future / out of MVP

## `docs/requirements.md`

The **traceability index** for the project. Every requirement has a stable ID
(`FR-*`, `NFR-*`, `TC-*`, `BC-*`) and exactly one owning capability.

**Use it to:**

- Find which capability owns a feature before coding
- Check implementation order and slice gates (with `openspec/capability-map.yaml`)
- Reference FR IDs in OpenSpec proposals, tasks, and PR descriptions
- Confirm status (`proposed` · `accepted` · `shipped` · `dropped`)

**Do not** treat requirements.md as the runtime spec — behavior details live in
`openspec/specs/`. Update requirements.md when IDs, ownership, or status change;
update the matching `spec.md` when behavior changes.

## `docs/product-brief.md`

The **business narrative** behind the requirements: who the product is for, pain
points, end-to-end usage, key workflows in prose, NACE context, and out-of-scope
boundaries.

**Use it to:**

- Understand user intent and workflow before designing UI or flows
- Onboard quickly without reading every FR line
- Align copy and UX with the intended sole-entrepreneur (FOP) audience

**Do not** implement features mentioned only in the brief if they are marked
out of scope in `requirements.md` or settled as Future in `openspec/config.yaml`
(e.g. chat/LLM input in MVP).

## `docs/current-state.md` — agent session handoff

A **living handoff log** so any agent (or human) can resume work without
re-deriving context from git history or chat transcripts.

### Read at session start

1. Open `docs/current-state.md` **before** exploring the codebase or starting tasks.
2. Note: active slice/capability, last completed work, blockers, and **Next up**.
3. Cross-check with `openspec/capability-map.yaml` and any active change in
   `openspec/changes/`.

### Update at session end (or when stopping mid-task)

Append or revise `docs/current-state.md` with:

| Field | What to record |
| --- | --- |
| **Last updated** | ISO date-time and agent/session identifier if known |
| **Active capability / change** | e.g. `shell`, `add-nace-catalog`, or `none` |
| **Slice / gate** | Current slice (S0–S6) and `npm run capability:check` result if run |
| **Completed this session** | Bullet list of shipped tasks, files touched, specs synced |
| **Stopped at** | Exact step if work was interrupted (task id, failing test, open PR) |
| **Blockers** | Dependencies, missing decisions, CI failures, needs human input |
| **Next up** | Concrete first action for the next session |
| **Session log** | Append-only short entries (date, action, outcome) for history |

Keep entries **factual and concise**. Prefer pointers (`openspec/changes/foo/`,
commit hash, FR ID) over pasting large diffs.

### Rules

1. **Never delete history** — move stale items to a `## Session log` section; do
   not overwrite prior sessions without a trace.
2. **Update when pausing** — if the user stops mid-task or context is running
   out, write `Stopped at` and `Next up` before ending.
3. **Sync with OpenSpec** — when a capability ships, reflect it in
   `capability-map.yaml` *and* `current-state.md`.
4. **Do not commit secrets** — no API keys, personal ФОП/bank data, or tokens.
<!-- END:docs-rules -->

# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T13:00:00Z

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` — S4b `export-share` preview archived |
| **Active capability** | S5 `invoice-registry` or S6 `export-share` pdf (**pick next**) |
| **Active OpenSpec changes** | none |
| **Slice / gate** | `export-share.preview` **shipped** · pdf not_started |
| **Gate check** | `npm run capability:check -- --capability invoice-registry` |

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **shipped** | PR #3 |
| S1 | `nace-catalog`, `invoice-calc` | domain | **shipped** | archived 2026-07-10 |
| S2 | `supplier-profile` | ui | **shipped** | PR #5; archived |
| S2 | `client-directory` | ui | **shipped** | PR #4; archived |
| S2 | `banking` | domain | **shipped** | PR #7; archived 2026-07-10 |
| S3 | `document-render` | domain | **shipped** | archived 2026-07-10 |
| S4 | `form-input` | ui | **shipped** | M4 demo — `/invoices/new` live preview; archived 2026-07-10 |
| S4b | `export-share` preview | ui | **shipped** | HTML download + print on `/invoices/new`; 2026-07-10 |

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | `/opsx:apply add-export-share-preview` | HTML download + print; 219 tests; preview gate shipped |
| 2026-07-10 | `/opsx:propose add-export-share-preview` | OpenSpec artifacts for S4b preview gate |
| 2026-07-10 | Loop close-out `add-form-input` | Gates green; archived `2026-07-10-add-form-input`; [loop log](qa/loop-add-form-input.md) |
| 2026-07-10 | `/opsx:apply add-form-input` | Form + Zod + live preview; 211 tests; specs synced |
| 2026-07-10 | `/opsx:propose add-form-input` | OpenSpec artifacts created |

## Stopped at

S4b `export-share` preview archived (`2026-07-10-add-export-share-preview`).
Manual QA passed: HTML download, browser print/PDF, live preview.

**Next:** choose S5 `invoice-registry` (persist invoices) or S6 `export-share` pdf
(server PDF — wayfinder 05 for Type 3 glyphs).

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| 05 | PDF fidelity — Chromium embeds glyphs as `Type 3` | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |
| G0 | `check-traceability` FAILs: `FR-NACE-06` + `FR-INPUT-03` cited by no spec | arming the git hooks |

## Next up (priority order)

1. **Choose next slice:** S5 `invoice-registry` **or** S6 `export-share` pdf (`/opsx:propose add-invoice-registry` / `add-export-share-pdf`)
2. Wayfinder 05: `Type 3` glyph embedding (blocks pdf fidelity)
3. **Adversarial review** — form-input (separate checker chat; `docs/qa/loop-add-form-input.md`)
4. Cite `FR-NACE-06` + `FR-INPUT-03` in their specs, then arm the hooks: `git config core.hooksPath .githooks` (see `factory-lock.json` adaptation 2)

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary |
| `origin` | `fwdays-submission` | Mentor PR #50 |
| `upstream` | `main` | Course template |

## Session log

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | Factory | `/project-factory:init` (G0) | Loop installed (`--tools=claude`); `factory-lock.json` = 25 files + 8 adaptations; git hooks copied but **dormant** (`core.hooksPath` unset) |
| 2026-07-10 | Archive | `add-export-share-preview` | → `2026-07-10-add-export-share-preview`; 220 tests |
| 2026-07-10 | SDD | `/opsx:apply add-export-share-preview` | S4b preview gate; print fix (preview iframe) |
| 2026-07-10 | OpenSpec | `/opsx:propose add-export-share-preview` | proposal, design, specs delta, tasks |
| 2026-07-10 | Loop | Close-out `add-form-input` | 4 ticks; archive; loop log |
| 2026-07-10 | SDD loop | `/opsx:apply add-form-input` | S4 form-input shipped; 211 Vitest tests |
| 2026-07-10 | OpenSpec | `/opsx:propose add-form-input` | proposal, design, specs delta, tasks |

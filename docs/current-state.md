# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T11:27:00Z

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` — S4 `form-input` archived |
| **Active capability** | S4b — `export-share` preview (**next**) |
| **Active OpenSpec changes** | none |
| **Slice / gate** | `export-share` preview (S4b) |
| **Gate check** | `npm run capability:check -- --capability export-share` |

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

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | Loop close-out `add-form-input` | Gates green; archived `2026-07-10-add-form-input`; [loop log](qa/loop-add-form-input.md) |
| 2026-07-10 | `/opsx:apply add-form-input` | Form + Zod + live preview; 211 tests; specs synced |
| 2026-07-10 | `/opsx:propose add-form-input` | OpenSpec artifacts created |

## Stopped at

S4 `form-input` complete and archived. M4 milestone (form → live HTML preview) shipped on
`/invoices/new`.

**Next:** `/opsx:propose add-export-share` (preview gate), then adversarial checker pass for
form-input in a **separate chat** (maker ≠ checker).

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| 05 | PDF fidelity — Chromium embeds glyphs as `Type 3` | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

## Next up (priority order)

1. **Adversarial review** — form-input (separate checker chat; see `docs/qa/loop-add-form-input.md`)
2. **`/opsx:propose add-export-share`** — preview download/share (S4b)
3. Wayfinder 05: `Type 3` glyph embedding in the PDF path

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary |
| `origin` | `fwdays-submission` | Mentor PR #50 |
| `upstream` | `main` | Course template |

## Session log

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | Loop | Close-out `add-form-input` | 4 ticks; archive; loop log |
| 2026-07-10 | SDD loop | `/opsx:apply add-form-input` | S4 form-input shipped; 211 Vitest tests |
| 2026-07-10 | OpenSpec | `/opsx:propose add-form-input` | proposal, design, specs delta, tasks |

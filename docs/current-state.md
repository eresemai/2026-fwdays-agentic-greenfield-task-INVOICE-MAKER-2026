# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T10:25:00Z

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` — S3 complete (document-render + embedded fonts) |
| **Active capability** | S4 — `form-input` (**next**, demo milestone M4) |
| **Active OpenSpec changes** | none |
| **Slice / gate** | S4 `form-input` |
| **Gate check** | `npm run capability:check -- --capability form-input` |

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **shipped** | PR #3 |
| S1 | `nace-catalog`, `invoice-calc` | domain | **shipped** | archived 2026-07-10 |
| S2 | `supplier-profile` | ui | **shipped** | PR #5; archived |
| S2 | `client-directory` | ui | **shipped** | PR #4; archived |
| S2 | `banking` | domain | **shipped** | PR #7; archived 2026-07-10 |
| S3 | `document-render` | domain | **shipped** | archived 2026-07-10; FR-TPL-05 embedded fonts |
| S4 | `form-input` | ui | not_started | **next** — demo milestone M4 |

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | `/opsx:archive add-embedded-fonts` | `2026-07-10-add-embedded-fonts` in archive |
| 2026-07-10 | `feat/embedded-fonts` merged to `main` | Inter v20 subsets embedded; FR-TPL-05 shipped |
| 2026-07-10 | `/opsx:archive add-document-render` | `2026-07-10-add-document-render` in archive |
| 2026-07-10 | PR #8 merged | S3 `document-render` on `main` |

## Stopped at

S3 is complete on `main`: template fill, escaping, service rows, and embedded
Inter fonts (zero external refs). Both OpenSpec changes archived.

**Next:** `/opsx:propose add-form-input` (S4 — the M4 demo milestone).

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| 05 | PDF fidelity — Chromium embeds glyphs as `Type 3` | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

Font availability is solved (FR-TPL-05 shipped). Ticket 05 now only tracks
`Type 3` glyph embedding in the PDF path.

## Next up (priority order)

1. **`/opsx:propose add-form-input`** — S4, the M4 demo milestone
2. Wayfinder 05: `Type 3` glyph embedding in the PDF path
3. Update mentor PR #50 body with S3 progress (198 tests)

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary |
| `origin` | `fwdays-submission` | Mentor PR #50 |
| `upstream` | `main` | Course template |

## Session log

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | OpenSpec | Archived `add-embedded-fonts` | `2026-07-10-add-embedded-fonts`; specs already synced |
| 2026-07-10 | Merge | `feat/embedded-fonts` → `main` | Vendored Inter v20 subsets; `template:check` guards fonts; 198 tests |
| 2026-07-10 | OpenSpec | Archived `add-document-render` | `2026-07-10-add-document-render`; specs already synced |
| 2026-07-10 | SDD loop | `add-document-render` (PR #8) | `src/lib/render/` shipped on `main` |

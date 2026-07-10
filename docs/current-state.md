# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T09:03:00Z

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` @ `b567be1` |
| **Active capability** | S3 — `document-render` (unblocked) |
| **Active OpenSpec change** | — (propose `add-document-render` next) |
| **Slice / gate** | S2 complete; S3 `document-render` next |
| **Gate check** | `npm run capability:check -- --capability document-render` |

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **shipped** | PR #3 |
| S1 | `nace-catalog`, `invoice-calc` | domain | **shipped** | archived 2026-07-10 |
| S2 | `supplier-profile` | ui | **shipped** | PR #5; archived |
| S2 | `client-directory` | ui | **shipped** | PR #4; archived |
| S2 | `banking` | domain | **shipped** | PR #7; archived 2026-07-10 |
| S3 | `document-render` | domain | not_started | **next** |

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | PR #7 merged | S2 `banking` on `main` |
| 2026-07-10 | `/opsx:archive add-banking` | `2026-07-10-add-banking` in archive |
| 2026-07-10 | PR #6 merged | S2 hardening on `main` |
| 2026-07-10 | PR #4 + #5 merged | S2 directories on `main` |
| 2026-07-10 | Vitest | 161 tests green |

## Stopped at

S2 **complete** on `main`. All six OpenSpec changes archived in
`openspec/changes/archive/`. Next: `/opsx:propose add-document-render` (S3).

Carried-forward requirement for `add-document-render`: HTML-escaping of all
substituted variables (incl. `SUPPLIER_*`) is owned by the fill step (FR-TPL-01).

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| 05 | PDF output fidelity | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

## Next up (priority order)

1. **`/opsx:propose add-document-render`** — S3 template fill + bilingual HTML
2. Update mentor PR #50 body with S2+banking progress
3. Wayfinder 05 (human) — PDF prototype before S6 pdf gate

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary |
| `origin` | `fwdays-submission` | Mentor PR #50 |
| `upstream` | `main` | Course template |

## Session log

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | OpenSpec | Archived `add-banking` | `2026-07-10-add-banking`; specs already synced |
| 2026-07-10 | PRs | #7 merged to `main` | `banking` shipped; `document-render` unblocked |
| 2026-07-10 | OpenSpec | Archived S2 changes | `2026-07-10-add-supplier-profile`, `2026-07-10-add-client-directory` |
| 2026-07-10 | PRs | #4 + #5 merged to `main` | Both S2 UI capabilities shipped |

# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T04:18:00Z

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` @ `65b9a0b` |
| **Active capability** | S2 — `banking` (unblocked) |
| **Active OpenSpec change** | — (propose `add-banking` next) |
| **Slice / gate** | S0–S2 UI shipped; `banking` → `document-render` |
| **Gate check** | `npm run capability:check -- --capability banking` |

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **shipped** | PR #3 |
| S1 | `nace-catalog`, `invoice-calc` | domain | **shipped** | archived 2026-07-10 |
| S2 | `supplier-profile` | ui | **shipped** | PR #5; archived |
| S2 | `client-directory` | ui | **shipped** | PR #4; archived |
| S2 | `banking` | domain | not_started | **next** |
| S3 | `document-render` | domain | not_started | after banking |

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | PR #4 + #5 merged | S2 directories on `main` |
| 2026-07-10 | `/opsx:archive` S2 | `add-supplier-profile`, `add-client-directory` archived |
| 2026-07-10 | S1 archived | `add-nace-catalog`, `add-invoice-calc` |
| 2026-07-10 | Vitest | 129 tests green |

## Stopped at

S2 **complete** on `main`. All OpenSpec changes archived (5 total in `openspec/changes/archive/`).
Next: `/opsx:propose add-banking`.

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| 05 | PDF output fidelity | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

## Next up (priority order)

1. **`/opsx:propose add-banking`** — currency → IBAN from active supplier profile
2. **`/opsx:propose add-document-render`** — after banking ships
3. Update mentor PR #50 body with S2 progress

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary |
| `origin` | `fwdays-submission` | Mentor PR #50 |
| `upstream` | `main` | Course template |

## Session log

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | OpenSpec | Archived S2 changes | `2026-07-10-add-supplier-profile`, `2026-07-10-add-client-directory` |
| 2026-07-10 | PRs | #4 + #5 merged to `main` | Both S2 UI capabilities shipped |
| 2026-07-10 | Lane C/D | `/opsx:apply` supplier + client | Storage CRUD, settings + clients UI |

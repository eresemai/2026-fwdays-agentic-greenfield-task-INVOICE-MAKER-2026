# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T04:05:00Z (S2 branch split — lane C)

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `feat/supplier-profile` — lane C only (committed) |
| **Active capability** | S2 — `supplier-profile` **shipped** on this branch |
| **Active OpenSpec change** | `add-supplier-profile` (apply complete; archive after PR merge) |
| **Sibling branch** | `feat/client-directory` — lane D (`client-directory`); open separate PR |
| **Slice / gate** | S0 + S1 **shipped**; this branch ships `supplier-profile` + FR-BANK-02; `banking` unblocks after **both** S2 PRs merge |
| **Gate check** | `npm run capability:check -- --capability supplier-profile` |

## Branch situation (clean split)

| Branch | Lane | Contents |
| --- | --- | --- |
| `feat/supplier-profile` | C | Supplier types, `supplier-profiles` storage + tests, settings UI, supplier spec + OpenSpec change, FR-BANK-02 in requirements |
| `feat/client-directory` | D | Client CRUD + `/clients` UI |

No mixed working tree. Each PR updates `openspec/capability-map.yaml` for its own capability only.

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status (this branch) | Notes |
| --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **shipped** | on `main` |
| S1 | `nace-catalog`, `invoice-calc` | domain | **shipped** | on `main` |
| S2 | `supplier-profile` | ui | **shipped** | **this PR**; owns FR-BANK-02 |
| S2 | `client-directory` | ui | not_started on branch | see `feat/client-directory` PR |
| S2 | `banking` | domain | not_started | after both S2 PRs merge |

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | Branch split | Lane C isolated on `feat/supplier-profile`; lane D on `feat/client-directory` |
| 2026-07-10 | `feat/supplier-profile` | Settings CRUD, active profile pointer, 10 Vitest storage tests |

## Stopped at

`add-supplier-profile` ready for PR. Archive with `/opsx:archive add-supplier-profile` after merge.

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| — | Merge sibling `feat/client-directory` for full S2 | `banking` gate on `main` |
| 05 | PDF output fidelity | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

## Next up (priority order)

1. **Open PR** from `feat/supplier-profile` → `main`
2. **Open PR** from `feat/client-directory` → `main` (parallel)
3. **`/opsx:archive`** each change after its PR merges
4. **`/opsx:propose add-banking`** once both S2 capabilities are on `main`

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary |
| `origin` | `fwdays-submission` | Mentor PR #50 |
| `upstream` | `main` | Course template |

## Session log

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | Split | Isolate lane C on `feat/supplier-profile` | Clean commit; docs updated; tests run on branch |
| 2026-07-10 | Lane C | `/opsx:apply add-supplier-profile` | Storage + settings UI + spec synced |

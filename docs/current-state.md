# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T04:00:00Z (S2 branch split — lane D)

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `feat/client-directory` — lane D only (committed) |
| **Active capability** | S2 — `client-directory` **shipped** on this branch |
| **Active OpenSpec change** | `add-client-directory` (apply complete; archive after PR merge) |
| **Sibling branch** | `feat/supplier-profile` — lane C (`supplier-profile`); open separate PR |
| **Slice / gate** | S0 + S1 **shipped**; this branch ships `client-directory`; `banking` unblocks after **both** S2 PRs merge |
| **Gate check** | `npm run capability:check -- --capability client-directory` |

## Branch situation (clean split)

| Branch | Lane | Contents |
| --- | --- | --- |
| `feat/client-directory` | D | Client types, `clients` storage + tests, `/clients` UI, client spec + OpenSpec change |
| `feat/supplier-profile` | C | Supplier types, `supplier-profiles` storage + tests, settings UI, supplier spec + OpenSpec change |

No mixed working tree. Shared `openspec/capability-map.yaml` updates are **per-branch** (each PR marks its own capability `shipped`).

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status (this branch) | Notes |
| --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **shipped** | on `main` |
| S1 | `nace-catalog`, `invoice-calc` | domain | **shipped** | on `main` |
| S2 | `client-directory` | ui | **shipped** | **this PR** |
| S2 | `supplier-profile` | ui | not_started on branch | see `feat/supplier-profile` PR |
| S2 | `banking` | domain | not_started | after both S2 PRs merge |

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | Branch split | Lane D isolated on `feat/client-directory`; lane C on `feat/supplier-profile` |
| 2026-07-10 | `feat/client-directory` | `client-directory` — localStorage CRUD, `/clients` UI, Vitest storage tests |

## Stopped at

`add-client-directory` ready for PR. Archive with `/opsx:archive add-client-directory` after merge.

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| — | Merge sibling `feat/supplier-profile` for full S2 | `banking` gate on `main` |
| 05 | PDF output fidelity | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

## Next up (priority order)

1. **Open PR** from `feat/client-directory` → `main`
2. **Open PR** from `feat/supplier-profile` → `main` (parallel)
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
| 2026-07-10 | Split | Isolate lane D on `feat/client-directory` | Clean commit; docs updated; tests run on branch |
| 2026-07-10 | Lane D | `/opsx:apply add-client-directory` | CRUD + UI + spec synced |

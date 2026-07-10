# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T04:05:00Z (S2 PRs opened)

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `feat/client-directory` — lane D (committed) · sibling `feat/supplier-profile` |
| **Active capability** | S2 — `client-directory` **shipped** on lane D branch |
| **Active OpenSpec change** | `add-client-directory` (archive after PR #4 merge) |
| **Open PRs** | [#4 client-directory](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/4) · [#5 supplier-profile](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/5) |
| **Slice / gate** | Review both S2 PRs; `banking` unblocks after **both** merge to `main` |

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

Both S2 PRs open for review. Archive with `/opsx:archive` after each merges.

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| — | Merge both S2 PRs | `banking` gate on `main` |
| 05 | PDF output fidelity | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

## Next up (priority order)

1. **Review** [PR #4](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/4) (`feat/client-directory`) and [PR #5](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/5) (`feat/supplier-profile`)
2. **Merge** both to `main` (order independent)
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
| 2026-07-10 | PRs | Opened #4 + #5 on `origin` | Ready for review in separate windows |
| 2026-07-10 | Lane D | `/opsx:apply add-client-directory` | CRUD + UI + spec synced |

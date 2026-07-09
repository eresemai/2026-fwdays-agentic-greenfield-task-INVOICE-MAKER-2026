# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10 (UTC)

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `wayfinder/resolve-01-04` (planning/docs; merge to `main` to sync homework) |
| **Active capability** | — (planning complete; implementation not started) |
| **Active OpenSpec change** | — |
| **Slice / gate** | S0 — `shell` in_progress |
| **Gate check** | Unblocked: `shell`, `nace-catalog`, `invoice-calc` |

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status | Blocked by | Unblocks |
| --- | --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **in_progress** | — | supplier-profile, client-directory |
| S1 | `nace-catalog` | domain | not_started | — | document-render, form-input |
| S1 | `invoice-calc` | domain | not_started | — | document-render, invoice-registry, invoice-edit |
| S2 | `supplier-profile` | ui | not_started | shell | banking |
| S2 | `client-directory` | ui | not_started | shell | form-input |
| S2 | `banking` | domain | not_started | supplier-profile | document-render |
| S3 | `document-render` | domain | not_started | invoice-calc, banking, nace-catalog | form-input, export-share, invoice-registry |
| S4 | `form-input` | ui | not_started | 6 capabilities | export-share, invoice-registry |
| S4 | `export-share` preview | ui | not_started | document-render, form-input | pdf gate |
| S5 | `invoice-registry` | ui | not_started | form-input, document-render, invoice-calc | invoice-edit |
| S6 | `export-share` pdf | ui | not_started | preview shipped | — |
| S6 | `invoice-edit` | ui | not_started | invoice-registry, form-input, invoice-calc | MVP complete |

**Demo milestone (M4):** S4 — form → live HTML preview.

## Completed recently (docs & planning)

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | `c78f3c0` | `docs/capability.md` + `docs/capabilities/` expanded per-capability docs |
| 2026-07-10 | `37640ae` | `capability-map.yaml`, gate script, requirements split |
| 2026-07-10 | `a4c8f9d` | WEG3D Fin design agent skill |
| 2026-07-10 | `ee94f27` | `docs/current-state.md` handoff template |
| 2026-07-09 | `e441b5f` | Wayfinder tickets 01–04 resolved; migration audit |
| 2026-07-09 | `8d45456` | 11 OpenSpec specs, browser-first ADR, scaffold |
| earlier | `316e9c8` | CI: `main` → `fwdays-submission` auto-sync |

## Stopped at

Planning / capability slicing **done**. No OpenSpec implementation change active.
Code scaffold exists; `invoices/new` is still a placeholder.

## Blockers & open decisions

Wayfinder tickets still open (see `.scratch/mvp-spec-coherence/`):

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| 06 | Money model (integer cents, unit×qty) | invoice-calc |
| 07 | Invoice number format vs sequential counter | invoice-calc |
| 15 | Audit migrated specs (6 vanished reqs) | all specs trust |
| 05 | PDF output fidelity | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | shell, form-input |

Specs pass `openspec validate --strict` but may still be wrong per map.md.

## Next up (priority order)

1. **Merge** `wayfinder/resolve-01-04` → `main` → push (triggers homework sync CI)
2. **Ship S0** `shell` — finish FR-SHELL-02, mark `shipped` in capability-map.yaml
3. **Parallel S1** — `/opsx:propose add-nace-catalog` and/or `add-invoice-calc`
4. Close wayfinder **06** and **07** before implementing invoice-calc

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary; pushes trigger homework sync |
| `origin` | `fwdays-submission` | Mentor PR #50 (auto-synced from main) |
| `origin` | `wayfinder/resolve-01-04` | Active planning branch |
| `upstream` | `main` | Course template (read-only reference) |

After merge to `main`: GitHub Action `sync-homework-pr.yml` merges `main` into `fwdays-submission`.

## Session log

Append-only (newest last).

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | — | Created handoff template | `docs/current-state.md` |
| 2026-07-10 | Agent | Capability map + gates | `capability-map.yaml`, `npm run capability:check` |
| 2026-07-10 | Agent | Split requirements by capability | `docs/requirements.md` restructured |
| 2026-07-10 | Agent | `docs/capability.md` + `docs/capabilities/` | Order/deps vs expanded scope |
| 2026-07-10 | Agent | Improved tables in capability.md | Per-slice narrow tables |
| 2026-07-10 | Agent | Enriched current-state + repo sync | This update; merge to main pending |

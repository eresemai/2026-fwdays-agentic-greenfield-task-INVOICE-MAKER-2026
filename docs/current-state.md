# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10 (UTC)

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` @ `a63c4a4` |
| **Active capability** | S2 — `supplier-profile` / `client-directory` (parallel) |
| **Active OpenSpec change** | — (S1 changes archived 2026-07-10) |
| **Slice / gate** | S0 + S1 **shipped**; S2 directories unblocked |
| **Gate check** | Unblocked: `supplier-profile`, `client-directory` |

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status | Blocked by | Unblocks |
| --- | --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **shipped** | — | supplier-profile, client-directory |
| S1 | `nace-catalog` | domain | **shipped** | — | document-render, form-input |
| S1 | `invoice-calc` | domain | **shipped** | — | document-render, invoice-registry, invoice-edit |
| S2 | `supplier-profile` | ui | not_started | — | banking |
| S2 | `client-directory` | ui | not_started | — | form-input |
| S2 | `banking` | domain | not_started | supplier-profile | document-render |
| S3 | `document-render` | domain | not_started | invoice-calc, banking, nace-catalog | form-input, export-share, invoice-registry |
| S4 | `form-input` | ui | not_started | 6 capabilities | export-share, invoice-registry |
| S4 | `export-share` preview | ui | not_started | document-render, form-input | pdf gate |
| S5 | `invoice-registry` | ui | not_started | form-input, document-render, invoice-calc | invoice-edit |
| S6 | `export-share` pdf | ui | not_started | document-render, form-input, preview gate | — |
| S6 | `invoice-edit` | ui | not_started | invoice-registry, form-input, invoice-calc | MVP complete |

**Demo milestone (M4):** S4 — form → live HTML preview.

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | `a63c4a4` | S1 hardening — adversarial review fixes (matcher anchoring + NFC, calc guards); 115 tests |
| 2026-07-10 | `851b97a` | S1 `nace-catalog` shipped — seed catalog + keyword matcher |
| 2026-07-10 | `3366a4a` | S1 `invoice-calc` shipped — money, numbering, dates, purpose |
| 2026-07-10 | `a1effff` | Vitest harness (TC-STACK-06); 104 tests green |
| 2026-07-10 | PR #3 | S0 `shell` shipped — responsive layout, MobileNav, health API |
| 2026-07-10 | `37640ae` | Capability map + gate script + requirements split |
| 2026-07-09 | `8d45456` | 11 OpenSpec specs, browser-first ADR, scaffold |

## Stopped at

S1 domain core **shipped**, hardened (`a63c4a4`), synced, and archived
(`openspec/changes/archive/2026-07-10-add-{invoice-calc,nace-catalog}`).
Next: S2 directories (`supplier-profile` + `client-directory` in parallel).

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| ~~06~~ | **resolved**: unit×qty, integer cents | — |
| ~~07~~ | **resolved**: sequential `YYYY-NNN` on issue | — |
| ~~15~~ | **resolved**: vanished FRs were accidents | — |
| 05 | PDF output fidelity | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

## Next up (priority order)

1. **`/opsx:propose add-supplier-profile`** + **`add-client-directory`** — S2 parallel UI
2. **`banking`** after supplier-profile ships
3. **`/opsx:propose add-document-render`** — unlocks render pipeline (S3)

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary; pushes trigger homework sync |
| `origin` | `fwdays-submission` | Mentor PR #50 (auto-synced from main) |
| `upstream` | `main` | Course template (read-only reference) |

## Session log

Append-only (newest last).

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | Agent | Docs refresh + spec sync | S0/S1 marked shipped; PR #50 body updated |
| 2026-07-10 | OpenSpec | S1 changes archived | `add-invoice-calc` + `add-nace-catalog` → `openspec/changes/archive/2026-07-10-*`; deltas verified in-sync with main specs before move; no active changes remain |
| 2026-07-10 | OpenSpec | S1 adversarial review + hardening (`a63c4a4`) | Workflow: 5 lenses × 2 refuters, 13 raw → 10 confirmed (2 major in matcher). Fixed: NFC + prefix-anchored token matching (Демонтаж/аналогових/3600 → none; NFD й/ї works), prepaymentSplit overflow guard + DEFAULT_PREPAYMENT_PERCENT=50, computeDeadline ≤ 9999 bound + toIso year pad, duplicate-number message names real next free number. 115 tests green |
| 2026-07-10 | OpenSpec | S1 `add-nace-catalog` + `add-invoice-calc` applied | `src/lib/nace/`, `src/lib/invoice-calc/`; 104 Vitest tests |
| 2026-07-10 | OpenSpec | S0 `add-shell` archived; PR #3 merged | Responsive shell shipped |
| 2026-07-10 | Wayfinder | Tickets 06, 07, 15 resolved | Money model + numbering + spec audit |
| 2026-07-10 | Agent | Deleted `wayfinder/resolve-01-04` | Branch merged; remote removed |

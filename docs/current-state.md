# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T04:42:00Z

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `feat/pdf-prototype` (wayfinder 05 throwaway) |
| **Active capability** | S2 — `banking` (unblocked on `main`) |
| **Active OpenSpec change** | — (propose `add-banking` next on `main`) |
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
| S2 | `banking` | domain | not_started | **next** on `main` |
| S3 | `document-render` | domain | not_started | after banking |

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | Wayfinder 05 prototype | `POST /api/pdf`, template fill, 2 PDF fixtures; `npm run pdf:smoke` |
| 2026-07-10 | PR #4 + #5 merged | S2 directories on `main` |
| 2026-07-10 | `/opsx:archive` S2 | `add-supplier-profile`, `add-client-directory` archived |
| 2026-07-10 | Vitest | 133 tests green (+4 template-fill) |

## Stopped at

**Wayfinder 05** PDF prototype implemented on `feat/pdf-prototype`. Local smoke
writes `.scratch/pdf-prototype/visio-usd.pdf` and `ecivres-uneven-eur.pdf`.
**Human review pending** — Cyrillic/`№`/Vercel deploy metrics (see ticket 05).

On `main`: S2 complete; next slice `/opsx:propose add-banking`.

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| 05 | PDF output fidelity — **prototype built; visual + Vercel deploy TBD** | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

## Next up (priority order)

1. **Human:** open `.scratch/pdf-prototype/*.pdf` and complete ticket 05 checklist
2. **`/opsx:propose add-banking`** on `main` — currency → IBAN from active supplier profile
3. Vercel preview deploy of `feat/pdf-prototype` — measure bundle size + cold start
4. **`/opsx:propose add-document-render`** — after banking ships

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary |
| `origin` | `feat/pdf-prototype` | Wayfinder 05 throwaway |
| `origin` | `fwdays-submission` | Mentor PR #50 |
| `upstream` | `main` | Course template |

## Session log

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | Wayfinder 05 | PDF prototype on `feat/pdf-prototype` | `POST /api/pdf`, puppeteer-core, 2 fixtures, pdf:smoke |
| 2026-07-10 | OpenSpec | Archived S2 changes | `2026-07-10-add-supplier-profile`, `2026-07-10-add-client-directory` |
| 2026-07-10 | PRs | #4 + #5 merged to `main` | Both S2 UI capabilities shipped |

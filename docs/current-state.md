# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T14:00:00Z

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` — S4b `export-share` preview archived |
| **Active capability** | Submission-ready MVP — post-MVP: S5 `invoice-registry` or S6 pdf |
| **Active OpenSpec changes** | none |
| **Slice / gate** | `export-share.preview` **shipped** · pdf not_started |
| **Gate check** | `npm run capability:check -- --capability invoice-registry` |

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
| S4b | `export-share` preview | ui | **shipped** | HTML download + print on `/invoices/new`; 2026-07-10 |

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | `/opsx:apply add-export-share-preview` | HTML download + print; 219 tests; preview gate shipped |
| 2026-07-10 | `/opsx:propose add-export-share-preview` | OpenSpec artifacts for S4b preview gate |
| 2026-07-10 | Loop close-out `add-form-input` | Gates green; archived `2026-07-10-add-form-input`; [loop log](qa/loop-add-form-input.md) |
| 2026-07-10 | `/opsx:apply add-form-input` | Form + Zod + live preview; 211 tests; specs synced |
| 2026-07-10 | `/opsx:propose add-form-input` | OpenSpec artifacts created |

## Stopped at

S4b `export-share` preview archived (`2026-07-10-add-export-share-preview`).
Manual QA passed: HTML download, browser print/PDF, live preview.

**Next:** choose S5 `invoice-registry` (persist invoices) or S6 `export-share` pdf
(server PDF — wayfinder 05 for Type 3 glyphs).

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| 05 | PDF fidelity — Chromium embeds glyphs as `Type 3` | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |
| PD-1 | `check-traceability.mjs` has no concept of `dropped` status: it counts `FR-NACE-06` + `FR-INPUT-03` among the 34 MVP FRs and demands tests/recordings for two deliberately dropped **negative** requirements | 69 of the 69 warnings; arming the git hooks |
| PD-2 | 10 archived slices carry no review evidence. **Documented, not resolved** — `.project-factory/retrofit.json` declares them RETROFITTED; retrofit records an absence, it does not supply the missing review | `check-trajectory --release` renders `NOT-EARNED` until a slice is earned red-first |
| PD-3 | `check-trajectory` was blind to retrofit and read 10 back-stamped `clean:true` files as real review evidence | **Fixed** — `improve-PD-3`, forged stamps deleted |
| PD-4 | the `add-form-input` stamp claimed `confirmed:0/clean:true` while its real review (`docs/qa/loop-add-form-input.md:39`) recorded PASS WITH NOTES + C1–C7 | **Fixed** — stamp deleted with `improve-PD-3` |
| PD-5 | retrofit doctrine sanctions `retrofit.json` only; the 10 `review-findings.json` were beyond mandate | **Fixed** — deleted with `improve-PD-3` |
| PD-7 | `gate-status.mjs` — the only aggregator carrying the RETROFIT banner and NOT-EARNED semantics — is absent from CI | CI can render green while `gate-status` is red |
| PD-8 | `check-trajectory` accepts any `{clean:true}` as review proof; ignores `confirmed`, `baseRef`, `dimensions` | future slices can be stamped, not reviewed |
| PD-9 | `check-traceability.mjs:148` parses `@trace` with `[A-Z]+-\d+`, which can never match categorized ids like `FR-CALC-01` that line 158 demands | 34 unclearable warnings; `--strict-tests` unsatisfiable |
| PD-10 | one docs commit (`5bcbfe9`) carries 10 `Slice:` trailers; `check-trajectory` greps the whole message and never checks the commit touched the slice's files | trailer evidence forgeable |

## Next up (priority order)

1. **Choose next slice:** S5 `invoice-registry` **or** S6 `export-share` pdf (`/opsx:propose add-invoice-registry` / `add-export-share-pdf`)
2. Wayfinder 05: `Type 3` glyph embedding (blocks pdf fidelity)
3. **Adversarial review** — form-input (separate checker chat; `docs/qa/loop-add-form-input.md`)
4. Land `improve-PD-9` (`@trace` regex) and `improve-PD-7` (`gate-status` in CI) — approved, same red→green + `Refs: PD-x` protocol as `improve-PD-3`
5. Tag MVP requirements with acceptance-method verification tags — `check-acceptance-methods --mode=existence` is red at `Scope: 0`, which gates G3
6. Arm hooks when ready: `git config core.hooksPath .githooks`
7. Triage PD-8 and PD-10 (forgeable review/trailer predicates) before the first *earned* slice archives, or S5 inherits the same weak evidence contract

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary |
| `origin` | `fwdays-submission` | Mentor PR #50 |
| `upstream` | `main` | Course template |

## Session log

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | Factory | `/project-factory:init` (G0) | Loop installed (`--tools=claude`); `factory-lock.json` = 25 files + 8 adaptations; git hooks copied but **dormant** (`core.hooksPath` unset) |
| 2026-07-10 | Archive | `add-export-share-preview` | → `2026-07-10-add-export-share-preview`; 220 tests |
| 2026-07-10 | SDD | `/opsx:apply add-export-share-preview` | S4b preview gate; print fix (preview iframe) |
| 2026-07-10 | OpenSpec | `/opsx:propose add-export-share-preview` | proposal, design, specs delta, tasks |
| 2026-07-10 | Loop | Close-out `add-form-input` | 4 ticks; archive; loop log |
| 2026-07-10 | SDD loop | `/opsx:apply add-form-input` | S4 form-input shipped; 211 Vitest tests |
| 2026-07-10 | OpenSpec | `/opsx:propose add-form-input` | proposal, design, specs delta, tasks |

# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10T09:40:00Z

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` @ `22bdda7`; S3 work parked on PR #8 |
| **Active capability** | S3 — `document-render` **implemented + reviewed**, awaits PR #8 merge |
| **Active OpenSpec change** | `add-document-render` (15/15 tasks, spec synced in-branch; archive after merge) |
| **Open PR (human merge needed)** | [#8 document-render](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/8) — 4-lens adversarial review, 0 blocking |
| **Slice / gate** | S4 `form-input` (demo milestone M4) opens once #8 lands |
| **Gate check** | `npm run capability:check -- --capability form-input` (after merge) |

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status | Notes |
| --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **shipped** | PR #3 |
| S1 | `nace-catalog`, `invoice-calc` | domain | **shipped** | archived 2026-07-10 |
| S2 | `supplier-profile` | ui | **shipped** | PR #5; archived |
| S2 | `client-directory` | ui | **shipped** | PR #4; archived |
| S2 | `banking` | domain | **shipped** | PR #7; archived 2026-07-10 |
| S3 | `document-render` | domain | **shipped** (on PR #8) | archive after merge |
| S4 | `form-input` | ui | not_started | **next** — demo milestone M4 |

## Completed recently

| Date | Commit / work | Outcome |
| --- | --- | --- |
| 2026-07-10 | PR #7 merged | S2 `banking` on `main` |
| 2026-07-10 | `/opsx:archive add-banking` | `2026-07-10-add-banking` in archive |
| 2026-07-10 | PR #6 merged | S2 hardening on `main` |
| 2026-07-10 | PR #4 + #5 merged | S2 directories on `main` |
| 2026-07-10 | Vitest | 161 tests green |

## Stopped at

**PR #8** (`feat/document-render`) is ready and blocked only on **human merge**
(the permission gate forbids an agent self-merging its own AI-reviewed PR).
Full SDD loop done: propose → apply (15/15) → 4-lens adversarial review → fixes.
`src/lib/render/` ships `fillTemplate` (escape-by-default, fail-closed),
`buildServiceRows` / `buildProjectBlock`, and `renderInvoice`. 195 tests.

The carried-forward escaping requirement from the banking review is **closed**:
the fill step now owns HTML-escaping of every substituted variable (FR-TPL-01).

After merge: `/opsx:archive add-document-render`, then
`/opsx:propose add-form-input` (S4 — the M4 demo milestone).

## Blockers & open decisions

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| 05 | PDF output fidelity **+ remote font `@import`** (see below) | export-share pdf; FR-TPL-05 |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | form-input polish |

### FR-TPL-05 open decision (needs human)

`docs/invoice-template.html` loads Inter via
`@import url('https://fonts.googleapis.com/…')`. That is a **remote**, not
bundled, font, so FR-TPL-05 ("no external network dependency beyond bundled
fonts") is **unmet today in the browser preview**, not only in offline PDF.
Two consequences: a PII-bearing invoice issues a third-party request on every
render, and headless Chromium will lose cyrillic glyphs offline (ticket 05).

FR-TPL-05 is therefore tracked as `accepted`, not `shipped`; a test pins the
external-URL count at exactly 1 so it cannot grow. **Choose:** inline Inter as a
base64 `@font-face`, or drop the `@import` and accept a system-font fallback
(BC-BRAND-01 impact). Either edits the template → its own change.

## Next up (priority order)

1. **Human: merge PR #8**, then `/opsx:archive add-document-render`
2. **`/opsx:propose add-form-input`** — S4, the M4 demo milestone
3. Resolve the FR-TPL-05 font decision above (folds into wayfinder 05)
4. Update mentor PR #50 body with S3 progress (195 tests)

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary |
| `origin` | `fwdays-submission` | Mentor PR #50 |
| `upstream` | `main` | Course template |

## Session log

| Date (UTC) | Session | Action | Outcome |
| --- | --- | --- | --- |
| 2026-07-10 | SDD loop | `add-document-render` propose → apply → review (PR #8) | `src/lib/render/` (fill/rows/compose + generated template + `template:check` build gate); 32 new tests, 195 total. Review: correctness 0, security 0 (font `@import` only), spec 2 major, quality 2 minor + 1 nit — all fixed. FR-TPL-02 reworded (was self-contradictory); FR-TPL-05 downgraded `shipped`→`accepted` (remote font). Restored FR-TPL-02/04 + NFR-PERF-02, missing from `spec.md` |
| 2026-07-10 | OpenSpec | Archived `add-banking` | `2026-07-10-add-banking`; specs already synced |
| 2026-07-10 | PRs | #7 merged to `main` | `banking` shipped; `document-render` unblocked |
| 2026-07-10 | OpenSpec | Archived S2 changes | `2026-07-10-add-supplier-profile`, `2026-07-10-add-client-directory` |
| 2026-07-10 | PRs | #4 + #5 merged to `main` | Both S2 UI capabilities shipped |

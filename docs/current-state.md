# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10 (UTC)

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` @ `d812c41` |
| **Active capability** | S1 — `invoice-calc` or `nace-catalog` (both unblocked) |
| **Active OpenSpec change** | `add-invoice-calc` (artifacts 4/4, ready for `/opsx:apply`) |
| **Slice / gate** | S0 `shell` **shipped**; S1 + S2 directories unblocked |
| **Gate check** | Unblocked: `nace-catalog`, `invoice-calc`, `supplier-profile`, `client-directory` |

## Capability backlog

Source: `openspec/capability-map.yaml` · order: [capability.md](capability.md)

| Slice | Capability | Owner | Status | Blocked by | Unblocks |
| --- | --- | --- | --- | --- | --- |
| S0 | `shell` | ui | **shipped** | — | supplier-profile, client-directory |
| S1 | `nace-catalog` | domain | not_started | — | document-render, form-input |
| S1 | `invoice-calc` | domain | not_started | — | document-render, invoice-registry, invoice-edit |
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

S0 `shell` **shipped** (PR #3 merged). `add-invoice-calc` OpenSpec change is **ready**
(proposal + delta + design + tasks). Next: `/opsx:apply add-invoice-calc` or start S2
directories. Code scaffold exists; `invoices/new` is still a placeholder.

## Blockers & open decisions

Wayfinder tickets still open (see `.scratch/mvp-spec-coherence/`):

| Ticket | Topic | Blocks capability |
| --- | --- | --- |
| ~~06~~ | **resolved**: unit×qty, integer cents, `1,234.56` everywhere | — |
| ~~07~~ | **resolved**: sequential `YYYY-NNN` on issue, per supplier; `DDMM/0YY` retired | — |
| ~~15~~ | **resolved**: all 6 vanished FRs were accidents; FR-NACE-06 drop propagated | — |
| 05 | PDF output fidelity | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | shell, form-input |

## Next up (priority order)

1. **`/opsx:apply add-invoice-calc`** — implement S1 pure functions; sync delta to
   `openspec/specs/invoice-calc/spec.md` when done.
2. **S2 `supplier-profile` / `client-directory`** — now unblocked after shell ship.
3. **S1 `nace-catalog`** — seed catalog + matcher; NACE 2.1-UA in force from
   **2027-01-01**; carry legacy KVED alongside (wayfinder 09 decides display).
4. **Wayfinder 05 (prototype, needs the human)** — stateless Chromium PDF;
   gates `export-share pdf` (S6); font findings feed ticket 11 → `shell` styling.

## Repository sync

| Remote | Branch | Role |
| --- | --- | --- |
| `origin` | `main` | Primary; pushes trigger homework sync |
| `origin` | `fwdays-submission` | Mentor PR #50 (auto-synced from main) |
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
| 2026-07-10 | Agent | Merged to `main`, pushed origin | `main` @ `b686caa`; CI syncs `fwdays-submission` |
| 2026-07-10 | Agent | Deleted `wayfinder/resolve-01-04` | Branch merged; local + remote removed |
| 2026-07-10 | Wayfinder | Grilled 06+07 with the human | Money: unit×qty, integer cents; numbering: sequential YYYY-NNN on issue (DDMM/0YY retired). invoice-calc ungated; ticket 15 audit running in background |
| 2026-07-10 | Wayfinder | Session close: factual fixes | product-brief NACE date corrected (in force 2027-01-01, not 2025); config.yaml scenario format fixed (WHEN/THEN, not Given/When/Then); layout.tsx `subsets: ["cyrillic","latin"]` (ticket 01 evidence); Next-up reordered — 06/07 gate invoice-calc |
| 2026-07-10 | Checker | Maker≠checker review fork PR #2 | Separate chat; Bugbot + synthesis; logged in `.github/HOMEWORK_SUBMISSION.md` Review log; verdict approve-with-follow-ups (yaml dep, invoice-calc.md drift, current-state Next up) |
| 2026-07-10 | Wayfinder | Ticket 15 resolved (audit) | 6 vanished FRs = accidents; FR-NACE-06 still SHALL despite ticket 03 (→09); no FR-id coverage tool exists |
| 2026-07-10 | OpenSpec | `add-invoice-calc` change created | proposal + delta specs (FR-CALC-01/03/04/06 MODIFIED, 05 ADDED) + design + tasks; validate --strict green; next: /opsx:apply |
| 2026-07-10 | OpenSpec | `add-shell` change created on `feat/shell` | FR-SHELL-02 responsive shell: proposal + delta spec (FR-SHELL-02 MODIFIED, 4 scenarios) + design (md: breakpoint, Sheet mobile nav) + tasks; validate green; constraint: no `src/lib`; next: /opsx:apply on feat/shell |
| 2026-07-10 | OpenSpec | `add-shell` applied + synced on `feat/shell` | S0 shell **shipped**: sidebar `hidden md:flex`, MobileNav (Sheet, nativeButton fix), landing reflow; verified headless Chrome 375/768 px — zero overflow all 6 routes, sheet nav works; build 4 s, health 200; delta synced to specs/shell; FR-SHELL-01/02 → shipped, capability-map shell → shipped (S2 unblocked); pending: merge feat/shell → main, then /opsx:archive add-shell. Pre-existing Base UI `nativeButton` console warnings on Home/Invoices `Button render={Link}` left as follow-up |
| 2026-07-10 | OpenSpec | `nativeButton` follow-up fixed on `feat/shell` | All 5 `<Button render={<Link/>}>` callsites (Home ×4, InvoicesPage ×1) got `nativeButton={false}`; headless Chrome re-run: 0 console errors, no overflow/sheet regressions; typecheck+lint+build green |
| 2026-07-10 | OpenSpec | `add-shell` archived; PR #3 opened and merged | Change archived to `openspec/changes/archive/2026-07-10-add-shell`; `feat/shell` merged to `main` via PR #3; S0 done; next: S1 `/opsx:apply add-invoice-calc` or S2 directories |
| 2026-07-10 | Maker | PR #2 review follow-ups | yaml dep; invoice-calc.md + capability.md pdf row; FR-NACE-06 dropped in requirements/map/spec; current-state Next up refreshed |
| 2026-07-10 | Agent | `git pull` autostash conflict resolved | Merged upstream shell ship + local PR #2 follow-ups in `docs/current-state.md`; working tree clean on `main` @ `d812c41` |

# Current state — agent handoff

> **Read this file at the start of every agent session.**  
> **Update it at the end of a session or when stopping mid-task.**

Last updated: 2026-07-10 (UTC)

## Snapshot

| Field | Value |
| --- | --- |
| **Branch** | `main` @ `a0759b3` |
| **Active capability** | — (planning complete; implementation not started) |
| **Active OpenSpec change** | `add-invoice-calc` (artifacts 4/4, ready for `/opsx:apply`) |
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
| ~~06~~ | **resolved**: unit×qty, integer cents, `1,234.56` everywhere | invoice-calc unblocked |
| ~~07~~ | **resolved**: sequential `YYYY-NNN` on issue, per supplier; `DDMM/0YY` retired | invoice-calc unblocked |
| ~~15~~ | **resolved**: all 6 vanished FRs were accidents; no tool checks FR-id coverage in specs | repairs → 08, 09, 10, 16 |
| 05 | PDF output fidelity | export-share pdf |
| 16 | Edit after send (immutability) | invoice-edit |
| 11 | Design system reconciliation | shell, form-input |

Specs pass `openspec validate --strict` but may still be wrong per map.md.

## Next up (priority order)

1. ~~**Merge** `wayfinder/resolve-01-04` → `main`~~ done (`b686caa` pushed; homework CI sync pending)
2. **Wayfinder 15 (AFK)** — audit the `8d45456` migration: six FR ids vanished
   (incl. `FR-NACE-04` video and `FR-CALC-05` deadlines); `invoice-calc/spec.md`
   and `src/types/invoice.ts` compute money in opposite directions.
3. ~~**Wayfinder 06 + 07 (grilling)**~~ **done** — money: unit×qty, integer cents;
   numbering: sequential `YYYY-NNN` on issue. **Next:** sync `invoice-calc.md`
   + OpenSpec delta before `/opsx:propose add-invoice-calc` (ticket 15 audit
   still tracks spec content).
4. **Ship S0** `shell` — finish FR-SHELL-02, mark `shipped` in
   capability-map.yaml. Safe to do in parallel; no open ticket gates it.
5. **S1 `nace-catalog`** may start after 15 confirms the seed entries
   (`FR-NACE-02/03/04`) are restored; note NACE 2.1-UA is in force only from
   **2027-01-01**, so the catalog must be able to carry the legacy KVED code
   alongside (wayfinder 09 decides document display).
6. **Wayfinder 05 (prototype, needs the human)** — stateless Chromium PDF;
   gates `export-share pdf` (S6), so it can wait, but its font findings feed
   ticket 11 → `shell` styling.

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
| 2026-07-10 | OpenSpec | `add-shell` archived; PR #3 opened and merged | Change archived to `openspec/changes/archive/2026-07-10-add-shell`; `feat/shell` merged to `main` via PR #3 (carries unpushed 092b15a + 0a94ce5 from parallel session — see PR note); local `main` checkout in the primary tree is behind origin and dirty with parallel WIP — pull/rebase there before next main-tree work. S0 done; next: S1 `/opsx:apply add-invoice-calc` or S2 directories |

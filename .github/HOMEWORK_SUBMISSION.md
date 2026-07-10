<!-- Draft body for fwdays homework PR #50 (mentor repo). -->
<!-- Source of truth: edit this file, then run: -->
<!-- gh pr edit 50 --repo koldovsky/2026-fwdays-agentic-greenfield-task --body-file .github/HOMEWORK_SUBMISSION.md -->

## Author

**Serhii Rozum**

## Project

**Invoice Maker 2026** — a web service for quickly creating **bilingual (Ukrainian + English) invoices** for Ukrainian sole entrepreneurs (FOP) who bill foreign clients in **USD** or **EUR**.

**Flow (target MVP):** form input → NACE 2.1-UA service description → invoice calculations → bilingual HTML/PDF from `docs/invoice-template.html` → user shares the file manually. Data lives in the browser (browser-first); PDF rendering via a stateless Route Handler (ADR-0002).

**Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind v4, shadcn/ui, OpenSpec (SDD), Vitest.

**Repository:** https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026

**Draft PR branch:** `fwdays-submission` (auto-synced from `main` on every push via GitHub Actions).

## Video demo (1–2 min)

Video: _to be added after recording_

## Current progress (2026-07-10, `main` — post loop close-out)

| Area | Status |
| --- | --- |
| **App scaffold** | ✅ Next.js shell, dashboard routes, WEG3D Fin design system |
| **Responsive shell (S0)** | ✅ `shell` shipped — fork PR #3, `add-shell` archived (`FR-SHELL-01..03`) |
| **Health API** | ✅ `GET /api/health` (`FR-SHELL-03`) |
| **Domain core (S1)** | ✅ `nace-catalog` + `invoice-calc` shipped — `src/lib/nace/`, `src/lib/invoice-calc/` |
| **Directories (S2)** | ✅ `supplier-profile` (fork PR #5) + `client-directory` (fork PR #4) — settings + clients UI, browser storage CRUD |
| **Banking (S2)** | ✅ `banking` shipped — fork PR #7; currency → IBAN from active supplier profile (`FR-BANK-01`, `FR-BANK-03`) |
| **S2 hardening** | ✅ fork PR #6 — adversarial review fixes (storage snapshots, a11y, IBAN validation) |
| **Document render (S3)** | ✅ `document-render` shipped — fork PR #8; template fill, escaping, service rows, `render-invoice` |
| **Embedded fonts (S3)** | ✅ `add-embedded-fonts` archived — Inter v20 subsets vendored; **FR-TPL-05** resolved |
| **Form input (S4)** | ✅ `form-input` shipped — `/invoices/new` structured form + live HTML preview (M4 demo) |
| **Vitest (TC-STACK-06)** | ✅ **211 tests** green (`npm run test`) |
| **Template drift guard** | ✅ `npm run template:check` wired into `build` |
| **OpenSpec specs** | ✅ 11 capabilities; S0–S4 synced; **9 changes archived** (incl. `add-form-input`) |
| **Capability roadmap** | ✅ `openspec/capability-map.yaml`, `docs/capability.md`, `docs/capabilities/` |
| **Gate tooling** | ✅ `npm run capability:check` / `capability:list` |
| **Agent handoff** | ✅ `docs/current-state.md` (session resume between agents) |
| **Loop log (S4)** | ✅ [`docs/qa/loop-add-form-input.md`](docs/qa/loop-add-form-input.md) — 4-tick close-out |
| **Wayfinder planning** | ✅ Tickets 01–04, 06, 07, 15 resolved; **05**, **11**, **16** open |
| **Active slice** | 🎯 **S4b `export-share` preview** — download/share HTML from M4 form |
| **End-to-end invoice flow** | ✅ **M4** — form → live HTML preview on `/invoices/new` |

**Milestones:** M0 ✅ · M1 ✅ · M2 ✅ · M3 ✅ · **M4 (form → preview) ✅** · M5/M6 blocked.

**Recent work:** S4 `form-input` (apply + loop close-out + archive), 211 Vitest tests, M4 demo path live.

## Agentic Engineering practices applied

Honest status for each course practice. Open **TODO** items will be completed before final submission.

---

### 1. Context engineering — ✅ applied

**Static context:**

| Artifact | Purpose |
| --- | --- |
| `AGENTS.md` | Agent constitution: Next.js 16, WEG3D Fin, OpenSpec, session handoff rules |
| `CONTEXT.md` | Domain glossary (Invoice, Client, Snapshot, NACE, statuses) |
| `docs/requirements.md` | FR/NFR traceability index (split by capability) |
| `docs/capability.md` + `docs/capabilities/` | Slice order, dependencies, expanded scope per capability |
| `docs/current-state.md` | **Agent handoff** — backlog, blockers, next steps (updated each session) |
| `Design.md` + `.agents/skills/weg3d-fin-design/` | Design system rules + dedicated agent skill |
| `docs/ARCHITECTURE.md`, `docs/adr/0002-browser-first-mvp.md` | Architecture and decisions |
| `openspec/specs/<capability>/spec.md` | 11 authoritative capability specs |
| `.scratch/mvp-spec-coherence/map.md` | Cross-session decisions and wayfinder tickets |

**Dynamic context:**

| Artifact | Purpose |
| --- | --- |
| `openspec/config.yaml` | Injected project context for OpenSpec CLI |
| `/opsx:*` slash commands | Cursor, Claude Code, Codex, Copilot, Pi, Windsurf |
| `openspec/capability-map.yaml` | Gate status (`not_started` / `in_progress` / `shipped`) |

**Presentation alignment (slide 49):** _«Агент забуває — репозиторій ні»_ — `docs/current-state.md` + capability map keep state across agent sessions.

**Human:** product vision, domain decisions (NACE 2.1-UA, browser-first, snapshot model), slice prioritization.  
**Agent:** spec authoring, capability docs, scaffold UI, refactors per `AGENTS.md`.

---

### 2. Specs first (SDD) — ✅ applied (S0–S4 shipped)

- **OpenSpec** living specs for all 11 MVP capabilities.
- **Capability map** with slice order S0→S6 and dependency gates (`npm run capability:check`).
- Workflow: `/opsx:propose` → design + tasks + delta specs → `/opsx:apply` → `/opsx:sync` → `/opsx:archive`.
- **Shipped through OpenSpec:** S0 `shell` (PR #3), S1 `nace-catalog` + `invoice-calc`, S2 `supplier-profile` (PR #5) + `client-directory` (PR #4) + `banking` (PR #7), S3 `document-render` (PR #8) + `add-embedded-fonts`, **S4 `form-input`** (archived `2026-07-10-add-form-input`).
- **9 archived changes** in `openspec/changes/archive/`.
- Traceability: `FR-*` → OpenSpec scenario → implementation + Vitest.
- `openspec validate --strict` passes locally on every slice gate.

**TODO before final submission:**

- [x] Ship **S0–S4 `form-input`** through full OpenSpec changes (all archived).
- [ ] Ship **S4b `export-share` preview** gate.
- [x] Reach demo milestone **M4** (form → live HTML preview).

---

### 3. Verification — 🔄 partial

**Done:**

- Gates: `npm run typecheck`, `npm run lint`, `npm run build` (includes `template:check`).
- **Vitest:** `npm run test` — **211 tests** (`TC-STACK-06`) covering domain libs, storage, banking, render, **form-input** validation and mapper.
- **Capability gates:** `npm run capability:check -- --capability <id>`.
- `GET /api/health` contract in `openspec/specs/shell/spec.md`.
- **Responsive shell:** headless Chrome verified 375 px / 768 px — no overflow (S0).
- **CodeRabbit** enabled on the fork (PR too large for auto-review on mentor repo — see note below).
- Wayfinder tickets document acceptance criteria and spec conflicts.
- **CI:** `.github/workflows/sync-homework-pr.yml` keeps this draft PR in sync with `main`.

**Not done yet:**

- [ ] `openspec validate --strict` in CI (G5/G7 automation).
- [ ] **G6** — Playwright smoke / visual QA.
- [ ] Smoke / eval: preview → PDF (S6).
- [ ] **Trajectory evals** (presentation slide 61: output vs route quality).

**CodeRabbit note:** mentor PR exceeds 150-file review limit; reviews run on smaller fork PRs instead.

---

### 4. Maker ≠ checker — 🔄 partial (improving)

**Done:**

- Rule in README and engineering pipeline (G7).
- Cursor subagents: `code-reviewer`, `bugbot`, `ultracite-reviewer`.
- **CodeRabbit** as external checker on fork PRs.
- Wayfinder sessions: separate planning agents (Claude Opus) vs implementation agents (Cursor).
- **Checker passes (separate chats / adversarial review):**
  - fork [PR #2](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/2) — wayfinder 01–04 (see [Review log](#review-log-fork-pr-2))
  - fork [PR #6](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/6) — S2 storage hardening (4 lenses × 2 refuters)
  - fork [PR #7](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/7) — `banking` adversarial review
  - fork [PR #8](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/8) — `document-render` adversarial review (spec + quality lenses)

**TODO:**

- [ ] Formal checker log entry for S0/S1 (lessons captured in OpenSpec archives, not yet in this PR body).
- [ ] Checker pass after **S4 `form-input`** — **scheduled in separate chat** (see [`docs/qa/loop-add-form-input.md`](docs/qa/loop-add-form-input.md#checker-handoff-separate-chat))
- [ ] Address remaining CodeRabbit feedback before **Ready for review**.

---

### 5. Loop engineering — ✅ applied (S4 close-out)

Dynamic close-out loop for `add-form-input` after `/opsx:apply` (19/19 tasks pre-complete):

- **Log:** [`docs/qa/loop-add-form-input.md`](docs/qa/loop-add-form-input.md)
- **Ticks:** 4 — apply-check → G4 gates → `openspec validate --strict` → archive + handoff
- **Result:** `2026-07-10-add-form-input` archived; 211 tests green at close

**TODO:**

- [x] Run loop for S4 `form-input` close-out.
- [x] Document: “S4 closed in 4 loop ticks”.
- [ ] **G0** — git hooks / loop-first automation (planned in README).
- [ ] Run loop on next slice (`add-export-share`) with real apply ticks.

---

### 6. Project Factory — ⏭️ intentionally skipped (optional)

Not run. Lighter stack: OpenSpec + `AGENTS.md` + capability gates + `/opsx:*` across 6 IDEs.

---

### Tools and MCP

| Tool | Usage |
| --- | --- |
| **Cursor** | Primary Agentic IDE, Composer, `/opsx:*`, subagents |
| **Claude Code** | Wayfinder planning, adversarial review, `.claude/commands` OpenSpec |
| **OpenSpec CLI** | Propose, validate, sync, archive |
| **CodeRabbit** | Automated PR review on fork PRs |
| **GitHub Actions** | Auto-sync `main` → `fwdays-submission` → updates PR diff |
| **MCP Context7** | Library docs during implementation |
| **MCP Vercel** | Deploy / logs (planned for PDF route) |

---

### Roles: human vs agent

| Serhii Rozum (human) | AI agent |
| --- | --- |
| Product, MVP priorities, domain (NACE, FOP, bilingual docs) | Code and docs generation from specs |
| Architecture (browser-first, ADR-0002), slice order | UI scaffold, capability docs, refactors |
| Final acceptance, video recording | Wayfinder analysis, spec migration, handoff updates |
| Merge decisions, adversarial review synthesis | Iteration within given context |

## (Optional) Code link

https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026

---

## Review log (fork PR #2)

**Subject:** [eresemai/…#2](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/2) — *docs: wayfinder 01–04, capability gates, and WEG3D Fin design skill*  
**Merged:** 2026-07-09 · **+3025 / −173** across 33 files · 5 commits  
**Checker:** separate Cursor chat (maker ≠ checker) · Bugbot subagent + synthesis  
**Verdict:** **Approved** — follow-ups resolved 2026-07-10.

### Scope reviewed

| Area | Assessment |
| --- | --- |
| Wayfinder tickets 01–04 | ✅ Evidence-backed; opens tickets 15–16 correctly |
| `openspec/capability-map.yaml` + gate script | ✅ Sound slice order and CLI |
| `docs/capability.md` + `docs/capabilities/` | ✅ Clear human roadmap |
| `docs/current-state.md` | ✅ Good handoff pattern |
| `weg3d-fin-design` skill | ✅ Actionable UI rules, token refs, session banner |
| `docs/requirements.md` split | ✅ Correct traceability index role |

### Findings (checker) — resolved

| Severity | Location | Finding | Resolution |
| --- | --- | --- | --- |
| **High** | `scripts/check-capability-gates.mjs` | `yaml` missing from `package.json` | Added `yaml` to `devDependencies` |
| **High** | `docs/capabilities/invoice-calc.md` | Stale `DDMM/0YY` / inverted FR-CALC-03 | Synced with Wayfinder 06+07 |
| **High** | `docs/current-state.md` | Stale `Next up` vs resolved tickets | Refreshed priorities |
| **Medium** | `docs/capability.md` pdf gate deps | Incomplete | Added `document-render`, `form-input`, preview |
| **Medium** | `FR-NACE-06` traceability | Still `proposed` after ticket 03 drop | Dropped in requirements + spec |
| **Low** | PR test plan | `capability:check` on clean install | Fixed via `yaml` dependency |

---

## Review log (adversarial passes — S2/S3)

| PR | Slice | Checker | Outcome |
| --- | --- | --- | --- |
| [#6](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/6) | S2 storage + UI | Claude Fable 5 adversarial (4×2 lenses) | Critical hydration crash fixed; IBAN mod-97; a11y labels |
| [#7](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/7) | S2 `banking` | Adversarial review | Template contract bidirectional equality; `MissingIbanError` guards |
| [#8](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/8) | S3 `document-render` | Adversarial review | FR-TPL-02 wording fixed; `template:check` in build; font gap → PR #9 |

---

### Checklist

- [x] Real name provided (Serhii Rozum)
- [ ] Video demo link added (1–2 min)
- [x] Agentic Engineering practices described (with honest TODOs)
- [x] Working end-to-end result — **M4 demo milestone** (`/invoices/new` → live preview)
- [x] Loop engineering — S4 close-out in 4 ticks ([loop log](docs/qa/loop-add-form-input.md))
- [x] Vitest + test-first (**211 tests**)
- [x] Maker ≠ checker — documented separate review passes (fork PRs #2, #6, #7, #8); S4 checker scheduled separately
- [x] S0 `shell` shipped (responsive UI, health API, OpenSpec archived)
- [x] S1 domain core shipped (`nace-catalog`, `invoice-calc`)
- [x] S2 shipped (`supplier-profile`, `client-directory`, `banking`)
- [x] S3 shipped (`document-render` + embedded fonts, FR-TPL-05)
- [x] S4 shipped (`form-input` — M4 form → live HTML preview, archived)

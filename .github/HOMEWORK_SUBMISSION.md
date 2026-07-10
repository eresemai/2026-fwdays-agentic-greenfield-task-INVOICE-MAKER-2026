<!-- Draft body for fwdays homework PR #50 (mentor repo). -->
<!-- Source of truth: edit this file, then run: -->
<!-- gh pr edit 50 --repo koldovsky/2026-fwdays-agentic-greenfield-task --body-file .github/HOMEWORK_SUBMISSION.md -->

## Author

**Serhii Rozum**

## Project

**Invoice Maker 2026** — a web service for quickly creating **bilingual (Ukrainian + English) invoices** for Ukrainian sole entrepreneurs (FOP) who bill foreign clients in **USD** or **EUR**.

**Flow (target MVP):** form input → NACE 2.1-UA service description → invoice calculations → bilingual HTML/PDF from `docs/invoice-template.html` → user shares the file manually. Data lives in the browser (browser-first); PDF rendering via a stateless Route Handler (ADR-0002).

**Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind v4, shadcn/ui, OpenSpec (SDD).

**Repository:** https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026

**Draft PR branch:** `fwdays-submission` (auto-synced from `main` on every push via GitHub Actions).

## Video demo (1–2 min)

Video: _to be added after recording_

## Current progress (2026-07-10, `main` @ `95b9b1b`)

| Area | Status |
| --- | --- |
| **App scaffold** | ✅ Next.js shell, dashboard routes, WEG3D Fin design system |
| **Responsive shell (S0)** | ✅ `shell` shipped — PR #3, `add-shell` archived (`FR-SHELL-01..03`) |
| **Health API** | ✅ `GET /api/health` (`FR-SHELL-03`) |
| **Domain core (S1)** | ✅ `nace-catalog` + `invoice-calc` shipped — `src/lib/nace/`, `src/lib/invoice-calc/` |
| **Directories (S2)** | ✅ `supplier-profile` (PR #5) + `client-directory` (PR #4) shipped — settings + clients UI, browser storage CRUD |
| **Vitest (TC-STACK-06)** | ✅ 129 tests green (`npm run test`) |
| **OpenSpec specs** | ✅ 11 capabilities; S0–S2 deltas synced to `openspec/specs/`; **5 changes archived** |
| **Capability roadmap** | ✅ `openspec/capability-map.yaml`, `docs/capability.md`, `docs/capabilities/` |
| **Gate tooling** | ✅ `npm run capability:check` / `capability:list` |
| **Agent handoff** | ✅ `docs/current-state.md` (session resume between agents) |
| **Wayfinder planning** | ✅ Tickets 01–04, 06, 07, 15 resolved; 05, 11, 16 open |
| **Active slice** | 🔄 **S2 remainder** — `banking` next (currency → IBAN from active supplier profile) |
| **End-to-end invoice flow** | ⏳ Demo milestone M4 (S4: form → live HTML preview) |

**Recent commits:** S2 directories (PR #4 `client-directory`, PR #5 `supplier-profile`), S1 domain libs, Vitest harness (129 tests), S0 responsive shell (PR #3), 5 OpenSpec changes archived, CI auto-sync to this PR.

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

**Human:** product vision, domain decisions (NACE 2.1-UA, browser-first, snapshot model), slice prioritization.  
**Agent:** spec authoring, capability docs, scaffold UI, refactors per `AGENTS.md`.

---

### 2. Specs first (SDD) — ✅ applied (S0 + S1 + S2 directories shipped)

- **OpenSpec** living specs for all 11 MVP capabilities.
- **Capability map** with slice order S0→S6 and dependency gates (`npm run capability:check`).
- Workflow: `/opsx:propose` → design + tasks + delta specs → `/opsx:apply` → `/opsx:sync` → `/opsx:archive`.
- **Shipped through OpenSpec:** S0 `shell` (PR #3), S1 `nace-catalog` + `invoice-calc` (`src/lib/`), S2 `supplier-profile` (PR #5) + `client-directory` (PR #4).
- **5 archived changes** in `openspec/changes/archive/` (`add-shell`, `add-nace-catalog`, `add-invoice-calc`, `add-supplier-profile`, `add-client-directory`).
- Traceability: `FR-*` → OpenSpec scenario → implementation + Vitest.
- `openspec validate --strict` passes; wayfinder ticket **15** resolved (migration audit).

**TODO before final submission:**

- [x] Ship **S0 `shell`** through full OpenSpec change (`add-shell` archived).
- [x] Ship **S1** domain core (`nace-catalog`, `invoice-calc`) with Vitest.
- [x] Ship **S2 directories** (`supplier-profile`, `client-directory`) through OpenSpec changes.
- [x] Close wayfinder tickets **06** (money model) and **07** (invoice number).
- [ ] Ship **S2 `banking`**, then S3–S4 capabilities through OpenSpec changes.
- [ ] Reach demo milestone **M4** (form → live HTML preview).

---

### 3. Verification — 🔄 partial

**Done:**

- Gates: `npm run typecheck`, `npm run lint`, `npm run build`.
- **Vitest:** `npm run test` — 129 tests (`TC-STACK-06`) for `src/lib/` (nace, invoice-calc) and S2 storage CRUD (`supplier-profile`, `client-directory`).
- **Capability gates:** `npm run capability:check -- --capability <id>`.
- `GET /api/health` contract in `openspec/specs/shell/spec.md`.
- **Responsive shell:** headless Chrome verified 375 px / 768 px — no overflow (S0).
- **CodeRabbit** enabled on the fork; reviews this PR (verified).
- Wayfinder tickets document acceptance criteria and spec conflicts.
- **CI:** `.github/workflows/sync-homework-pr.yml` keeps this draft PR in sync with `main`.

**Not done yet:**

- [ ] `openspec validate --strict` in CI or pre-push hook.
- [ ] Smoke / eval: form → preview → PDF (M4 demo).

---

### 4. Maker ≠ checker — 🔄 partial

**Done:**

- Rule in README and engineering pipeline (G7).
- Cursor subagents: `code-reviewer`, `bugbot`, `ultracite-reviewer`.
- **CodeRabbit** as external checker on this PR.
- Wayfinder sessions used separate planning agents (Claude Opus) vs implementation agents (Cursor).
- **Checker pass (separate chat):** fork [PR #2](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/2) (`wayfinder/resolve-01-04`, merged 2026-07-09) reviewed by Cursor Bugbot subagent + human synthesis — see [Review log](#review-log-fork-pr-2) below.

**TODO:**

- [x] Systematic checker pass after each shipped slice (separate agent / chat) — **PR #2 done**
- [x] Document checker findings in PR or change log — **see Review log below**
- [ ] Checker pass for **S0 `shell`** (PR #3) and **S1** domain slice.
- [ ] Address CodeRabbit feedback before **Ready for review**.

---

### 5. Loop engineering — ❌ not applied yet

Work is still **session-based** with `/opsx:*` and handoff via `docs/current-state.md`, not a fully autonomous loop.

**TODO:**

- [ ] Run Cursor **loop** for one vertical slice (S1 or S0 completion).
- [ ] Document: “slice X completed in N loop iterations”.

---

### 6. Project Factory — ⏭️ intentionally skipped (optional)

Not run. Lighter stack: OpenSpec + `AGENTS.md` + capability gates + slash commands.

---

### Tools and MCP

| Tool | Usage |
| --- | --- |
| **Cursor** | Primary Agentic IDE, Composer, `/opsx:*`, subagents |
| **Claude Code** | Wayfinder planning, `.claude/commands` OpenSpec integration |
| **OpenSpec CLI** | Propose, validate, sync |
| **CodeRabbit** | Automated PR review on this draft |
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
| Direction and judgment | Iteration within given context |

## (Optional) Code link

https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026

---

## Review log (fork PR #2)

**Subject:** [eresemai/…#2](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/2) — *docs: wayfinder 01–04, capability gates, and WEG3D Fin design skill*  
**Merged:** 2026-07-09 · **+3025 / −173** across 33 files · 5 commits  
**Checker:** separate Cursor chat (maker ≠ checker) · Bugbot subagent + synthesis  
**Verdict:** **Approved** — follow-ups from checker pass resolved 2026-07-10.

### Scope reviewed

| Area | Assessment |
| --- | --- |
| Wayfinder tickets 01–04 | ✅ Evidence-backed; opens new tickets 15–16 correctly |
| `openspec/capability-map.yaml` + gate script | ✅ Sound slice order and CLI |
| `docs/capability.md` + `docs/capabilities/` | ✅ Clear human roadmap |
| `docs/current-state.md` | ✅ Good handoff pattern |
| `weg3d-fin-design` skill | ✅ Actionable UI rules, token refs, session banner |
| `docs/requirements.md` split | ✅ Correct traceability index role |

### Findings (checker) — resolved

| Severity | Location | Finding | Resolution |
| --- | --- | --- | --- |
| **High** | `scripts/check-capability-gates.mjs` | `yaml` missing from `package.json` | Added `yaml` to `devDependencies` |
| **High** | `docs/capabilities/invoice-calc.md` | Stale `DDMM/0YY` / inverted FR-CALC-03 | Synced with Wayfinder 06+07 decisions |
| **High** | `docs/current-state.md` | Stale `Next up` vs resolved tickets | Refreshed priorities and blockers |
| **Medium** | `docs/capability.md:94` | Incomplete pdf gate deps | Added `document-render`, `form-input`, preview |
| **Medium** | `FR-NACE-06` traceability | Still `proposed` after ticket 03 drop | Dropped in requirements, map, nace spec |
| **Low** | PR test plan | `capability:check` on clean install | Fixed via `yaml` dependency |

### Recommended follow-ups (maker chat)

1. ~~Add `yaml` to `devDependencies` and re-lock.~~ **Done**
2. ~~Sync `invoice-calc.md`, `current-state.md` Next up, and `capability.md` pdf row.~~ **Done**
3. ~~Propagate FR-NACE-06 drop into traceability + `nace-catalog/spec.md`.~~ **Done**
4. `/opsx:apply add-invoice-calc` then sync delta to authoritative spec.

---

### Checklist

- [x] Real name provided (Serhii Rozum)
- [ ] Video demo link added (1–2 min)
- [x] Agentic Engineering practices described (with honest TODOs)
- [ ] Working end-to-end result (target: M4 demo milestone)
- [ ] Loop engineering — at least one slice through an autonomous loop
- [x] Vitest + test-first for `src/lib/` and storage (129 tests)
- [x] Maker ≠ checker — documented separate review pass (fork PR #2)
- [x] S0 `shell` shipped (responsive UI, health API, OpenSpec archived)
- [x] S1 domain core shipped (`nace-catalog`, `invoice-calc`)
- [x] S2 directories shipped (`supplier-profile` PR #5, `client-directory` PR #4)

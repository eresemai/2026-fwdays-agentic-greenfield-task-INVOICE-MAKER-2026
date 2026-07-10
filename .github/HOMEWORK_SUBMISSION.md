## Для ментора (TL;DR)

**Serhii Rozum** · **Invoice Maker 2026** — browser-first MVP для українських ФОП (двомовні інвойси USD/EUR)

| | |
| --- | --- |
| **Відео (1–2 хв)** | https://www.loom.com/share/01ebc7b3403a4b7da8dc785ef2b8205b |
| **Live demo** | https://invoice-maker-2026.vercel.app |
| **Швидкий старт** | `npm i && npm run dev` → http://localhost:3000/invoices/new |
| **Що працює** | supplier + client → форма → live preview → print / HTML / PDF |
| **Практики** | OpenSpec (10 archives) · Project Factory · 220 tests · loop log · maker≠checker |
| **Fork + CI** | https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/actions |
| **AI review (fork)** | PRs [#2](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/2), [#6](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/6)–[#8](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/8) |

---

## Author

**Serhii Rozum**

## Project

**Invoice Maker 2026** — bilingual (Ukrainian + English) invoice web app for Ukrainian sole entrepreneurs (FOP) billing foreign clients in **USD** or **EUR**.

**Working MVP (demo):** save **supplier** (Settings) and **client** (Clients) in the browser → fill invoice on `/invoices/new` → NACE 2.1-UA service matching → live bilingual HTML preview → **print**, **download HTML**, or **save as PDF** via the browser.

**Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind v4, shadcn/ui, OpenSpec (SDD), Vitest, Zod, react-hook-form, **Project Factory** (G0–G8 gates).

**Repository:** https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026

**Draft PR branch:** `fwdays-submission` (auto-synced from `main` via GitHub Actions).

**Post-MVP (optional):** invoice registry (S5), server-side PDF route (S6), chat/LLM input — architecture and OpenSpec specs are ready; MVP is complete for course submission.

## Video demo (1–2 min)

Video: https://www.loom.com/share/01ebc7b3403a4b7da8dc785ef2b8205b

**Shown:** supplier + client CRUD → invoice form → live preview → print / HTML download / PDF.

## Current progress (2026-07-10 — submission-ready)

| Area | Status |
| --- | --- |
| **MVP end-to-end** | ✅ Supplier + client data → form → preview → print / HTML / PDF |
| **S0 `shell`** | ✅ Responsive app shell, health API |
| **S1 domain** | ✅ `nace-catalog` + `invoice-calc` |
| **S2 directories** | ✅ `supplier-profile`, `client-directory`, `banking` |
| **S3 render** | ✅ `document-render` + embedded Inter fonts (FR-TPL-05) |
| **S4 form** | ✅ `form-input` — M4 demo milestone |
| **S4b export** | ✅ `export-share` preview — print, HTML download, browser PDF |
| **Vitest** | ✅ **220 tests** green |
| **OpenSpec** | ✅ 11 capabilities; **10 archived changes** |
| **Project Factory** | ✅ `/project-factory:init` (G0); `factory-lock.json`; CI + gate scripts |
| **Loop engineering** | ✅ S4 close-out — [4 ticks](docs/qa/loop-add-form-input.md) |
| **Traceability** | ✅ `check-traceability` — 0 failures; reports in `docs/qa/` |
| **CI** | ✅ `.github/workflows/ci.yml` — lint, typecheck, test, build, traceability, trajectory, openspec validate |

## Agentic Engineering practices applied

---

### 1. Context engineering — ✅ applied

| Layer | Artifacts |
| --- | --- |
| **Static** | `AGENTS.md`, `CONTEXT.md`, `docs/requirements.md`, `docs/capability.md`, `docs/capabilities/`, `Design.md`, `docs/ARCHITECTURE.md`, `openspec/specs/`, `.scratch/mvp-spec-coherence/map.md`, `.agents/skills/weg3d-fin-design/` |
| **Dynamic** | `docs/current-state.md`, `openspec/config.yaml`, `openspec/capability-map.yaml`, `/opsx:*` slash commands (6 IDEs) |
| **Factory** | `factory-lock.json`, `docs/context-architecture.md`, factory lessons in `AGENTS.md` |

Slide 49 (*«Агент забуває — репозиторій ні»*): session handoff + capability map preserve state across agents.

**Human:** product vision, domain decisions, video demo, merge approval.  
**Agent:** specs, implementation, gates, docs, factory install.

---

### 2. Specs first (SDD) — ✅ applied

- [x] OpenSpec for all 11 MVP capabilities
- [x] Capability map + `npm run capability:check`
- [x] Workflow: `/opsx:propose` → `/opsx:apply` → `/opsx:sync` → `/opsx:archive`
- [x] S0–S4b shipped and archived (10 changes in `openspec/changes/archive/`)
- [x] M4 demo milestone reached
- [x] `openspec validate --all --strict` passes

---

### 3. Verification — ✅ applied

- [x] **Vitest:** 220 tests (`npm run test`)
- [x] Gates: `typecheck`, `lint`, `build` (incl. `template:check`)
- [x] **CI:** GitHub Actions on every push/PR
- [x] **Traceability:** `node scripts/check-traceability.mjs` — FR → spec → test chain
- [x] **Trajectory / QA reports:** `docs/qa/traceability-report.md`, `docs/qa/trajectory-report.md`
- [x] **Factory integrity:** `node scripts/check-factory-integrity.mjs`
- [x] **OpenSpec in CI:** `openspec validate --all --strict`
- [x] Manual M4 walkthrough + Loom video demo

*Post-MVP (not blocking submission):* Playwright e2e, server PDF route, coverage ratchet — stubs declared NOT-EARNED per factory lesson `declared-method-needs-mechanism`.

---

### 4. Maker ≠ checker — ✅ applied

- [x] Engineering rule in README (G7) + factory `review-gate` workflow
- [x] Cursor subagents: `code-reviewer`, `bugbot`, `ultracite-reviewer`
- [x] **CodeRabbit** on fork PRs
- [x] Wayfinder: Claude Opus planning vs Cursor implementation
- [x] Adversarial review passes: fork PRs [#2](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/2), [#6](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/6), [#7](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/7), [#8](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/8)
- [x] Checker handoff for S4: [`docs/qa/checker-handoff-form-input.md`](docs/qa/checker-handoff-form-input.md)

---

### 5. Loop engineering — ✅ applied

- [x] Dynamic close-out loop for S4 `form-input` — [**4 ticks**](docs/qa/loop-add-form-input.md)
- [x] Factory loop workflows installed: `spec-pipeline`, `review-gate`, `eval-suite`, `trajectory-eval`, `vision-verify`, `uat-triage`
- [x] Cursor `/loop` used for slice close-out (gates → validate → archive)

---

### 6. Project Factory — ✅ applied (installed & working)

- [x] `/project-factory:init` (G0, 2026-07-10) — `--tools=claude`
- [x] `factory-lock.json` — 25 gate-bearing files sealed
- [x] `.githooks/` pre-commit + commit-msg (copy installed; arm with `git config core.hooksPath .githooks` when ready)
- [x] `.github/workflows/ci.yml` — adapted factory CI for browser-first MVP
- [x] Gate scripts: traceability, trajectory, factory-integrity, qa-verify, acceptance-methods
- [x] `.claude/workflows/` — review-gate, eval-suite, trajectory-eval, vision-verify, uat-triage, spec-pipeline
- [x] `.claude/agents/` — spec-writer, requirements-analyst, spec-compliance-auditor

Factory coexists with existing OpenSpec + `/opsx:*` workflow; MVP ships on top, factory extends verification for future slices.

---

### Tools and MCP

| Tool | Usage |
| --- | --- |
| **Cursor** | Primary IDE, Composer, `/opsx:*`, `/loop`, subagents |
| **Claude Code** | Wayfinder, adversarial review, Project Factory workflows |
| **OpenSpec CLI** | Propose, validate, sync, archive |
| **Project Factory** | G0 init, gate scripts, CI, factory-lock |
| **CodeRabbit** | Fork PR review (mentor PR >150 files — review on fork) |
| **GitHub Actions** | CI + homework PR auto-sync |
| **MCP Context7** | Library docs |
| **MCP Vercel** | Deploy / logs |

---

### Roles: human vs agent

| **Serhii Rozum** (human) | **AI agent** |
| --- | --- |
| Product, MVP scope, domain (NACE, FOP, bilingual) | Code, specs, tests from OpenSpec |
| Architecture, slice order, video recording | UI, refactors, factory install |
| Final acceptance, course submission | Wayfinder, handoff, gate runs |

## (Optional) Code link

https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026

---

## Review log (fork PR #2)

**Checker:** separate Cursor chat · Bugbot + synthesis · **Approved** 2026-07-10.

| Severity | Finding | Resolution |
| --- | --- | --- |
| High | `yaml` missing from `package.json` | Added |
| High | Stale `invoice-calc.md` | Synced Wayfinder 06+07 |
| High | Stale `current-state.md` | Refreshed |
| Medium | Incomplete pdf gate deps | Fixed |
| Medium | FR-NACE-06 traceability | Dropped + cited in spec |

---

## Review log (adversarial — S2/S3)

| PR | Slice | Outcome |
| --- | --- | --- |
| [#6](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/6) | S2 storage | Hydration fix, IBAN mod-97, a11y |
| [#7](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/7) | S2 banking | Template contract, MissingIbanError |
| [#8](https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026/pull/8) | S3 render | FR-TPL-02, template:check, fonts |

---

### Checklist (course template)

- [x] Real name provided (**Serhii Rozum**)
- [x] Video demo link (1–2 min) — [Loom](https://www.loom.com/share/01ebc7b3403a4b7da8dc785ef2b8205b)
- [x] Agentic Engineering practices described (context, SDD, verification, maker≠checker, loop, Project Factory)
- [x] Working end-to-end result — MVP demo complete
- [x] OpenSpec SDD — 10 archived changes, capability gates
- [x] Vitest — 220 tests
- [x] Loop engineering — [4-tick log](docs/qa/loop-add-form-input.md)
- [x] Maker ≠ checker — adversarial reviews documented
- [x] Project Factory — installed at G0, CI + gate scripts working
- [x] S0–S4b capabilities shipped (shell → export preview)

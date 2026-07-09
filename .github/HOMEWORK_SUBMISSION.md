<!-- Draft body for fwdays homework PR #50 (mentor repo). -->
<!-- Update "Video demo" before marking the PR ready for review. -->

## Author

**Serhii Rozum**

## Project

**Invoice Maker 2026** — a web service for quickly creating **bilingual (Ukrainian + English) invoices** for Ukrainian sole entrepreneurs (FOP) who bill foreign clients in **USD** or **EUR**.

The user fills a form → the system picks a service description by **NACE 2.1-UA** code → calculates amounts and dates → generates HTML/PDF from `docs/invoice-template.html`. MVP data is stored in the browser (browser-first architecture).

**Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind v4, shadcn/ui, OpenSpec (SDD).

**Repository:** https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026

## Video demo (1–2 min)

Video: _to be added after recording_

## Agentic Engineering practices applied

Honest status for each course practice. Open **TODO** items will be completed before final submission.

---

### 1. Context engineering — ✅ applied

**Static context** (always in the repo; the agent reads before work):

| Artifact | Purpose |
| --- | --- |
| `AGENTS.md` | Agent constitution: Next.js 16 rules, WEG3D Fin design system, OpenSpec workflow |
| `CONTEXT.md` | Domain glossary (Invoice, Client, Snapshot, NACE, statuses) |
| `docs/requirements.md` | 40+ numbered FR/NFR with traceability |
| `Design.md` | WEG3D Fin UI rules |
| `docs/ARCHITECTURE.md`, `docs/adr/0002-browser-first-mvp.md` | Architecture and decisions |
| `openspec/specs/<capability>/spec.md` | 11 capability specs (authoritative behavior) |

**Dynamic context** (injected per task):

| Artifact | Purpose |
| --- | --- |
| `openspec/config.yaml` | Project context for OpenSpec CLI (domain, stack, paths, verification gates) |
| `/opsx:*` slash commands | Cursor / Claude / Windsurf — propose → apply → sync → archive |
| `.scratch/mvp-spec-coherence/map.md` | Cross-session decisions tracker |

**Human:** product vision, domain decisions (NACE 2.1-UA, browser-first, snapshot model).  
**Agent:** spec authoring, UI scaffold, refactors per `AGENTS.md`.

---

### 2. Specs first (SDD) — ✅ applied

- **OpenSpec** living specs in `openspec/specs/` (shell, invoice-calc, nace-catalog, document-render, export-share, …).
- Workflow: `/opsx:propose` → design + tasks + delta specs → `/opsx:apply` → `/opsx:sync` → `/opsx:archive`.
- Traceability chain: `FR-*` (requirements) → OpenSpec scenario → code in `src/lib/`.
- `openspec validate --strict` as part of verification gates.

**TODO before final submission:**

- [ ] Complete the first vertical slice (G4) through a full OpenSpec change (`openspec/changes/` → apply → sync → archive).
- [ ] Ensure every shipped feature has a matching scenario in spec, not only in README.

---

### 3. Verification — 🔄 partial (needs strengthening)

**Done:**

- Deterministic gates in `package.json`: `npm run typecheck`, `npm run lint`, `npm run build`.
- `GET /api/health` contract in `openspec/specs/shell/spec.md`.
- **CodeRabbit** enabled on the fork; reviews the homework PR (verified).
- ADRs and `.scratch/` issues document acceptance criteria.

**Not done yet (important for the course):**

- [ ] **Vitest** — referenced in `docs/requirements.md` (`TC-STACK-06`) and README, but **not installed** yet (`package.json` has no `vitest`).
- [ ] **Test-first for `src/lib/`** — red test from spec → green implementation (calc, NACE matcher, template vars).
- [ ] **`openspec validate --strict`** — add to CI or a pre-push hook.
- [ ] **Evals / smoke** — minimal flow: fill form → preview → PDF (manual checklist or Playwright).

---

### 4. Maker ≠ checker — 🔄 partial (needs formalization)

**Done:**

- Rule documented in README and engineering pipeline (G7 adversarial review).
- Cursor subagents: `code-reviewer`, `bugbot`, `ultracite-reviewer`.
- CodeRabbit as external checker on the PR.

**Not done yet:**

- [ ] **Systematic checker pass** after each slice: maker (Composer) implements → separate agent reviews the diff (different chat).
- [ ] **PR / change log note** — short entry: “reviewed by checker agent, findings: …”.
- [ ] Before final submission: address CodeRabbit feedback and iterate.

---

### 5. Loop engineering — ❌ not applied yet

Work is mostly **manual sessions** and `/opsx:*` slash commands, not an autonomous loop until tasks are green.

**TODO before final submission:**

- [ ] Run **Cursor loop** (`/loop` or loop skill) for one vertical slice: OpenSpec tasks → implement → verify → repeat.
- [ ] Or **CI-watcher / babysit** — agent waits on `npm run build` / lint and fixes errors in a loop.
- [ ] Document one concrete example in the PR: “slice X completed in N loop iterations without micromanagement”.

---

### 6. Project Factory — ⏭️ intentionally skipped (optional)

Full factory (`/project-factory:init`) was **not** run — MVP uses a lighter stack: OpenSpec + `AGENTS.md` + slash commands.

**TODO (optional):**

- [ ] Evaluate whether Project Factory adds value on top of the current OpenSpec workflow.
- [ ] If yes — run `/project-factory:init` and compare artifacts with the current structure.

---

### Tools and MCP

| Tool | Usage |
| --- | --- |
| **Cursor** | Primary Agentic IDE, Composer, `/opsx:*` slash commands |
| **OpenSpec CLI** | `@fission-ai/openspec` — propose, validate, sync |
| **CodeRabbit** | Automated homework PR review |
| **MCP Context7** | Up-to-date Next.js / React docs during implementation |
| **MCP Vercel** | Deploy and runtime logs (planned for PDF route) |

---

### Roles: human vs agent

| Serhii Rozum (human) | AI agent |
| --- | --- |
| Product, MVP priorities, domain (NACE, FOP, bilingual docs) | Code generation from specs |
| Architecture (browser-first, ADR-0002) | UI components, boilerplate, refactors |
| Final acceptance, video recording | Best-practice research, docs/spec fill-in |
| Direction and judgment | Iteration within given context |

## (Optional) Code link

https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026

---

### Checklist

- [x] Real name provided (Serhii Rozum)
- [ ] Video demo link added (1–2 min)
- [x] Agentic Engineering practices described (with honest TODOs)
- [ ] Working end-to-end result
- [ ] Loop engineering — at least one slice through an autonomous loop
- [ ] Vitest + test-first for `src/lib/`
- [ ] Maker ≠ checker — documented separate review pass

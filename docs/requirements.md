# PRD — Invoice Maker 2026

Last updated: 2026-07-10

This document lists **numbered requirements** for course traceability. Every
requirement has a stable ID and **exactly one owning capability**.

**Authoritative behavior** lives in `openspec/specs/<capability>/spec.md`
(`openspec validate --specs --strict`).

**Implementation order and gates** live in `openspec/capability-map.yaml`
(`npm run capability:check`).

Refer to [docs/product-brief.md](product-brief.md) for narrative context.
Refer to [docs/current-state.md](current-state.md) for agent session handoff (last work, blockers, next up).
Refer to [docs/research.md](research.md) for original discovery notes (Ukrainian, not translated).
Refer to [docs/ARCHITECTURE.md](ARCHITECTURE.md) and [ADR-0002](adr/0002-browser-first-mvp.md) for MVP architecture.
NACE codes per [docs/191_2025.pdf](191_2025.pdf) (NACE 2.1-UA, State Statistics Service order No. 191).

## ID conventions

| Prefix   | Meaning                      | Example                                      |
| -------- | ---------------------------- | -------------------------------------------- |
| `FR-*`   | Functional Requirement       | `FR-CHAT-01` — user starts invoice via chat    |
| `NFR-*`  | Non-Functional Requirement   | `NFR-PERF-01` — build < 60 s                 |
| `TC-*`   | Technical Constraint         | `TC-STACK-01` — Next.js 16 App Router        |
| `BC-*`   | Business / UX Constraint     | `BC-NACE-01` — NACE 2.1-UA only, not KVED    |

Status values: `proposed` · `accepted` · `shipped` · `dropped`.

---

## Implementation order (OpenSpec capabilities)

Work **slice by slice**. Inside a slice, capabilities with no mutual dependency
may run **in parallel**. Before starting any capability:

```bash
npm run capability:check -- --capability <id>
```

OpenSpec change naming convention: `add-<capability>` (e.g. `add-nace-catalog`).

```
S0  shell ─────────────────────────────────────────────► shipped?
         │
         ├──────────────────┬─────────────────────────────┐
         ▼                  ▼                             ▼
S1  nace-catalog      invoice-calc                    (parallel, no UI)
         │                  │
         ▼                  │
S2  supplier-profile ──► banking                        client-directory
         │                  │                             │
         └────────┬─────────┴─────────────┬───────────────┘
                  ▼                       │
S3           document-render ◄────────────┘
                  │
                  ▼
S4           form-input ──► export-share (preview: FR-EXPORT-01..03)
                  │
                  ▼
S5           invoice-registry
                  │
                  ▼
S6           export-share (pdf: FR-EXPORT-04..05) + invoice-edit
```

| Order | Slice | Capability | OpenSpec spec | Owner | Depends on | Gate status |
| ----- | ----- | ---------- | ------------- | ----- | ---------- | ----------- |
| 1 | S0 | `shell` | [shell/spec.md](../openspec/specs/shell/spec.md) | ui | — | in_progress |
| 2a | S1 | `nace-catalog` | [nace-catalog/spec.md](../openspec/specs/nace-catalog/spec.md) | domain | — | not_started |
| 2b | S1 | `invoice-calc` | [invoice-calc/spec.md](../openspec/specs/invoice-calc/spec.md) | domain | — | not_started |
| 3a | S2 | `supplier-profile` | [supplier-profile/spec.md](../openspec/specs/supplier-profile/spec.md) | ui | shell | not_started |
| 3b | S2 | `client-directory` | [client-directory/spec.md](../openspec/specs/client-directory/spec.md) | ui | shell | not_started |
| 3c | S2 | `banking` | [banking/spec.md](../openspec/specs/banking/spec.md) | domain | supplier-profile | not_started |
| 4 | S3 | `document-render` | [document-render/spec.md](../openspec/specs/document-render/spec.md) | domain | invoice-calc, banking, nace-catalog | not_started |
| 5a | S4 | `form-input` | [form-input/spec.md](../openspec/specs/form-input/spec.md) | ui | shell, supplier-profile, client-directory, nace-catalog, banking, document-render | not_started |
| 5b | S4 | `export-share` (preview) | [export-share/spec.md](../openspec/specs/export-share/spec.md) | ui | document-render, form-input | not_started |
| 6 | S5 | `invoice-registry` | [invoice-registry/spec.md](../openspec/specs/invoice-registry/spec.md) | ui | form-input, document-render, invoice-calc | not_started |
| 7a | S6 | `export-share` (pdf) | [export-share/spec.md](../openspec/specs/export-share/spec.md) | ui | preview gate | not_started |
| 7b | S6 | `invoice-edit` | [invoice-edit/spec.md](../openspec/specs/invoice-edit/spec.md) | ui | invoice-registry, form-input, invoice-calc | not_started |

**First demo milestone (S4):** structured form input → live HTML preview.

**Currently unblocked** (run `npm run capability:check`): `shell`, `nace-catalog`, `invoice-calc`.

---

## Capability requirements

Each subsection is one OpenSpec capability. Implement via `/opsx:propose add-<capability>` → `/opsx:apply`.

### 1. `shell` — App shell & navigation (S0)

| ID | Description | Status |
| --- | --- | --- |
| FR-SHELL-01 | App has a landing page and a dashboard area with navigation to invoice creation | accepted |
| FR-SHELL-02 | Layout adapts at 768 px breakpoint; invoice preview readable on mobile | proposed |
| FR-SHELL-03 | Health endpoint `GET /api/health` returns `{ status: "ok", service: "invoice-maker" }` | shipped |

| Related | ID | Owner |
| --- | --- | --- |
| NFR | NFR-PERF-01 (build < 60 s) | shell |
| NFR | NFR-DX-01 (lint + typecheck + build pass) | shell |
| NFR | NFR-I18N-01 (app UI strings in Ukrainian) | shell |
| TC | TC-STACK-01, TC-STACK-02 | shell |
| TC | TC-DEPLOY-01 (Vercel preview per PR) | shell |

---

### 2. `nace-catalog` — NACE 2.1-UA service catalog (S1)

> Replaces legacy KVED DK 009:2010. Official names from `docs/191_2025.pdf`.

| ID | Description | Status |
| --- | --- | --- |
| FR-NACE-01 | Catalog stores entries keyed by **NACE 2.1-UA** class code (format `XX.XX`), not legacy KVED labels | proposed |
| FR-NACE-02 | **74.12** — graphic & visual design: bilingual line-item text for logos, brand identity, brand book | proposed |
| FR-NACE-03 | **74.12 / 74.14** — 3D visualization: bilingual text for interactive 360° virtual-tour points | proposed |
| FR-NACE-04 | **59.12** — post-production: bilingual text for video editing, VFX, color correction | proposed |
| FR-NACE-05 | Keyword matcher maps user service text to the best NACE entry; falls back to clarifying question if ambiguous | proposed |
| FR-NACE-06 | Generated invoice displays NACE code alongside service description (audit trail for FOP activity type) | proposed |

| Related | ID | Owner |
| --- | --- | --- |
| BC | BC-NACE-01 (NACE 2.1-UA only; no KVED in new docs/UI) | nace-catalog |
| TC | TC-STACK-04 (typed catalog in `lib/`, framework-free) | nace-catalog |
| TC | TC-STACK-06 (Vitest for NACE matcher) | nace-catalog |

#### NACE catalog reference (MVP seed data)

| NACE 2.1-UA | Official name (from PDF, UA) | Invoice line EN | Invoice line UA |
| ----------- | --------------------------- | --------------- | --------------- |
| 74.12 | Діяльність із графічного та візуального дизайну | Graphic design services: development of logos, corporate identity, brand book and related graphic design services | Послуги графічного дизайну: розробка логотипів, фірмового стилю, брендбуку та інші послуги у сфері графічного дизайну |
| 74.12 | Діяльність із графічного та візуального дизайну | Graphic 3D design services (visualization): creation of an interactive 360° point for virtual tour | Послуги графічного 3Д дизайну (візуалізації): створення інтерактивної точки 360° для віртуального туру |
| 74.14 | Інша спеціалізована діяльність із дизайну | Specialized design services (3D / interactive visualization) as per agreed scope | Спеціалізовані послуги з дизайну (3D / інтерактивна візуалізація) згідно узгодженого обсягу |
| 59.12 | Компонування кіно- та відеофільмів, телевізійних програм | Video editing services: editing, special effects, color correction and related post-production | Послуги з відеомонтажу: редагування відеоматеріалів, створення спецефектів, кольорокорекція та інші послуги з обробки відео |

---

### 3. `invoice-calc` — Calculations & identifiers (S1)

| ID | Description | Status |
| --- | --- | --- |
| FR-CALC-01 | Invoice number format `DDMM/0YY` (day, month, fixed `0`, two-digit year) e.g. `0305/025` for 2025-05-03 | proposed |
| FR-CALC-02 | Invoice date rendered bilingually: EN `May 03, 2025` and UA `03.05.2025` | proposed |
| FR-CALC-03 | Unit price = total amount ÷ quantity; amounts formatted with 2 decimal places | proposed |
| FR-CALC-04 | Prepayment amount = total × prepayment%; balance = total − prepayment | proposed |
| FR-CALC-05 | Payment deadline and execution term accept days, weeks, or explicit date; compute deadline dates | proposed |
| FR-CALC-06 | Payment purpose: `Payment by the invoice №{number} from {date_en}` | proposed |

| Related | ID | Owner |
| --- | --- | --- |
| TC | TC-STACK-06 (Vitest for calculations) | invoice-calc |

---

### 4. `supplier-profile` — Supplier (ФОП) directory (S2)

| ID | Description | Status |
| --- | --- | --- |
| FR-BANK-02 | Supplier profile holds: name (EN/UA), address (EN/UA), tax ID, bank name, SWIFT, both IBANs | proposed |

| Related | ID | Owner |
| --- | --- | --- |
| NFR | NFR-SEC-01 (tax ID / IBAN never in client bundle) | supplier-profile |
| TC | TC-DATA-01 (browser storage; partial — shared with registry & clients) | supplier-profile |

OpenSpec scenarios: CRUD, multiple profiles, dropdown prefill, no committed secrets.

---

### 5. `client-directory` — Client directory (S2)

No numbered `FR-*` IDs. Behavior defined in OpenSpec spec.

| Related | ID | Owner |
| --- | --- | --- |
| TC | TC-DATA-01 (browser storage; partial) | client-directory |

OpenSpec scenarios: client CRUD, form prefill only, issued snapshots unchanged.

---

### 6. `banking` — Currency & IBAN selection (S2)

| ID | Description | Status |
| --- | --- | --- |
| FR-BANK-01 | Currency `USD` selects USD IBAN from supplier profile; `EUR` selects EUR IBAN | proposed |
| FR-BANK-03 | IBAN, bank name, SWIFT displayed in invoice SUPPLIER section per template placeholders | proposed |

---

### 7. `document-render` — Template rendering (S3)

> Formerly grouped as `template-render` in early drafts; OpenSpec id is `document-render`.

| ID | Description | Status |
| --- | --- | --- |
| FR-TPL-01 | Render from `docs/invoice-template.html` by replacing `{{VARIABLE_NAME}}` placeholders | proposed |
| FR-TPL-02 | Fixed elements unchanged: title `INVOICE / РАХУНОК`, subtitle `Graphic Design Service`, TERMS block, signature block | proposed |
| FR-TPL-03 | `{{SERVICE_ROWS}}` expands to table rows with bilingual description, quantity, unit price, line amount | proposed |
| FR-TPL-04 | Optional `{{PROJECT_BLOCK}}` rendered when project name provided; omitted otherwise | proposed |
| FR-TPL-05 | Output is self-contained HTML with embedded CSS; A4 print styles preserved | proposed |

| Related | ID | Owner |
| --- | --- | --- |
| BC | BC-LEGAL-01 (TERMS block immutable in output) | document-render |
| BC | BC-I18N-01 (bilingual document fields) | document-render |
| BC | BC-BRAND-01 (template CSS is document identity) | document-render |
| NFR | NFR-PERF-02 (template fill < 200 ms) | document-render |
| TC | TC-STACK-03 (template source of truth path) | document-render |
| TC | TC-STACK-06 (Vitest for template vars) | document-render |

---

### 8. `form-input` — Structured invoice input (S4)

> Replaces chat/LLM input (`invoice-chat`) — deferred to Future.

| ID | Description | Status |
| --- | --- | --- |
| FR-INPUT-01 | Accept **full structured** input (client, address, contacts, currency, service, qty, amount, terms) | proposed |
| FR-INPUT-02 | Accept **short format** with keys: `client`, `addr`, `email`, `phone`, `web`, `curr`, `service`, `qty`, `amount`, `prepay`, `pay_days`, `exec_days` | proposed |
| FR-INPUT-04 | Validate email, phone, numeric amounts, currency (USD \| EUR only in MVP), prepayment % (0–100) | proposed |

| Related | ID | Owner |
| --- | --- | --- |
| BC | BC-UX-01 (invalid input → explain + show example) | form-input |
| NFR | NFR-A11Y-01 (accessible labels; keyboard preview) | form-input |
| NFR | NFR-OBS-01 (no console errors on happy path) | form-input |
| TC | TC-STACK-05 (Zod schemas, shared client + server) | form-input |

---

### 9. `export-share` — Preview, export & share (S4 preview → S6 pdf)

| ID | Description | Status | Gate |
| --- | --- | --- | --- |
| FR-EXPORT-01 | User sees HTML preview of generated invoice in browser | proposed | preview (S4) |
| FR-EXPORT-02 | User can download invoice as `.html` file | proposed | preview (S4) |
| FR-EXPORT-03 | User can trigger browser print (A4) from preview | proposed | preview (S4) |
| FR-EXPORT-04 | User can download a PDF rendered by stateless `POST /api/pdf` (byte-identical to preview content) | proposed | pdf (S6) |
| FR-EXPORT-05 | User can share the PDF via download or Web Share API where supported | proposed | pdf (S6) |

| Related | ID | Owner | Gate |
| --- | --- | --- | --- |
| TC | TC-PDF-01 (stateless PDF route; no server retention) | export-share | pdf (S6) |

---

### 10. `invoice-registry` — Invoice register & statuses (S5)

| ID | Description | Status |
| --- | --- | --- |
| TC-DATA-01 | Invoice register, supplier profiles, and client directory in browser storage (localStorage / IndexedDB) | accepted |

OpenSpec scenarios (no separate `FR-*` IDs): stored statuses `draft` \| `sent` \| `paid` \| `cancelled`; derived `overdue` display only; issued invoice snapshot immutability.

---

### 11. `invoice-edit` — Edit & duplicate (S6)

| ID | Description | Status |
| --- | --- | --- |
| FR-EDIT-01 | User can edit existing invoice by number; dependent fields recalculated (edit phrases per `docs/research.md`) | proposed |
| FR-EDIT-02 | User can duplicate invoice with new number/date, same client/service data (phrases per `docs/research.md`) | proposed |

---

## Deferred — `invoice-chat` (Future, not MVP)

| ID | Description | Status |
| --- | --- | --- |
| FR-CHAT-01 | User can start invoice creation via natural-language triggers or a UI button | dropped |
| FR-CHAT-02 | When required fields are missing, system asks targeted follow-up questions | dropped |
| FR-CHAT-03 | System supports interaction styles: detailed, concise, technical | dropped |
| FR-CHAT-04 | Help command lists available formats and field names | dropped |
| FR-INPUT-03 | Accept **informal** single-sentence requests and extract entities | dropped |

---

## Cross-cutting constraints (reference)

| ID | Description | Primary capability | Status |
| --- | --- | --- | --- |
| BC-LEGAL-02 | UI shows disclaimer: not legal advice; user responsible for compliance | shell | proposed |
| BC-DEMO-01 | Repo + live demo are course deliverables; core flow demonstrable in 1–2 min video | export-share (preview) | accepted |
| BC-LANG-01 | Project documentation in English; `docs/research.md` and `docs/191_2025.pdf` keep original language | — (docs policy) | accepted |

---

## Out of scope (MVP)

- User accounts, organizations, multi-tenant RLS, Supabase, Drizzle (see ADR-0002)
- Payment recording as a ledger entity (`paid` is a manual user label only)
- Email delivery to client or hosted public invoice URLs
- Chat / LLM natural-language input (`FR-CHAT-*`, `FR-INPUT-03`)
- Full NACE 2.1-UA taxonomy (651 classes) — MVP seeds creative-services subset only
- E-invoicing / tax authority integration
- Mobile native app
- AI model training or custom LLM hosting (agent uses IDE; app is a deterministic generator)

---

## OpenSpec workflow (per capability)

1. `npm run capability:check -- --capability <id>` — confirm unblocked
2. `/opsx:propose add-<id>` — proposal, design, tasks, delta specs
3. `/opsx:apply` — implement tasks
4. Set `status: shipped` for `<id>` in `openspec/capability-map.yaml`
5. `/opsx:sync` → `/opsx:archive`

Full requirement-to-capability map: `requirement_owners` in `openspec/capability-map.yaml`.

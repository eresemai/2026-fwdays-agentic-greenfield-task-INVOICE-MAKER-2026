# PRD — Invoice Maker 2026

Last updated: 2026-07-09

This document lists **numbered requirements** for course traceability. Every
requirement has a stable ID. **Authoritative behavior** lives in
`openspec/specs/<capability>/spec.md` (run `openspec validate --strict`).

Refer to [docs/product-brief.md](product-brief.md) for narrative context.
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

## Functional requirements

### Shell & navigation (capability `shell`)

| ID           | Description                                                                                              | Status   |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------- |
| FR-SHELL-01  | App has a landing page and a dashboard area with navigation to invoice creation                          | accepted |
| FR-SHELL-02  | Layout adapts at 768 px breakpoint; invoice preview readable on mobile                                   | proposed |
| FR-SHELL-03  | Health endpoint `GET /api/health` returns `{ status: "ok", service: "invoice-maker" }`                     | shipped  |

### Form input (capability `form-input`)

> Replaces chat/LLM input (`invoice-chat`, `input-parser`) — deferred to Future.

| ID           | Description                                                                                              | Status   |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------- |
| FR-INPUT-01  | Accept **full structured** input (client, address, contacts, currency, service, qty, amount, terms)      | proposed |
| FR-INPUT-02  | Accept **short format** with keys: `client`, `addr`, `email`, `phone`, `web`, `curr`, `service`, `qty`, `amount`, `prepay`, `pay_days`, `exec_days` | proposed |
| FR-INPUT-04  | Validate email, phone, numeric amounts, currency (USD \| EUR only in MVP), prepayment % (0–100)            | proposed |

### Chat & LLM input (capability `invoice-chat`) — Future

| ID          | Description                                                                                              | Status   |
| ----------- | -------------------------------------------------------------------------------------------------------- | -------- |
| FR-CHAT-01  | User can start invoice creation via natural-language triggers or a UI button                             | dropped  |
| FR-CHAT-02  | When required fields are missing, system asks targeted follow-up questions                                 | dropped  |
| FR-CHAT-03  | System supports interaction styles: detailed, concise, technical                                           | dropped  |
| FR-CHAT-04  | Help command lists available formats and field names                                                     | dropped  |
| FR-INPUT-03 | Accept **informal** single-sentence requests and extract entities                                          | dropped  |

### NACE 2.1-UA service catalog (capability `nace-catalog`)

> Replaces legacy KVED DK 009:2010 references. Official names from `docs/191_2025.pdf`.

| ID           | Description                                                                                              | Status   |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------- |
| FR-NACE-01   | Catalog stores entries keyed by **NACE 2.1-UA** class code (format `XX.XX`), not legacy KVED labels      | proposed |
| FR-NACE-02   | **74.12** — graphic & visual design: bilingual line-item text for logos, brand identity, brand book      | proposed |
| FR-NACE-03   | **74.12 / 74.14** — 3D visualization: bilingual text for interactive 360° virtual-tour points          | proposed |
| FR-NACE-04   | **59.12** — post-production: bilingual text for video editing, VFX, color correction                      | proposed |
| FR-NACE-05   | Keyword matcher maps user service text to the best NACE entry; falls back to clarifying question if ambiguous | proposed |
| FR-NACE-06   | Generated invoice displays NACE code alongside service description (audit trail for FOP activity type)   | proposed |

#### NACE catalog reference (MVP seed data)

Official UA names are quoted from `docs/191_2025.pdf`. Invoice line text is bilingual product output.

| NACE 2.1-UA | Official name (from PDF, UA) | Invoice line EN | Invoice line UA |
| ----------- | --------------------------- | --------------- | --------------- |
| 74.12 | Діяльність із графічного та візуального дизайну | Graphic design services: development of logos, corporate identity, brand book and related graphic design services | Послуги графічного дизайну: розробка логотипів, фірмового стилю, брендбуку та інші послуги у сфері графічного дизайну |
| 74.12 | Діяльність із графічного та візуального дизайну | Graphic 3D design services (visualization): creation of an interactive 360° point for virtual tour | Послуги графічного 3Д дизайну (візуалізації): створення інтерактивної точки 360° для віртуального туру |
| 74.14 | Інша спеціалізована діяльність із дизайну | Specialized design services (3D / interactive visualization) as per agreed scope | Спеціалізовані послуги з дизайну (3D / інтерактивна візуалізація) згідно узгодженого обсягу |
| 59.12 | Компонування кіно- та відеофільмів, телевізійних програм | Video editing services: editing, special effects, color correction and related post-production | Послуги з відеомонтажу: редагування відеоматеріалів, створення спецефектів, кольорокорекція та інші послуги з обробки відео |

### Calculations & identifiers (capability `invoice-calc`)

| ID           | Description                                                                                              | Status   |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------- |
| FR-CALC-01   | Invoice number format `DDMM/0YY` (day, month, fixed `0`, two-digit year) e.g. `0305/025` for 2025-05-03  | proposed |
| FR-CALC-02   | Invoice date rendered bilingually: EN `May 03, 2025` and UA `03.05.2025`                                 | proposed |
| FR-CALC-03   | Unit price = total amount ÷ quantity; amounts formatted with 2 decimal places                          | proposed |
| FR-CALC-04   | Prepayment amount = total × prepayment%; balance = total − prepayment                                    | proposed |
| FR-CALC-05   | Payment deadline and execution term accept days, weeks, or explicit date; compute deadline dates         | proposed |
| FR-CALC-06   | Payment purpose: `Payment by the invoice №{number} from {date_en}`                                       | proposed |

### Banking & currency (capability `banking`)

| ID           | Description                                                                                              | Status   |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------- |
| FR-BANK-01   | Currency `USD` selects USD IBAN from supplier profile; `EUR` selects EUR IBAN                           | proposed |
| FR-BANK-02   | Supplier profile holds: name (EN/UA), address (EN/UA), tax ID, bank name, SWIFT, both IBANs              | proposed |
| FR-BANK-03   | IBAN, bank name, SWIFT displayed in invoice SUPPLIER section per template placeholders                    | proposed |

### Template rendering (capability `template-render`)

| ID           | Description                                                                                              | Status   |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------- |
| FR-TPL-01    | Render from `docs/invoice-template.html` by replacing `{{VARIABLE_NAME}}` placeholders                   | proposed |
| FR-TPL-02    | Fixed elements unchanged: title `INVOICE / РАХУНОК`, subtitle `Graphic Design Service`, TERMS block, signature block | proposed |
| FR-TPL-03    | `{{SERVICE_ROWS}}` expands to table rows with bilingual description, quantity, unit price, line amount   | proposed |
| FR-TPL-04    | Optional `{{PROJECT_BLOCK}}` rendered when project name provided; omitted otherwise                        | proposed |
| FR-TPL-05    | Output is self-contained HTML with embedded CSS; A4 print styles preserved                                 | proposed |

### Preview & export (capability `export-share`)

| ID            | Description                                                                                             | Status   |
| ------------- | ------------------------------------------------------------------------------------------------------- | -------- |
| FR-EXPORT-01  | User sees HTML preview of generated invoice in browser                                                  | proposed |
| FR-EXPORT-02  | User can download invoice as `.html` file                                                               | proposed |
| FR-EXPORT-03  | User can trigger browser print (A4) from preview                                                        | proposed |
| FR-EXPORT-04  | User can download a PDF rendered by stateless `POST /api/pdf` (byte-identical to preview content)       | proposed |
| FR-EXPORT-05  | User can share the PDF via download or Web Share API where supported                                    | proposed |

### Edit & duplicate (capability `invoice-edit`)

| ID           | Description                                                                                              | Status   |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------- |
| FR-EDIT-01   | User can edit existing invoice by number; dependent fields recalculated (edit phrases per `docs/research.md`) | proposed |
| FR-EDIT-02   | User can duplicate invoice with new number/date, same client/service data (phrases per `docs/research.md`) | proposed |

## Non-functional requirements

| ID           | Description                                                                                              | Status   |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------- |
| NFR-PERF-01  | `npm run build` (typecheck + next build) completes in < 60 s on clean checkout                          | accepted |
| NFR-PERF-02  | Invoice HTML generation (template fill) < 200 ms for single invoice on server                             | proposed |
| NFR-A11Y-01  | Chat/form inputs have accessible labels; preview usable with keyboard                                     | proposed |
| NFR-I18N-01  | App UI strings in Ukrainian; generated invoice body bilingual EN+UA per template                       | accepted |
| NFR-SEC-01   | Supplier tax ID and IBAN never hardcoded in client bundle; user data in browser storage only            | accepted |
| NFR-DX-01    | `npm run lint && npm run typecheck && npm run build` all pass on main branch                              | accepted |
| NFR-OBS-01   | No console errors on happy-path invoice creation in browser                                              | proposed |

## Technical constraints

| ID           | Description                                                                                              | Status   |
| ------------ | -------------------------------------------------------------------------------------------------------- | -------- |
| TC-STACK-01  | Next.js 16 App Router; TypeScript strict; React 19                                                         | accepted |
| TC-STACK-02  | Tailwind CSS 4; shadcn/ui components                                                                     | accepted |
| TC-STACK-03  | Invoice template source of truth: `docs/invoice-template.html`                                           | accepted |
| TC-STACK-04  | NACE catalog as typed data in `lib/` (framework-free pure module)                                        | proposed |
| TC-STACK-05  | Zod schemas for invoice input validation (shared client + server)                                        | proposed |
| TC-STACK-06  | Vitest unit tests for `lib/` (calculations, NACE matcher, template vars)                                 | proposed |
| TC-DEPLOY-01 | Vercel hosting; preview URL per PR                                                                       | proposed |
| TC-DATA-01   | Invoice register, supplier profiles, and client directory in browser storage (localStorage / IndexedDB) | accepted |
| TC-PDF-01    | PDF generated server-side via headless Chromium from `docs/invoice-template.html`; route stores no data  | proposed |

## Business / UX constraints

| ID            | Description                                                                                            | Status   |
| ------------- | ------------------------------------------------------------------------------------------------------ | -------- |
| BC-NACE-01    | Use **NACE 2.1-UA** (State Statistics Service order No. 191, 2025) only; do not reference obsolete KVED DK 009:2010 in new docs/UI | accepted |
| BC-I18N-01    | Invoice document fields are bilingual (EN primary line + UA secondary) per template                    | accepted |
| BC-LEGAL-01   | TERMS AND CONDITIONS section (items 1–8) is immutable in generated output                              | accepted |
| BC-LEGAL-02   | UI shows disclaimer: not legal advice; user responsible for compliance                                 | proposed |
| BC-UX-01      | Invalid input → explain problem + show correct format example; no silent failure                       | proposed |
| BC-BRAND-01   | Invoice visual identity follows template CSS (Inter, brand colors); UI may diverge in dashboard          | accepted |
| BC-DEMO-01    | Repo + live demo are course deliverables; core flow demonstrable in 1–2 min video                      | accepted |
| BC-LANG-01    | Project documentation in English; source artifacts `docs/research.md` and `docs/191_2025.pdf` keep original language | accepted |

## Out of scope (MVP)

- User accounts, organizations, multi-tenant RLS, Supabase, Drizzle (see ADR-0002)
- Payment recording as a ledger entity (`paid` is a manual user label only)
- Email delivery to client or hosted public invoice URLs
- Chat / LLM natural-language input (`FR-CHAT-*`, `FR-INPUT-03`)
- Full NACE 2.1-UA taxonomy (651 classes) — MVP seeds creative-services subset only
- E-invoicing / tax authority integration
- Mobile native app
- AI model training or custom LLM hosting (agent uses IDE; app is a deterministic generator)

## Traceability notes (course)

| Capability (slice)   | Requirement IDs                          | Next gate |
| -------------------- | ---------------------------------------- | --------- |
| `shell`              | FR-SHELL-01..03                          | G4        |
| `form-input`         | FR-INPUT-01..02, FR-INPUT-04             | G4        |
| `nace-catalog`       | FR-NACE-01..06, BC-NACE-01               | G4        |
| `invoice-calc`       | FR-CALC-01..06                           | G4        |
| `banking`            | FR-BANK-01..03                           | G4        |
| `document-render`    | FR-TPL-01..05, BC-LEGAL-01               | G4        |
| `export-share`       | FR-EXPORT-01..05, TC-PDF-01              | G4        |
| `invoice-registry`   | (status + snapshot — see openspec spec)  | G4        |
| `supplier-profile`   | FR-BANK-02 (partial)                     | G4        |
| `client-directory`   | (see openspec spec)                      | G4        |
| `invoice-edit`       | FR-EDIT-01..02                           | G4        |

Recommended **first vertical slice**: `nace-catalog` + `invoice-calc` + `document-render` + `form-input` → structured input to HTML preview (PDF in slice 2).

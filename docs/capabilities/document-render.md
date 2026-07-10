# Capability: `document-render`

[← Capability map](../capability.md) · **Depends on:** [invoice-calc](invoice-calc.md), [banking](banking.md), [nace-catalog](nace-catalog.md) · **Unblocks:** [form-input](form-input.md), [export-share](export-share.md), [invoice-registry](invoice-registry.md)

| Field | Value |
| --- | --- |
| Slice | S3 — Render pipeline |
| Order | #4 |
| Owner | domain |
| Gate status | **shipped** (2026-07-10, `feat/document-render`) |
| OpenSpec spec | [document-render/spec.md](../../openspec/specs/document-render/spec.md) |
| OpenSpec change | `add-document-render` (archive after PR merge) |

## Purpose

Fill `docs/invoice-template.html` with computed variables → self-contained
bilingual HTML. Source of truth for both browser preview and PDF route.

## Requirements

| ID | Description | Status |
| --- | --- | --- |
| FR-TPL-01 | Replace `{{VARIABLE_NAME}}` placeholders; escape text, fail closed | shipped |
| FR-TPL-02 | Fixed title, subtitle, TERMS, signature unchanged | shipped |
| FR-TPL-03 | `{{SERVICE_ROWS}}` bilingual table rows | shipped |
| FR-TPL-04 | Optional `{{PROJECT_BLOCK}}` | shipped |
| FR-TPL-05 | Self-contained HTML + A4 print CSS | shipped |
| BC-LEGAL-01 | TERMS block immutable | accepted |
| NFR-PERF-02 | Single render < 200 ms | shipped |

Also: BC-I18N-01, BC-BRAND-01, TC-STACK-03, TC-STACK-06

## Implementation scope

| Area | Path |
| --- | --- |
| Template source | `docs/invoice-template.html` (read-only; single source of truth) |
| Generated constant | `src/lib/render/template.ts` via `npm run template:sync` (drift test) |
| Render engine | `src/lib/render/fill-template.ts` (escape-by-default, single pass) |
| Fragment builders | `src/lib/render/service-rows.ts` (`buildServiceRows`, `buildProjectBlock`) |
| Composition | `src/lib/render/render-invoice.ts` (`renderInvoice`) |
| Tests | 32 Vitest cases across the three modules |

## Verification

- [x] All template placeholders have values or intentional empty
- [x] SERVICE_ROWS match line items from calc (`unit price × quantity`)
- [x] TERMS section byte-identical to template
- [x] Render < 200 ms for single invoice (NFR-PERF-02)
- [x] Output opens standalone in browser (embedded CSS, A4 `@page`)
- [x] Hostile values escaped — no markup injection through invoice data

## Done when

- Template fill from `docs/invoice-template.html`
- Self-contained HTML with embedded CSS
- SERVICE_ROWS and optional PROJECT_BLOCK expansion

## Known gap

The template's `@import url('https://fonts.googleapis.com/…')` is the sole
external reference. It resolves in the browser preview but will **not** load in
offline headless Chromium — fold font embedding into wayfinder ticket 05 before
the S6 pdf gate (cyrillic glyph coverage depends on it).

## After shipping

Unlocks **S4** — form + preview can wire to this pipeline.

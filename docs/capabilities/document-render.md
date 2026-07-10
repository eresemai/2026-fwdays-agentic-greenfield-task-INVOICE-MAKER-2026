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
| FR-TPL-05 | Self-contained HTML + A4 print CSS | **accepted** (CSS embedded; remote font `@import` unmet — see Known gap) |
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
- [ ] **No external network dependency** — one remote font `@import` remains (Known gap)
- [x] Hostile values escaped — no markup injection through invoice data

## Done when

- Template fill from `docs/invoice-template.html`
- Self-contained HTML with embedded CSS
- SERVICE_ROWS and optional PROJECT_BLOCK expansion

## Known gap — FR-TPL-05 not fully met

The template's `@import url('https://fonts.googleapis.com/…')` is the sole
external reference. FR-TPL-05 permits no network dependency "beyond bundled
fonts", and Google Fonts is **remote, not bundled** — so the requirement is
unmet *today*, in the browser preview, not merely in offline PDF. Consequences:

1. every rendered invoice issues a third-party request from a document holding
   client and supplier PII (request metadata leaks to Google);
2. offline headless Chromium (S6 PDF) will silently fall back, breaking cyrillic
   glyph coverage.

`render-invoice.test.ts` pins the external-URL count at exactly **1** so the gap
cannot grow silently; it does not certify compliance. FR-TPL-05 is therefore
tracked as `accepted`, not `shipped`.

**Decision needed** (wayfinder ticket 05): self-host/inline Inter as a base64
`@font-face`, or drop the `@import` and accept a system-font fallback
(BC-BRAND-01 impact). Both touch `docs/invoice-template.html` and belong to a
separate change.

## After shipping

Unlocks **S4** — form + preview can wire to this pipeline.

# Capability: `document-render`

[← Capability map](../capability.md) · **Depends on:** [invoice-calc](invoice-calc.md), [banking](banking.md), [nace-catalog](nace-catalog.md) · **Unblocks:** [form-input](form-input.md), [export-share](export-share.md), [invoice-registry](invoice-registry.md)

| Field | Value |
| --- | --- |
| Slice | S3 — Render pipeline |
| Order | #4 |
| Owner | domain |
| Gate status | not_started |
| OpenSpec spec | [document-render/spec.md](../../openspec/specs/document-render/spec.md) |
| OpenSpec change | `add-document-render` |

## Purpose

Fill `docs/invoice-template.html` with computed variables → self-contained
bilingual HTML. Source of truth for both browser preview and PDF route.

## Requirements

| ID | Description | Status |
| --- | --- | --- |
| FR-TPL-01 | Replace `{{VARIABLE_NAME}}` placeholders | proposed |
| FR-TPL-02 | Fixed title, subtitle, TERMS, signature unchanged | proposed |
| FR-TPL-03 | `{{SERVICE_ROWS}}` bilingual table rows | proposed |
| FR-TPL-04 | Optional `{{PROJECT_BLOCK}}` | proposed |
| FR-TPL-05 | Self-contained HTML + A4 print CSS | proposed |
| BC-LEGAL-01 | TERMS block immutable | accepted |

Also: BC-I18N-01, BC-BRAND-01, NFR-PERF-02, TC-STACK-03, TC-STACK-06

## Implementation scope

| Area | Planned path |
| --- | --- |
| Template source | `docs/invoice-template.html` (read-only at runtime) |
| Render engine | `src/lib/render/fill-template.ts` |
| Row builder | `src/lib/render/service-rows.ts` |
| Tests | golden HTML snapshot or var assertions |

## Verification

- [ ] All template placeholders have values or intentional empty
- [ ] SERVICE_ROWS match line items from nace + calc
- [ ] TERMS section byte-identical to template
- [ ] Render < 200 ms for single invoice (NFR-PERF-02)
- [ ] Output opens standalone in browser (embedded CSS)

## Done when

- Template fill from `docs/invoice-template.html`
- Self-contained HTML with embedded CSS
- SERVICE_ROWS and optional PROJECT_BLOCK expansion

## After shipping

Unlocks **S4** — form + preview can wire to this pipeline.

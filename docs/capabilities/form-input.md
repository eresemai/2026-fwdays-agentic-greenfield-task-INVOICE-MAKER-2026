# Capability: `form-input`

[← Capability map](../capability.md) · **Depends on:** [shell](shell.md), [supplier-profile](supplier-profile.md), [client-directory](client-directory.md), [nace-catalog](nace-catalog.md), [banking](banking.md), [document-render](document-render.md) · **Unblocks:** [export-share](export-share.md), [invoice-registry](invoice-registry.md)

| Field | Value |
| --- | --- |
| Slice | S4 — Create flow |
| Order | #5a |
| Owner | ui |
| Gate status | not_started |
| OpenSpec spec | [form-input/spec.md](../../openspec/specs/form-input/spec.md) |
| OpenSpec change | `add-form-input` |

## Purpose

Structured invoice creation form with validation, directory prefills, NACE service
selection, and live preview via document-render. Replaces deferred chat/LLM input.

## Requirements

| ID | Description | Status |
| --- | --- | --- |
| FR-INPUT-01 | Full structured input (client, address, contacts, currency, service, qty, amount, terms) | proposed |
| FR-INPUT-02 | Short key-value format (paste / power-user) | proposed |
| FR-INPUT-04 | Validate email, phone, amounts, USD\|EUR, prepay 0–100% | proposed |
| BC-UX-01 | Explain error + show correct example | proposed |

Also: NFR-A11Y-01, NFR-OBS-01, TC-STACK-05 (Zod)

## Implementation scope

| Area | Planned path |
| --- | --- |
| Page | `src/app/(dashboard)/invoices/new/page.tsx` |
| Form | `src/components/invoices/invoice-form.tsx` |
| Schema | `src/lib/validation/invoice-input.ts` (Zod) |
| Preview wire | form state → document-render → preview panel |
| Short format | parser for FR-INPUT-02 key list |

## Verification

- [ ] All required fields validated with accessible labels
- [ ] Invalid input shows example format (BC-UX-01)
- [ ] Client/supplier dropdowns prefill fields
- [ ] Service text resolves via nace-catalog matcher
- [ ] Preview updates on valid state (no console errors)
- [ ] Keyboard can reach preview area (NFR-A11Y-01)

## Done when

- Structured and short-format input paths
- Zod validation with accessible error messages
- Live preview wired to document-render

## After shipping

Unlocks **export-share** preview and **invoice-registry**.

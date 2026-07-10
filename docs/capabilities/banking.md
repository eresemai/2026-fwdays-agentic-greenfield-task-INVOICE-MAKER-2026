# Capability: `banking`

[← Capability map](../capability.md) · **Depends on:** [supplier-profile](supplier-profile.md) ✅ · **Unblocks:** [document-render](document-render.md), [form-input](form-input.md)

| Field | Value |
| --- | --- |
| Slice | S2 — Directories |
| Order | #3c (next up — supplier-profile shipped in PR #5) |
| Owner | domain |
| Gate status | not_started (unblocked 2026-07-10 — dependency satisfied) |
| OpenSpec spec | [banking/spec.md](../../openspec/specs/banking/spec.md) |
| OpenSpec change | `add-banking` |

## Purpose

Map currency selection (USD | EUR) to the correct IBAN from the active supplier
profile. Expose supplier block variables for document-render.

## Requirements

| ID | Description | Status |
| --- | --- | --- |
| FR-BANK-01 | USD → USD IBAN; EUR → EUR IBAN | proposed |
| FR-BANK-03 | IBAN, bank name, SWIFT on invoice SUPPLIER block | proposed |

## Implementation scope

| Area | Planned path |
| --- | --- |
| Selection logic | `src/lib/banking/select-iban.ts` |
| Document vars | supplier block payload for render pipeline |
| Form | currency field ties to active supplier profile |

## Verification

- [ ] USD invoice uses USD IBAN from selected profile
- [ ] Switch EUR → EUR IBAN updates preview vars
- [ ] Missing IBAN for currency → clear validation error (BC-UX-01)

## Done when

- Currency selects correct IBAN from active supplier profile
- Supplier block variables available to document-render

## After shipping

Required for **document-render** (supplier section on invoice).

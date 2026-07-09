# Capability: `invoice-calc`

[← Capability map](../capability.md) · **Depends on:** — · **Unblocks:** [document-render](document-render.md), [invoice-registry](invoice-registry.md), [invoice-edit](invoice-edit.md)

| Field | Value |
| --- | --- |
| Slice | S1 — Domain core |
| Order | #2b (parallel with nace-catalog) |
| Owner | domain |
| Gate status | not_started |
| OpenSpec spec | [invoice-calc/spec.md](../../openspec/specs/invoice-calc/spec.md) |
| OpenSpec change | `add-invoice-calc` |

## Purpose

Pure functions: invoice numbering, bilingual dates, money amounts, prepayment,
deadlines, payment purpose string. Framework-free — testable without Next.js.

> Open decision: integer cents + unit×qty→total (see `.scratch/mvp-spec-coherence/issues/06-money-model-and-rounding.md`).

## Requirements

| ID | Description | Status |
| --- | --- | --- |
| FR-CALC-01 | Number format `DDMM/0YY` | proposed |
| FR-CALC-02 | Date EN + UA formats | proposed |
| FR-CALC-03 | Unit price, 2 decimal places | proposed |
| FR-CALC-04 | Prepayment % and balance | proposed |
| FR-CALC-05 | Deadline / execution term (days, weeks, date) | proposed |
| FR-CALC-06 | Payment purpose string | proposed |

## Implementation scope

| Area | Planned path |
| --- | --- |
| Numbering | `src/lib/invoice/number.ts` |
| Dates | `src/lib/invoice/dates.ts` |
| Money | `src/lib/invoice/money.ts` |
| Terms | `src/lib/invoice/terms.ts` |
| Tests | `src/lib/invoice/*.test.ts` |

## Verification

- [ ] Number examples match FR-CALC-01
- [ ] Bilingual date pairs match FR-CALC-02
- [ ] unit × qty reconciles with line total (no inverted divide bugs)
- [ ] Vitest edge cases: zero qty, 100% prepay, timezone (Europe/Kyiv TBD)

## Done when

- Pure functions for numbering, dates, amounts, deadlines
- Integer-cents money model
- Vitest coverage for calc edge cases

## After shipping

Required by **document-render**, **invoice-registry**, **invoice-edit**.

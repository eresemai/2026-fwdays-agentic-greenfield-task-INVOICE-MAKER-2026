# Capability: `nace-catalog`

[← Capability map](../capability.md) · **Depends on:** — · **Unblocks:** [document-render](document-render.md), [form-input](form-input.md)

| Field | Value |
| --- | --- |
| Slice | S1 — Domain core |
| Order | #2a (parallel with invoice-calc) |
| Owner | domain |
| Gate status | not_started |
| OpenSpec spec | [nace-catalog/spec.md](../../openspec/specs/nace-catalog/spec.md) |
| OpenSpec change | `add-nace-catalog` |

## Purpose

Typed NACE 2.1-UA seed catalog and keyword matcher for service line text.
Pure `src/lib/` module — no React, no storage. Replaces legacy KVED.

## Requirements

| ID | Description | Status |
| --- | --- | --- |
| FR-NACE-01 | Entries keyed by NACE 2.1-UA class code (`XX.XX`) | proposed |
| FR-NACE-02 | 74.12 graphic design bilingual lines | proposed |
| FR-NACE-03 | 74.12 / 74.14 3D visualization lines | proposed |
| FR-NACE-04 | 59.12 post-production lines | proposed |
| FR-NACE-05 | Keyword matcher + clarifying question on ambiguity | proposed |
| FR-NACE-06 | NACE code on generated invoice (audit trail) | proposed |
| BC-NACE-01 | No KVED DK 009:2010 in new docs/UI | accepted |

Seed data reference: `docs/191_2025.pdf`, table in [requirements.md](../requirements.md).

## Implementation scope

| Area | Planned path |
| --- | --- |
| Catalog data | `src/lib/nace/catalog.ts` |
| Matcher | `src/lib/nace/match.ts` |
| Types | `src/lib/nace/types.ts` |
| Tests | `src/lib/nace/*.test.ts` (TC-STACK-06) |

## Verification

- [ ] Matcher returns best entry for known keywords
- [ ] Ambiguous input triggers clarifying path (not silent wrong pick)
- [ ] Vitest passes for all seed entries
- [ ] No KVED strings in catalog or UI copy

## Done when

- Typed seed catalog in `src/lib/nace/`
- Keyword matcher with clarifying fallback
- Vitest coverage for matcher

## After shipping

Unlocks **document-render** (service row text) and **form-input** (service picker).

# Capability: `supplier-profile`

[← Capability map](../capability.md) · **Depends on:** [shell](shell.md) · **Unblocks:** [banking](banking.md), [form-input](form-input.md)

| Field | Value |
| --- | --- |
| Slice | S2 — Directories |
| Order | #3a |
| Owner | ui |
| Gate status | not_started |
| OpenSpec spec | [supplier-profile/spec.md](../../openspec/specs/supplier-profile/spec.md) |
| OpenSpec change | `add-supplier-profile` |

## Purpose

Browser-side ФОП (supplier) directory: CRUD, dropdown on invoice form and settings.
Multiple profiles without authentication — not multi-tenancy.

## Requirements

| ID | Description | Status |
| --- | --- | --- |
| FR-BANK-02 | Name/address EN+UA, tax ID, bank, SWIFT, USD+EUR IBANs | proposed |
| NFR-SEC-01 | No real tax ID/IBAN in client bundle | accepted |

OpenSpec scenarios: save/edit/delete; switch profile; empty install has no secrets.

## Implementation scope

| Area | Planned path |
| --- | --- |
| Types | `src/types/supplier.ts` |
| Storage | `src/lib/storage/supplier-profiles.ts` |
| Settings UI | `src/app/(dashboard)/settings/page.tsx` |
| Components | supplier form, profile dropdown |

## Verification

- [ ] Create profile → appears in dropdown
- [ ] Reload browser → data persists (localStorage/IndexedDB)
- [ ] `grep` built bundle: no hardcoded IBAN/tax IDs
- [ ] Demo seed data clearly fake if shipped in repo

## Done when

- CRUD in browser storage
- Settings UI with profile dropdown
- No tax ID or IBAN in client bundle defaults

## After shipping

Unlocks **banking** (must ship before document-render).

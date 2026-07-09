# Capability: `client-directory`

[← Capability map](../capability.md) · **Depends on:** [shell](shell.md) · **Unblocks:** [form-input](form-input.md)

| Field | Value |
| --- | --- |
| Slice | S2 — Directories |
| Order | #3b (parallel with supplier-profile) |
| Owner | ui |
| Gate status | not_started |
| OpenSpec spec | [client-directory/spec.md](../../openspec/specs/client-directory/spec.md) |
| OpenSpec change | `add-client-directory` |

## Purpose

Browser-side client directory. Prefills invoice form only — does not define
content of already-issued invoice snapshots.

## Requirements

No numbered `FR-*` IDs. See OpenSpec spec scenarios.

| Related | ID |
| --- | --- |
| TC | TC-DATA-01 (browser storage) |

## Implementation scope

| Area | Planned path |
| --- | --- |
| Types | `src/types/client.ts` (exists — extend) |
| Storage | `src/lib/storage/clients.ts` |
| UI | `src/app/(dashboard)/clients/page.tsx` |
| Form integration | client picker on invoice form (with form-input) |

## Verification

- [ ] CRUD clients in UI
- [ ] Select client on new invoice → fields prefilled
- [ ] Edit client after issue → old invoice snapshot unchanged

## Done when

- CRUD for clients in browser storage
- Client picker prefills invoice form only

## After shipping

Contributes to **form-input** gate (with supplier-profile, banking, etc.).

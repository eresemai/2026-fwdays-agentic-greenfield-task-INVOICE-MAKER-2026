# Tasks: add-invoice-registry

> Storage/logic slice — touches only `src/lib/storage/`, `src/lib/validation/`,
> `src/types/`. No UI files.

## 1. Preflight

- [x] 1.1 `npm run capability:check -- --capability invoice-registry` — unblocked

## 2. Tests first (red)

- [x] 2.1 Wrote `src/lib/storage/invoice-register.test.ts` from the spec BEFORE implementation: status persistence (FR-REG-01), overdue derivation + never-stored (FR-REG-02), snapshot immutability (FR-REG-03), persistence round-trip + corrupt-store fallback (TC-DATA-01). Each block `@trace`-annotated.
- [x] 2.2 Ran the test — RED for the right reason: `Failed to resolve import "@/lib/storage/invoice-register"` (module did not exist), not a syntax error.

## 3. Implement (green)

- [x] 3.1 `src/types/invoice-record.ts`: `InvoiceStatus`, `INVOICE_STATUSES`, `InvoiceSnapshot`, `InvoiceRecord`, `InvoiceRecordInput`.
- [x] 3.2 Validation is INLINE in the storage module (hand-written type guards), NOT a separate zod schema as design D2 first sketched. **Deviation, on purpose:** the neighboring storage modules `clients.ts` / `supplier-profiles.ts` validate with hand-written guards, and consistency with the surrounding code (AGENTS.md) beats introducing zod into the storage layer for one module.
- [x] 3.3 `src/lib/storage/invoice-register.ts`: versioned store, CRUD, `setInvoiceStatus`, `deriveOverdue`, clone-on-save + clone-on-read (D1/D3), SSR + corrupt-store guards.
- [x] 3.4 Ran the test — GREEN, 12/12, no assertion weakened.

## 4. Validation battery

- [x] 4.1 `lint` (0 errors; 3 pre-existing warnings elsewhere), `test:run` 232 pass, `typecheck` ok, `build` — green
- [x] 4.2 `npx openspec validate add-invoice-registry --strict` — valid
- [x] 4.3 `node scripts/check-traceability.mjs` — FR-REG-01/02/03 + TC-DATA-01 all traced. **Corrected:** this was first ticked prematurely while `check-traceability` still FAILED with 3 plan-ownership errors (FR-REG-01/02/03 absent from `docs/mvp-capability-plan.md`). The review-gate caught the false tick (a `done-claims-need-evidence` violation by the maker). Fixed by adding the S5 FR block to the plan; the gate now exits 0.

## 5. Review + archive

- [x] 5.1 Ran the `review-gate` workflow (fresh agents; maker ≠ checker). 11 confirmed findings. Fixed: storage rewritten to mirror `clients.ts` (write-before-cache ordering, `readStore()`-fresh per op to prevent cross-tab lost updates, reference-stable `listInvoices` + `getInvoicesServerSnapshot`, `createId` crypto fallback, `isIsoDate` calendar check via `Date.parse`); added a partial-drop corrupt-record test; added the FR-REG plan block; reconciled proposal/design to the inline-validation decision. `review-findings.json` persisted (generatedBy: review-gate). Re-review after fixes: pending.
- [ ] 5.2 `npx openspec archive add-invoice-registry --yes`; `check-traceability` + `check-trajectory` green for the slice.
- [ ] 5.3 Commit with `Slice: add-invoice-registry` + `Refs: FR-REG-01, FR-REG-02, FR-REG-03, TC-DATA-01`, touching `src/lib/`.

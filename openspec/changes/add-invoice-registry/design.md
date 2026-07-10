# Design: add-invoice-registry

## D1 — Storage module (`src/lib/storage/invoice-register.ts`)

Mirror the established browser-storage pattern (`clients.ts`):

- Versioned key `invoice-maker:invoices:v1`.
- In-memory cache + `subscribe`/`getServerSnapshot` for React `useSyncExternalStore`.
- SSR guard (`typeof window`), try/catch around `localStorage`, corrupt-JSON
  fallback to an empty store (drop invalid records, keep valid ones).
- `InvoiceStorageError`, `InvoiceValidationError`, `InvoiceNotFoundError`.
- Public API: `listInvoices`, `getInvoice`, `saveInvoice(input)`,
  `setInvoiceStatus(id, status)`, `deleteInvoice(id)`,
  `__resetInvoiceCacheForTests`.

## D2 — Record shape (FR-REG-03 immutability)

```ts
type InvoiceStatus = "draft" | "sent" | "paid" | "cancelled";

interface InvoiceSnapshot {          // everything printed on the document
  supplier: Record<string, string>;  // name/address/IBAN/... captured at issue
  customer: Record<string, string>;
  serviceRows: ReadonlyArray<Record<string, string | number>>;
  totals: Record<string, number>;
  termsText: { en: string; ua: string };
}

interface InvoiceRecord {
  id: string;
  invoiceNumber: string;             // assigned by invoice-calc numbering
  status: InvoiceStatus;
  issueDateIso: string;              // YYYY-MM-DD
  paymentDeadlineIso: string;        // computed at issue (invoice-calc)
  snapshot: InvoiceSnapshot;
  createdAt: string;
  updatedAt: string;
}
```

**Immutability (FR-REG-03):** `saveInvoice` deep-clones the incoming snapshot
(`structuredClone`) before storing, and `getInvoice`/`listInvoices` return
clones. So a caller mutating the source object it passed in — e.g. after editing
a supplier IBAN in the directory — cannot reach into a stored snapshot. The
snapshot is a value captured at issue time, not a live reference.

## D3 — Derived overdue (FR-REG-02, display-only)

```ts
function deriveOverdue(record: InvoiceRecord, todayIso: string): boolean {
  return record.status === "sent" && record.paymentDeadlineIso < todayIso;
}
```

ISO `YYYY-MM-DD` strings compare lexicographically = chronologically, so no Date
math and no timezone hazard. `overdue` is **never** a field on `InvoiceRecord` —
a test asserts the stored/serialized record has no `overdue` key.

## D4 — Status transitions (FR-REG-01)

`setInvoiceStatus` accepts any of the four statuses (manual, no workflow
enforcement per spec — the user sets them). It updates `updatedAt` and persists.
No email side effect on `sent`.

## Risks

- `structuredClone` is available in the Node/browser targets used (Node 22, modern
  browsers). A test exercises the clone-on-save path directly.
- The snapshot type is intentionally structural (`Record<string,…>`) to avoid
  coupling the store to the render layer's evolving types; the render layer maps
  into it at issue time in a later UI slice.

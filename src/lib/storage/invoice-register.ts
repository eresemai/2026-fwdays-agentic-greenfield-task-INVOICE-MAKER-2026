import {
  INVOICE_STATUSES,
  type InvoiceRecord,
  type InvoiceRecordInput,
  type InvoiceSnapshot,
  type InvoiceStatus,
} from "@/types/invoice-record";

export const INVOICE_REGISTER_STORAGE_KEY = "invoice-maker:invoices:v1";

type InvoiceStore = {
  version: 1;
  invoices: InvoiceRecord[];
};

type Listener = () => void;

const listeners = new Set<Listener>();

function notifyListeners(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeInvoices(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export class InvoiceValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvoiceValidationError";
  }
}

export class InvoiceStorageError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "InvoiceStorageError";
  }
}

export class InvoiceNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvoiceNotFoundError";
  }
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isStatus(value: unknown): value is InvoiceStatus {
  return (
    typeof value === "string" &&
    (INVOICE_STATUSES as readonly string[]).includes(value)
  );
}

function isSnapshot(value: unknown): value is InvoiceSnapshot {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const s = value as Record<string, unknown>;
  return (
    typeof s.supplier === "object" &&
    s.supplier !== null &&
    typeof s.customer === "object" &&
    s.customer !== null &&
    Array.isArray(s.serviceRows) &&
    typeof s.totals === "object" &&
    s.totals !== null &&
    typeof s.termsText === "object" &&
    s.termsText !== null
  );
}

function isValidRecord(value: unknown): value is InvoiceRecord {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    isNonEmptyString(record.id) &&
    isNonEmptyString(record.invoiceNumber) &&
    isStatus(record.status) &&
    isIsoDate(record.issueDateIso) &&
    isIsoDate(record.paymentDeadlineIso) &&
    isSnapshot(record.snapshot) &&
    isNonEmptyString(record.createdAt) &&
    isNonEmptyString(record.updatedAt)
  );
}

function clone<T>(value: T): T {
  return structuredClone(value);
}

function readStore(): InvoiceStore {
  if (!isBrowser()) {
    return { version: 1, invoices: [] };
  }
  try {
    const raw = window.localStorage.getItem(INVOICE_REGISTER_STORAGE_KEY);
    if (!raw) {
      return { version: 1, invoices: [] };
    }
    const parsed = JSON.parse(raw) as {
      version?: unknown;
      invoices?: unknown;
    } | null;
    if (
      parsed === null ||
      typeof parsed !== "object" ||
      parsed.version !== 1 ||
      !Array.isArray(parsed.invoices)
    ) {
      return { version: 1, invoices: [] };
    }
    // Drop corrupt records instead of crashing on render.
    return { version: 1, invoices: parsed.invoices.filter(isValidRecord) };
  } catch {
    return { version: 1, invoices: [] };
  }
}

function writeStore(store: InvoiceStore): void {
  if (!isBrowser()) {
    return;
  }
  try {
    window.localStorage.setItem(
      INVOICE_REGISTER_STORAGE_KEY,
      JSON.stringify(store)
    );
  } catch (error) {
    throw new InvoiceStorageError(
      "Failed to persist the invoice register to browser storage.",
      { cause: error }
    );
  }
}

let cache: InvoiceStore | null = null;

function getStore(): InvoiceStore {
  if (cache === null) {
    cache = readStore();
  }
  return cache;
}

function commit(store: InvoiceStore): void {
  cache = store;
  writeStore(store);
  notifyListeners();
}

function nowIso(): string {
  return new Date().toISOString();
}

function newId(): string {
  return globalThis.crypto.randomUUID();
}

function validateInput(input: InvoiceRecordInput): void {
  if (!isNonEmptyString(input.invoiceNumber)) {
    throw new InvoiceValidationError("Invoice number is required.");
  }
  if (!isStatus(input.status)) {
    throw new InvoiceValidationError(
      `Status must be one of ${INVOICE_STATUSES.join(", ")}.`
    );
  }
  if (!isIsoDate(input.issueDateIso)) {
    throw new InvoiceValidationError("Issue date must be an ISO date (YYYY-MM-DD).");
  }
  if (!isIsoDate(input.paymentDeadlineIso)) {
    throw new InvoiceValidationError(
      "Payment deadline must be an ISO date (YYYY-MM-DD)."
    );
  }
  if (!isSnapshot(input.snapshot)) {
    throw new InvoiceValidationError("A full invoice snapshot is required.");
  }
}

export function listInvoices(): readonly InvoiceRecord[] {
  // Sorted newest-first by updatedAt, mirroring the clients register.
  return getStore()
    .invoices.map(clone)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function getInvoice(id: string): InvoiceRecord | null {
  const found = getStore().invoices.find((invoice) => invoice.id === id);
  return found ? clone(found) : null;
}

export function saveInvoice(input: InvoiceRecordInput): InvoiceRecord {
  validateInput(input);
  const store = getStore();
  const timestamp = nowIso();
  const existingIndex = input.id
    ? store.invoices.findIndex((invoice) => invoice.id === input.id)
    : -1;

  if (input.id && existingIndex === -1) {
    throw new InvoiceNotFoundError(
      `Cannot update invoice ${input.id}: not found in the register.`
    );
  }

  // FR-REG-03: freeze a value copy of the snapshot so a later directory edit to
  // the caller's source object can never reach into the stored record.
  const snapshot = clone(input.snapshot);

  if (existingIndex >= 0) {
    const previous = store.invoices[existingIndex];
    const updated: InvoiceRecord = {
      ...previous,
      invoiceNumber: input.invoiceNumber,
      status: input.status,
      issueDateIso: input.issueDateIso,
      paymentDeadlineIso: input.paymentDeadlineIso,
      snapshot,
      updatedAt: timestamp,
    };
    const invoices = [...store.invoices];
    invoices[existingIndex] = updated;
    commit({ version: 1, invoices });
    return clone(updated);
  }

  const created: InvoiceRecord = {
    id: input.id ?? newId(),
    invoiceNumber: input.invoiceNumber,
    status: input.status,
    issueDateIso: input.issueDateIso,
    paymentDeadlineIso: input.paymentDeadlineIso,
    snapshot,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  commit({ version: 1, invoices: [...store.invoices, created] });
  return clone(created);
}

export function setInvoiceStatus(
  id: string,
  status: InvoiceStatus
): InvoiceRecord {
  if (!isStatus(status)) {
    throw new InvoiceValidationError(
      `Status must be one of ${INVOICE_STATUSES.join(", ")}.`
    );
  }
  const store = getStore();
  const index = store.invoices.findIndex((invoice) => invoice.id === id);
  if (index === -1) {
    throw new InvoiceNotFoundError(
      `Cannot set status on invoice ${id}: not found in the register.`
    );
  }
  const updated: InvoiceRecord = {
    ...store.invoices[index],
    status,
    updatedAt: nowIso(),
  };
  const invoices = [...store.invoices];
  invoices[index] = updated;
  commit({ version: 1, invoices });
  return clone(updated);
}

export function deleteInvoice(id: string): boolean {
  const store = getStore();
  const invoices = store.invoices.filter((invoice) => invoice.id !== id);
  if (invoices.length === store.invoices.length) {
    return false;
  }
  commit({ version: 1, invoices });
  return true;
}

/**
 * FR-REG-02: `overdue` is derived for display and never stored. ISO
 * `YYYY-MM-DD` strings compare lexicographically = chronologically, so this
 * needs no Date math and carries no timezone hazard.
 */
export function deriveOverdue(record: InvoiceRecord, todayIso: string): boolean {
  return record.status === "sent" && record.paymentDeadlineIso < todayIso;
}

export function __resetInvoiceCacheForTests(): void {
  cache = null;
}

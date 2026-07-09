/** Stored in browser; user-set manually */
export type StoredInvoiceStatus = "draft" | "sent" | "paid" | "cancelled";

/** Includes derived overdue for UI display only */
export type InvoiceDisplayStatus = StoredInvoiceStatus | "overdue";

export interface LineItem {
  id: string;
  descriptionEn: string;
  descriptionUa: string;
  quantity: number;
  unitPrice: number;
}

export interface Invoice {
  id: string;
  clientId: string;
  number: string;
  status: StoredInvoiceStatus;
  issueDate: string;
  dueDate: string;
  currency: "USD" | "EUR";
  lineItems: LineItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export function calculateLineTotal(item: LineItem): number {
  return item.quantity * item.unitPrice;
}

export function calculateInvoiceSubtotal(lineItems: LineItem[]): number {
  return lineItems.reduce((sum, item) => sum + calculateLineTotal(item), 0);
}

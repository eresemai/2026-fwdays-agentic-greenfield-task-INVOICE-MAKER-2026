export type InvoiceStatus =
  | "draft"
  | "sent"
  | "paid"
  | "overdue"
  | "void";

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number;
}

export interface Invoice {
  id: string;
  organizationId: string;
  clientId: string;
  number: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  currency: string;
  lineItems: LineItem[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export function calculateInvoiceTotal(lineItems: LineItem[]): {
  subtotal: number;
  tax: number;
  total: number;
} {
  const subtotal = lineItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0,
  );
  const tax = lineItems.reduce(
    (sum, item) =>
      sum + item.quantity * item.unitPrice * (item.taxRate / 100),
    0,
  );

  return {
    subtotal,
    tax,
    total: subtotal + tax,
  };
}

import type { InvoiceStatus } from "@/types/invoice";

/** WEG3D Fin design system — shared constants and mappings */

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  paid: "Paid",
  overdue: "Overdue",
  void: "Void",
};

export const INVOICE_STATUS_BADGE_VARIANT: Record<
  InvoiceStatus,
  "draft" | "sent" | "paid" | "overdue" | "destructive"
> = {
  draft: "draft",
  sent: "sent",
  paid: "paid",
  overdue: "overdue",
  void: "destructive",
};

export const INVOICE_STATUS_DOT_COLOR: Record<InvoiceStatus, string> = {
  draft: "bg-wf-text-3",
  sent: "bg-wf-accent",
  paid: "bg-wf-success",
  overdue: "bg-wf-danger",
  void: "bg-wf-danger",
};

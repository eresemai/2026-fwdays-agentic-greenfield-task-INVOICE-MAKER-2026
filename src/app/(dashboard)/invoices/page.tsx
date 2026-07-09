import Link from "next/link";
import { Button } from "@/components/ui/button";
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="wf-display">Invoices</h1>
          <p className="mt-1 text-wf-text-2">
            Create, send, and track invoices.
          </p>
        </div>
        <Button render={<Link href="/invoices/new" />}>New invoice</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="wf-label">Status preview:</span>
        <InvoiceStatusBadge status="draft" />
        <InvoiceStatusBadge status="sent" />
        <InvoiceStatusBadge status="paid" />
        <InvoiceStatusBadge status="overdue" />
      </div>
      <p className="text-[13px] text-wf-text-2">
        Invoice list will appear here after database integration.
      </p>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground">
            Create, send, and track invoices.
          </p>
        </div>
        <Button render={<Link href="/invoices/new" />}>New invoice</Button>
      </div>
      <p className="text-sm text-muted-foreground">
        Invoice list will appear here after database integration.
      </p>
    </div>
  );
}

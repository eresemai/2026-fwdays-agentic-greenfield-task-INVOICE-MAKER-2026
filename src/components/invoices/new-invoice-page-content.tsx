"use client";

import Link from "next/link";
import { useCallback, useState, useSyncExternalStore } from "react";

import {
  InvoiceForm,
  type InvoicePreviewState,
} from "@/components/invoices/invoice-form";
import { InvoicePreviewPanel } from "@/components/invoices/invoice-preview-panel";
import { Button } from "@/components/ui/button";
import {
  getActiveProfile,
  subscribeSupplierProfiles,
} from "@/lib/storage/supplier-profiles";
import {
  getClientsServerSnapshot,
  listClients,
  subscribeClients,
} from "@/lib/storage/clients";

const EMPTY_PREVIEW: InvoicePreviewState = {
  html: null,
  error: null,
  isPending: false,
};

export function NewInvoicePageContent() {
  const supplier = useSyncExternalStore(
    subscribeSupplierProfiles,
    getActiveProfile,
    () => null
  );
  const clients = useSyncExternalStore(
    subscribeClients,
    listClients,
    getClientsServerSnapshot
  );

  const [preview, setPreview] = useState<InvoicePreviewState>(EMPTY_PREVIEW);

  const handlePreviewChange = useCallback((state: InvoicePreviewState) => {
    setPreview(state);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="wf-display">Новий рахунок</h1>
        <p className="mt-1 text-wf-text-2">
          Заповніть форму або вставте короткий формат — попередній перегляд
          оновиться автоматично.
        </p>
      </div>

      {!supplier ? (
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-wf-text-1">
            Щоб створити рахунок, спочатку додайте профіль постачальника з
            банківськими реквізитами.
          </p>
          <Button
            nativeButton={false}
            render={<Link href="/settings" />}
            className="mt-3"
          >
            Перейти до налаштувань
          </Button>
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="min-w-0">
          <InvoiceForm
            supplier={supplier}
            clients={clients}
            onPreviewChange={handlePreviewChange}
          />
        </div>

        <div className="min-w-0 space-y-3">
          {preview.error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive" role="alert">
              {preview.error}
              {preview.error.includes("IBAN") ? (
                <>
                  {" "}
                  <Link href="/settings" className="underline underline-offset-2">
                    Налаштування → профіль постачальника
                  </Link>
                </>
              ) : null}
            </p>
          ) : null}
          <InvoicePreviewPanel html={preview.html} isPending={preview.isPending} />
        </div>
      </div>
    </div>
  );
}

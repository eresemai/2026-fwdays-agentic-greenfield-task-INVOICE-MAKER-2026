import { renderInvoicePdf } from "@/lib/pdf/render-pdf";
import type { PdfInvoicePayload } from "@/lib/pdf/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isPdfServiceLine(value: unknown): value is PdfInvoicePayload["services"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }
  const line = value as Record<string, unknown>;
  return (
    typeof line.descriptionEn === "string" &&
    typeof line.descriptionUa === "string" &&
    typeof line.quantity === "number" &&
    Number.isInteger(line.quantity) &&
    line.quantity >= 0 &&
    typeof line.unitPriceCents === "number" &&
    typeof line.lineAmountCents === "number"
  );
}

function isPdfInvoicePayload(value: unknown): value is PdfInvoicePayload {
  if (!value || typeof value !== "object") {
    return false;
  }
  const payload = value as Record<string, unknown>;
  const customer = payload.customer;
  const supplier = payload.supplier;
  const services = payload.services;

  if (!customer || typeof customer !== "object" || !supplier || typeof supplier !== "object") {
    return false;
  }
  if (!Array.isArray(services) || services.length === 0) {
    return false;
  }

  const customerRecord = customer as Record<string, unknown>;
  const supplierRecord = supplier as Record<string, unknown>;

  return (
    typeof payload.invoiceNumber === "string" &&
    typeof payload.issueDateIso === "string" &&
    typeof payload.placeEn === "string" &&
    typeof payload.placeUa === "string" &&
    (payload.currency === "USD" || payload.currency === "EUR") &&
    typeof customerRecord.name === "string" &&
    typeof customerRecord.addressLine1 === "string" &&
    typeof customerRecord.email === "string" &&
    typeof customerRecord.phone === "string" &&
    typeof customerRecord.website === "string" &&
    typeof supplierRecord.nameEn === "string" &&
    typeof supplierRecord.nameUa === "string" &&
    typeof supplierRecord.addressEn === "string" &&
    typeof supplierRecord.addressUa === "string" &&
    typeof supplierRecord.taxId === "string" &&
    typeof supplierRecord.iban === "string" &&
    typeof supplierRecord.bankName === "string" &&
    typeof supplierRecord.swift === "string" &&
    typeof supplierRecord.signatoryEn === "string" &&
    typeof supplierRecord.signatoryUa === "string" &&
    typeof payload.prepaymentPercent === "number" &&
    typeof payload.paymentTermDays === "number" &&
    typeof payload.executionTermWeeks === "number" &&
    services.every(isPdfServiceLine)
  );
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isPdfInvoicePayload(body)) {
    return Response.json({ error: "Invalid invoice payload" }, { status: 400 });
  }

  try {
    const pdf = await renderInvoicePdf(body);
    return new Response(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="invoice.pdf"',
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.json({ error: "PDF render failed" }, { status: 500 });
  }
}

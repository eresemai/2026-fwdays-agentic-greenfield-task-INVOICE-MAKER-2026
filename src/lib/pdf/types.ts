import type { Cents } from "@/lib/invoice-calc/money";

/** One bilingual service line for `{{SERVICE_ROWS}}` expansion. */
export interface PdfServiceLine {
  readonly descriptionEn: string;
  readonly descriptionUa: string;
  readonly quantity: number;
  readonly unitPriceCents: Cents;
  readonly lineAmountCents: Cents;
}

/** Invoice payload accepted by `POST /api/pdf` (prototype shape). */
export interface PdfInvoicePayload {
  readonly invoiceNumber: string;
  readonly issueDateIso: string;
  readonly placeEn: string;
  readonly placeUa: string;
  readonly currency: "USD" | "EUR";
  readonly customer: {
    readonly name: string;
    readonly addressLine1: string;
    readonly email: string;
    readonly phone: string;
    readonly website: string;
    readonly projectName?: string;
  };
  readonly supplier: {
    readonly nameEn: string;
    readonly nameUa: string;
    readonly addressEn: string;
    readonly addressUa: string;
    readonly taxId: string;
    readonly iban: string;
    readonly bankName: string;
    readonly swift: string;
    readonly signatoryEn: string;
    readonly signatoryUa: string;
  };
  readonly services: readonly PdfServiceLine[];
  readonly prepaymentPercent: number;
  readonly paymentTermDays: number;
  readonly executionTermWeeks: number;
  readonly invoiceSubtitle?: string;
}

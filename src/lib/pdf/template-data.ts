import {
  computeDeadline,
  renderDateEn,
  renderDateUa,
} from "@/lib/invoice-calc/dates";
import {
  formatAmount,
  invoiceTotal,
  prepaymentSplit,
} from "@/lib/invoice-calc/money";
import { paymentPurpose } from "@/lib/invoice-calc/purpose";
import { escapeHtml } from "@/lib/pdf/escape-html";
import type { PdfInvoicePayload } from "@/lib/pdf/types";

function renderServiceRows(services: PdfInvoicePayload["services"]): string {
  return services
    .map((line, index) => {
      const rowNumber = index + 1;
      return `<tr>
  <td>${rowNumber}</td>
  <td>
    <div class="info-value">${escapeHtml(line.descriptionEn)}</div>
    <div class="info-value-secondary">${escapeHtml(line.descriptionUa)}</div>
  </td>
  <td>${line.quantity}</td>
  <td>${formatAmount(line.unitPriceCents)}</td>
  <td>${formatAmount(line.lineAmountCents)}</td>
</tr>`;
    })
    .join("\n");
}

function renderProjectBlock(projectName: string | undefined): string {
  if (!projectName) {
    return "";
  }
  return `<div class="customer-detail">Project: ${escapeHtml(projectName)}</div>`;
}

function requireDeadline(iso: string, term: { days: number } | { weeks: number }): string {
  const result = computeDeadline(iso, term);
  if (typeof result !== "string") {
    throw new Error(result.reason);
  }
  return result;
}

/** Maps a structured invoice payload to template placeholder values. */
export function buildTemplateVariables(
  payload: PdfInvoicePayload
): Record<string, string> {
  const dateEn = renderDateEn(payload.issueDateIso);
  const dateUa = renderDateUa(payload.issueDateIso);
  const lineAmounts = payload.services.map((line) => line.lineAmountCents);
  const total = invoiceTotal(lineAmounts);
  const { prepayment, balance } = prepaymentSplit(total, payload.prepaymentPercent);
  const paymentDeadlineIso = requireDeadline(payload.issueDateIso, {
    days: payload.paymentTermDays,
  });
  const executionDeadlineIso = requireDeadline(payload.issueDateIso, {
    weeks: payload.executionTermWeeks,
  });
  const paymentDeadlineEn = renderDateEn(paymentDeadlineIso);
  const paymentDeadlineUa = renderDateUa(paymentDeadlineIso);
  const executionDeadlineEn = renderDateEn(executionDeadlineIso);
  const executionDeadlineUa = renderDateUa(executionDeadlineIso);

  return {
    INVOICE_NUMBER: payload.invoiceNumber,
    INVOICE_DATE_EN: dateEn,
    INVOICE_DATE_UA: dateUa,
    PLACE_EN: payload.placeEn,
    PLACE_UA: payload.placeUa,
    CUSTOMER_NAME: payload.customer.name,
    CUSTOMER_ADDRESS_1: payload.customer.addressLine1,
    CUSTOMER_EMAIL: payload.customer.email,
    CUSTOMER_PHONE: payload.customer.phone,
    CUSTOMER_WEBSITE: payload.customer.website,
    PROJECT_BLOCK: renderProjectBlock(payload.customer.projectName),
    SUPPLIER_NAME_EN: payload.supplier.nameEn,
    SUPPLIER_NAME_UA: payload.supplier.nameUa,
    SUPPLIER_ADDRESS_EN: payload.supplier.addressEn,
    SUPPLIER_ADDRESS_UA: payload.supplier.addressUa,
    SUPPLIER_TAX_ID: payload.supplier.taxId,
    SUPPLIER_IBAN: payload.supplier.iban,
    SUPPLIER_BANK: payload.supplier.bankName,
    SUPPLIER_SWIFT: payload.supplier.swift,
    SIGNATORY_EN: payload.supplier.signatoryEn,
    SIGNATORY_UA: payload.supplier.signatoryUa,
    CURRENCY: payload.currency,
    SERVICE_ROWS: renderServiceRows(payload.services),
    TOTAL_AMOUNT: formatAmount(total),
    PREPAYMENT_TEXT_EN: `Advance payment (${payload.prepaymentPercent}% of the total amount)`,
    PREPAYMENT_TEXT_UA: `Авансова оплата (${payload.prepaymentPercent}% від загальної суми)`,
    PAYMENT_DEADLINE_TEXT_EN: `Payment deadline: ${paymentDeadlineEn}`,
    PAYMENT_DEADLINE_TEXT_UA: `Термін оплати: ${paymentDeadlineUa}`,
    EXECUTION_TERM_TEXT_EN: `Execution term: until ${executionDeadlineEn}`,
    EXECUTION_TERM_TEXT_UA: `Термін виконання: до ${executionDeadlineUa}`,
    BALANCE_TEXT_EN: "Balance payment",
    BALANCE_TEXT_UA: "Доплата",
    PREPAYMENT_AMOUNT: formatAmount(prepayment),
    REMAINING_AMOUNT: formatAmount(balance),
    PAYMENT_DETAILS: paymentPurpose(payload.invoiceNumber, dateEn),
    INVOICE_SUBTITLE: payload.invoiceSubtitle ?? "Graphic Design Service",
  };
}

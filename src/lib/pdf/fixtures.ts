import { lineAmount, toCents } from "@/lib/invoice-calc/money";
import { naceCatalog } from "@/lib/nace/catalog";
import type { NaceEntry } from "@/lib/nace/types";
import type { PdfInvoicePayload } from "@/lib/pdf/types";

function requireNaceEntry(id: NaceEntry["id"]): NaceEntry {
  const entry = naceCatalog.find((candidate) => candidate.id === id);
  if (!entry) {
    throw new Error(`NACE entry ${id} is required for PDF fixtures`);
  }
  return entry;
}

const DEMO_SUPPLIER = {
  nameEn: "WEG3D Studio LLC",
  nameUa: "ТОВ «WEG3D Studio»",
  addressEn: "12 Design Street, Kyiv 01001, Ukraine",
  addressUa: "вул. Дизайнерська, 12, м. Київ, 01001, Україна",
  taxId: "1234567890",
  iban: "UA123456789012345678901234567",
  bankName: "JSC Universal Bank",
  swift: "UNJSUAUKXXX",
  signatoryEn: "Olena Kovalenko",
  signatoryUa: "Олена Коваленко",
} as const;

/**
 * VISIO LLC fixture from `docs/research.md` (clean division: 11 050 ÷ 17 = 650.00).
 * Wayfinder ticket 05 primary PDF fidelity check.
 */
export function visioUsdFixture(): PdfInvoicePayload {
  const nace = requireNaceEntry("visualization-3d-360");

  const unitPriceCents = toCents(65_000);
  const quantity = 17;

  return {
    invoiceNumber: "2026-001",
    issueDateIso: "2026-05-03",
    placeEn: "Kyiv, Ukraine",
    placeUa: "м. Київ, Україна",
    currency: "USD",
    customer: {
      name: "VISIO LLC",
      addressLine1: "Calgary, Alberta 3H9",
      email: "info@test.com",
      phone: "7477577949",
      website: "visio.com",
    },
    supplier: DEMO_SUPPLIER,
    services: [
      {
        descriptionEn: nace.lineTextEn,
        descriptionUa: nace.lineTextUa,
        quantity,
        unitPriceCents,
        lineAmountCents: lineAmount(unitPriceCents, quantity),
      },
    ],
    prepaymentPercent: 50,
    paymentTermDays: 3,
    executionTermWeeks: 5,
    invoiceSubtitle: "Graphic Design Service",
  };
}

/**
 * Ecivres-style fixture with non-clean unit price (275.00 ÷ 7 ≠ exact cents).
 * Exercises ticket 06 rounding visibility in PDF columns.
 */
export function ecivresUnevenEurFixture(): PdfInvoicePayload {
  const nace = requireNaceEntry("graphic-design");

  const unitPriceCents = toCents(3_929);
  const quantity = 7;

  return {
    invoiceNumber: "2026-002",
    issueDateIso: "2026-05-03",
    placeEn: "Kyiv, Ukraine",
    placeUa: "м. Київ, Україна",
    currency: "EUR",
    customer: {
      name: "Ecivres AG",
      addressLine1: "Zurich, Switzerland",
      email: "billing@ecivres.example",
      phone: "+41 44 000 00 00",
      website: "ecivres.example",
      projectName: "3D showroom concept",
    },
    supplier: DEMO_SUPPLIER,
    services: [
      {
        descriptionEn: nace.lineTextEn,
        descriptionUa: nace.lineTextUa,
        quantity,
        unitPriceCents,
        lineAmountCents: lineAmount(unitPriceCents, quantity),
      },
    ],
    prepaymentPercent: 50,
    paymentTermDays: 14,
    executionTermWeeks: 2,
    invoiceSubtitle: "Graphic Design Service",
  };
}

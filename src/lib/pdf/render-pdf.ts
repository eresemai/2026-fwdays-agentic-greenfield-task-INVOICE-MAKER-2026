import { launchBrowser } from "@/lib/pdf/chromium";
import { fillInvoiceTemplate } from "@/lib/pdf/fill-template";
import type { PdfInvoicePayload } from "@/lib/pdf/types";

const PDF_OPTIONS = {
  format: "A4" as const,
  printBackground: true,
  preferCSSPageSize: true,
};

/**
 * Renders invoice HTML to a PDF buffer via headless Chromium.
 * Waits for web fonts so Cyrillic glyphs and U+2116 load before print.
 */
export async function renderInvoicePdf(payload: PdfInvoicePayload): Promise<Buffer> {
  const html = fillInvoiceTemplate(payload);
  const browser = await launchBrowser();

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "load" });
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    const pdf = await page.pdf(PDF_OPTIONS);
    return Buffer.from(pdf);
  } finally {
    await browser.close();
  }
}

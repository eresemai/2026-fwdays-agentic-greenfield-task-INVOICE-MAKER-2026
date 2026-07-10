import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { ecivresUnevenEurFixture, visioUsdFixture } from "@/lib/pdf/fixtures";
import { renderInvoicePdf } from "@/lib/pdf/render-pdf";

const runSmoke = process.env.RUN_PDF_SMOKE === "1";
const outDir = path.join(process.cwd(), ".scratch/pdf-prototype");

describe.skipIf(!runSmoke)("renderInvoicePdf smoke", () => {
  it.each([
    { name: "visio-usd", payload: visioUsdFixture() },
    { name: "ecivres-uneven-eur", payload: ecivresUnevenEurFixture() },
  ])("writes $name.pdf", async ({ name, payload }) => {
    const pdf = await renderInvoicePdf(payload);

    expect(pdf.subarray(0, 4).toString("utf8")).toBe("%PDF");
    expect(pdf.byteLength).toBeGreaterThan(10_000);

    mkdirSync(outDir, { recursive: true });
    writeFileSync(path.join(outDir, `${name}.pdf`), pdf);
  }, 120_000);
});

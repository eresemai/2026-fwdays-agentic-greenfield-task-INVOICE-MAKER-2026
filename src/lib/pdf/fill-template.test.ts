import { describe, expect, it } from "vitest";
import { paymentPurpose } from "@/lib/invoice-calc/purpose";
import { ecivresUnevenEurFixture, visioUsdFixture } from "@/lib/pdf/fixtures";
import {
  fillInvoiceTemplate,
  findUnreplacedPlaceholders,
} from "@/lib/pdf/fill-template";

describe("fillInvoiceTemplate", () => {
  it("fills the VISIO fixture with no unreplaced placeholders", () => {
    const html = fillInvoiceTemplate(visioUsdFixture());

    expect(findUnreplacedPlaceholders(html)).toEqual([]);
    expect(html).toContain("VISIO LLC");
    expect(html).toContain("11,050.00");
    expect(html).toContain("650.00");
    expect(html).toContain("інтерактивної точки 360°");
    expect(html).toContain(paymentPurpose("2026-001", "May 03, 2026"));
    expect(html).toContain("TERMS AND CONDITIONS");
  });

  it("renders uneven EUR amounts for the Ecivres fixture", () => {
    const html = fillInvoiceTemplate(ecivresUnevenEurFixture());

    expect(findUnreplacedPlaceholders(html)).toEqual([]);
    expect(html).toContain("Ecivres AG");
    expect(html).toContain("39.29");
    expect(html).toContain("275.03");
  });

  it("omits PROJECT_BLOCK when no project name is provided", () => {
    const html = fillInvoiceTemplate(visioUsdFixture());

    expect(html).not.toContain("Project:");
    expect(html).not.toContain("{{PROJECT_BLOCK}}");
  });

  it("includes PROJECT_BLOCK when a project name is provided", () => {
    const html = fillInvoiceTemplate(ecivresUnevenEurFixture());

    expect(html).toContain("Project: 3D showroom concept");
  });
});

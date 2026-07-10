import { describe, expect, it } from "vitest";
import {
  nextInvoiceNumber,
  validateNumber,
} from "@/lib/invoice-calc/numbering";

describe("nextInvoiceNumber (FR-CALC-01)", () => {
  it("assigns 2026-001 for the first invoice of the year", () => {
    expect(nextInvoiceNumber([], 2026)).toBe("2026-001");
  });

  it("advances the sequence per supplier-year", () => {
    expect(nextInvoiceNumber(["2026-001"], 2026)).toBe("2026-002");
    expect(nextInvoiceNumber(["2026-001", "2026-002"], 2026)).toBe("2026-003");
  });

  it("restarts at 001 for a new year, keeping old years intact", () => {
    expect(nextInvoiceNumber(["2025-014", "2025-015"], 2026)).toBe("2026-001");
  });

  it("never reuses a cancelled number still present in the register", () => {
    // 2026-002 was cancelled; the record (and its number) stays in existing.
    const existing = ["2026-001", "2026-002"];
    expect(nextInvoiceNumber(existing, 2026)).toBe("2026-003");
  });

  it("fills no gaps: max sequence wins even after manual edits", () => {
    expect(nextInvoiceNumber(["2026-001", "2026-005"], 2026)).toBe("2026-006");
  });

  it("grows past 999 without truncation", () => {
    expect(nextInvoiceNumber(["2026-999"], 2026)).toBe("2026-1000");
    expect(nextInvoiceNumber(["2026-1000"], 2026)).toBe("2026-1001");
  });

  it("ignores foreign formats and other years in existing", () => {
    const existing = ["0305/025", "2025-044", "not-a-number", "2026-002"];
    expect(nextInvoiceNumber(existing, 2026)).toBe("2026-003");
  });

  it("rejects a non-four-digit year", () => {
    expect(() => nextInvoiceNumber([], 26)).toThrow(/four-digit/);
    expect(() => nextInvoiceNumber([], 2026.5)).toThrow(/four-digit/);
  });
});

describe("validateNumber (FR-CALC-01)", () => {
  it("accepts a canonical unused number", () => {
    expect(validateNumber("2026-007", ["2026-001"])).toEqual({ ok: true });
  });

  it("accepts a sequence past 999", () => {
    expect(validateNumber("2026-1000", [])).toEqual({ ok: true });
  });

  it("rejects a duplicate with the format example in the message", () => {
    const result = validateNumber("2026-001", ["2026-001", "2026-002"]);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.reason).toBe("duplicate");
      expect(result.message).toContain("2026-001");
      expect(result.message).toContain("2026-001");
    }
  });

  const malformed = [
    "0305/025",
    "2026-01",
    "2026-0001",
    "2026001",
    "26-001",
    "2026-",
    "",
    "invoice 2026-001",
  ];

  for (const candidate of malformed) {
    it(`rejects malformed "${candidate}" with reason and example`, () => {
      const result = validateNumber(candidate, []);
      expect(result.ok).toBe(false);
      if (!result.ok) {
        expect(result.reason).toBe("malformed");
        expect(result.message).toContain("2026-001");
      }
    });
  }
});

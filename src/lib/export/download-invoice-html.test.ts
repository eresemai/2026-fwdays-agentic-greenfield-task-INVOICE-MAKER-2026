import { afterEach, describe, expect, it, vi } from "vitest";

import {
  EmptyInvoiceHtmlError,
  buildInvoiceHtmlFilename,
  downloadInvoiceHtml,
  sanitizeInvoiceFilenameSegment,
} from "./download-invoice-html";

describe("sanitizeInvoiceFilenameSegment", () => {
  it("strips unsafe path characters", () => {
    expect(sanitizeInvoiceFilenameSegment("2026/001")).toBe("2026-001");
    expect(sanitizeInvoiceFilenameSegment("  PREVIEW  ")).toBe("PREVIEW");
  });

  it("falls back when segment is empty after sanitization", () => {
    expect(sanitizeInvoiceFilenameSegment("///")).toBe("invoice");
  });
});

describe("buildInvoiceHtmlFilename", () => {
  it("builds invoice-prefixed html filename", () => {
    expect(buildInvoiceHtmlFilename("PREVIEW")).toBe("invoice-PREVIEW.html");
    expect(buildInvoiceHtmlFilename("2026/001")).toBe("invoice-2026-001.html");
  });
});

describe("downloadInvoiceHtml", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("rejects empty html", () => {
    expect(() => downloadInvoiceHtml("   ", "PREVIEW")).toThrow(
      EmptyInvoiceHtmlError
    );
  });

  it("creates html blob and triggers download anchor", () => {
    const createObjectURL = vi.fn().mockReturnValue("blob:invoice");
    const revokeObjectURL = vi.fn();
    const click = vi.fn();
    const remove = vi.fn();
    const appendChild = vi.fn();

    const anchor = {
      href: "",
      download: "",
      rel: "",
      click,
      remove,
    };

    vi.stubGlobal("URL", {
      createObjectURL,
      revokeObjectURL,
    });

    vi.stubGlobal("document", {
      createElement: vi.fn((tag: string) => {
        if (tag === "a") {
          return anchor;
        }
        throw new Error(`Unexpected element: ${tag}`);
      }),
      body: {
        appendChild,
      },
    });

    downloadInvoiceHtml("<html><body>Invoice</body></html>", "PREVIEW");

    expect(createObjectURL).toHaveBeenCalledTimes(1);
    const blob = createObjectURL.mock.calls[0]?.[0] as Blob;
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe("text/html;charset=utf-8");
    expect(anchor.download).toBe("invoice-PREVIEW.html");
    expect(click).toHaveBeenCalledTimes(1);
    expect(revokeObjectURL).toHaveBeenCalledWith("blob:invoice");
  });
});

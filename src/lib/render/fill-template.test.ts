import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  escapeHtml,
  fillTemplate,
  RAW_HTML_KEYS,
  type RenderVars,
  TEMPLATE_KEYS,
  TemplateRenderError,
} from "./fill-template";
import { INVOICE_TEMPLATE } from "./template";

const TEMPLATE_PATH = join(process.cwd(), "docs", "invoice-template.html");
const PLACEHOLDER_PATTERN = /\{\{([A-Z0-9_]+)\}\}/g;

function allVars(overrides: Partial<RenderVars> = {}): RenderVars {
  const base = Object.fromEntries(
    TEMPLATE_KEYS.map((key) => [key, `value-${key}`])
  ) as Record<string, string>;
  return { ...base, ...overrides } as RenderVars;
}

describe("escapeHtml", () => {
  it("escapes the five HTML metacharacters", () => {
    expect(escapeHtml(`<a href="x">&'`)).toBe(
      "&lt;a href=&quot;x&quot;&gt;&amp;&#39;"
    );
  });

  it("leaves cyrillic and ordinary text untouched", () => {
    expect(escapeHtml("ФОП Шевченко Тарас")).toBe("ФОП Шевченко Тарас");
  });
});

describe("template drift", () => {
  it("regenerating from the template and fonts reproduces the constant", () => {
    // The constant is no longer byte-identical to the doc: sync-template.mjs
    // swaps the Google Fonts @import for embedded @font-face rules. Asking the
    // script covers the template *and* docs/fonts/*.woff2 in one assertion.
    expect(() =>
      execFileSync("node", ["scripts/sync-template.mjs", "--check"], {
        cwd: process.cwd(),
        stdio: "pipe",
      })
    ).not.toThrow();
  });

  it("preserves every template line except the replaced @import", () => {
    const dropped = readFileSync(TEMPLATE_PATH, "utf8")
      .split("\n")
      .filter((line) => !line.includes("@import url("));

    for (const line of dropped) {
      expect(INVOICE_TEMPLATE).toContain(line);
    }
  });

  it("declares exactly the placeholders present in the template", () => {
    const placeholders = new Set(
      Array.from(INVOICE_TEMPLATE.matchAll(PLACEHOLDER_PATTERN)).map(
        (match) => match[1]
      )
    );

    expect([...placeholders].sort()).toEqual([...TEMPLATE_KEYS].sort());
  });

  it("marks only fragment builders as raw HTML", () => {
    expect([...RAW_HTML_KEYS].sort()).toEqual(["PROJECT_BLOCK", "SERVICE_ROWS"]);
  });
});

describe("fillTemplate", () => {
  it("substitutes every placeholder, leaving no tokens behind", () => {
    const output = fillTemplate("<p>{{PLACE_EN}} / {{PLACE_UA}}</p>", {
      ...allVars(),
      PLACE_EN: "Kyiv",
      PLACE_UA: "Київ",
    });

    expect(output).toBe("<p>Kyiv / Київ</p>");
    expect(output).not.toMatch(PLACEHOLDER_PATTERN);
  });

  it("replaces every occurrence of a repeated placeholder", () => {
    const output = fillTemplate("{{CURRENCY}}-{{CURRENCY}}", allVars({ CURRENCY: "USD" }));
    expect(output).toBe("USD-USD");
  });

  it("escapes hostile text values instead of emitting markup", () => {
    const output = fillTemplate("<div>{{CUSTOMER_NAME}}</div>", {
      ...allVars(),
      CUSTOMER_NAME: "<script>alert(1)</script>",
    });

    expect(output).toBe(
      "<div>&lt;script&gt;alert(1)&lt;/script&gt;</div>"
    );
    expect(output).not.toContain("<script>");
  });

  it("inserts raw-HTML fragments verbatim", () => {
    const output = fillTemplate("<tbody>{{SERVICE_ROWS}}</tbody>", {
      ...allVars(),
      SERVICE_ROWS: "<tr><td>1</td></tr>",
    });

    expect(output).toBe("<tbody><tr><td>1</td></tr></tbody>");
  });

  it("never re-expands a placeholder smuggled inside a value", () => {
    const output = fillTemplate("{{CUSTOMER_NAME}}|{{TOTAL_AMOUNT}}", {
      ...allVars(),
      CUSTOMER_NAME: "{{TOTAL_AMOUNT}}",
      TOTAL_AMOUNT: "9,999.00",
    });

    expect(output).toBe("{{TOTAL_AMOUNT}}|9,999.00");
  });

  it("throws naming the placeholder when a value is missing", () => {
    const incomplete = { ...allVars() } as Record<string, string>;
    delete incomplete.PLACE_EN;

    expect(() =>
      fillTemplate("{{PLACE_EN}}", incomplete as RenderVars)
    ).toThrowError(TemplateRenderError);
    expect(() =>
      fillTemplate("{{PLACE_EN}}", incomplete as RenderVars)
    ).toThrowError(/PLACE_EN/);
  });

  it("throws when an unknown variable is supplied", () => {
    const vars = { ...allVars(), NOT_A_PLACEHOLDER: "x" } as unknown as RenderVars;

    expect(() => fillTemplate("{{PLACE_EN}}", vars)).toThrowError(
      /Unknown template variables supplied: NOT_A_PLACEHOLDER/
    );
  });

  // Structural validity with real builder output is covered by
  // render-invoice.test.ts; here we only prove every token is consumed.
  it("consumes every token of the real template", () => {
    const output = fillTemplate(INVOICE_TEMPLATE, allVars());
    expect(output).not.toMatch(PLACEHOLDER_PATTERN);
  });
});

import { readFileSync } from "node:fs";
import path from "node:path";
import { buildTemplateVariables } from "@/lib/pdf/template-data";
import type { PdfInvoicePayload } from "@/lib/pdf/types";

const TEMPLATE_PATH = path.join(process.cwd(), "docs/invoice-template.html");
const PLACEHOLDER_PATTERN = /\{\{([A-Z0-9_]+)\}\}/g;

const invoiceTemplate = readFileSync(TEMPLATE_PATH, "utf8");

function applyPlaceholders(
  template: string,
  variables: Record<string, string>
): string {
  return template.replace(PLACEHOLDER_PATTERN, (_match, key: string) => {
    const value = variables[key];
    if (value === undefined) {
      throw new Error(`Missing template variable: ${key}`);
    }
    return value;
  });
}

/** Fills `docs/invoice-template.html` with computed placeholder values. */
export function fillInvoiceTemplate(payload: PdfInvoicePayload): string {
  const variables = buildTemplateVariables(payload);
  return applyPlaceholders(invoiceTemplate, variables);
}

/** Test helper: returns unreplaced `{{...}}` tokens, if any. */
export function findUnreplacedPlaceholders(html: string): string[] {
  const matches = html.match(/\{\{[A-Z0-9_]+\}\}/g);
  return matches ? [...new Set(matches)] : [];
}

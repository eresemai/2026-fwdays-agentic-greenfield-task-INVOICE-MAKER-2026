"use client";

import { useEffect, useState } from "react";

type InvoicePreviewPanelProps = {
  html: string | null;
  isPending?: boolean;
};

const PREVIEW_DEBOUNCE_MS = 150;

export function InvoicePreviewPanel({
  html,
  isPending = false,
}: InvoicePreviewPanelProps) {
  const [debouncedHtml, setDebouncedHtml] = useState<string | null>(html);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedHtml(html);
    }, PREVIEW_DEBOUNCE_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [html]);

  return (
    <section
      aria-label="Попередній перегляд рахунку"
      tabIndex={0}
      className="wf-panel flex min-h-[480px] flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <div className="border-b border-border px-4 py-3">
        <h2 className="text-sm font-medium text-wf-text-1">Попередній перегляд</h2>
        <p className="mt-0.5 text-xs text-wf-text-2">
          Оновлюється автоматично після заповнення форми
        </p>
      </div>

      <div className="relative flex-1 bg-wf-surface-2 p-2">
        {isPending ? (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-wf-text-2">
            Оновлення попереднього перегляду…
          </p>
        ) : null}

        {!debouncedHtml ? (
          <p className="flex h-full min-h-[420px] items-center justify-center px-4 text-center text-sm text-wf-text-2">
            Заповніть обов&apos;язкові поля та оберіть послугу, щоб побачити
            рахунок.
          </p>
        ) : (
          <iframe
            title="Попередній перегляд рахунку"
            className="h-full min-h-[420px] w-full rounded-md border border-border bg-white"
            srcDoc={debouncedHtml}
            sandbox="allow-same-origin"
          />
        )}
      </div>
    </section>
  );
}

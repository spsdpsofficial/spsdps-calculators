"use client";

import { useId, useMemo, useState, useSyncExternalStore } from "react";
import { initialValues, validateFields } from "@/lib/forms/validateFields";
import DonutChart from "./DonutChart";
import Field from "./Field";
import ResultList from "./ResultList";

/**
 * Renders any calculator from a declarative `spec` (see docs/adding-a-tool.md):
 *   spec.ariaLabel                        accessible name of the tool
 *   spec.usesToday                        true if the result depends on today's date (computed in the browser only)
 *   spec.fields[]                         { id, label, type, default, min, max, prefix, suffix, slider, options, showIf, hint }
 *   spec.run(values, raw) -> result       { rows, chart?, table?, notes?, error? }
 *     rows   [{ label, value, emphasis?, swatchClass? }]
 *     chart  { segments:[{label,value,colorClass}], centerTop, centerBottom, ariaLabel }
 *     table  { title, caption, columns:[...], rows:[[...]] }   (shown in a collapsible section)
 *     notes  ["short explanatory line", ...]
 * `spec` holds functions, so it must be imported inside a Client Component (see each tool's components/).
 */
const subscribeNothing = () => () => {};

export default function FormCalculator({ spec }) {
  const idPrefix = useId();
  // Tools that depend on today's date (spec.usesToday) wait for the browser, so the pre-built HTML
  // and the first client render always agree (no hydration mismatch).
  const isClient = useSyncExternalStore(subscribeNothing, () => true, () => false);
  const waitingForClient = Boolean(spec.usesToday) && !isClient;
  const [raw, setRaw] = useState(() => initialValues(spec.fields));

  const { valid, errors, values } = useMemo(() => validateFields(spec.fields, raw), [spec.fields, raw]);

  const result = useMemo(() => {
    if (!valid || waitingForClient) return null;
    try {
      return spec.run(values, raw);
    } catch (error) {
      console.error("Calculation failed:", error?.message);
      return { error: "These values could not be calculated. Please check them and try again." };
    }
  }, [valid, values, raw, spec, waitingForClient]);

  const setField = (id) => (value) => setRaw((previous) => ({ ...previous, [id]: value }));

  return (
    <section aria-label={spec.ariaLabel} className="rounded-3xl border border-line bg-card p-5 shadow-card sm:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <form className="space-y-6" onSubmit={(event) => event.preventDefault()} noValidate>
          {spec.fields.map((field) => {
            if (field.showIf && !field.showIf(raw)) return null;
            const hint = typeof field.hint === "function" ? field.hint(raw) : field.hint;
            return (
              <Field
                key={field.id}
                field={field}
                idPrefix={idPrefix}
                value={raw[field.id]}
                onChange={setField(field.id)}
                error={errors[field.id]}
                hint={hint}
              />
            );
          })}
        </form>

        <div aria-live="polite">
          {!result && (
            <p className="rounded-xl border border-dashed border-line p-6 text-center text-muted">
              {waitingForClient ? "Calculating…" : "Fix the highlighted fields to see your result."}
            </p>
          )}
          {result?.error && (
            <p role="alert" className="rounded-xl border border-danger p-5 font-medium text-danger">
              {result.error}
            </p>
          )}
          {result && !result.error && (
            <>
              {result.chart && (
                <DonutChart
                  ariaLabel={result.chart.ariaLabel}
                  segments={result.chart.segments}
                  centerTop={result.chart.centerTop}
                  centerBottom={result.chart.centerBottom}
                />
              )}
              <div className={result.chart ? "mt-4" : ""}>
                <ResultList rows={result.rows} />
              </div>
              {result.notes?.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-muted">
                  {result.notes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>

      {result?.table && !result.error && (
        <details className="mt-8 rounded-xl border border-line">
          <summary className="cursor-pointer px-4 py-3 font-semibold text-ink">{result.table.title}</summary>
          <div className="overflow-x-auto px-4 pb-4">
            <table className="w-full min-w-[480px] text-right text-sm">
              <caption className="sr-only">{result.table.caption}</caption>
              <thead>
                <tr className="border-b border-line text-muted">
                  {result.table.columns.map((column, index) => (
                    <th key={column} scope="col" className={`py-2 font-medium ${index === 0 ? "text-left" : ""}`}>
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {result.table.rows.map((cells) => (
                  <tr key={cells[0]}>
                    {cells.map((cell, index) =>
                      index === 0 ? (
                        <th key={index} scope="row" className="py-2 text-left font-medium">
                          {cell}
                        </th>
                      ) : (
                        <td key={index} className="py-2">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </details>
      )}
    </section>
  );
}

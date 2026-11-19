"use client";

import { useId, useMemo, useState } from "react";
import Field from "@/components/calculator/Field";
import { formatNumber } from "@/lib/formatters";
import { parseNumber } from "@/lib/helpers/numbers";
import { CATEGORIES, convert, convertAll, unitOptions } from "../calculations/calculate";

const FIRST_UNITS = { length: ["km", "mi"], weight: ["kg", "lb"], area: ["acre", "sqft"], volume: ["l", "usgal"], speed: ["kmh", "mph"], data: ["gb", "mb"], temperature: ["c", "f"] };

/** Unit converter: category tabs, one input, from/to selects and a table of every unit. */
export default function UnitConverterTool() {
  const idPrefix = useId();
  const [category, setCategory] = useState("length");
  const [from, setFrom] = useState("km");
  const [to, setTo] = useState("mi");
  const [raw, setRaw] = useState("1");

  const options = useMemo(() => unitOptions(category), [category]);
  const value = parseNumber(raw);
  const invalid = raw.trim() === "" || !Number.isFinite(value);
  const result = invalid ? null : convert(category, from, to, value);
  const all = invalid ? [] : convertAll(category, from, value);
  const label = (unit) => CATEGORIES[category].units[unit][0];

  function pickCategory(next) {
    setCategory(next);
    [setFrom, setTo].forEach((set, i) => set(FIRST_UNITS[next][i]));
  }

  const fmt = (n) => formatNumber(n, { maxDecimals: 6 });
  const selectFields = [
    { id: "from", label: "From", type: "select", options },
    { id: "to", label: "To", type: "select", options },
  ];

  return (
    <div className="space-y-5" aria-label="Unit converter" role="group">
      <div role="tablist" aria-label="Unit category" className="flex flex-wrap gap-2">
        {Object.entries(CATEGORIES).map(([key, cat]) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={category === key}
            onClick={() => pickCategory(key)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium ${category === key ? "border-accent bg-accent text-white" : "bg-card text-ink hover:bg-page"}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field field={{ id: "value", label: "Value", step: "any", min: -1e15, max: 1e15 }} value={raw} onChange={setRaw} error={invalid ? "Enter a number." : undefined} idPrefix={idPrefix} />
        <Field field={selectFields[0]} value={from} onChange={setFrom} idPrefix={idPrefix} />
        <Field field={selectFields[1]} value={to} onChange={setTo} idPrefix={idPrefix} />
      </div>

      <div aria-live="polite">
        {result?.error && <p role="alert" className="text-sm text-danger">{result.error}</p>}
        {result && !result.error && (
          <>
            <dl className="rounded-xl border bg-card p-4">
              <dt className="text-sm text-muted">{fmt(value)} {label(from)} equals</dt>
              <dd className="mt-1 text-2xl font-semibold text-ink">{fmt(result.value)} {label(to)}</dd>
            </dl>
            <table className="mt-4 w-full text-left text-sm">
              <caption className="pb-2 text-left font-medium text-ink">The same value in every {CATEGORIES[category].label.toLowerCase()} unit</caption>
              <tbody>
                {all.map((row) => (
                  <tr key={row.unit} className="border-t">
                    <th scope="row" className="py-2 pr-3 font-normal text-muted">{label(row.unit)}</th>
                    <td className="py-2 text-right font-medium text-ink">{row.error ? "—" : fmt(row.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

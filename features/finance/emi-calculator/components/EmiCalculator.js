"use client";

import { useMemo, useState } from "react";
import DonutChart from "@/components/calculator/DonutChart";
import ResultList from "@/components/calculator/ResultList";
import SliderField from "@/components/calculator/SliderField";
import { formatCompactINR, formatINR, formatPercent } from "@/lib/formatters";
import { parseNumber } from "@/lib/helpers/numbers";
import { buildSchedule, calculateEmi, summariseByYear } from "../calculations/calculate";
import { validateEmiInput } from "../validation/validate";

const DEFAULTS = { principal: "1000000", rate: "8.5", tenure: "5", tenureUnit: "years" };

const TENURE_RANGE = {
  years: { min: 1, max: 30, step: 1, suffix: "Yr" },
  months: { min: 1, max: 360, step: 1, suffix: "Mo" },
};

function trimNumber(value) {
  return String(Number(value.toFixed(2)));
}

export default function EmiCalculator() {
  const [form, setForm] = useState(DEFAULTS);

  const setField = (field) => (value) => setForm((previous) => ({ ...previous, [field]: value }));

  function changeUnit(nextUnit) {
    setForm((previous) => {
      if (previous.tenureUnit === nextUnit) return previous;
      const current = parseNumber(previous.tenure);
      const converted = Number.isNaN(current)
        ? previous.tenure
        : trimNumber(nextUnit === "months" ? current * 12 : current / 12);
      return { ...previous, tenureUnit: nextUnit, tenure: converted };
    });
  }

  const { valid, errors, values } = useMemo(() => validateEmiInput(form), [form]);
  const result = useMemo(() => (valid ? calculateEmi(values) : null), [valid, values]);
  const yearly = useMemo(() => (valid ? summariseByYear(buildSchedule(values)) : []), [valid, values]);

  const principalNumber = parseNumber(form.principal);
  const range = TENURE_RANGE[form.tenureUnit];

  return (
    <section aria-label="EMI calculator" className="rounded-2xl border border-line bg-card p-5 sm:p-8">
      <div className="grid gap-8 md:grid-cols-2">
        <form className="space-y-7" onSubmit={(event) => event.preventDefault()} noValidate>
          <SliderField
            id="emi-principal"
            label="Loan amount"
            prefix="₹"
            value={form.principal}
            onChange={setField("principal")}
            min={100000}
            max={50000000}
            step={50000}
            inputMode="numeric"
            hint={!Number.isNaN(principalNumber) ? formatCompactINR(principalNumber) : undefined}
            error={errors.principal}
          />
          <SliderField
            id="emi-rate"
            label="Interest rate (per year)"
            suffix="%"
            value={form.rate}
            onChange={setField("rate")}
            min={1}
            max={30}
            step={0.1}
            error={errors.rate}
          />
          <div>
            <SliderField
              id="emi-tenure"
              label="Loan tenure"
              suffix={range.suffix}
              value={form.tenure}
              onChange={setField("tenure")}
              min={range.min}
              max={range.max}
              step={range.step}
              error={errors.tenure}
            />
            <div role="group" aria-label="Tenure unit" className="mt-3 inline-flex rounded-lg border border-line p-0.5">
              {["years", "months"].map((unit) => (
                <button
                  key={unit}
                  type="button"
                  aria-pressed={form.tenureUnit === unit}
                  onClick={() => changeUnit(unit)}
                  className={`rounded-md px-3 py-1 text-sm font-medium capitalize ${
                    form.tenureUnit === unit ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>
          </div>
        </form>

        <div aria-live="polite">
          {result ? (
            <>
              <DonutChart
                ariaLabel={`Of the total payment of ${formatINR(result.totalPayment)}, ${formatINR(
                  result.principal,
                )} is principal and ${formatINR(result.totalInterest)} is interest.`}
                segments={[
                  { label: "Principal", value: result.principal, colorClass: "stroke-chart-a" },
                  { label: "Interest", value: result.totalInterest, colorClass: "stroke-chart-b" },
                ]}
                centerTop="Interest share"
                centerBottom={formatPercent(result.interestShare * 100, { maxDecimals: 1 })}
              />
              <div className="mt-4">
                <ResultList
                  rows={[
                    { label: "Monthly EMI", value: formatINR(result.emi), emphasis: true },
                    { label: "Principal amount", value: formatINR(result.principal), swatchClass: "bg-chart-a" },
                    { label: "Total interest", value: formatINR(result.totalInterest), swatchClass: "bg-chart-b" },
                    { label: "Total payment", value: formatINR(result.totalPayment) },
                  ]}
                />
              </div>
            </>
          ) : (
            <p className="rounded-xl border border-dashed border-line p-6 text-center text-muted">
              Fix the highlighted fields to see your EMI.
            </p>
          )}
        </div>
      </div>

      {result && (
        <details className="mt-8 rounded-xl border border-line">
          <summary className="cursor-pointer px-4 py-3 font-semibold text-ink">Year-wise breakup</summary>
          <div className="overflow-x-auto px-4 pb-4">
            <table className="w-full min-w-[480px] text-right text-sm">
              <caption className="sr-only">Principal paid, interest paid and closing balance for each year of the loan</caption>
              <thead>
                <tr className="border-b border-line text-muted">
                  <th scope="col" className="py-2 text-left font-medium">Year</th>
                  <th scope="col" className="py-2 font-medium">Principal paid</th>
                  <th scope="col" className="py-2 font-medium">Interest paid</th>
                  <th scope="col" className="py-2 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {yearly.map((row) => (
                  <tr key={row.year}>
                    <th scope="row" className="py-2 text-left font-medium">{row.year}</th>
                    <td className="py-2">{formatINR(row.principalPaid)}</td>
                    <td className="py-2">{formatINR(row.interestPaid)}</td>
                    <td className="py-2">{formatINR(row.balance)}</td>
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

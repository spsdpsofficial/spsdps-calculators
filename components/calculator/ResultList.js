/**
 * Label/value result rows. `rows` = [{ label, value, emphasis?, swatchClass? }].
 * Rendered as a <dl> so screen readers announce each label with its value.
 */
export default function ResultList({ rows }) {
  return (
    <dl className="divide-y divide-line">
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline justify-between gap-4 py-3">
          <dt className="flex items-center gap-2 text-sm text-muted">
            {row.swatchClass && <span aria-hidden="true" className={`inline-block h-3 w-3 rounded-full ${row.swatchClass}`} />}
            {row.label}
          </dt>
          <dd className={row.emphasis ? "text-xl font-bold text-accent" : "font-semibold text-ink"}>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

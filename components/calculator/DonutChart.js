/**
 * Accessible SVG donut chart (no chart library). `segments` = [{ label, value, colorClass }].
 * The numbers are always repeated in text by the parent, so colour is never the only cue.
 */
export default function DonutChart({ segments, ariaLabel, centerTop, centerBottom }) {
  const total = segments.reduce((sum, segment) => sum + Math.max(segment.value, 0), 0);
  const radius = 15.9155; // circumference = 100, so dash lengths read as percentages
  let offset = 0;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[260px]">
      <svg viewBox="0 0 42 42" role="img" aria-label={ariaLabel} className="h-full w-full -rotate-90">
        <circle cx="21" cy="21" r={radius} fill="none" strokeWidth="5" className="stroke-line" />
        {total > 0 &&
          segments.map((segment) => {
            const share = (Math.max(segment.value, 0) / total) * 100;
            if (share <= 0) return null;
            const circle = (
              <circle
                key={segment.label}
                cx="21"
                cy="21"
                r={radius}
                fill="none"
                strokeWidth="5"
                pathLength="100"
                strokeDasharray={`${share} ${100 - share}`}
                strokeDashoffset={-offset}
                className={segment.colorClass}
              />
            );
            offset += share;
            return circle;
          })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-xs text-muted">{centerTop}</span>
        <span className="text-lg font-bold text-ink">{centerBottom}</span>
      </div>
    </div>
  );
}

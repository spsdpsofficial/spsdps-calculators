"use client";

import { clamp, parseNumber, sanitizeNumericInput } from "@/lib/helpers/numbers";

/**
 * A labelled number input paired with a range slider. The text value is the source of truth
 * (it can be empty or out of range while typing); the slider just mirrors it, clamped.
 */
export default function SliderField({
  id,
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  hint,
  error,
  inputMode = "decimal",
  showSlider = true,
}) {
  const parsed = parseNumber(value);
  const sliderValue = Number.isNaN(parsed) ? min : clamp(parsed, min, max);
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        <div
          className={`flex w-40 items-center rounded-lg border bg-accent-soft px-3 py-1.5 text-accent focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--focus)] ${
            error ? "border-danger" : "border-transparent"
          }`}
        >
          {prefix && <span className="mr-1 font-semibold">{prefix}</span>}
          <input
            id={id}
            type="text"
            inputMode={inputMode}
            autoComplete="off"
            value={value}
            onChange={(event) => onChange(sanitizeNumericInput(event.target.value))}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={describedBy}
            className="w-full min-w-0 bg-transparent text-right text-base font-semibold outline-none"
          />
          {suffix && <span className="ml-1 whitespace-nowrap text-sm font-semibold">{suffix}</span>}
        </div>
      </div>

      {showSlider && (
        <input
          type="range"
          aria-label={`${label} slider`}
          min={min}
          max={max}
          step={step}
          value={sliderValue}
          onChange={(event) => onChange(event.target.value)}
          className="mt-3 h-2 w-full cursor-pointer accent-accent"
        />
      )}

      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm font-medium text-danger">
          {error}
        </p>
      )}
    </div>
  );
}

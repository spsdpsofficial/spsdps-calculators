"use client";

import SliderField from "./SliderField";

const controlClass =
  "w-full rounded-lg border bg-card px-3 py-2 text-base text-ink focus-visible:outline-offset-2";

/** One form control chosen by `field.type`. Number fields reuse SliderField (slider is opt-in). */
export default function Field({ field, value, onChange, error, hint, idPrefix }) {
  const id = `${idPrefix}-${field.id}`;
  const type = field.type || "number";

  if (type === "number") {
    const slider = field.slider;
    return (
      <SliderField
        id={id}
        label={field.label}
        prefix={field.prefix}
        suffix={field.suffix}
        value={value}
        onChange={onChange}
        min={slider?.min ?? field.min ?? 0}
        max={slider?.max ?? field.max ?? 1_000_000}
        step={slider?.step ?? field.step ?? 1}
        showSlider={Boolean(slider)}
        inputMode={field.integer ? "numeric" : "decimal"}
        hint={hint}
        error={error}
      />
    );
  }

  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;
  const borderClass = error ? "border-danger" : "border-line";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-ink">
        {field.label}
      </label>
      {type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy}
          className={`${controlClass} ${borderClass} mt-2`}
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={type === "text" ? "text" : type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={field.placeholder}
          maxLength={field.maxLength}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={describedBy}
          className={`${controlClass} ${borderClass} mt-2`}
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

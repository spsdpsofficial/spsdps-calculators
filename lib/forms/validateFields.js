import { formatINR, formatNumber } from "@/lib/formatters";
import { parseNumber } from "@/lib/helpers/numbers";

// Generic, declarative validation for the shared FormCalculator. A tool describes its fields
// (type, min, max, ...) and gets consistent errors for free; only cross-field rules live in the tool.
//
// Field types: number (default), select, date, time, text.

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

export function isValidIsoDate(text) {
  if (typeof text !== "string" || !DATE_PATTERN.test(text)) return false;
  const date = new Date(`${text}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === text;
}

const describeBound = (field, value) => (field.prefix === "₹" ? formatINR(value) : formatNumber(value, { maxDecimals: 4 }));

function rangeMessage(field) {
  const { min, max, label, suffix } = field;
  const unit = suffix && suffix !== "%" ? ` ${suffix}` : suffix === "%" ? "%" : "";
  if (min !== undefined && max !== undefined) {
    return `${label} must be between ${describeBound(field, min)}${unit} and ${describeBound(field, max)}${unit}.`;
  }
  if (min !== undefined) return `${label} must be at least ${describeBound(field, min)}${unit}.`;
  return `${label} must be at most ${describeBound(field, max)}${unit}.`;
}

/** Returns { valid, errors, values }. Hidden fields (showIf false) are skipped and absent from values. */
export function validateFields(fields, raw) {
  const errors = {};
  const values = {};

  for (const field of fields) {
    if (field.showIf && !field.showIf(raw)) continue;
    const text = String(raw[field.id] ?? "");
    const type = field.type || "number";

    if (type === "select") {
      if (field.options.some((option) => option.value === text)) values[field.id] = text;
      else errors[field.id] = `Choose a ${field.label.toLowerCase()}.`;
    } else if (type === "date") {
      if (text === "" && field.optional) values[field.id] = "";
      else if (isValidIsoDate(text)) values[field.id] = text;
      else errors[field.id] = `Enter a valid ${field.label.toLowerCase()}.`;
    } else if (type === "time") {
      if (TIME_PATTERN.test(text)) values[field.id] = text;
      else errors[field.id] = `Enter a valid ${field.label.toLowerCase()} (HH:MM).`;
    } else if (type === "text") {
      if (!field.optional && text.trim() === "") errors[field.id] = `Enter ${field.label.toLowerCase()}.`;
      else values[field.id] = text;
    } else {
      if (text.trim() === "" && field.optional) {
        values[field.id] = field.emptyValue ?? 0;
        continue;
      }
      const number = parseNumber(text);
      if (Number.isNaN(number)) errors[field.id] = `Enter ${field.label.toLowerCase()} as a number.`;
      else if (field.integer && !Number.isInteger(number)) errors[field.id] = `${field.label} must be a whole number.`;
      else if ((field.min !== undefined && number < field.min) || (field.max !== undefined && number > field.max)) {
        errors[field.id] = rangeMessage(field);
      } else values[field.id] = number;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors, values };
}

/** Initial raw values from each field's `default`. */
export const initialValues = (fields) => Object.fromEntries(fields.map((field) => [field.id, String(field.default ?? "")]));

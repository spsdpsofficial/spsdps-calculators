// Test helper: run a tool spec the way FormCalculator does (defaults → validate → run).
import { initialValues, validateFields } from "./validateFields";

/** Returns { valid, errors, out } for the spec's default values merged with `overrides` (raw strings or numbers). */
export function runSpec(spec, overrides = {}) {
  const raw = { ...initialValues(spec.fields), ...overrides };
  const { valid, values, errors } = validateFields(spec.fields, raw);
  return { valid, errors, values, out: valid ? spec.run(values, raw) : null };
}

/** Whether validation rejects the given override. */
export function isRejected(spec, overrides) {
  return !runSpec(spec, overrides).valid;
}

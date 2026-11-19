import { formatINR, formatPercent } from "@/lib/formatters";
import { calculateStampDuty } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Stamp duty and registration calculator",
  fields: [
    { id: "value", label: "Property value", prefix: "₹", min: 10000, max: 1e11, default: 7500000, hint: "Use the higher of the agreement value and the government circle or ready-reckoner rate." },
    { id: "stamp", label: "Stamp duty rate", suffix: "%", min: 0, max: 15, default: 5, step: "any", hint: "Enter your state's rate. It varies by state, gender, property type and area." },
    { id: "registration", label: "Registration fee rate", suffix: "%", min: 0, max: 5, default: 1, step: "any", hint: "Some states cap this at a fixed amount. Enter the effective percentage." },
    { id: "other", label: "Other charges (optional)", prefix: "₹", min: 0, max: 1e9, default: "", optional: true, emptyValue: 0, hint: "Cess, surcharge, local body tax or legal fees." },
  ],
  run({ value, stamp, registration, other }) {
    const r = calculateStampDuty({ propertyValue: value, stampDutyPercent: stamp, registrationPercent: registration, otherCharges: other });
    return {
      rows: [
        { label: "Total stamp duty and registration", value: formatINR(r.total), emphasis: true },
        { label: "Stamp duty", value: formatINR(r.stampDuty) },
        { label: "Registration fee", value: formatINR(r.registration) },
        { label: "Other charges", value: formatINR(r.otherCharges) },
        { label: "Charges as a share of property value", value: formatPercent(r.totalPercentOfValue, { maxDecimals: 2 }) },
        { label: "Property value plus charges", value: formatINR(r.costWithCharges) },
      ],
      notes: ["Rates are entered by you because they differ by state and change. Confirm the current rates with your state's registration department or sub-registrar office."],
    };
  },
};

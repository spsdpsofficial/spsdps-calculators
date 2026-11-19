import { formatINR, formatPercent } from "@/lib/formatters";
import { TDS_AS_OF, TDS_NATURES } from "@/lib/tax/tdsRates";
import { calculateTds } from "./calculations/calculate";

export const spec = {
  ariaLabel: "TDS calculator",
  fields: [
    { id: "nature", label: "Nature of payment", type: "select", default: "professional", options: TDS_NATURES.map((n) => ({ value: n.id, label: `${n.label} (${n.section})` })) },
    { id: "amount", label: "Payment amount", prefix: "₹", min: 1, max: 1e12, default: 100000, hint: "Amount credited or paid, before TDS and excluding GST shown separately on the invoice." },
    { id: "pan", label: "Receiver has a valid PAN?", type: "select", default: "yes", options: [{ value: "yes", label: "Yes" }, { value: "no", label: "No (higher TDS applies)" }] },
  ],
  run({ nature, amount, pan }) {
    const r = calculateTds({ natureId: nature, amount, hasPan: pan === "yes" });
    return {
      rows: [
        { label: "TDS to deduct", value: formatINR(r.tds), emphasis: true },
        { label: "TDS rate", value: formatPercent(r.ratePercent, { maxDecimals: 2 }) },
        { label: "Section", value: r.nature.section },
        { label: "Net amount payable", value: formatINR(r.netPayable) },
        { label: "No TDS up to", value: `${formatINR(r.nature.threshold)} (${r.nature.thresholdNote})` },
      ],
      notes: [
        r.belowThreshold ? "The amount is within the threshold, so no TDS is deducted on this payment alone. Thresholds are cumulative over the year for most sections." : `Rates are ${TDS_AS_OF}. Lower-deduction certificates, surcharge on non-residents and recent changes are not included. Check incometax.gov.in for the current rate.`,
      ],
    };
  },
};

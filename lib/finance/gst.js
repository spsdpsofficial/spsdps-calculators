// Shared GST maths and rate options (used by the GST and Reverse GST calculators).
//
// Rates reflect the GST Council's 22 September 2025 restructuring: standard slabs 5% and 18%,
// a 40% rate for specified goods and services, plus special low rates (0.25%, 3%) for specific items.
// Always confirm the rate for a specific product or service on the GST portal / CBIC rate schedule.

export const GST_RATE_OPTIONS = [
  { value: "0", label: "0% (nil rated / exempt)" },
  { value: "0.25", label: "0.25% (special rate)" },
  { value: "3", label: "3% (special rate)" },
  { value: "5", label: "5%" },
  { value: "18", label: "18%" },
  { value: "40", label: "40%" },
  { value: "custom", label: "Other / older rate (enter manually)" },
];

export const gstRateField = (default_ = "18") => [
  { id: "rateChoice", label: "GST rate", type: "select", options: GST_RATE_OPTIONS, default: default_ },
  {
    id: "customRate",
    label: "Custom GST rate",
    suffix: "%",
    min: 0,
    max: 100,
    default: "12",
    showIf: (raw) => raw.rateChoice === "custom",
  },
];

/** Resolve the numeric rate from validated values. */
export const resolveGstRate = (values) => (values.rateChoice === "custom" ? values.customRate : Number(values.rateChoice));

/**
 * mode "add":    `amount` excludes GST  -> total = amount + GST
 * mode "remove": `amount` includes GST  -> net   = amount / (1 + rate)
 * Intra-state supplies split GST equally into CGST and SGST/UTGST; inter-state uses IGST (= full GST).
 */
export function calculateGst({ amount, ratePercent, mode }) {
  const rate = ratePercent / 100;
  const net = mode === "remove" ? amount / (1 + rate) : amount;
  const gst = net * rate;
  return { net, gst, total: net + gst, cgst: gst / 2, sgst: gst / 2, ratePercent };
}

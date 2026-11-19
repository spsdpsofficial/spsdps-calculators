import { formatINR } from "@/lib/formatters";
import { calculateGratuity } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Gratuity calculator",
  fields: [
    { id: "wage", label: "Last drawn monthly basic + DA", prefix: "₹", min: 1, max: 100_000_000, default: "50000" },
    { id: "years", label: "Years of service", suffix: "Yr", min: 0, max: 60, integer: true, default: "10" },
    { id: "months", label: "Extra months", suffix: "Mo", min: 0, max: 11, integer: true, optional: true, default: "0" },
    {
      id: "covered",
      label: "Is your employer covered by the Payment of Gratuity Act?",
      type: "select",
      default: "yes",
      options: [
        { value: "yes", label: "Yes (most organisations with 10+ employees)" },
        { value: "no", label: "No" },
      ],
    },
  ],
  run({ wage, years, months, covered }) {
    const r = calculateGratuity({ wage, years, months, covered: covered === "yes" });
    const notes = ["Gratuity is normally payable after 5 years of continuous service, with exceptions such as death or disablement, and for fixed-term employees after 1 year. Check your terms."];
    if (years < 1) notes.unshift("You have less than one year of service, so no gratuity is likely to be payable.");
    return {
      rows: [
        { label: "Gratuity amount", value: formatINR(r.gratuity), emphasis: true },
        { label: "Years counted", value: String(r.countedYears) },
        { label: "Tax-free portion (up to ₹20 lakh)", value: formatINR(r.taxFree) },
        { label: "Amount above the tax-free limit", value: formatINR(r.taxable) },
      ],
      notes,
    };
  },
};

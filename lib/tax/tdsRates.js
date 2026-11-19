// TDS rates for payments to residents. Compiled from secondary summaries of the Income-tax Act, 1961
// sections as amended by Finance Act 2025 (rates and thresholds effective 1 April 2025). The Income-tax
// Act, 2025 re-numbers these sections from 1 April 2026 without changing the rates for most payments.
// NOT yet verified against the official CBDT/incometax.gov.in text: check before launch.
// `threshold` is the amount up to which no TDS is deducted (per payment or per year, as noted).
export const TDS_AS_OF = "FY 2025-26 rates (Finance Act 2025)";

export const TDS_NATURES = [
  { id: "fd-interest", label: "Interest from bank or post office (FD, RD)", section: "194A", ratePercent: 10, threshold: 50000, thresholdNote: "per year, per bank (₹1,00,000 for senior citizens)" },
  { id: "securities-interest", label: "Interest on securities (e.g. listed debentures)", section: "193", ratePercent: 10, threshold: 10000, thresholdNote: "per year" },
  { id: "dividend", label: "Dividend from a company", section: "194", ratePercent: 10, threshold: 10000, thresholdNote: "per year" },
  { id: "contractor-individual", label: "Contractor payment (to an individual or HUF)", section: "194C", ratePercent: 1, threshold: 30000, thresholdNote: "single payment, or ₹1,00,000 in the year" },
  { id: "contractor-other", label: "Contractor payment (to a company or firm)", section: "194C", ratePercent: 2, threshold: 30000, thresholdNote: "single payment, or ₹1,00,000 in the year" },
  { id: "commission", label: "Commission or brokerage", section: "194H", ratePercent: 2, threshold: 20000, thresholdNote: "per year" },
  { id: "rent-machinery", label: "Rent for plant, machinery or equipment", section: "194I(a)", ratePercent: 2, threshold: 600000, thresholdNote: "per year" },
  { id: "rent-building", label: "Rent for land, building or furniture", section: "194I(b)", ratePercent: 10, threshold: 600000, thresholdNote: "per year" },
  { id: "rent-individual", label: "Rent paid by an individual or HUF above ₹50,000 a month", section: "194IB", ratePercent: 2, threshold: 50000, thresholdNote: "per month" },
  { id: "professional", label: "Professional fees", section: "194J", ratePercent: 10, threshold: 50000, thresholdNote: "per year" },
  { id: "technical", label: "Technical services fees or call-centre", section: "194J", ratePercent: 2, threshold: 50000, thresholdNote: "per year" },
  { id: "property", label: "Purchase of immovable property (above ₹50 lakh)", section: "194IA", ratePercent: 1, threshold: 5000000, thresholdNote: "value of the property" },
  { id: "lottery", label: "Winnings from lottery, game or puzzle", section: "194B", ratePercent: 30, threshold: 10000, thresholdNote: "single payment" },
];

/** Without a valid PAN the deduction is at the higher of twice the rate and 20% (section 206AA). */
export const NO_PAN_MIN_PERCENT = 20;

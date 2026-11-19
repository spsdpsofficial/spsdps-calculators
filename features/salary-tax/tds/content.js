export const content = {
  seo: {
    title: "TDS Calculator: Tax Deducted at Source",
    description:
      "Calculate TDS on professional fees, contractor payments, rent, commission, interest and more using the section-wise rates, with thresholds and the no-PAN rate.",
    keywords: ["tds calculator", "tds rates", "tds on professional fees", "tds on rent calculator", "section 194j tds calculator"],
  },
  h1: "TDS Calculator",
  intro: [
    "Tax Deducted at Source (TDS) means the person making a payment, such as a company paying a freelancer or a tenant paying rent above a limit, deducts tax before paying and deposits it with the government. The rate depends on the type of payment.",
    "Pick the nature of payment, enter the amount and see how much TDS is deducted and what the receiver gets. The rates here are for payments to residents, for FY 2025-26.",
  ],
  howTo: [
    "Choose the nature of payment, such as professional fees or rent.",
    "Enter the payment amount.",
    "Say whether the receiver has a valid PAN.",
    "Read the TDS, its rate and the net amount payable.",
  ],
  formula: {
    expression: "TDS = Payment × Rate  (if the payment is above the threshold)\nNo PAN: rate = higher of 2 × rate and 20%",
    variables: [
      { symbol: "Rate", meaning: "the percentage fixed for that type of payment." },
      { symbol: "Threshold", meaning: "the amount up to which no TDS is deducted." },
    ],
    notes: ["From 1 April 2026 the Income-tax Act, 2025 replaces the old section numbers. The rates here are shown with the earlier section numbers that most people still recognise."],
  },
  example: {
    scenario: "A company pays a consultant ₹1,00,000 in professional fees. The consultant has a PAN.",
    inputs: [
      { label: "Payment and nature", value: "₹1,00,000, professional fees" },
      { label: "PAN", value: "Available" },
    ],
    results: [
      { label: "TDS rate", value: "10%" },
      { label: "TDS deducted", value: "₹10,000" },
      { label: "Net amount paid", value: "₹90,000" },
    ],
    steps: ["Professional fees are above the ₹50,000 threshold, so TDS applies.", "TDS = 10% of ₹1,00,000 = ₹10,000.", "The consultant receives ₹90,000 and can claim the ₹10,000 as credit when filing returns."],
    expected: { input: { natureId: "professional", amount: 100000, hasPan: true }, tds: 10000 },
  },
  factors: [
    { title: "Nature of payment", text: "Each type of payment has its own rate and threshold." },
    { title: "PAN", text: "Without a valid PAN, TDS is deducted at a higher rate." },
    { title: "Thresholds", text: "Most thresholds are cumulative over the financial year, not per payment." },
    { title: "Residency", text: "Payments to non-residents follow different rules." },
  ],
  benefits: [
    "Know how much to deduct and deposit.",
    "See what the receiver will actually get.",
    "Check the effect of a missing PAN.",
  ],
  assumptions: [
    "Payments to residents only.",
    "The rates and thresholds in the tool are from secondary summaries of FY 2025-26 rules and may have changed. Verify on incometax.gov.in.",
    "Lower or nil deduction certificates and surcharge are not modelled.",
    "GST on the invoice, if separately shown, is not included in the amount.",
  ],
  faqs: [
    { q: "What is TDS?", a: "Tax deducted at source: tax withheld by the payer and deposited with the government on behalf of the receiver." },
    { q: "Can I claim TDS back?", a: "Yes. The deducted tax is credited to the receiver's PAN, shown in Form 26AS and the annual information statement, and adjusted against the final tax. Excess is refunded." },
    { q: "What if the receiver has no PAN?", a: "TDS is deducted at the higher of twice the normal rate and 20%." },
    { q: "When is TDS not deducted?", a: "When the payment is within the threshold for that section, or when the receiver gives a valid lower or nil deduction certificate." },
    { q: "Is TDS deducted on GST?", a: "If GST is shown separately on the invoice, TDS is generally on the amount excluding GST. Check the latest circulars." },
    { q: "Where do I deposit TDS?", a: "Through the Income Tax Department's e-payment system. Due dates and returns are also on incometax.gov.in." },
  ],
  related: ["salary-tax/advance-tax", "salary-tax/income-tax", "salary-tax/capital-gains", "finance/fd-calculator"],
  references: [
    { label: "Income Tax Department of India", url: "https://www.incometax.gov.in/" },
    { label: "TRACES: TDS Reconciliation Analysis and Correction Enabling System", url: "https://www.tdscpc.gov.in/" },
  ],
};

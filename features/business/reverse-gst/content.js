export const content = {
  seo: {
    title: "Reverse GST Calculator: Remove GST from Price",
    description:
      "Remove GST from a GST-inclusive price to get the original amount. Shows GST included, CGST, SGST and IGST for any rate, with the reverse formula explained.",
    keywords: ["reverse GST calculator", "remove GST from price", "GST inclusive to exclusive", "GST exclusive price", "calculate GST from MRP"],
  },
  h1: "Reverse GST Calculator",
  intro: [
    "MRPs, bills and quotes usually include GST. When you need the price before tax, for accounting, input tax credit or costing, you have to take the GST back out. Subtracting the rate straight from the total gives the wrong answer, so the calculation is done in reverse.",
    "Enter the GST-inclusive amount and the rate. This tool shows the base price, the GST included and the CGST, SGST and IGST split.",
  ],
  howTo: [
    "Enter the price that already includes GST.",
    "Choose the GST rate that applies, or enter a custom rate.",
    "Read the price before GST and the GST amount.",
    "Use the CGST/SGST split for sales within a state, or IGST for sales between states.",
  ],
  formula: {
    expression: "Price before GST = Inclusive price ÷ (1 + GST rate ÷ 100)\nGST included = Inclusive price − Price before GST\nGST share of price = Rate ÷ (100 + Rate)",
    variables: [
      { symbol: "Inclusive price", meaning: "the amount that already contains GST." },
      { symbol: "GST rate", meaning: "the applicable rate, for example 5%, 18% or 40%." },
    ],
    notes: ["On a GST-inclusive price of ₹11,800 at 18%, GST is ₹1,800, which is 15.25% of ₹11,800 and not 18%."],
  },
  example: {
    scenario: "An invoice total of ₹11,800 includes 18% GST.",
    inputs: [
      { label: "Price including GST", value: "₹11,800" },
      { label: "GST rate", value: "18%" },
    ],
    results: [
      { label: "Price before GST", value: "₹10,000" },
      { label: "GST included", value: "₹1,800" },
      { label: "CGST + SGST", value: "₹900 + ₹900" },
    ],
    steps: ["Divide by 1.18: 11,800 ÷ 1.18 = 10,000.", "GST = 11,800 − 10,000 = 1,800.", "Within a state, GST splits equally into ₹900 CGST and ₹900 SGST."],
    expected: { input: { inclusiveAmount: 11800, ratePercent: 18 }, net: 10000, gst: 1800 },
  },
  factors: [
    { title: "Correct rate", text: "The GST rate depends on the product or service. Check it on the GST portal or CBIC rate schedule." },
    { title: "Place of supply", text: "Within a state, GST is split into CGST and SGST. Between states, IGST applies." },
    { title: "Rounding", text: "Invoices round each line to the paisa, so totals can differ slightly." },
    { title: "Cess and special rates", text: "Some goods carry extra cess, which is not included here." },
  ],
  benefits: [
    "Find the base price from an MRP quickly.",
    "Get the tax split for accounting and returns.",
    "Avoid the common mistake of subtracting the rate directly.",
  ],
  assumptions: [
    "A single GST rate on the whole amount.",
    "Rates reflect the GST structure effective 22 September 2025. Confirm the rate for your product on the official GST portal.",
    "Cess and TCS are not included.",
    "This is a calculation aid, not tax advice.",
  ],
  faqs: [
    { q: "How do I remove GST from a price?", a: "Divide the GST-inclusive price by 1 plus the GST rate. At 18%, divide by 1.18." },
    { q: "Why not just subtract 18% from the total?", a: "Because 18% is calculated on the price before GST, not on the total. Subtracting 18% of the total takes off too much." },
    { q: "What is the GST share of an inclusive price?", a: "Rate ÷ (100 + rate). For 18% it is 15.25%, and for 5% it is 4.76%." },
    { q: "What is the difference between CGST, SGST and IGST?", a: "Within a state, GST is split into CGST and SGST. Between states or from abroad, the full amount is charged as IGST." },
    { q: "Where do I verify the GST rate?", a: "On the GST portal or in the CBIC rate schedule for the specific goods or service." },
  ],
  related: ["finance/gst-calculator", "business/profit-margin", "business/markup-calculator", "daily-life/discount-calculator"],
  references: [
    { label: "GST portal", url: "https://www.gst.gov.in/" },
    { label: "Central Board of Indirect Taxes and Customs (CBIC)", url: "https://www.cbic.gov.in/" },
  ],
};

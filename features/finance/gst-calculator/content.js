export const content = {
  seo: {
    title: "GST Calculator: Add or Remove GST in ₹",
    description:
      "Add GST to a price or remove it from a GST-inclusive amount. See the tax, CGST, SGST and IGST split in rupees, with the formula and a worked example.",
    keywords: ["GST calculator", "GST calculator India", "add GST", "remove GST", "CGST SGST calculator", "inclusive exclusive GST"],
  },
  h1: "GST Calculator",
  intro: [
    "Goods and Services Tax (GST) is added to most prices in India. This calculator does the sum both ways: add GST to a price that excludes it, or take GST out of a price that already includes it. You get the tax amount, the final price and how the tax splits into CGST, SGST and IGST.",
    "It is useful for shoppers checking a bill, and for small businesses preparing a quote or an invoice. Pick the rate that applies to your product or service. A custom rate is available for older rates or special cases.",
  ],
  howTo: [
    "Choose whether your amount excludes GST (add GST) or already includes it (remove GST).",
    "Enter the amount in rupees.",
    "Pick the GST rate. Choose 'Other' to type a rate that is not in the list.",
    "Read the tax, the price before and after GST, and the CGST, SGST and IGST split.",
  ],
  formula: {
    expression: "Add GST: GST = Price × Rate ÷ 100, Total = Price + GST\nRemove GST: Price = Total ÷ (1 + Rate ÷ 100), GST = Total − Price",
    variables: [
      { symbol: "Price", meaning: "the amount before GST, in ₹." },
      { symbol: "Rate", meaning: "the GST rate in percent, for example 18." },
      { symbol: "Total", meaning: "the amount including GST." },
    ],
    notes: ["For a sale within one state, CGST and SGST are each half of the GST. For a sale between states, the whole GST is charged as IGST."],
  },
  example: {
    scenario: "A shop quotes ₹10,000 for a product before tax. The applicable rate is 18%.",
    inputs: [
      { label: "Price before GST", value: "₹10,000" },
      { label: "GST rate", value: "18%" },
    ],
    results: [
      { label: "GST", value: "₹1,800" },
      { label: "CGST + SGST", value: "₹900 + ₹900" },
      { label: "Price including GST", value: "₹11,800" },
    ],
    steps: [
      "GST = 10,000 × 18 ÷ 100 = ₹1,800.",
      "Total = 10,000 + 1,800 = ₹11,800.",
      "To go backwards, 11,800 ÷ 1.18 = ₹10,000 and the GST in the bill is 11,800 − 10,000 = ₹1,800.",
    ],
    expected: { amount: 10000, ratePercent: 18, mode: "add", expectedGst: 1800 },
  },
  factors: [
    { title: "The rate for your item", text: "GST rates depend on what is sold. The same amount gives different tax at 5%, 18% or 40%, so check the rate for your exact product or service." },
    { title: "Inclusive or exclusive price", text: "Many retail prices already include GST. Entering such a price as 'excluding GST' overstates the final cost." },
    { title: "Place of supply", text: "Whether a sale is within a state or between states decides CGST and SGST versus IGST. The total tax is the same." },
    { title: "Rate changes", text: "GST rates are revised by the GST Council. The rate on an older invoice may differ from today's." },
  ],
  benefits: [
    "Check that a bill charges the right amount of tax.",
    "Prepare quotes and invoices quickly and correctly.",
    "Find the pre-tax price behind an MRP or a GST-inclusive quote.",
    "See the CGST, SGST and IGST split for bookkeeping.",
  ],
  assumptions: [
    "One rate is applied to the whole amount. Invoices with several rates need each item calculated separately.",
    "Cess, TCS, and other levies on specific goods are not included.",
    "Results are shown to two decimal places. Invoices follow their own rounding rules.",
    "Rates reflect the GST structure effective from 22 September 2025. Confirm any specific rate on the GST portal.",
  ],
  faqs: [
    { q: "How do I calculate GST on a price?", a: "Multiply the price by the GST rate and divide by 100. For ₹10,000 at 18%, GST is ₹1,800 and the total is ₹11,800." },
    { q: "How do I remove GST from an inclusive price?", a: "Divide the inclusive amount by (1 + rate ÷ 100). For ₹11,800 at 18%, the price before GST is ₹10,000. Do not just subtract 18% of ₹11,800, as that gives the wrong answer." },
    { q: "What is the difference between CGST, SGST and IGST?", a: "CGST goes to the Centre and SGST to the state when a sale is within one state. IGST is charged on sales between states. The total tax is the same." },
    { q: "Which GST rate applies to my product?", a: "It depends on the product or service. Check the rate schedule on the official GST portal or ask your accountant. This calculator only does the arithmetic." },
    { q: "Why is the 'remove GST' answer not 18% less?", a: "Because the GST was charged on the lower pre-tax price, not on the total. Removing 18% from the total takes off too much." },
    { q: "Does this work for services as well?", a: "Yes. The calculation is the same for goods and services. Only the applicable rate differs." },
  ],
  related: ["business/reverse-gst", "business/profit-margin", "business/markup-calculator", "daily-life/discount-calculator"],
  references: [
    { label: "GST Portal (official)", url: "https://www.gst.gov.in/" },
    { label: "CBIC GST (Central Board of Indirect Taxes and Customs)", url: "https://cbic-gst.gov.in/" },
  ],
};

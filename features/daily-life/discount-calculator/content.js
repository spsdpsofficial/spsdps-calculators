export const content = {
  seo: {
    title: "Discount Calculator: Final Price & Savings",
    description:
      "Work out the sale price after a discount, add a second coupon or bank offer, see how much you save and find the original price from a discounted price.",
    keywords: ["discount calculator", "sale price calculator", "percentage discount", "double discount calculator", "original price from discount"],
  },
  h1: "Discount Calculator",
  intro: [
    "Sale tags show a percentage off, but what you really want to know is the final price and how much you save. This calculator gives both, and it can stack a second discount such as a coupon or card offer on top of the first.",
    "You can also work backwards: enter the price you paid and the discount to find the original price.",
  ],
  howTo: [
    "Choose whether you know the original price or the final price.",
    "Enter the price and the discount percentage.",
    "Optionally add an extra discount, which is applied on the reduced price.",
    "Read the final price, the savings and the effective total discount.",
  ],
  formula: {
    expression: "Price after first discount = Original × (1 − D1 ÷ 100)\nFinal price = Price after first discount × (1 − D2 ÷ 100)\nOriginal from final = Final ÷ (1 − D ÷ 100)",
    variables: [
      { symbol: "D1", meaning: "the first discount percentage." },
      { symbol: "D2", meaning: "the extra discount percentage, applied on the already reduced price." },
      { symbol: "Effective discount", meaning: "(Original − Final) ÷ Original × 100." },
    ],
  },
  example: {
    scenario: "A jacket is priced at ₹2,999 with 40% off, and you have a further 10% bank offer.",
    inputs: [
      { label: "Original price", value: "₹2,999" },
      { label: "Discount", value: "40%" },
      { label: "Extra discount", value: "10%" },
    ],
    results: [
      { label: "Final price", value: "₹1,619.46" },
      { label: "You save", value: "₹1,379.54" },
      { label: "Effective discount", value: "46%" },
    ],
    steps: ["2,999 × 0.60 = 1,799.40 after the first discount.", "1,799.40 × 0.90 = 1,619.46 after the extra discount.", "Savings are 2,999 − 1,619.46 = 1,379.54, which is 46% of the original price."],
    expected: { input: { price: 2999, discountPercent: 40, extraPercent: 10 }, finalPrice: 1619.46, saved: 1379.54 },
  },
  factors: [
    { title: "Stacked discounts", text: "40% plus 10% is not 50%. The second discount applies to the reduced price, giving 46% in total." },
    { title: "Order of offers", text: "Percentage discounts give the same total in any order, but flat-amount offers do not." },
    { title: "Taxes and delivery", text: "GST, shipping or convenience fees may be added after the discount." },
    { title: "Offer caps", text: "Bank and coupon offers often have a maximum discount amount, which this calculator does not apply." },
  ],
  benefits: [
    "Know the real price before you buy.",
    "See the true effect of stacked offers.",
    "Find the original price from a sale price.",
  ],
  assumptions: [
    "Both discounts are percentages of the price they apply to.",
    "Maximum-discount caps, minimum order values and taxes are not modelled.",
    "Amounts are shown rounded to the nearest paisa.",
  ],
  faqs: [
    { q: "How do I calculate a discount?", a: "Multiply the price by the discount percentage divided by 100 to get the saving, then subtract it. Or multiply the price by (1 − discount ÷ 100)." },
    { q: "How do two discounts combine?", a: "The second discount is taken on the price after the first, so 40% and 10% make 46%, not 50%." },
    { q: "How do I find the original price from the sale price?", a: "Divide the sale price by (1 − discount ÷ 100). A ₹750 price after 25% off was originally ₹1,000." },
    { q: "Does this include GST?", a: "No. If GST applies on the discounted price, add it with the GST calculator." },
    { q: "What is the effective discount?", a: "The total saving as a percentage of the original price after all discounts." },
  ],
  related: ["daily-life/percentage-calculator", "finance/gst-calculator", "business/reverse-gst", "business/profit-margin"],
  references: [
    { label: "Consumer Affairs, Government of India", url: "https://consumeraffairs.nic.in/" },
    { label: "National Consumer Helpline", url: "https://consumerhelpline.gov.in/" },
  ],
};

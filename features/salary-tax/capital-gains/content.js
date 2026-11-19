export const content = {
  seo: {
    title: "Capital Gains Tax Calculator: STCG & LTCG",
    description:
      "Estimate short-term and long-term capital gains tax on shares, mutual funds, property and other assets sold in India, with the exemption, 12.5% rate and cess.",
    keywords: ["capital gains tax calculator", "ltcg calculator", "stcg calculator", "long term capital gains tax india", "share profit tax calculator"],
  },
  h1: "Capital Gains Tax Calculator",
  intro: [
    "When you sell shares, mutual funds, property or gold for more than you paid, the profit is a capital gain and it is taxed. The rate depends on the asset and on how long you held it. Short holding periods give short-term gains, and longer ones give long-term gains.",
    "This calculator follows the rules that apply to transfers on or after 23 July 2024. It shows the gain, the exemption, the tax and the cess. Always check the latest rules on the Income Tax Department's website before filing.",
  ],
  howTo: [
    "Pick the type of asset you sold.",
    "Enter the purchase price, the sale price and any selling expenses.",
    "Enter how many months you held the asset.",
    "For short-term gains on assets other than listed shares, enter your slab rate, then read the tax.",
  ],
  formula: {
    expression: "Gain = Sale price − Purchase price − Expenses\nListed equity, short-term: 20% of gain\nListed equity, long-term: 12.5% of (gain − ₹1,25,000)\nOther long-term: 12.5% of gain\nCess = 4% of the tax",
    variables: [
      { symbol: "Long-term", meaning: "held for more than 12 months (listed equity) or more than 24 months (property and other assets)." },
      { symbol: "₹1,25,000", meaning: "yearly exemption on long-term gains from listed equity. It is shared across all such gains in the year." },
      { symbol: "Slab rate", meaning: "the rate on your total income, used for short-term gains on other assets." },
    ],
    notes: ["Rates apply to transfers on or after 23 July 2024. Surcharge is not included."],
  },
  example: {
    scenario: "Shares bought for ₹5,00,000 and sold for ₹8,00,000 after 18 months.",
    inputs: [
      { label: "Purchase and sale price", value: "₹5,00,000 and ₹8,00,000" },
      { label: "Holding period", value: "18 months (long-term)" },
    ],
    results: [
      { label: "Capital gain", value: "₹3,00,000" },
      { label: "Taxable after ₹1,25,000 exemption", value: "₹1,75,000" },
      { label: "Tax at 12.5%", value: "₹21,875" },
      { label: "Total with 4% cess", value: "₹22,750" },
    ],
    steps: ["Gain = 8,00,000 − 5,00,000 = ₹3,00,000.", "After the ₹1,25,000 exemption the taxable gain is ₹1,75,000.", "Tax = 12.5% of 1,75,000 = ₹21,875, plus 4% cess of ₹875 = ₹22,750."],
    expected: { input: { assetType: "equity", buyPrice: 500000, sellPrice: 800000, holdingMonths: 18 }, totalTax: 22750 },
  },
  factors: [
    { title: "Holding period", text: "Crossing the long-term threshold changes the rate." },
    { title: "Asset type", text: "Listed equity, property and other assets have different rules." },
    { title: "Exemptions", text: "The ₹1,25,000 exemption applies to listed equity, and sections like 54 and 54F give relief on reinvesting in property." },
    { title: "Losses", text: "Capital losses can be set off against gains, and carried forward in some cases." },
  ],
  benefits: [
    "Know the tax before you sell.",
    "See the effect of waiting until a gain becomes long-term.",
    "Estimate your take-home proceeds.",
  ],
  assumptions: [
    "Transfers on or after 23 July 2024, as the rules stood at the review date.",
    "Surcharge, indexation, rollover exemptions and loss set-off are not modelled.",
    "The ₹1,25,000 exemption is applied to this sale alone. If you have other long-term equity gains in the year, share it.",
    "Equity mutual funds are treated like listed shares. Debt funds and some others follow different rules.",
    "Your slab rate is entered by you.",
  ],
  faqs: [
    { q: "What is the difference between STCG and LTCG?", a: "A short-term gain comes from an asset held for a short period and a long-term gain from one held longer. The cut-off is 12 months for listed equity and 24 months for property and most other assets." },
    { q: "What are the current rates?", a: "For transfers on or after 23 July 2024, listed equity short-term gains are taxed at 20% and long-term gains at 12.5% above ₹1,25,000. Other long-term gains are taxed at 12.5%. Check the Income Tax Department for any change." },
    { q: "Is indexation allowed?", a: "For most assets sold after 23 July 2024, no. There is a limited choice for some land and buildings bought before that date. This calculator does not model it." },
    { q: "Do I pay tax on a capital loss?", a: "No. A loss can be set off against gains within the rules." },
    { q: "Is cess added?", a: "Yes. A 4% health and education cess is charged on the tax." },
    { q: "How can I save capital gains tax?", a: "Options include holding to long-term, using the annual exemption, harvesting losses and using exemptions such as section 54 on reinvesting in a house. Consult a tax professional for your case." },
  ],
  related: ["salary-tax/income-tax", "finance/lumpsum-calculator", "salary-tax/advance-tax", "finance/cagr-calculator"],
  references: [
    { label: "Income Tax Department of India", url: "https://www.incometax.gov.in/" },
    { label: "Central Board of Direct Taxes", url: "https://incometaxindia.gov.in/" },
  ],
};

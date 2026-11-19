export const content = {
  seo: {
    title: "Lumpsum Calculator: Investment Returns",
    description:
      "Find what a one-time lumpsum investment in mutual funds, stocks or deposits could grow to at an expected return, with a year-by-year table and the formula.",
    keywords: ["lumpsum calculator", "lumpsum investment calculator", "mutual fund lumpsum calculator", "one time investment returns", "compound growth calculator"],
  },
  h1: "Lumpsum Calculator",
  intro: [
    "A lumpsum is a one-time investment, unlike a SIP where you invest every month. This calculator shows what a single amount could grow to over the years at a return you expect, using annual compounding.",
    "Compare it with the SIP calculator to see how investing at once differs from investing gradually.",
  ],
  howTo: [
    "Enter the amount you plan to invest.",
    "Enter the return you expect per year.",
    "Enter the number of years.",
    "Read the future value, the returns and the year-wise table.",
  ],
  formula: {
    expression: "Future value = P × (1 + r)^t",
    variables: [
      { symbol: "P", meaning: "the amount invested." },
      { symbol: "r", meaning: "expected annual return as a decimal (12% = 0.12)." },
      { symbol: "t", meaning: "number of years." },
    ],
  },
  example: {
    scenario: "₹1,00,000 invested once at an expected 12% a year for 10 years.",
    inputs: [
      { label: "Amount", value: "₹1,00,000" },
      { label: "Return and period", value: "12% for 10 years" },
    ],
    results: [
      { label: "Future value", value: "₹3,10,585" },
      { label: "Returns", value: "₹2,10,585" },
    ],
    steps: ["Growth factor = 1.12¹⁰ = 3.1058.", "Future value = 1,00,000 × 3.1058 = ₹3,10,585.", "Returns = 3,10,585 − 1,00,000 = ₹2,10,585."],
    expected: { input: { amount: 100000, annualRatePercent: 12, years: 10 }, value: 310585 },
  },
  factors: [
    { title: "Return rate", text: "Even small differences in the rate make a large difference over long periods." },
    { title: "Time", text: "Compounding works best over long periods, as returns earn returns." },
    { title: "Taxes", text: "Capital gains tax reduces what you finally keep. Use the capital gains calculator." },
    { title: "Costs", text: "Expense ratios and fees lower the net return." },
  ],
  benefits: [
    "See the long-term effect of a one-time investment.",
    "Compare lumpsum with SIP.",
    "Set realistic goals with a year-wise view.",
  ],
  assumptions: [
    "Returns are assumed to be constant and compounded annually.",
    "No taxes, exit loads or expense ratios are deducted.",
    "Market-linked returns are not guaranteed.",
  ],
  faqs: [
    { q: "What is a lumpsum investment?", a: "Investing a single amount at one time, instead of in instalments." },
    { q: "How is lumpsum return calculated?", a: "Future value = amount × (1 + annual return)^years." },
    { q: "Is lumpsum better than SIP?", a: "It depends. A lumpsum is exposed to market levels on one day, while a SIP spreads the entry over time. Compare both for your situation." },
    { q: "What return should I assume?", a: "Use a cautious figure. Past returns do not guarantee future returns, and equity returns vary a lot year to year." },
    { q: "Are returns taxed?", a: "Yes, as capital gains or interest depending on the product. Taxes are not deducted here." },
  ],
  related: ["finance/sip-calculator", "finance/cagr-calculator", "finance/swp-calculator", "finance/compound-interest"],
  references: [
    { label: "SEBI Investor Education", url: "https://investor.sebi.gov.in/" },
    { label: "AMFI: Association of Mutual Funds in India", url: "https://www.amfiindia.com/" },
  ],
};

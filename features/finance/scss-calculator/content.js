export const content = {
  seo: {
    title: "SCSS Calculator: Senior Citizen Scheme",
    description:
      "Calculate quarterly interest income from the Senior Citizen Savings Scheme (SCSS) for your deposit and the current rate, plus yearly and 5-year totals.",
    keywords: ["scss calculator", "senior citizen savings scheme calculator", "scss interest calculator", "scss quarterly interest", "senior citizen post office scheme"],
  },
  h1: "SCSS Calculator",
  intro: [
    "The Senior Citizen Savings Scheme (SCSS) is a government-backed scheme that pays interest every quarter, which makes it popular for regular income after retirement. The deposit term is 5 years, and the principal comes back at maturity.",
    "Enter your deposit and the interest rate notified for your deposit date. The calculator shows the quarterly payout and the interest over the whole term.",
  ],
  howTo: [
    "Enter the amount you want to deposit, in multiples of ₹1,000.",
    "Enter the current interest rate.",
    "Read the quarterly interest and the approximate monthly income.",
    "Check the total interest over the 5-year term.",
  ],
  formula: {
    expression: "Quarterly interest = Deposit × Rate ÷ 4\nTotal interest = Quarterly interest × 20",
    variables: [
      { symbol: "Deposit", meaning: "amount deposited, up to ₹30,00,000." },
      { symbol: "Rate", meaning: "annual interest rate as a decimal." },
    ],
    notes: ["Interest is simple and paid out each quarter, so it does not compound."],
  },
  example: {
    scenario: "A retired person deposits ₹15,00,000 in SCSS at an interest rate of 8.2% a year.",
    inputs: [
      { label: "Deposit", value: "₹15,00,000" },
      { label: "Rate", value: "8.2% a year" },
    ],
    results: [
      { label: "Quarterly interest", value: "₹30,750" },
      { label: "Interest per year", value: "₹1,23,000" },
      { label: "Total interest over 5 years", value: "₹6,15,000" },
    ],
    steps: ["Yearly interest = 15,00,000 × 8.2% = ₹1,23,000.", "Quarterly interest = ₹1,23,000 ÷ 4 = ₹30,750.", "Over 20 quarters the total is ₹6,15,000."],
    expected: { input: { deposit: 1500000, annualRatePercent: 8.2 }, quarterly: 30750 },
  },
  factors: [
    { title: "Eligibility", text: "Generally for citizens aged 60 or more, with some rules for early retirees and defence personnel." },
    { title: "Limit", text: "The maximum deposit across accounts is ₹30,00,000." },
    { title: "Tax", text: "Interest is taxable and TDS may be deducted above a threshold." },
    { title: "Extension", text: "The account can be extended by 3 years after maturity under the scheme rules." },
  ],
  benefits: [
    "Know your regular income before depositing.",
    "Compare with an FD interest payout.",
    "Plan retirement cash flow.",
  ],
  assumptions: [
    "The rate you enter is fixed for the 5-year term.",
    "The full 5 years run without early closure.",
    "Tax and TDS are not deducted.",
  ],
  faqs: [
    { q: "Who can invest in SCSS?", a: "Senior citizens generally aged 60 and above, and certain early retirees and defence personnel. Check the latest official rules for details." },
    { q: "What is the maximum SCSS deposit?", a: "₹30,00,000 in total." },
    { q: "How often is the interest paid?", a: "Every quarter, on the first working day of April, July, October and January." },
    { q: "Is SCSS interest taxable?", a: "Yes. It is taxed as per your slab, and TDS can apply when the interest exceeds the threshold. Check the Income Tax Department for the current limit." },
    { q: "Is SCSS better than an FD?", a: "Rates and safety differ. Compare current SCSS and bank FD rates, tax treatment and lock-in before deciding." },
  ],
  related: ["finance/fd-calculator", "finance/nsc-calculator", "finance/swp-calculator", "daily-life/retirement-calculator"],
  references: [
    { label: "India Post", url: "https://www.indiapost.gov.in/" },
    { label: "National Savings Institute", url: "https://www.nsiindia.gov.in/" },
  ],
};

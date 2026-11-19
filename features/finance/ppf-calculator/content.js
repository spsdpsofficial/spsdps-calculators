export const content = {
  seo: {
    title: "PPF Calculator: Maturity & Interest Estimate",
    description:
      "Estimate your PPF maturity value and interest for yearly deposits up to ₹1.5 lakh. See the formula, rate assumption and a worked example in rupees.",
    keywords: ["PPF calculator", "PPF maturity calculator", "PPF interest calculator", "PPF 15 year calculator", "PPF return calculation"],
  },
  h1: "PPF Calculator",
  intro: [
    "The Public Provident Fund (PPF) is a long-term, government-backed savings scheme with a 15-year lock-in. This calculator projects what your yearly deposits could grow to, how much you invest and how much interest you earn.",
    "The PPF interest rate is set by the government and reviewed every quarter, so it can change during your account's life. Use the rate field to test different values, and treat the answer as an estimate rather than a promise.",
  ],
  howTo: [
    "Enter the amount you plan to deposit each year, up to ₹1,50,000.",
    "Check the interest rate. It starts at the rate reported for Oct–Dec 2026, but you can edit it.",
    "Enter the account duration in years (15 or more).",
    "Read the maturity value, total invested and total interest.",
  ],
  formula: {
    expression: "FV = D × [ ((1 + r)ⁿ − 1) ÷ r ] × (1 + r)",
    variables: [
      { symbol: "D", meaning: "yearly deposit, in ₹ (maximum ₹1,50,000)." },
      { symbol: "r", meaning: "yearly interest rate as a fraction (7.1% = 0.071)." },
      { symbol: "n", meaning: "number of years." },
    ],
    notes: ["This assumes you deposit the full amount before the 5th of April each year, so it earns interest for the entire year. Depositing later in the year gives a lower result."],
  },
  example: {
    scenario: "Neha deposits the maximum ₹1,50,000 every year for 15 years at 7.1%.",
    inputs: [
      { label: "Yearly deposit (D)", value: "₹1,50,000" },
      { label: "Rate", value: "7.1% per year" },
      { label: "Duration", value: "15 years" },
    ],
    results: [
      { label: "Total invested", value: "₹22,50,000" },
      { label: "Total interest", value: "₹18,18,209" },
      { label: "Maturity value", value: "₹40,68,209" },
    ],
    steps: [
      "With r = 0.071 and n = 15, ((1.071)¹⁵ − 1) ÷ 0.071 ≈ 26.03.",
      "FV = 1,50,000 × 26.03 × 1.071 ≈ ₹40,68,209.",
      "She invests ₹22,50,000, so the interest is about ₹18,18,209. If the government changes the rate, the result changes too.",
    ],
    expected: { yearlyDeposit: 150000, annualRatePercent: 7.1, years: 15, maturityRounded: 4068209 },
  },
  factors: [
    { title: "Interest rate changes", text: "The rate is reset every quarter. A lower future rate reduces the result; a higher one increases it." },
    { title: "Timing of deposits", text: "Interest is calculated on the lowest balance between the 5th and the end of each month. Depositing before the 5th of April maximises the first year's interest." },
    { title: "Yearly amount", text: "The maximum is ₹1,50,000 a year. Smaller deposits scale the result down proportionally." },
    { title: "Extension", text: "After 15 years you can extend the account in blocks of 5 years, with or without further deposits." },
  ],
  benefits: [
    "Estimate a tax-efficient, low-risk corpus for the long term.",
    "See the benefit of depositing the full amount early in the year.",
    "Test different rate scenarios before committing.",
    "Plan retirement or a child's education with a clear figure.",
  ],
  assumptions: [
    "The full yearly deposit is made at the start of the financial year, and interest compounds yearly.",
    "The interest rate stays constant. In reality it is revised quarterly by the government.",
    "Partial withdrawals, loans against the account and extensions are not modelled.",
    "Tax treatment of PPF can change. Check current rules before relying on it.",
  ],
  faqs: [
    { q: "What is the current PPF interest rate?", a: "The rate reported for October to December 2026 is 7.1%, unchanged after the 30 September 2026 review. The government reviews small savings rates every quarter, so always check the latest notification." },
    { q: "What is the maximum I can deposit in PPF?", a: "₹1,50,000 in a financial year across all your PPF accounts. The minimum is ₹500." },
    { q: "How long is the PPF lock-in?", a: "15 years. After that you can extend the account in blocks of 5 years." },
    { q: "Why is my actual PPF balance different from this result?", a: "Real interest is computed monthly on the lowest balance and credited yearly, deposits may be made at different times, and the rate changes. This calculator uses a simplified best case." },
    { q: "When should I deposit to earn the most interest?", a: "Before the 5th of the month. For the yearly deposit, doing it before 5 April earns interest for the whole year." },
    { q: "Is PPF safe?", a: "It is a government scheme and the rate is set by the government, but always read the current scheme rules from an official source." },
  ],
  related: ["finance/fd-calculator", "finance/sip-calculator", "salary-tax/epf-calculator", "daily-life/retirement-calculator"],
  references: [
    { label: "National Savings Institute (Ministry of Finance)", url: "https://www.nsiindia.gov.in/" },
    { label: "India Post: savings schemes", url: "https://www.indiapost.gov.in/" },
  ],
};

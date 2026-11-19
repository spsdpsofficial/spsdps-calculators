export const content = {
  seo: {
    title: "SWP Calculator: Systematic Withdrawal Plan",
    description:
      "Plan regular monthly income from a lump sum with a systematic withdrawal plan. See how long your money lasts or what is left, with a year-wise table.",
    keywords: ["swp calculator", "systematic withdrawal plan calculator", "mutual fund swp", "monthly income from investment", "retirement withdrawal calculator"],
  },
  h1: "SWP Calculator",
  intro: [
    "A systematic withdrawal plan (SWP) lets you take a fixed amount from your investment every month while the rest keeps growing. It is commonly used to create a regular income from a mutual fund corpus, for example in retirement.",
    "This calculator shows the balance after your chosen period, or tells you how many months the money lasts if the withdrawals are too high.",
  ],
  howTo: [
    "Enter the total amount invested.",
    "Enter the amount you want to withdraw every month.",
    "Enter the return you expect and the number of years.",
    "Check the final value, or how long the money lasts, and the year-wise table.",
  ],
  formula: {
    expression: "Balance after month m = (Balance before − Withdrawal) × (1 + r)\nwhere r = annual return ÷ 12 ÷ 100",
    variables: [
      { symbol: "Withdrawal", meaning: "fixed amount taken at the start of every month." },
      { symbol: "r", meaning: "monthly return rate." },
    ],
    notes: ["The calculator repeats this month by month until the period ends or the balance reaches zero."],
  },
  example: {
    scenario: "₹50,00,000 invested, withdrawing ₹40,000 every month for 20 years, assuming 8% a year.",
    inputs: [
      { label: "Investment and withdrawal", value: "₹50,00,000 and ₹40,000 a month" },
      { label: "Return and period", value: "8% for 20 years" },
    ],
    results: [
      { label: "Total withdrawn", value: "₹96,00,000" },
      { label: "Final value", value: "₹9,16,125" },
    ],
    steps: ["Each month ₹40,000 is withdrawn and the rest grows by 8% ÷ 12.", "After 240 months the total taken out is ₹96,00,000 and ₹9,16,125 remains."],
    expected: { input: { corpus: 5000000, monthlyWithdrawal: 40000, annualRatePercent: 8, months: 240 }, ending: 916125 },
  },
  factors: [
    { title: "Withdrawal rate", text: "Withdrawing a large share of the corpus each year drains it quickly." },
    { title: "Returns and their order", text: "Poor returns in the early years hurt more than the same returns later." },
    { title: "Inflation", text: "A fixed withdrawal buys less every year. Consider raising it over time." },
    { title: "Taxes", text: "Each withdrawal includes some capital gains, which can be taxed." },
  ],
  benefits: [
    "Plan a monthly income from an investment.",
    "See how long a corpus lasts at a given withdrawal.",
    "Test different withdrawals before committing.",
  ],
  assumptions: [
    "A constant return every month and a fixed withdrawal at the start of each month.",
    "No taxes, exit loads or expense ratio changes.",
    "The withdrawal does not increase with inflation.",
  ],
  faqs: [
    { q: "What is an SWP?", a: "A systematic withdrawal plan lets you redeem a fixed amount from a mutual fund at regular intervals." },
    { q: "How long will my money last?", a: "If the withdrawal is too high for the return, the calculator shows how many months the money lasts." },
    { q: "Is SWP income taxable?", a: "Each withdrawal is treated as a redemption, so the gains part is taxed as capital gains. See the capital gains calculator." },
    { q: "What withdrawal rate is safe?", a: "There is no single safe rate. A lower rate is safer and depends on returns, inflation and how long you need the income." },
    { q: "SWP or FD interest payout?", a: "An FD payout is predictable. An SWP is market-linked, so values can fall, but it may offer higher long-term growth." },
  ],
  related: ["finance/lumpsum-calculator", "finance/sip-calculator", "finance/fd-calculator", "daily-life/retirement-calculator"],
  references: [
    { label: "SEBI Investor Education", url: "https://investor.sebi.gov.in/" },
    { label: "AMFI: Association of Mutual Funds in India", url: "https://www.amfiindia.com/" },
  ],
};

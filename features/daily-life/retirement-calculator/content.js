export const content = {
  seo: {
    title: "Retirement Calculator: Corpus & Monthly SIP",
    description:
      "Estimate the retirement corpus you need and the monthly investment required, based on today's expenses, inflation, expected returns and the age you plan to retire.",
    keywords: ["retirement calculator", "retirement corpus calculator", "retirement planning India", "how much to retire", "retirement SIP calculator"],
  },
  h1: "Retirement Calculator",
  intro: [
    "How much money will you need to stop working, and how much should you invest every month to get there? This calculator inflates your current expenses to the day you retire, works out the corpus needed to fund inflation-adjusted withdrawals until your chosen age and then tells you the monthly investment that bridges the gap after your existing savings.",
    "It is a planning tool, not a forecast. Change the assumptions to see how sensitive the answer is to inflation, returns and your retirement age.",
  ],
  howTo: [
    "Enter your current age, the age you want to retire and the age until which you want to plan.",
    "Enter your current monthly expenses in today's rupees.",
    "Set expected inflation and the returns before and after retirement.",
    "Add any retirement savings you already have, then read the corpus and monthly investment.",
  ],
  formula: {
    expression:
      "Expense at retirement = Monthly expense × (1 + inflation)^years to retire\nCorpus = A × (1 − q^T) ÷ (1 − q),  q = (1 + inflation) ÷ (1 + post-retirement return)\nShortfall = Corpus − Savings × (1 + return)^years\nMonthly SIP = Shortfall ÷ annuity-due factor at (return ÷ 12) for months to retire",
    variables: [
      { symbol: "A", meaning: "yearly expenses at retirement, which is the first withdrawal." },
      { symbol: "T", meaning: "number of years in retirement (plan age − retirement age)." },
      { symbol: "q", meaning: "the ratio of inflation growth to return growth after retirement." },
    ],
    notes: ["Withdrawals are taken at the start of each year and rise with inflation. Investments are made at the start of each month."],
  },
  example: {
    scenario: "A 30-year-old plans to retire at 60 and plan until 85, with ₹50,000 monthly expenses and ₹5,00,000 already saved.",
    inputs: [
      { label: "Inflation", value: "6%" },
      { label: "Return before / after retirement", value: "10% / 7%" },
    ],
    results: [
      { label: "Monthly expense at 60", value: "₹2,87,175" },
      { label: "Corpus needed", value: "₹7,71,48,478" },
      { label: "Monthly investment", value: "₹30,019" },
    ],
    steps: [
      "50,000 × 1.06³⁰ = ₹2,87,175 a month at age 60, or ₹34,46,095 a year.",
      "With q = 1.06 ÷ 1.07, the corpus for 25 years of rising withdrawals is about ₹7.71 crore.",
      "₹5 lakh grows to about ₹87.2 lakh by 60. The remaining ₹6.84 crore needs ₹30,019 invested every month.",
    ],
    expected: { input: { age: 30, retireAge: 60, lifeExpectancy: 85, monthlyExpense: 50000, inflation: 6, preReturn: 10, postReturn: 7, savings: 500000 }, corpus: 77148478, monthlySip: 30019 },
  },
  factors: [
    { title: "Inflation", text: "Higher inflation sharply increases the future cost of the same lifestyle." },
    { title: "Retirement age", text: "Retiring later means fewer years to fund and more years to save." },
    { title: "Returns", text: "Small differences in assumed returns change the corpus and the SIP a lot." },
    { title: "Life expectancy", text: "Planning for longer life is safer but needs a larger corpus." },
    { title: "Other income", text: "Pension, rent or part-time income can reduce the corpus needed." },
  ],
  benefits: [
    "See the size of the goal in future rupees.",
    "Learn the monthly amount to invest today.",
    "Compare retirement ages and return assumptions.",
  ],
  assumptions: [
    "Constant inflation and returns. Real markets are volatile.",
    "Expenses are stated in today's rupees and rise with inflation every year.",
    "Taxes on withdrawals and investment costs are not modelled.",
    "Medical emergencies and one-off costs are not included separately.",
    "This is an educational estimate, not investment advice.",
  ],
  faqs: [
    { q: "How much money do I need to retire?", a: "It depends on your expenses, inflation, retirement age and the years you need to fund. This calculator estimates the corpus from those inputs." },
    { q: "What inflation and return should I assume?", a: "Use cautious numbers. Many planners use 5 to 7 per cent inflation, and returns that match the mix of assets you actually hold." },
    { q: "Why is the corpus so large?", a: "Inflation compounds. Expenses of ₹50,000 today become several times larger over three decades." },
    { q: "Is the SIP amount fixed forever?", a: "The calculation assumes a fixed monthly amount. In practice, increasing your SIP every year reduces the starting amount you need." },
    { q: "Does it include EPF, NPS or pension?", a: "No. Enter your existing retirement savings in the savings field and reduce your expenses if a pension will cover part of them." },
    { q: "Should I plan beyond 85?", a: "Planning to 90 or more is a safer choice if you have a family history of long life." },
  ],
  related: ["finance/sip-calculator", "salary-tax/epf-calculator", "finance/ppf-calculator", "daily-life/age-calculator"],
  references: [
    { label: "Pension Fund Regulatory and Development Authority", url: "https://www.pfrda.org.in/" },
    { label: "EPFO", url: "https://www.epfindia.gov.in/" },
    { label: "SEBI Investor Education", url: "https://investor.sebi.gov.in/" },
  ],
};

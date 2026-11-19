export const content = {
  seo: {
    title: "NPS Calculator: Corpus, Lump Sum & Pension",
    description:
      "Estimate your National Pension System corpus at retirement, the lump sum you can withdraw and the monthly pension from the annuity for your age and return.",
    keywords: ["nps calculator", "national pension system calculator", "nps pension calculator", "nps maturity calculator", "nps lump sum and annuity"],
  },
  h1: "NPS Calculator",
  intro: [
    "The National Pension System (NPS) is a market-linked retirement scheme regulated by PFRDA. You contribute regularly until retirement, and at exit part of the corpus buys an annuity that pays a monthly pension, while the rest can be withdrawn as a lump sum.",
    "This calculator projects the corpus from your monthly contribution and expected return, and splits it between the annuity and the lump sum.",
  ],
  howTo: [
    "Enter the monthly amount you will contribute.",
    "Enter your current age and the age you plan to retire.",
    "Enter the return you expect and the share of the corpus used for the annuity.",
    "Enter the annuity rate you expect, then read the corpus, lump sum and pension.",
  ],
  formula: {
    expression: "Corpus = C × ((1 + r)ⁿ − 1) ÷ r × (1 + r)\nMonthly pension = Annuity corpus × annuity rate ÷ 12",
    variables: [
      { symbol: "C", meaning: "monthly contribution." },
      { symbol: "r", meaning: "monthly return (annual ÷ 12 ÷ 100)." },
      { symbol: "n", meaning: "number of months until retirement." },
    ],
    notes: ["Contributions are assumed at the start of each month. The pension is a simple estimate, since insurers' annuity rates vary."],
  },
  example: {
    scenario: "A 30-year-old invests ₹10,000 a month until 60, assuming a 10% return, 40% of the corpus in an annuity at 6%.",
    inputs: [
      { label: "Contribution", value: "₹10,000 a month for 30 years" },
      { label: "Return, annuity share and rate", value: "10%, 40% and 6%" },
    ],
    results: [
      { label: "Corpus at 60", value: "₹2,27,93,253" },
      { label: "Lump sum (60%)", value: "₹1,36,75,952" },
      { label: "Monthly pension", value: "₹45,587" },
    ],
    steps: ["360 monthly contributions of ₹10,000 growing at 10% a year give about ₹2.28 crore.", "40% of the corpus, ₹91,17,301, buys the annuity.", "Pension = 91,17,301 × 6% ÷ 12 = ₹45,587 a month."],
    expected: { input: { monthlyContribution: 10000, currentAge: 30, retirementAge: 60, annualReturnPercent: 10, annuityPercent: 40, annuityRatePercent: 6 }, corpus: 22793253, pension: 45587 },
  },
  factors: [
    { title: "Starting early", text: "Contributions made early have decades to compound." },
    { title: "Asset allocation", text: "NPS lets you choose between equity, corporate bonds and government securities, which changes returns and risk." },
    { title: "Annuity choice", text: "The annuity share and the plan you buy decide the pension." },
    { title: "Rules", text: "Withdrawal and annuity rules are set by PFRDA and have changed over time." },
  ],
  benefits: [
    "See the retirement corpus from a monthly contribution.",
    "Understand the lump sum and pension split.",
    "Test how age and return change the outcome.",
  ],
  assumptions: [
    "A constant return and monthly contributions that do not increase.",
    "The annuity share and annuity rate are your own assumptions.",
    "Tax benefits, charges and exit-rule changes are not modelled.",
    "Pension is not adjusted for inflation.",
  ],
  faqs: [
    { q: "What is NPS?", a: "The National Pension System is a voluntary, market-linked retirement scheme regulated by the Pension Fund Regulatory and Development Authority (PFRDA)." },
    { q: "How much can I withdraw at retirement?", a: "Under the rules at the time of writing, at least 40% of the corpus must buy an annuity and the rest can be withdrawn. Check the latest PFRDA rules because they can change." },
    { q: "Are NPS returns guaranteed?", a: "No. NPS returns depend on markets and on the allocation you choose." },
    { q: "Does the NPS pension increase with inflation?", a: "A standard annuity pays a fixed amount, so its buying power falls over time unless you choose a variant that increases." },
    { q: "What are the tax benefits of NPS?", a: "Contributions can qualify for deductions under certain sections and regimes. Rules change, so check the Income Tax Department's website." },
  ],
  related: ["daily-life/retirement-calculator", "finance/ppf-calculator", "finance/sip-calculator", "salary-tax/epf-calculator"],
  references: [
    { label: "PFRDA: Pension Fund Regulatory and Development Authority", url: "https://www.pfrda.org.in/" },
    { label: "NPS Trust", url: "https://www.npstrust.org.in/" },
  ],
};

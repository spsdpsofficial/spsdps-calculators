export const content = {
  seo: {
    title: "EPF Calculator: PF Corpus at Retirement",
    description:
      "Estimate your EPF balance at retirement from basic salary, age, yearly raise and interest rate. See employee and employer shares and a worked example in rupees.",
    keywords: ["EPF calculator", "PF calculator", "provident fund calculator India", "EPF interest rate calculator", "EPF maturity calculator"],
  },
  h1: "EPF Calculator",
  intro: [
    "The Employees' Provident Fund (EPF) is a retirement savings scheme to which both you and your employer contribute every month. This calculator projects how large your balance could grow by retirement, based on your salary, age, expected raises and the interest rate.",
    "You contribute 12% of your basic salary plus DA. Your employer also contributes 12%, but part of it goes to the Employees' Pension Scheme (EPS) instead of your EPF balance. EPS is 8.33% of wages up to the ₹15,000 ceiling, which is at most ₹1,250 a month. The calculator accounts for this split.",
  ],
  howTo: [
    "Enter your monthly basic salary plus DA.",
    "Enter your current age, the age you expect to retire and your current EPF balance, if any.",
    "Enter the expected yearly salary increase and the EPF interest rate.",
    "Choose whether EPS applies to your employer's share, then read the projected corpus.",
  ],
  formula: {
    expression: "Monthly contribution = 12% × Wage + (12% × Wage − EPS)\nEPS = 8.33% × min(Wage, ₹15,000)\nYear-end balance = Balance + Σ (monthly balance × rate ÷ 12)",
    variables: [
      { symbol: "Wage", meaning: "monthly basic salary + DA." },
      { symbol: "EPS", meaning: "the portion of the employer's 12% that goes to the pension scheme, not to your EPF balance." },
      { symbol: "Rate", meaning: "yearly EPF interest rate. Interest is calculated monthly on the running balance and credited at year end." },
    ],
    notes: ["The employee and employer contributions are added each month, and wages grow by your expected raise at the start of each new year."],
  },
  example: {
    scenario: "Asha, 30, has a basic + DA of ₹30,000, a zero opening balance, expects a 5% raise every year and retires at 58. Interest is 8.25%.",
    inputs: [
      { label: "Basic + DA", value: "₹30,000 a month" },
      { label: "Age", value: "30 to 58 (28 years)" },
      { label: "Raise and rate", value: "5% a year and 8.25%" },
    ],
    results: [{ label: "EPF corpus at 58", value: "₹1,31,17,280 (about ₹1.31 crore)" }],
    steps: [
      "Year 1: employee 12% = ₹3,600; employer 12% = ₹3,600 less EPS of ₹1,250 = ₹2,350. Total ₹5,950 a month.",
      "Each month's balance earns 8.25% ÷ 12, and the total interest is added at year end. Next year the wage rises 5%.",
      "Repeating this for 28 years gives about ₹1,31,17,280. Changing the raise or the rate changes the answer noticeably.",
    ],
    expected: { corpus: 13117280 },
  },
  factors: [
    { title: "Interest rate", text: `EPFO declares the rate every year. ${8.25}% was reported for FY 2025-26. Future rates can be higher or lower.` },
    { title: "Salary growth", text: "Because contributions are a percentage of basic, bigger raises increase the corpus." },
    { title: "Years of service", text: "More years bring more contributions and more compounding. Early years matter most." },
    { title: "EPS split", text: "The pension share reduces what goes into your EPF balance but builds a monthly pension if you meet the conditions." },
  ],
  benefits: [
    "See how long-term compounding builds a retirement fund.",
    "Check how much your employer contributes on your behalf.",
    "Test the effect of a higher or lower interest rate.",
    "Plan how much extra to save through PPF, NPS or mutual funds.",
  ],
  assumptions: [
    "Contributions are made every month, on 12% of basic + DA, with no missed months.",
    "EPS is calculated as 8.33% of wages capped at ₹15,000, for those to whom it applies.",
    "The interest rate is the same every year. Voluntary PF (VPF) is not included.",
    "Interest on very large yearly contributions may be taxable and is not modelled.",
    "Withdrawals and transfers are not modelled.",
  ],
  faqs: [
    { q: "What is the current EPF interest rate?", a: "8.25% was approved for FY 2025-26, as reported after EPFO and government approval. The rate is declared for each financial year, so check epfindia.gov.in for the latest." },
    { q: "How much do I and my employer contribute?", a: "You contribute 12% of basic + DA. Your employer also contributes 12%, of which part (up to ₹1,250 a month) goes to the pension scheme." },
    { q: "How is EPF interest calculated?", a: "Monthly on your running balance, at one-twelfth of the annual rate, and credited at the end of the financial year." },
    { q: "When can I withdraw my EPF?", a: "Full withdrawal is possible on retirement at 58 or later, and partial withdrawals are allowed in specified situations. Check the rules on the EPFO site." },
    { q: "Is EPF interest taxable?", a: "Interest is tax-free up to certain yearly contribution limits, and above those limits interest on the excess can be taxable. Check current rules." },
    { q: "Does this include VPF?", a: "No. Voluntary contributions above 12% are not included." },
  ],
  related: ["finance/ppf-calculator", "salary-tax/gratuity-calculator", "daily-life/retirement-calculator", "salary-tax/salary-calculator"],
  references: [
    { label: "EPFO (official)", url: "https://www.epfindia.gov.in/" },
    { label: "Ministry of Labour and Employment (official)", url: "https://labour.gov.in/" },
  ],
};

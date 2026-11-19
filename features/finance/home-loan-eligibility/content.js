export const content = {
  seo: {
    title: "Home Loan Eligibility Calculator",
    description:
      "Estimate the home loan a bank may give you from your income, existing EMIs, interest rate and tenure using the FOIR method lenders use.",
    keywords: ["home loan eligibility calculator", "how much home loan can I get", "loan eligibility", "FOIR calculator", "home loan amount from salary"],
  },
  h1: "Home Loan Eligibility Calculator",
  intro: [
    "Before you shortlist homes, it helps to know how much a bank is likely to lend you. Lenders mostly look at how much of your income can safely go to EMIs, a measure called the fixed obligations to income ratio (FOIR). This calculator uses that method to turn your income into an estimated loan amount.",
    "The result is an estimate. The final sanction also depends on your credit score, age, employment, the property and the lender's own rules.",
  ],
  howTo: [
    "Enter your monthly net income, including a co-applicant's if applying together.",
    "Enter your existing monthly EMIs, such as car and personal loans.",
    "Set the FOIR, the interest rate and the tenure.",
    "Read the maximum EMI and the loan amount it supports.",
  ],
  formula: {
    expression: "Maximum new EMI = Income × FOIR − Existing EMIs\nLoan = EMI × ((1 + r)ⁿ − 1) ÷ (r × (1 + r)ⁿ)",
    variables: [
      { symbol: "FOIR", meaning: "the share of income that can go to all EMIs, commonly around 40–60%." },
      { symbol: "r", meaning: "monthly interest rate (annual ÷ 12 ÷ 100)." },
      { symbol: "n", meaning: "number of monthly instalments." },
    ],
    notes: ["The loan formula is the EMI formula solved the other way round."],
  },
  example: {
    scenario: "A person earns ₹1,00,000 a month, pays ₹10,000 in existing EMIs and wants a 20-year loan at 8.5%. The lender allows a 45% FOIR.",
    inputs: [
      { label: "Income, existing EMIs", value: "₹1,00,000 and ₹10,000" },
      { label: "FOIR, rate, tenure", value: "45%, 8.5%, 20 years" },
    ],
    results: [
      { label: "Maximum new EMI", value: "₹35,000" },
      { label: "Estimated eligible loan", value: "₹40,33,079" },
    ],
    steps: ["45% of ₹1,00,000 is ₹45,000, and removing the ₹10,000 existing EMI leaves ₹35,000.", "A ₹35,000 EMI over 240 months at 8.5% can repay a loan of about ₹40.3 lakh."],
    expected: { input: { monthlyIncome: 100000, existingEmi: 10000, foirPercent: 45, annualRatePercent: 8.5, tenureMonths: 240 }, loan: 4033079 },
  },
  factors: [
    { title: "Income and stability", text: "Salaried applicants with stable jobs are usually assessed more favourably." },
    { title: "Existing debt", text: "Every existing EMI lowers the room for a new one." },
    { title: "Credit score", text: "A good score can improve both eligibility and the rate." },
    { title: "Age and tenure", text: "Lenders limit the tenure so the loan ends before retirement." },
    { title: "Co-applicant", text: "Adding an earning co-applicant can raise the eligible amount." },
  ],
  benefits: [
    "Know your budget before house hunting.",
    "See how a co-applicant or a lower EMI burden changes eligibility.",
    "Understand what lenders look at.",
  ],
  assumptions: [
    "FOIR is chosen by you. Lenders differ and may use their own rules.",
    "Credit score, age, property value and loan-to-value limits are not modelled.",
    "A single fixed rate for the whole tenure.",
  ],
  faqs: [
    { q: "How is home loan eligibility decided?", a: "Mainly by income, existing obligations, credit score, age, tenure and the property being financed." },
    { q: "What is FOIR?", a: "The fixed obligations to income ratio is the share of your monthly income that goes to EMIs and other fixed payments." },
    { q: "What FOIR should I use?", a: "Many lenders allow 40 to 60 per cent depending on income. Higher incomes tend to get higher limits. Ask your bank for its exact policy." },
    { q: "Can I increase my eligibility?", a: "Clear existing loans, add a co-applicant, choose a longer tenure or improve your credit score." },
    { q: "Is this a guaranteed loan amount?", a: "No. It is an estimate. The bank decides after verifying your documents and the property." },
  ],
  related: ["finance/home-loan", "finance/emi-calculator", "finance/loan-prepayment", "finance/stamp-duty-calculator"],
  references: [
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
    { label: "National Housing Bank", url: "https://nhb.org.in/" },
  ],
};

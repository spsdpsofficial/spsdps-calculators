export const content = {
  seo: {
    title: "Salary Calculator: In-Hand Salary in ₹",
    description:
      "Estimate your monthly in-hand salary from basic, HRA and allowances after PF, professional tax and income tax. Includes the formula and a worked example.",
    keywords: ["salary calculator", "in hand salary calculator", "take home salary calculator India", "salary after PF and tax", "monthly salary calculator"],
  },
  h1: "Salary Calculator",
  intro: [
    "Your in-hand salary is what reaches your bank account after deductions. This calculator starts from the components on your offer letter or pay slip (basic, HRA and allowances) and subtracts the employee PF, professional tax and an estimate of income tax.",
    "It is useful for checking an offer, comparing two jobs and planning a monthly budget. If you only know your yearly CTC, use the CTC to In-Hand calculator, which first splits the CTC into components.",
  ],
  howTo: [
    "Enter your monthly basic salary, HRA and other allowances.",
    "Choose how PF is calculated on your pay slip: full basic or the ₹15,000 wage ceiling.",
    "Enter the professional tax your state deducts each month.",
    "Choose whether to include an income tax estimate, then read your monthly and yearly in-hand salary.",
  ],
  formula: {
    expression: "In-hand = Gross − Employee PF − Professional tax − TDS\nGross = Basic + HRA + Allowances\nEmployee PF = 12% × PF wage",
    variables: [
      { symbol: "Gross", meaning: "total monthly salary before deductions." },
      { symbol: "PF wage", meaning: "basic salary, or ₹15,000 if PF is limited to the statutory wage ceiling." },
      { symbol: "TDS", meaning: "estimated monthly income tax = annual new-regime tax on gross × 12 ÷ 12." },
    ],
    notes: ["The income tax estimate uses the new regime with the ₹75,000 standard deduction, resident individual."],
  },
  example: {
    scenario: "Karan has a basic of ₹60,000, HRA of ₹30,000 and other allowances of ₹40,000 a month, with PF on full basic and professional tax of ₹200.",
    inputs: [
      { label: "Gross monthly salary", value: "₹1,30,000" },
      { label: "Employee PF (12% of ₹60,000)", value: "₹7,200" },
      { label: "Professional tax", value: "₹200" },
    ],
    results: [
      { label: "Monthly income tax (estimate)", value: "₹8,905" },
      { label: "Monthly in-hand salary", value: "₹1,13,695" },
    ],
    steps: [
      "Annual gross = ₹1,30,000 × 12 = ₹15,60,000. After the ₹75,000 standard deduction, taxable income is ₹14,85,000.",
      "New-regime tax with 4% cess is ₹1,06,860 a year, which is ₹8,905 a month.",
      "In-hand = 1,30,000 − 7,200 − 200 − 8,905 = ₹1,13,695.",
    ],
    expected: { inHand: 113695 },
  },
  factors: [
    { title: "Basic salary", text: "PF is based on basic, so a higher basic increases PF and reduces in-hand pay, but builds a bigger retirement corpus." },
    { title: "Tax regime", text: "The calculator assumes the new regime. If you opt for the old regime and claim deductions, your TDS can be lower." },
    { title: "State", text: "Professional tax differs by state and may be zero." },
    { title: "Other deductions", text: "Insurance premiums, NPS, loans, and canteen or transport recoveries are not included." },
  ],
  benefits: [
    "Compare offers on in-hand pay, not just CTC.",
    "Check that your pay slip deductions look reasonable.",
    "Plan a monthly budget with a realistic take-home figure.",
    "See how a higher basic or lower PF base changes pay.",
  ],
  assumptions: [
    "Income tax is an estimate for a resident individual under the new regime for FY 2026-27.",
    "Salary is the same every month and you have no other income.",
    "Employer PF, gratuity, bonuses paid yearly and reimbursements are not part of the monthly gross here.",
    "Your employer's payroll is the final reference.",
  ],
  faqs: [
    { q: "What is the difference between CTC and in-hand salary?", a: "CTC is the total cost to the company, including employer PF, gratuity and benefits. In-hand salary is what you receive after your own deductions." },
    { q: "How much PF is deducted from salary?", a: "The employee share is 12% of the PF wage, which is your basic salary or ₹15,000 if your employer uses the wage ceiling." },
    { q: "Why does my pay slip show a different tax amount?", a: "Employers deduct tax based on your declarations, the regime you chose and your income through the year. This calculator uses a simple new-regime estimate." },
    { q: "Is professional tax the same everywhere?", a: "No. It is levied by some states and the slabs differ. The maximum is ₹2,500 a year." },
    { q: "Does the in-hand figure include bonus?", a: "Only if you include it in the allowances. Yearly bonuses and variable pay are paid separately and taxed on payment." },
  ],
  related: ["salary-tax/ctc-to-in-hand", "salary-tax/income-tax", "salary-tax/professional-tax", "salary-tax/epf-calculator"],
  references: [
    { label: "EPFO (official)", url: "https://www.epfindia.gov.in/" },
    { label: "Income Tax Department (official portal)", url: "https://www.incometax.gov.in/" },
  ],
};

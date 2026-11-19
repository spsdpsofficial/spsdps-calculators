export const content = {
  seo: {
    title: "CTC to In-Hand Salary Calculator (₹)",
    description:
      "Convert your annual CTC into monthly in-hand salary. See basic, HRA, special allowance, PF and income tax, with the formula and a worked example in rupees.",
    keywords: ["CTC to in hand salary calculator", "CTC to take home calculator", "CTC breakup calculator India", "in hand salary from CTC", "salary structure calculator"],
  },
  h1: "CTC to In-Hand Salary Calculator",
  intro: [
    "CTC (cost to company) is the total amount your employer spends on you in a year. It includes things you never receive as monthly pay, such as the employer's PF contribution and gratuity. That is why the money reaching your bank account is lower than CTC ÷ 12.",
    "This calculator splits an annual CTC into basic, HRA and special allowance, removes the employer contributions, and then deducts your PF, professional tax and an estimate of income tax to show your monthly take-home pay.",
  ],
  howTo: [
    "Enter your annual CTC.",
    "Enter basic salary as a percentage of CTC and HRA as a percentage of basic. Check your offer letter; 40–50% is common for basic.",
    "Choose how PF is calculated and whether gratuity is inside your CTC.",
    "Enter professional tax per month and read your estimated monthly in-hand salary.",
  ],
  formula: {
    expression: "Gross salary = CTC − Employer PF − Gratuity\nSpecial allowance = Gross − Basic − HRA\nIn-hand = Gross − Employee PF − Professional tax − Income tax",
    variables: [
      { symbol: "Basic", meaning: "CTC × basic %." },
      { symbol: "Employer PF / Employee PF", meaning: "12% of the PF wage each, where the PF wage is basic or the ₹15,000 ceiling." },
      { symbol: "Gratuity", meaning: "basic × 15 ÷ 26 ÷ 12 a year, if it is counted in CTC." },
    ],
    notes: ["Income tax is estimated for a resident individual under the new regime, using the ₹75,000 standard deduction."],
  },
  example: {
    scenario: "Anita's offer has a CTC of ₹15,00,000, with a basic of 40%, HRA at 50% of basic, PF on full basic and gratuity included.",
    inputs: [
      { label: "Annual CTC", value: "₹15,00,000" },
      { label: "Basic (40%) and HRA (50% of basic)", value: "₹6,00,000 and ₹3,00,000" },
      { label: "Employer PF and gratuity", value: "₹72,000 and ₹28,846" },
    ],
    results: [
      { label: "Gross salary", value: "₹13,99,154 a year (₹1,16,596 a month)" },
      { label: "Income tax (estimate)", value: "₹81,768 a year" },
      { label: "Monthly in-hand salary", value: "₹1,03,582" },
    ],
    steps: [
      "Gross = 15,00,000 − 72,000 − 28,846 = ₹13,99,154. Special allowance = 13,99,154 − 6,00,000 − 3,00,000 = ₹4,99,154.",
      "Employee PF = 12% of ₹6,00,000 = ₹72,000. Professional tax = ₹2,400 a year. New-regime tax on ₹13,24,154 (after the ₹75,000 standard deduction) with cess is ₹81,768.",
      "Yearly in-hand = 13,99,154 − 72,000 − 2,400 − 81,768 = ₹12,42,986, or about ₹1,03,582 a month.",
    ],
    expected: { monthly: 103582 },
  },
  factors: [
    { title: "Basic %", text: "A higher basic raises PF and gratuity, which lowers your in-hand pay now but raises long-term savings." },
    { title: "PF base", text: "If PF is limited to the ₹15,000 wage ceiling, less is deducted, and more is paid to you." },
    { title: "Variable pay and benefits", text: "Bonuses, insurance and other benefits can be part of CTC but are paid differently. This tool assumes everything left after PF and gratuity is monthly fixed pay." },
    { title: "Tax regime and declarations", text: "Your employer's TDS depends on the regime you choose and investment proofs you submit." },
  ],
  benefits: [
    "Compare job offers by take-home pay rather than headline CTC.",
    "Understand each component of your salary structure.",
    "Plan a budget and rent before accepting an offer.",
    "Ask HR sharper questions about structure.",
  ],
  assumptions: [
    "Resident individual, new tax regime for FY 2026-27, standard deduction only.",
    "CTC consists of gross salary, employer PF and optionally gratuity. Insurance, bonus, and perks should be removed from CTC first.",
    "Employer contribution to NPS and other tax-saving structures are not modelled.",
    "The final figure comes from your employer's payroll.",
  ],
  faqs: [
    { q: "Why is my in-hand salary much lower than CTC ÷ 12?", a: "Because CTC includes employer PF, gratuity and possibly bonus or insurance that are not paid monthly, and you also pay PF, tax and professional tax." },
    { q: "How do I find my basic salary percentage?", a: "It is in your offer letter or salary structure. Many companies use 40–50% of CTC." },
    { q: "Is employer PF part of my salary?", a: "It is part of CTC and is deposited to your PF account, but it is not paid to you monthly." },
    { q: "Does the tax estimate match my payslip?", a: "It is an estimate under the new regime. Your payslip depends on your chosen regime, declarations and any other income." },
    { q: "What if my CTC includes a variable component?", a: "Remove the expected variable pay from the CTC before entering it, because it is paid separately." },
  ],
  related: ["salary-tax/salary-calculator", "salary-tax/income-tax", "salary-tax/epf-calculator", "salary-tax/gratuity-calculator"],
  references: [
    { label: "EPFO (official)", url: "https://www.epfindia.gov.in/" },
    { label: "Income Tax Department (official portal)", url: "https://www.incometax.gov.in/" },
  ],
};

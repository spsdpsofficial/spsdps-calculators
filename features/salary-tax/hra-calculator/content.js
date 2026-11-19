export const content = {
  seo: {
    title: "HRA Calculator: Exemption & Taxable HRA",
    description:
      "Calculate your HRA exemption using the least-of-three rule. Enter basic salary, HRA, rent and city to see exempt and taxable HRA, with a worked example.",
    keywords: ["HRA calculator", "HRA exemption calculator", "house rent allowance calculator", "HRA tax exemption", "HRA metro 50%"],
  },
  h1: "HRA Calculator",
  intro: [
    "House Rent Allowance (HRA) is part of many salaries. If you pay rent, a portion of your HRA can be exempt from tax. This calculator applies the standard rule and shows how much of your HRA is exempt and how much is taxable.",
    "HRA exemption is available only if you choose the old tax regime. The exempt amount is the lowest of three figures, so it can be lower than the HRA you receive, especially if your rent is low or you live in a non-metro city.",
  ],
  howTo: [
    "Enter your monthly basic salary plus dearness allowance (DA).",
    "Enter the HRA you receive each month and the rent you pay.",
    "Select the city category: the eight metro cities listed, or any other city.",
    "Read the monthly and yearly exemption and the taxable HRA.",
  ],
  formula: {
    expression: "Exemption = least of:\n  (1) HRA received\n  (2) Rent paid − 10% of (Basic + DA)\n  (3) 50% of (Basic + DA) for metros, 40% otherwise",
    variables: [
      { symbol: "Basic + DA", meaning: "monthly basic salary plus dearness allowance." },
      { symbol: "Metro", meaning: "Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune and Ahmedabad, for FY 2026-27 onwards." },
    ],
    notes: ["Taxable HRA = HRA received − exemption. For FY 2025-26 and earlier, only Delhi, Mumbai, Kolkata and Chennai counted as metros."],
  },
  example: {
    scenario: "Sneha lives in Bengaluru with a basic of ₹50,000 and HRA of ₹25,000 a month. She pays ₹30,000 rent.",
    inputs: [
      { label: "Basic + DA", value: "₹50,000 a month" },
      { label: "HRA received", value: "₹25,000 a month" },
      { label: "Rent paid", value: "₹30,000 a month" },
    ],
    results: [
      { label: "Exempt HRA", value: "₹25,000 a month (₹3,00,000 a year)" },
      { label: "Taxable HRA", value: "₹0" },
    ],
    steps: [
      "(1) HRA received = ₹25,000.",
      "(2) Rent − 10% of salary = 30,000 − 5,000 = ₹25,000.",
      "(3) 50% of salary (Bengaluru counts as a metro from FY 2026-27) = ₹25,000.",
      "The least is ₹25,000, so the whole HRA is exempt. If Bengaluru were treated as non-metro, the third limit would be ₹20,000.",
    ],
    expected: { input: { basicDa: 50000, hraReceived: 25000, rentPaid: 30000, metro: true }, exempt: 25000 },
  },
  factors: [
    { title: "City", text: "Metro cities allow 50% of salary as a limit and others 40%. The list of metros was widened for FY 2026-27." },
    { title: "Rent paid", text: "If rent is low, the second limit reduces the exemption. Rent above 10% of salary is what counts." },
    { title: "Tax regime", text: "HRA exemption works only in the old regime. In the new regime, the whole HRA is taxable." },
    { title: "Proof", text: "Rent receipts and the landlord's PAN are usually needed if yearly rent exceeds the limit set by tax rules." },
  ],
  benefits: [
    "Know how much HRA you can claim before declaring to your employer.",
    "Decide between the old and new regimes with HRA in mind.",
    "See how moving city or negotiating rent changes your tax.",
    "Plan the rent and HRA split in a job offer.",
  ],
  assumptions: [
    "Salary and rent are the same every month of the year.",
    "You are in the old tax regime. In the new regime, HRA is not exempt.",
    "Basic salary includes DA that forms part of retirement benefits, and commission based on turnover if any.",
    "City categories reflect the FY 2026-27 rule as reported on 11 November 2026. Confirm on incometax.gov.in.",
  ],
  faqs: [
    { q: "How is HRA exemption calculated?", a: "It is the least of the HRA you receive, the rent you pay minus 10% of salary, and 50% (metro) or 40% (non-metro) of salary." },
    { q: "Which cities count as metros for HRA?", a: "For FY 2026-27 onwards: Delhi, Mumbai, Kolkata, Chennai, Bengaluru, Hyderabad, Pune and Ahmedabad. Earlier years had only the first four." },
    { q: "Can I claim HRA in the new tax regime?", a: "No. HRA exemption is available only under the old regime." },
    { q: "Can I claim HRA if I live with my parents?", a: "You can if you actually pay rent to them, they declare it as income, and you have the needed proof. Rules on related-party rent are strict, so take professional advice." },
    { q: "What if I do not pay rent?", a: "Then no HRA exemption can be claimed and the full HRA is taxable." },
    { q: "Do I need the landlord's PAN?", a: "If yearly rent is above the limit specified in the tax rules, the landlord's PAN is needed. Check the current limit on the Income Tax Department website." },
  ],
  related: ["salary-tax/income-tax", "salary-tax/salary-calculator", "salary-tax/ctc-to-in-hand", "salary-tax/professional-tax"],
  references: [
    { label: "Income Tax Department (official portal)", url: "https://www.incometax.gov.in/" },
    { label: "Union Budget (official)", url: "https://www.indiabudget.gov.in/" },
  ],
};

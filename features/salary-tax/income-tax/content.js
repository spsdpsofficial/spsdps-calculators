export const content = {
  seo: {
    title: "Income Tax Calculator FY 2026-27 (₹)",
    description:
      "Compare income tax under the new and old regimes for FY 2026-27. See taxable income, rebate, cess and which regime saves you more, with a worked example.",
    keywords: ["income tax calculator", "income tax calculator FY 2026-27", "new vs old tax regime calculator", "tax calculator India", "salary tax calculator"],
  },
  h1: "Income Tax Calculator (FY 2026-27)",
  intro: [
    "This calculator estimates your income tax for FY 2026-27 under both the new and the old tax regime and tells you which one costs less. Enter your gross annual income and, for the old regime, the total deductions you can claim.",
    "The new regime has lower slab rates, a higher standard deduction and a rebate that makes tax nil up to ₹12 lakh of taxable income, but allows very few deductions. The old regime has higher rates but lets you claim deductions such as 80C, 80D, home-loan interest and HRA. The right choice depends on how much you can actually claim.",
    "Tax rules are revised in the Union Budget. The rates used here were last checked on 11 November 2026 against published summaries of the FY 2026-27 rules; please confirm them on the Income Tax Department website before filing.",
  ],
  howTo: [
    "Enter your gross annual income (salary and other normal-rate income, before any deduction).",
    "Choose whether you are salaried, because salaried taxpayers get a standard deduction.",
    "Select your age group. It changes the old regime's basic exemption limit only.",
    "Enter your total old-regime deductions. Leave it at 0 if you will not claim any.",
    "Compare the two results and note which regime is cheaper.",
  ],
  formula: {
    expression: "Taxable income = Gross income − Standard deduction − Deductions (old regime only)\nTax = Slab tax − Rebate (87A) + Surcharge (if any)\nTotal = Tax × (1 + 4% cess)",
    variables: [
      { symbol: "Standard deduction", meaning: "₹75,000 in the new regime and ₹50,000 in the old regime, for salaried taxpayers." },
      { symbol: "Rebate (87A)", meaning: "new regime: up to ₹60,000 if taxable income is up to ₹12,00,000; old regime: up to ₹12,500 if taxable income is up to ₹5,00,000." },
      { symbol: "Surcharge", meaning: "10% above ₹50 lakh, 15% above ₹1 crore, 25% above ₹2 crore and above ₹5 crore 25% (new) or 37% (old), with marginal relief." },
      { symbol: "Cess", meaning: "4% health and education cess on tax plus surcharge." },
    ],
    notes: [
      "New regime slabs: nil up to ₹4 lakh, 5% for ₹4–8 lakh, 10% for ₹8–12 lakh, 15% for ₹12–16 lakh, 20% for ₹16–20 lakh, 25% for ₹20–24 lakh and 30% above ₹24 lakh.",
      "Old regime slabs (below 60): nil up to ₹2.5 lakh, 5% for ₹2.5–5 lakh, 20% for ₹5–10 lakh and 30% above ₹10 lakh. Senior citizens (60–79) have a ₹3 lakh exemption limit and those 80 or older ₹5 lakh.",
      "Near ₹12 lakh in the new regime, marginal relief limits tax to the amount by which taxable income exceeds ₹12 lakh.",
    ],
  },
  example: {
    scenario: "Divya is salaried, aged 32, with a gross income of ₹15,00,000. She can claim ₹2,00,000 of old-regime deductions.",
    inputs: [
      { label: "Gross annual income", value: "₹15,00,000" },
      { label: "Old-regime deductions", value: "₹2,00,000" },
    ],
    results: [
      { label: "New regime tax (taxable ₹14,25,000)", value: "₹97,500" },
      { label: "Old regime tax (taxable ₹12,50,000)", value: "₹1,95,000" },
      { label: "Saving with the new regime", value: "₹97,500" },
    ],
    steps: [
      "New regime: ₹15,00,000 − ₹75,000 = ₹14,25,000. Tax = 5% of ₹4 lakh (₹20,000) + 10% of ₹4 lakh (₹40,000) + 15% of ₹2,25,000 (₹33,750) = ₹93,750. Add 4% cess: ₹97,500.",
      "Old regime: ₹15,00,000 − ₹50,000 − ₹2,00,000 = ₹12,50,000. Tax = ₹12,500 + 20% of ₹5 lakh (₹1,00,000) + 30% of ₹2,50,000 (₹75,000) = ₹1,87,500. Add 4% cess: ₹1,95,000.",
      "At these numbers the new regime is cheaper. The old regime would only win if her deductions were much larger.",
    ],
    expected: { income: 1500000, deductions: 200000, newTax: 97500, oldTax: 195000 },
  },
  factors: [
    { title: "Your deductions", text: "The more you can claim under the old regime, the better it looks. Without large deductions the new regime is usually cheaper." },
    { title: "Income level", text: "Up to ₹12 lakh of taxable income the new-regime rebate makes tax nil. Above it, tax rises quickly because of the slab rates." },
    { title: "Age", text: "In the old regime, senior citizens have higher exemption limits. The new regime does not vary by age." },
    { title: "Type of income", text: "Capital gains, lottery winnings and some other income are taxed at special rates and are not covered here." },
  ],
  benefits: [
    "Choose between the two regimes with real numbers.",
    "Estimate your tax before the year ends and plan investments.",
    "Understand how rebate, surcharge and cess change the final amount.",
    "See your effective tax rate, not just the slab.",
  ],
  assumptions: [
    "Resident individual, with income from salary or other normal-rate sources.",
    "Rates and limits for FY 2026-27 as read on 11 November 2026. Confirm on incometax.gov.in.",
    "Capital gains, special-rate income, advance-tax interest, TDS credits and employer NPS contribution are not included.",
    "Old-regime deductions are taken as one total that you have already limited to what the law allows.",
    "Salaried people are assumed to claim the standard deduction in full.",
  ],
  faqs: [
    { q: "Which tax regime is better for me?", a: "The calculator compares both. As a rule, the new regime tends to be cheaper unless you claim a large amount of deductions such as 80C, home-loan interest and HRA." },
    { q: "Is income up to ₹12 lakh really tax-free?", a: "Under the new regime a rebate of up to ₹60,000 makes tax nil if taxable income is up to ₹12 lakh. For a salaried person this corresponds to a gross income of ₹12.75 lakh after the ₹75,000 standard deduction. It does not apply to special-rate income." },
    { q: "What is the standard deduction?", a: "A flat deduction from salary income: ₹75,000 in the new regime and ₹50,000 in the old regime." },
    { q: "What is marginal relief?", a: "A safeguard so that someone just above a limit does not pay more tax than the income earned above that limit. Here it is applied around ₹12 lakh in the new regime and at the surcharge thresholds." },
    { q: "Is cess added to my tax?", a: "Yes. A 4% health and education cess is charged on the tax plus any surcharge, and it is included in the results." },
    { q: "Can I switch regimes every year?", a: "Salaried taxpayers can usually choose each year, while some other taxpayers have restrictions. Check the Income Tax Department rules for your situation." },
    { q: "Does this replace a tax professional?", a: "No. It gives an estimate for planning. For filing, use the official portal or a qualified tax professional." },
  ],
  related: ["salary-tax/hra-calculator", "salary-tax/salary-calculator", "salary-tax/epf-calculator", "salary-tax/ctc-to-in-hand"],
  references: [
    { label: "Income Tax Department (official portal)", url: "https://www.incometax.gov.in/" },
    { label: "Union Budget (official)", url: "https://www.indiabudget.gov.in/" },
  ],
};

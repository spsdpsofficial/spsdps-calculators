export const content = {
  seo: {
    title: "Professional Tax Calculator by State (₹)",
    description:
      "Find the professional tax deducted from your salary in Maharashtra, West Bengal, Telangana, Andhra Pradesh, Gujarat, Tamil Nadu or Kerala, with slabs and an example.",
    keywords: ["professional tax calculator", "professional tax slab", "PT calculator India", "Maharashtra professional tax", "professional tax state wise"],
  },
  h1: "Professional Tax Calculator",
  intro: [
    "Professional tax is a small tax that some Indian states charge on salaried people and professionals. It is usually deducted from your pay by your employer and depends on your state and on how much you earn.",
    "This calculator shows the amount for the states listed, based on their salary slabs. Several states levy it monthly, while Tamil Nadu and Kerala work on half-yearly income. The tax is capped at ₹2,500 a year.",
    "Professional tax rules are set by each state and can be revised. States where the available sources disagreed, such as Karnataka, are deliberately not listed yet. Check your state's official notification before relying on the figure.",
  ],
  howTo: [
    "Select the state where you work.",
    "Enter your monthly gross salary.",
    "Read the professional tax per month (or half-year) and the total for the year.",
    "Enter the monthly amount in the Salary or CTC calculators to see your take-home pay.",
  ],
  formula: {
    expression: "Professional tax = amount of the slab that contains your gross salary",
    variables: [
      { symbol: "Slab", meaning: "a salary range set by the state, each with a fixed amount of tax." },
      { symbol: "Period", meaning: "most states charge monthly. Tamil Nadu and Kerala use half-yearly income and half-yearly amounts." },
    ],
    notes: [
      "In Maharashtra, the top slab pays ₹200 a month and ₹300 in February, so the year totals ₹2,500.",
      "Yearly professional tax cannot exceed ₹2,500.",
    ],
  },
  example: {
    scenario: "Pooja works in Maharashtra and earns a gross salary of ₹50,000 a month.",
    inputs: [
      { label: "State", value: "Maharashtra" },
      { label: "Monthly gross salary", value: "₹50,000" },
    ],
    results: [
      { label: "Per month", value: "₹200 (₹300 in February)" },
      { label: "For the year", value: "₹2,500" },
    ],
    steps: [
      "A salary above ₹10,000 falls in the top slab, which is ₹200 a month.",
      "In February ₹300 is deducted so that the year totals 11 × 200 + 300 = ₹2,500.",
    ],
    expected: { state: "maharashtra", gross: 50000, yearly: 2500 },
  },
  factors: [
    { title: "State", text: "Each state has its own slabs, and some states do not levy professional tax at all." },
    { title: "Gross salary", text: "The slab is based on salary, so a raise can move you into a higher slab." },
    { title: "Gender and age rules", text: "Some states give exemptions to certain groups, such as women up to a limit or senior citizens. Check your state's rules." },
    { title: "Payment frequency", text: "Monthly in most states, half-yearly in Tamil Nadu and Kerala." },
  ],
  benefits: [
    "Know what will be deducted from your pay slip.",
    "Check that your employer deducts the right amount.",
    "Compare take-home pay between states.",
    "Fill the professional tax field in other salary calculators accurately.",
  ],
  assumptions: [
    "Slabs reflect each state's published rules as checked on 11 November 2026.",
    "Only seven states are included so far. Karnataka, Odisha, Madhya Pradesh and others are not yet listed.",
    "Gender-specific or other special exemptions are not modelled.",
    "Your employer's payroll and state notification are final.",
  ],
  faqs: [
    { q: "What is professional tax?", a: "A state tax on income from employment or a profession. Employers deduct it from salaries and pay it to the state." },
    { q: "Is there a limit on professional tax?", a: "Yes, ₹2,500 per year under the Constitution." },
    { q: "Why is February different in Maharashtra?", a: "The monthly amount is ₹200, and ₹300 is charged in February so the total for the year is ₹2,500." },
    { q: "Is professional tax deductible from income tax?", a: "Professional tax paid is generally allowed as a deduction from salary income in the old regime. Check current rules for your situation." },
    { q: "Do all states charge professional tax?", a: "No. Only some states and union territories do. Check whether your state does." },
    { q: "Why is my state missing?", a: "Only states whose slabs could be matched against more than one source are included so far. More will be added after checking official notifications." },
  ],
  related: ["salary-tax/salary-calculator", "salary-tax/ctc-to-in-hand", "salary-tax/income-tax", "salary-tax/hra-calculator"],
  references: [
    { label: "Maharashtra Goods and Services Tax Department (professional tax)", url: "https://mahagst.gov.in/" },
    { label: "Income Tax Department (official portal)", url: "https://www.incometax.gov.in/" },
  ],
};

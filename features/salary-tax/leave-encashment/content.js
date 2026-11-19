export const content = {
  seo: {
    title: "Leave Encashment Calculator & Tax Exemption",
    description:
      "Calculate leave encashment from your average salary and leave days, and see the tax-exempt and taxable parts on retirement or leaving, with the ₹25 lakh limit.",
    keywords: ["leave encashment calculator", "leave encashment tax exemption", "leave encashment formula", "earned leave encashment", "leave encashment on retirement"],
  },
  h1: "Leave Encashment Calculator",
  intro: [
    "Leave encashment is the money an employer pays for leave you did not take. It is usually paid when you retire or leave the job, and sometimes while you are still in service. The tax treatment depends on when and from whom you receive it.",
    "This calculator works out the amount from your average salary and the days encashed. It also shows how much is exempt from tax and how much is taxable.",
  ],
  howTo: [
    "Enter your average monthly salary for the last 10 months (basic plus dearness allowance).",
    "Enter the number of leave days encashed.",
    "Choose whether it is on leaving or during service, and the type of employer.",
    "Enter years of service and leave already taken, then read the exempt and taxable amounts.",
  ],
  formula: {
    expression: "Encashment = Average monthly salary ÷ 30 × Leave days\nExempt = the least of: amount received, 10 × average monthly salary, ₹25,00,000, and the cash value of the leave entitlement",
    variables: [
      { symbol: "Entitlement", meaning: "30 days of leave for each year of service, less leave already taken or encashed." },
      { symbol: "₹25,00,000", meaning: "the overall exemption limit for leave encashed on retirement or leaving, across employers." },
    ],
    notes: ["Central and state government employees get the whole amount exempt on retirement. During service, leave encashment is fully taxable."],
  },
  example: {
    scenario: "A private-sector employee retires after 20 years with an average monthly salary of ₹1,00,000 and encashes 400 days of leave, having taken 100 days earlier.",
    inputs: [
      { label: "Salary and leave encashed", value: "₹1,00,000 and 400 days" },
      { label: "Service and leave taken", value: "20 years and 100 days" },
    ],
    results: [
      { label: "Encashment received", value: "₹13,33,333" },
      { label: "Exempt from tax", value: "₹10,00,000" },
      { label: "Taxable", value: "₹3,33,333" },
    ],
    steps: ["Per-day value = 1,00,000 ÷ 30 = ₹3,333.33, so 400 days gives ₹13,33,333.", "The four limits are ₹13,33,333, ₹10,00,000 (10 months' salary), ₹25,00,000 and the entitlement (500 days, so all 400 days).", "The lowest is ₹10,00,000, so ₹3,33,333 is taxable as salary."],
    expected: { input: { avgMonthlySalary: 100000, daysEncashed: 400, yearsOfService: 20, leaveTaken: 100, timing: "leaving", employer: "private" }, exempt: 1000000, taxable: 333333 },
  },
  factors: [
    { title: "Timing", text: "Encashment while you are working is fully taxable. The exemption is for retirement or leaving." },
    { title: "Employer type", text: "Government employees are fully exempt on retirement." },
    { title: "Salary definition", text: "Basic, dearness allowance and some commission count. Other allowances do not." },
    { title: "Earlier encashments", text: "Amounts received from earlier employers count towards the ₹25 lakh limit." },
  ],
  benefits: [
    "Estimate the cash you will receive.",
    "See how much will be taxed.",
    "Plan for retirement or a job change.",
  ],
  assumptions: [
    "A month is taken as 30 days when finding the value of a day.",
    "Leave entitlement is 30 days for each completed year of service. Your employer's rules may differ.",
    "The ₹25 lakh limit is applied to this payment alone. Earlier amounts are not tracked.",
    "Tax slab effects on the taxable part are not calculated here.",
  ],
  faqs: [
    { q: "What is leave encashment?", a: "A payment from the employer for unused leave, usually on retirement or leaving, and sometimes during service." },
    { q: "Is leave encashment taxable?", a: "It is taxable as salary while you are in service. On retirement or leaving, a part is exempt for non-government employees, and the whole is exempt for government employees." },
    { q: "What is the exemption limit?", a: "The least of the amount received, 10 months' average salary, ₹25,00,000, and the cash value of the leave entitlement. Check the Income Tax Department for the current rules." },
    { q: "Which salary is used?", a: "The average of the last 10 months before retirement, with basic pay, dearness allowance and some commission." },
    { q: "How many leaves can I accumulate?", a: "It depends on your employer's policy. The tax rules count 30 days of entitlement for each year of service." },
  ],
  related: ["salary-tax/gratuity-calculator", "salary-tax/income-tax", "salary-tax/salary-calculator", "daily-life/retirement-calculator"],
  references: [
    { label: "Income Tax Department of India", url: "https://www.incometax.gov.in/" },
    { label: "Central Board of Direct Taxes", url: "https://incometaxindia.gov.in/" },
  ],
};

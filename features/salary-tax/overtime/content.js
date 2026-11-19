export const content = {
  seo: {
    title: "Overtime Pay Calculator for India",
    description:
      "Calculate overtime pay from your monthly wage, working days, daily hours and overtime hours. Set the multiplier, such as double rate, and see your total pay.",
    keywords: ["overtime calculator", "overtime pay calculator india", "ot salary calculation", "overtime hourly rate", "double overtime calculation"],
  },
  h1: "Overtime Pay Calculator",
  intro: [
    "Overtime is pay for hours worked beyond your normal working hours. To work it out you need your hourly rate, which comes from your monthly wage, and the rate multiplier that applies to overtime hours.",
    "Many employers in India pay overtime at twice the normal hourly rate, but the right multiplier depends on your contract, your employer's policy and the law that applies to your work. Set it to match.",
  ],
  howTo: [
    "Enter your monthly wage and the number of working days in the month.",
    "Enter your normal working hours in a day.",
    "Enter the overtime hours and the overtime multiplier.",
    "Read the overtime pay and your total pay for the month.",
  ],
  formula: {
    expression: "Hourly rate = Monthly wage ÷ Working days ÷ Hours per day\nOvertime pay = Hourly rate × Multiplier × Overtime hours",
    variables: [
      { symbol: "Multiplier", meaning: "1 for the normal rate, 2 for double rate and so on." },
      { symbol: "Working days", meaning: "the days your employer uses to divide the monthly wage, often 26 or 30." },
    ],
  },
  example: {
    scenario: "A worker earns ₹26,000 a month, works 26 days of 8 hours, and does 10 hours of overtime paid at double rate.",
    inputs: [
      { label: "Wage, days, hours", value: "₹26,000, 26 days, 8 hours" },
      { label: "Overtime", value: "10 hours at 2×" },
    ],
    results: [
      { label: "Normal hourly rate", value: "₹125" },
      { label: "Overtime hourly rate", value: "₹250" },
      { label: "Overtime pay", value: "₹2,500" },
    ],
    steps: ["Hourly rate = 26,000 ÷ 26 ÷ 8 = ₹125.", "Overtime rate at 2× = ₹250 an hour.", "Overtime pay = 250 × 10 = ₹2,500."],
    expected: { input: { monthlyWage: 26000, daysPerMonth: 26, hoursPerDay: 8, overtimeHours: 10, multiplier: 2 }, pay: 2500 },
  },
  factors: [
    { title: "Wage definition", text: "Some employers use basic pay plus dearness allowance, others the full wage." },
    { title: "Days in month", text: "Using 26 instead of 30 gives a higher hourly rate." },
    { title: "Multiplier", text: "Double rate is common, but contracts and state rules differ." },
    { title: "Deductions", text: "PF, ESI and income tax may be applied to overtime pay." },
  ],
  benefits: [
    "Check your overtime payment on a payslip.",
    "Estimate extra earnings from additional hours.",
    "Compare different multipliers or day counts.",
  ],
  assumptions: [
    "The multiplier, working days and hours are the values you enter.",
    "Overtime is paid for hours beyond your normal hours, in whole or part hours.",
    "No tax or other deductions are applied.",
  ],
  faqs: [
    { q: "How is overtime calculated?", a: "Divide the monthly wage by the working days and by the hours per day to get the hourly rate, then multiply by the overtime multiplier and the hours." },
    { q: "Is overtime paid at double rate in India?", a: "Many workplaces covered by labour laws pay twice the ordinary rate for overtime, but it depends on your employer, the establishment and the applicable state rules. Check your contract." },
    { q: "Which wage should I use?", a: "Use the wage your employer uses for overtime, which is often basic pay plus dearness allowance." },
    { q: "Should I divide by 26 or 30?", a: "Use whatever your employer uses. Dividing by 26 gives a higher hourly rate than dividing by 30." },
    { q: "Is overtime taxable?", a: "Yes, overtime pay is part of salary income and taxed with the rest of it." },
  ],
  related: ["salary-tax/salary-calculator", "salary-tax/salary-hike", "salary-tax/ctc-to-in-hand", "daily-life/time-duration"],
  references: [
    { label: "Ministry of Labour and Employment", url: "https://labour.gov.in/" },
    { label: "Government of India portal", url: "https://www.india.gov.in/" },
  ],
};

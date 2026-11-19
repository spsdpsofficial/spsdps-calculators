export const content = {
  seo: {
    title: "Simple Interest Calculator in ₹",
    description:
      "Find simple interest and the total amount for any principal, rate and time in rupees. Enter time in years, months or days, with the formula and an example.",
    keywords: ["simple interest calculator", "simple interest formula", "SI calculator India", "simple interest per month", "interest calculator"],
  },
  h1: "Simple Interest Calculator",
  intro: [
    "Simple interest is calculated only on the original amount, not on interest already earned. It is common in short-term personal loans, some small lending arrangements and school maths. This calculator gives the interest and the total repayable for any principal, rate and period.",
    "You can enter the time in years, months or days, and the calculator converts it for you. If your lender charges interest on a reducing balance, as with most bank loans, use the EMI Calculator instead.",
  ],
  howTo: [
    "Enter the principal: the amount borrowed or invested.",
    "Enter the interest rate per year.",
    "Enter the time and choose whether it is in years, months or days.",
    "Read the interest, the total amount and the time in years.",
  ],
  formula: {
    expression: "SI = P × R × T ÷ 100      Total = P + SI",
    variables: [
      { symbol: "P", meaning: "principal amount in ₹." },
      { symbol: "R", meaning: "interest rate per year, in percent." },
      { symbol: "T", meaning: "time in years (months ÷ 12, days ÷ 365)." },
    ],
  },
  example: {
    scenario: "Kiran lends ₹2,00,000 at 9% simple interest for 3 years.",
    inputs: [
      { label: "Principal (P)", value: "₹2,00,000" },
      { label: "Rate (R)", value: "9% per year" },
      { label: "Time (T)", value: "3 years" },
    ],
    results: [
      { label: "Simple interest", value: "₹54,000" },
      { label: "Total amount", value: "₹2,54,000" },
    ],
    steps: ["SI = 2,00,000 × 9 × 3 ÷ 100 = ₹54,000.", "Total = 2,00,000 + 54,000 = ₹2,54,000."],
    expected: { principal: 200000, annualRatePercent: 9, time: 3, unit: "years", interest: 54000 },
  },
  factors: [
    { title: "Principal", text: "Interest is directly proportional to the principal." },
    { title: "Rate", text: "Check whether the rate is yearly or monthly. A 2% monthly rate is 24% a year." },
    { title: "Time", text: "Interest grows in a straight line with time, unlike compound interest." },
    { title: "Day count", text: "Daily periods here use a 365-day year. Some lenders use 360 days." },
  ],
  benefits: [
    "Quickly check interest on a personal loan or deposit.",
    "Convert monthly or daily periods into a yearly rate calculation.",
    "Compare with compound interest to see the difference.",
    "Useful for school and exam practice with real rupee values.",
  ],
  assumptions: [
    "The rate and principal stay constant for the whole period.",
    "No part-payments, fees, or tax are included.",
    "Days are converted using a 365-day year.",
  ],
  faqs: [
    { q: "What is the simple interest formula?", a: "SI = P × R × T ÷ 100, where P is the principal, R the yearly rate in percent and T the time in years." },
    { q: "How do I calculate simple interest for months?", a: "Divide the number of months by 12 to get years, then use the formula. For 6 months, T = 0.5." },
    { q: "How is it different from compound interest?", a: "Simple interest is only on the original principal. Compound interest is on the principal plus interest earned so far, so it grows faster." },
    { q: "Do banks use simple interest?", a: "Most bank loans use a reducing balance and most deposits compound. Simple interest is more common in informal lending and some short products." },
    { q: "What if the rate is given per month?", a: "Multiply it by 12 to get the yearly rate before entering it here." },
  ],
  related: ["finance/compound-interest", "finance/emi-calculator", "finance/fd-calculator", "daily-life/percentage-calculator"],
  references: [
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
    { label: "SEBI Investor education", url: "https://investor.sebi.gov.in/" },
  ],
};

export const content = {
  seo: {
    title: "Compound Interest Calculator in ₹",
    description:
      "Calculate compound interest and the final amount on a sum in rupees. Choose the compounding frequency and see year-wise growth, the formula and an example.",
    keywords: ["compound interest calculator", "compound interest formula", "compound interest calculator India", "CI calculator", "interest on interest"],
  },
  h1: "Compound Interest Calculator",
  intro: [
    "Compound interest is interest earned on both your original money and the interest it has already earned. This calculator shows how a sum grows over time and how much of the final amount is interest, with the compounding frequency you choose.",
    "The longer the money stays invested, the bigger the gap between compound and simple interest. The year-wise table lets you see that effect building year by year.",
  ],
  howTo: [
    "Enter the principal: the amount you start with.",
    "Enter the yearly interest rate.",
    "Enter the time period in years. Decimals such as 2.5 are allowed.",
    "Choose how often interest is compounded, then read the final amount and interest.",
  ],
  formula: {
    expression: "A = P × (1 + r ÷ n) ^ (n × t)",
    variables: [
      { symbol: "A", meaning: "final amount, in ₹." },
      { symbol: "P", meaning: "principal (starting amount)." },
      { symbol: "r", meaning: "yearly interest rate as a fraction (8% = 0.08)." },
      { symbol: "n", meaning: "times interest is compounded each year." },
      { symbol: "t", meaning: "time in years." },
    ],
    notes: ["Compound interest = A − P."],
  },
  example: {
    scenario: "Arjun invests ₹1,00,000 at 8% a year for 10 years, compounded monthly.",
    inputs: [
      { label: "Principal (P)", value: "₹1,00,000" },
      { label: "Rate", value: "8% per year" },
      { label: "Time and frequency", value: "10 years, monthly (n = 12)" },
    ],
    results: [
      { label: "Final amount", value: "₹2,21,964" },
      { label: "Compound interest", value: "₹1,21,964" },
    ],
    steps: [
      "Monthly rate = 8% ÷ 12 = 0.6667%, and the number of months = 10 × 12 = 120.",
      "A = 1,00,000 × (1.006667)¹²⁰ ≈ ₹2,21,964.",
      "Interest = 2,21,964 − 1,00,000 = ₹1,21,964. Simple interest at 8% would give only ₹80,000.",
    ],
    expected: { principal: 100000, annualRatePercent: 8, years: 10, timesPerYear: 12, amountRounded: 221964 },
  },
  factors: [
    { title: "Rate", text: "Even a one-point higher rate adds a lot over a long period." },
    { title: "Time", text: "Compounding is slow at first and fast later. Extra years add more than extra rupees." },
    { title: "Frequency", text: "More frequent compounding gives a slightly higher amount at the same stated rate." },
    { title: "Withdrawals and additions", text: "Taking money out reduces future growth; adding money raises it. This calculator assumes neither." },
  ],
  benefits: [
    "Understand why starting early matters.",
    "Compare daily, monthly, quarterly and yearly compounding.",
    "Estimate growth for deposits and some loans that compound.",
    "See the difference from simple interest.",
  ],
  assumptions: [
    "The rate and compounding frequency stay the same for the full period.",
    "No extra deposits or withdrawals are made.",
    "Tax and charges are not deducted.",
    "Daily compounding uses 365 days in a year.",
  ],
  faqs: [
    { q: "What is the formula for compound interest?", a: "A = P × (1 + r ÷ n)^(n × t), and compound interest = A − P." },
    { q: "How is compound interest different from simple interest?", a: "Simple interest is calculated only on the original principal. Compound interest is calculated on principal plus interest already earned." },
    { q: "Does monthly compounding give much more than yearly?", a: "A little more. At 8% for 10 years, monthly compounding gives about ₹2,21,964 on ₹1,00,000, while yearly compounding gives about ₹2,15,892." },
    { q: "Can I use it for a loan?", a: "Only for loans that compound without regular repayments. For regular EMI loans, use the EMI Calculator." },
    { q: "What is the Rule of 72?", a: "A rough shortcut: divide 72 by the yearly rate to estimate how many years it takes to double the money. At 8%, about 9 years." },
  ],
  related: ["finance/simple-interest", "finance/fd-calculator", "finance/sip-calculator", "finance/emi-calculator"],
  references: [
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
    { label: "SEBI Investor education", url: "https://investor.sebi.gov.in/" },
  ],
};

export const content = {
  seo: {
    title: "Inflation Calculator: Future Cost",
    description:
      "See how inflation raises future costs and shrinks the buying power of your money. Enter an amount, an inflation rate and years to plan goals realistically.",
    keywords: ["inflation calculator", "inflation calculator india", "future value of money", "purchasing power calculator", "cost after inflation"],
  },
  h1: "Inflation Calculator",
  intro: [
    "Inflation is the steady rise in prices, so money buys less over time. If something costs ₹1,00,000 today, it will cost more in ten years. This calculator shows both sides: the future cost of what you buy today, and how much your money will be worth in today's terms.",
    "Use it to set realistic targets for education, a wedding, retirement or any long-term goal.",
  ],
  howTo: [
    "Enter an amount in today's money.",
    "Enter the yearly inflation you expect.",
    "Enter the number of years.",
    "Read the future cost and the reduced purchasing power.",
  ],
  formula: {
    expression: "Future cost = Amount × (1 + i)^t\nPurchasing power = Amount ÷ (1 + i)^t",
    variables: [
      { symbol: "i", meaning: "yearly inflation as a decimal (6% = 0.06)." },
      { symbol: "t", meaning: "number of years." },
    ],
  },
  example: {
    scenario: "Something that costs ₹1,00,000 today, with inflation of 6% a year for 10 years.",
    inputs: [
      { label: "Amount today", value: "₹1,00,000" },
      { label: "Inflation and period", value: "6% for 10 years" },
    ],
    results: [
      { label: "Future cost", value: "₹1,79,085" },
      { label: "Today's ₹1,00,000 will buy only", value: "₹55,839 worth" },
    ],
    steps: ["Growth factor = 1.06¹⁰ = 1.7908.", "Future cost = 1,00,000 × 1.7908 = ₹1,79,085.", "Purchasing power = 1,00,000 ÷ 1.7908 = ₹55,839."],
    expected: { input: { amount: 100000, inflationPercent: 6, years: 10 }, future: 179085 },
  },
  factors: [
    { title: "Inflation rate", text: "Even a few percentage points more has a large effect over decades." },
    { title: "Time", text: "The longer the period, the greater the erosion." },
    { title: "Category", text: "Education, healthcare and housing often inflate faster than the general index." },
    { title: "Real return", text: "A return below the inflation rate means your money loses buying power." },
  ],
  benefits: [
    "Set goals in tomorrow's money rather than today's.",
    "Understand why saving in cash loses value.",
    "Estimate how much to invest to stay ahead.",
  ],
  assumptions: [
    "A constant inflation rate every year.",
    "Your own personal inflation may be higher or lower than the national rate.",
    "No interest or investment returns on the money are included.",
  ],
  faqs: [
    { q: "What is inflation?", a: "A general rise in prices, which reduces the quantity of goods and services one rupee can buy." },
    { q: "What inflation rate should I use?", a: "Many people use 5 to 7 per cent for long-term planning in India. Check recent RBI and government releases and use a rate that matches the cost you are planning for." },
    { q: "How do I find the inflation rate between two prices?", a: "Raise the ratio of the new price to the old price to the power of one over the years, and subtract one." },
    { q: "Is my savings account keeping up with inflation?", a: "Only if its interest rate is higher than inflation, after tax. Otherwise the real value of your savings falls." },
    { q: "Does it show returns on investment?", a: "No. For that, use the compound interest, SIP or lumpsum calculators and compare the result with inflation." },
  ],
  related: ["finance/present-future-value", "finance/compound-interest", "daily-life/retirement-calculator", "finance/lumpsum-calculator"],
  references: [
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
    { label: "Ministry of Statistics and Programme Implementation", url: "https://www.mospi.gov.in/" },
  ],
};

export const content = {
  seo: {
    title: "Present Value & Future Value Calculator",
    description:
      "Find the future value of money you have today or the present value of money you will receive later, at any rate, period and compounding frequency.",
    keywords: ["present value calculator", "future value calculator", "time value of money calculator", "pv fv calculator", "discount rate calculator"],
  },
  h1: "Present Value and Future Value Calculator",
  intro: [
    "A rupee today is worth more than a rupee a year from now, because today's rupee can earn a return. This idea is called the time value of money. Use this calculator to find the future value of a sum you hold today, or the present value of a sum you will receive later.",
    "It supports yearly, half-yearly, quarterly and monthly compounding.",
  ],
  howTo: [
    "Choose whether you want the future value or the present value.",
    "Enter the amount, the yearly rate and the number of years.",
    "Pick how often the rate compounds.",
    "Read the result and the difference.",
  ],
  formula: {
    expression: "Future value = PV × (1 + r ÷ m)^(m × t)\nPresent value = FV ÷ (1 + r ÷ m)^(m × t)",
    variables: [
      { symbol: "r", meaning: "annual rate as a decimal." },
      { symbol: "m", meaning: "compounding periods in a year (1, 2, 4 or 12)." },
      { symbol: "t", meaning: "number of years." },
    ],
  },
  example: {
    scenario: "₹1,00,000 at 8% a year, compounded quarterly, for 5 years.",
    inputs: [
      { label: "Amount", value: "₹1,00,000" },
      { label: "Rate, period, compounding", value: "8%, 5 years, quarterly" },
    ],
    results: [
      { label: "Future value of ₹1,00,000 today", value: "₹1,48,595" },
      { label: "Present value of ₹1,00,000 received in 5 years", value: "₹67,297" },
    ],
    steps: ["Quarterly rate = 8% ÷ 4 = 2% over 20 quarters, giving 1.02²⁰ = 1.4859.", "Future value = 1,00,000 × 1.4859 = ₹1,48,595.", "Present value = 1,00,000 ÷ 1.4859 = ₹67,297."],
    expected: { input: { annualRatePercent: 8, years: 5, compounding: "quarterly" }, fv: 148595, pv: 67297 },
  },
  factors: [
    { title: "Rate", text: "A higher rate increases future value and lowers present value." },
    { title: "Time", text: "The longer the period, the larger the gap between present and future values." },
    { title: "Compounding", text: "More frequent compounding gives a slightly higher future value." },
  ],
  benefits: [
    "Compare money at different points in time.",
    "Judge whether a future payment is worth taking now.",
    "Plan savings goals.",
  ],
  assumptions: [
    "A constant rate for the whole period.",
    "A single amount, with no regular deposits or withdrawals.",
    "No tax or charges.",
  ],
  faqs: [
    { q: "What is present value?", a: "The value today of an amount you will receive in the future, discounted at a chosen rate." },
    { q: "What is future value?", a: "What an amount today will grow to after earning a given rate for a period." },
    { q: "What discount rate should I use?", a: "Use the return you could reasonably earn on the money elsewhere, such as a fixed deposit rate or a cautious investment return." },
    { q: "How is this different from compound interest?", a: "It is the same maths. This tool also works backwards from a future amount to today's value." },
    { q: "Does compounding frequency matter?", a: "Slightly. More frequent compounding gives a slightly higher result at the same annual rate." },
  ],
  related: ["finance/compound-interest", "finance/inflation-calculator", "finance/lumpsum-calculator", "finance/fd-calculator"],
  references: [
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
    { label: "SEBI Investor Education", url: "https://investor.sebi.gov.in/" },
  ],
};

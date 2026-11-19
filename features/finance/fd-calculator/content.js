export const content = {
  seo: {
    title: "FD Calculator: Maturity Amount & Interest",
    description:
      "Calculate the maturity amount and interest on a fixed deposit in rupees. Choose the compounding frequency and see the formula with a worked example.",
    keywords: ["FD calculator", "fixed deposit calculator", "FD maturity calculator", "FD interest calculator India", "FD calculation formula"],
  },
  h1: "FD Calculator",
  intro: [
    "A fixed deposit (FD) pays a fixed rate of interest for a set period. This calculator shows what your FD will be worth at maturity and how much of it is interest, based on the amount, the rate, the tenure and how often interest is compounded.",
    "Banks usually compound FD interest quarterly, but some use monthly or yearly compounding. The choice changes the maturity amount slightly, so match it to what your bank states on the deposit receipt.",
  ],
  howTo: [
    "Enter the amount you plan to deposit.",
    "Enter the yearly interest rate offered by your bank or institution.",
    "Enter the tenure in years. Use decimals for part years, for example 1.5 for 18 months.",
    "Choose how often the interest is compounded and read the maturity amount and interest earned.",
  ],
  formula: {
    expression: "A = P × (1 + r ÷ n) ^ (n × t)",
    variables: [
      { symbol: "A", meaning: "maturity amount, in ₹." },
      { symbol: "P", meaning: "the amount you deposit." },
      { symbol: "r", meaning: "yearly interest rate as a fraction (7.1% = 0.071)." },
      { symbol: "n", meaning: "times interest is compounded in a year (quarterly = 4)." },
      { symbol: "t", meaning: "tenure in years." },
    ],
    notes: ["Interest earned = A − P. The effective yield shown in the chart is the yearly growth rate after compounding."],
  },
  example: {
    scenario: "Meena deposits ₹5,00,000 for 5 years at 7.1% a year, compounded quarterly.",
    inputs: [
      { label: "Deposit (P)", value: "₹5,00,000" },
      { label: "Rate", value: "7.1% per year" },
      { label: "Tenure and compounding", value: "5 years, quarterly (n = 4)" },
    ],
    results: [
      { label: "Maturity amount", value: "₹7,10,873" },
      { label: "Interest earned", value: "₹2,10,873" },
    ],
    steps: [
      "Quarterly rate = 7.1% ÷ 4 = 1.775%, and the number of quarters = 5 × 4 = 20.",
      "A = 5,00,000 × (1.01775)²⁰ ≈ ₹7,10,873.",
      "Interest = 7,10,873 − 5,00,000 = ₹2,10,873, before any tax.",
    ],
    expected: { principal: 500000, annualRatePercent: 7.1, years: 5, timesPerYear: 4, maturityRounded: 710873 },
  },
  factors: [
    { title: "Interest rate", text: "Rates differ between banks and by tenure and depositor age. Compare the rate for your exact tenure." },
    { title: "Tenure", text: "Longer deposits earn more in total, but money is locked in. Premature withdrawal usually carries a penalty." },
    { title: "Compounding frequency", text: "More frequent compounding gives a slightly higher maturity amount at the same stated rate." },
    { title: "Tax", text: "FD interest is added to your income and taxed at your slab rate. TDS may be cut if interest crosses the bank's limit." },
  ],
  benefits: [
    "Know the exact maturity value before you open a deposit.",
    "Compare FDs with different rates, tenures and compounding.",
    "Plan for a fixed future expense such as fees or a down payment.",
    "See how much of the maturity value is interest.",
  ],
  assumptions: [
    "The rate is fixed for the whole tenure and interest is reinvested (cumulative FD).",
    "Interest is not paid out periodically. A payout FD earns less because interest is not reinvested.",
    "Tax, TDS, and penalties for early withdrawal are not included.",
    "Your bank's receipt is the final reference. Small differences can arise from day-count methods.",
  ],
  faqs: [
    { q: "How is FD maturity calculated?", a: "With A = P × (1 + r ÷ n)^(n × t). The calculator applies it using your amount, rate, tenure and compounding frequency." },
    { q: "Why is my bank's maturity amount slightly different?", a: "Banks may use different compounding conventions or count days differently. The bank's deposit receipt is the final figure." },
    { q: "Is FD interest taxable?", a: "Yes. Interest is taxed as income at your slab rate, and banks may deduct TDS. Check the Income Tax Department for current rules." },
    { q: "What is the difference between cumulative and payout FDs?", a: "In a cumulative FD interest is added to the deposit and compounds. In a payout FD interest is paid out at intervals, so the final amount is lower but you receive regular income." },
    { q: "Does a higher compounding frequency matter a lot?", a: "Only slightly. Moving from yearly to quarterly compounding adds a small amount over a few years, but the difference grows with larger sums and longer tenures." },
    { q: "Can I use this for a recurring deposit?", a: "No. A recurring deposit adds money every month. Use the RD Calculator for that." },
  ],
  related: ["finance/rd-calculator", "finance/compound-interest", "finance/ppf-calculator", "finance/simple-interest"],
  references: [
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
    { label: "Income Tax Department of India", url: "https://www.incometax.gov.in/" },
  ],
};

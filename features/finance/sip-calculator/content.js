export const content = {
  seo: {
    title: "SIP Calculator: Future Value of Investments",
    description:
      "Estimate the future value of a monthly SIP in rupees. See total invested, estimated returns and year-wise growth, with the formula and a worked example.",
    keywords: ["SIP calculator", "SIP return calculator", "mutual fund SIP calculator", "monthly SIP calculator India", "SIP formula"],
  },
  h1: "SIP Calculator",
  intro: [
    "A SIP (systematic investment plan) lets you invest a fixed amount every month instead of a lump sum. This calculator estimates what a monthly SIP could grow to if it earned a steady yearly return, and splits the result into what you put in and what it may have earned.",
    "SIPs work through regular investing and compounding: returns earned in earlier years also earn returns later. The year-wise table shows how the growth speeds up in the later years, which is why starting early and staying invested matters more than the size of any single instalment.",
  ],
  howTo: [
    "Enter the amount you plan to invest every month.",
    "Enter the yearly return you expect. This is an assumption, so try a cautious figure as well as an optimistic one.",
    "Enter how many years you will keep investing.",
    "Read the estimated future value, the amount invested and the estimated returns, then open the year-wise table.",
  ],
  formula: {
    expression: "FV = P × [ ((1 + i)ⁿ − 1) ÷ i ] × (1 + i)",
    variables: [
      { symbol: "P", meaning: "amount invested every month, in ₹." },
      { symbol: "i", meaning: "monthly rate = expected yearly return ÷ 12 ÷ 100." },
      { symbol: "n", meaning: "number of monthly instalments = years × 12." },
    ],
    notes: [
      "The last factor (1 + i) assumes each instalment is invested at the start of the month. If the return is 0%, the value is simply P × n.",
      "Invested amount = P × n, and estimated returns = FV − invested amount.",
    ],
  },
  example: {
    scenario: "Ravi starts a SIP of ₹10,000 a month and assumes a 12% yearly return for 10 years.",
    inputs: [
      { label: "Monthly investment (P)", value: "₹10,000" },
      { label: "Expected return", value: "12% per year (i = 1% a month)" },
      { label: "Period", value: "10 years (n = 120)" },
    ],
    results: [
      { label: "Amount invested", value: "₹12,00,000" },
      { label: "Estimated returns", value: "₹11,23,391" },
      { label: "Estimated future value", value: "₹23,23,391" },
    ],
    steps: [
      "With i = 0.01 and n = 120, ((1.01)¹²⁰ − 1) ÷ 0.01 ≈ 230.04.",
      "FV = 10,000 × 230.04 × 1.01 ≈ ₹23,23,391.",
      "Ravi invests ₹12,00,000 in total, so the estimated gain is about ₹11,23,391. Real returns will differ from year to year.",
    ],
    expected: { monthly: 10000, rate: 12, years: 10, futureValue: 2323391, returns: 1123391 },
  },
  factors: [
    { title: "Expected return", text: "A small change in the assumed return makes a big difference over a long period. Avoid planning around the highest figure you have seen." },
    { title: "Time period", text: "Because of compounding, extra years add more than extra rupees. Ten more years usually matters more than a larger instalment." },
    { title: "Monthly amount and step-ups", text: "Raising your SIP as your income grows increases the result. This calculator keeps the amount fixed." },
    { title: "Costs and taxes", text: "Fund expenses, exit loads and taxes on gains reduce what you keep. They are not deducted here." },
  ],
  benefits: [
    "Turn a goal (a down payment, education, retirement) into a monthly amount you can plan around.",
    "Compare different amounts, returns and periods in seconds.",
    "Build the habit of investing regularly instead of trying to time the market.",
    "See how much of the final value comes from your money and how much from assumed growth.",
  ],
  assumptions: [
    "The return is constant every year. Market-linked investments do not behave this way.",
    "Instalments are invested at the start of each month and returns compound monthly.",
    "No expense ratio, exit load, tax, or inflation adjustment is applied.",
    "The result is an estimate for planning. It is not a promise or a forecast of any fund.",
  ],
  faqs: [
    { q: "What does SIP stand for?", a: "SIP stands for systematic investment plan: investing a fixed amount at regular intervals, usually every month, in a mutual fund or similar product." },
    { q: "Is the SIP return guaranteed?", a: "No. Market-linked returns vary and can be negative, especially over short periods. The calculator uses the yearly return you enter as an assumption." },
    { q: "What return should I assume?", a: "There is no right number. Use a conservative figure for planning, compare it with a lower and a higher one, and remember that past performance does not predict future results." },
    { q: "Why is the future value higher than the money I put in?", a: "Because returns earned in earlier months earn returns of their own. This compounding is small at first and much larger in later years." },
    { q: "Does this include inflation?", a: "No. A future amount buys less than the same amount today. To judge purchasing power, reduce the return by an assumed inflation rate and run it again." },
    { q: "Can I use it for a lump sum?", a: "This tool is for monthly instalments. For a one-time investment, use the Compound Interest Calculator." },
  ],
  related: ["finance/compound-interest", "finance/rd-calculator", "daily-life/retirement-calculator", "finance/fd-calculator"],
  references: [
    { label: "AMFI: Association of Mutual Funds in India", url: "https://www.amfiindia.com/" },
    { label: "SEBI: Securities and Exchange Board of India", url: "https://www.sebi.gov.in/" },
  ],
};

export const content = {
  seo: {
    title: "ROI Calculator: Return on Investment",
    description:
      "Calculate return on investment as a percentage from your cost and final value, plus the annualised ROI over the holding period, with a worked example.",
    keywords: ["roi calculator", "return on investment calculator", "roi formula", "annualised roi calculator", "investment profit calculator"],
  },
  h1: "ROI Calculator",
  intro: [
    "Return on investment (ROI) measures how much you gained or lost compared with what you put in. It works for shares, property, a business purchase, a course, or any spending where you expect a return.",
    "Enter the cost and the final value. If you also enter how long you held the investment, the calculator shows the annualised ROI, which lets you compare investments held for different lengths of time.",
  ],
  howTo: [
    "Enter the amount you invested.",
    "Enter the final value, including any income you received.",
    "Optionally enter the years held.",
    "Read the ROI, the profit or loss and the annualised ROI.",
  ],
  formula: {
    expression: "ROI = (Final value − Cost) ÷ Cost × 100\nAnnualised ROI = ((Final value ÷ Cost)^(1 ÷ Years) − 1) × 100",
    variables: [
      { symbol: "Cost", meaning: "total amount invested." },
      { symbol: "Final value", meaning: "what you got back, including income received." },
      { symbol: "Years", meaning: "holding period in years." },
    ],
  },
  example: {
    scenario: "You invest ₹1,00,000 and it is worth ₹1,50,000 after 3 years.",
    inputs: [
      { label: "Cost and final value", value: "₹1,00,000 and ₹1,50,000" },
      { label: "Holding period", value: "3 years" },
    ],
    results: [
      { label: "ROI", value: "50%" },
      { label: "Net profit", value: "₹50,000" },
      { label: "Annualised ROI", value: "14.47%" },
    ],
    steps: ["Profit = 1,50,000 − 1,00,000 = ₹50,000, so ROI = 50,000 ÷ 1,00,000 = 50%.", "Annualised: 1.5^(1/3) − 1 = 14.47% a year."],
    expected: { input: { invested: 100000, finalValue: 150000, years: 3 }, annualised: "14.47" },
  },
  factors: [
    { title: "Holding period", text: "A 50% ROI over 2 years is very different from 50% over 10 years. Use the annualised figure." },
    { title: "All costs", text: "Include purchase costs, fees, taxes and maintenance in the cost for a true ROI." },
    { title: "Risk", text: "ROI does not show how risky the investment was." },
  ],
  benefits: [
    "Compare different investments on one measure.",
    "See profit as a percentage of cost.",
    "Annualise returns for fair comparison.",
  ],
  assumptions: [
    "Final value includes all income received.",
    "Taxes and inflation are not deducted.",
    "Annualised ROI assumes steady compounding.",
  ],
  faqs: [
    { q: "What is a good ROI?", a: "It depends on the risk and the period. Compare with alternatives such as fixed deposits and inflation." },
    { q: "What is the ROI formula?", a: "Net profit divided by cost, multiplied by 100." },
    { q: "Why annualise ROI?", a: "So investments held for different periods can be compared on a yearly basis." },
    { q: "Does ROI include dividends or rent?", a: "Include them in the final value to get the total return." },
    { q: "How is ROI different from CAGR?", a: "ROI is the total return. CAGR is the steady yearly rate that produces that return. Annualised ROI here is the same as CAGR." },
  ],
  related: ["finance/cagr-calculator", "business/profit-margin", "finance/lumpsum-calculator", "finance/inflation-calculator"],
  references: [
    { label: "SEBI Investor Education", url: "https://investor.sebi.gov.in/" },
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
  ],
};

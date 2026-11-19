export const content = {
  seo: {
    title: "CAGR Calculator: Compound Annual Growth Rate",
    description:
      "Calculate CAGR from an initial and final value over any number of years. Compare investments, business growth or salary growth with one yearly figure.",
    keywords: ["cagr calculator", "compound annual growth rate", "cagr formula", "investment growth rate calculator", "calculate cagr in india"],
  },
  h1: "CAGR Calculator",
  intro: [
    "CAGR, or compound annual growth rate, tells you the steady yearly rate at which something grew from its starting value to its ending value. It is widely used to compare mutual funds, stocks, property, business revenue and even salary growth on equal terms.",
    "Enter the initial value, the final value and the number of years. The calculator also shows the total return and how long money would take to double at that rate.",
  ],
  howTo: [
    "Enter the initial value of the investment or figure.",
    "Enter the final value.",
    "Enter the number of years between them. Decimals are allowed.",
    "Read the CAGR, the absolute gain and the doubling time.",
  ],
  formula: {
    expression: "CAGR = (Final value ÷ Initial value)^(1 ÷ Years) − 1",
    variables: [
      { symbol: "Final value", meaning: "value at the end of the period." },
      { symbol: "Initial value", meaning: "value at the start of the period." },
      { symbol: "Years", meaning: "length of the period in years." },
    ],
    notes: ["Doubling time = ln 2 ÷ ln(1 + CAGR)."],
  },
  example: {
    scenario: "An investment of ₹1,00,000 grows to ₹2,50,000 in 5 years.",
    inputs: [
      { label: "Initial and final value", value: "₹1,00,000 and ₹2,50,000" },
      { label: "Period", value: "5 years" },
    ],
    results: [
      { label: "CAGR", value: "20.11% a year" },
      { label: "Total return", value: "150%" },
      { label: "Doubling time at this rate", value: "about 3.78 years" },
    ],
    steps: ["Ratio = 2,50,000 ÷ 1,00,000 = 2.5.", "2.5^(1/5) = 1.2011, so growth is 20.11% a year."],
    expected: { input: { startValue: 100000, endValue: 250000, years: 5 }, cagr: "20.11" },
  },
  factors: [
    { title: "Period length", text: "The same total gain over a longer period gives a lower CAGR." },
    { title: "Start and end dates", text: "Choosing a market low or high as the start or end can distort the CAGR." },
    { title: "Cash flows", text: "CAGR ignores additional investments or withdrawals. Use XIRR-style measures for SIPs." },
  ],
  benefits: [
    "Compare unlike investments on a common yearly scale.",
    "See the smoothed growth rate behind a total return.",
    "Estimate how long it takes to double money.",
  ],
  assumptions: [
    "Only the start and end values are used. Ups and downs in between are ignored.",
    "No additional deposits or withdrawals during the period.",
    "Past CAGR does not predict future returns.",
  ],
  faqs: [
    { q: "What is CAGR?", a: "The constant yearly growth rate that would take an initial value to its final value over a given number of years." },
    { q: "How do I calculate CAGR?", a: "Divide the final value by the initial value, raise it to the power of 1 over the number of years, and subtract 1." },
    { q: "Is CAGR the same as average return?", a: "No. An average of yearly returns ignores compounding, so it is usually higher than CAGR when returns are volatile." },
    { q: "Can CAGR be negative?", a: "Yes, if the final value is lower than the initial value." },
    { q: "Can I use CAGR for a SIP?", a: "Not directly, because a SIP has many cash flows at different times. Use the SIP calculator or an XIRR measure." },
  ],
  related: ["finance/lumpsum-calculator", "finance/sip-calculator", "finance/roi-calculator", "finance/compound-interest"],
  references: [
    { label: "SEBI Investor Education", url: "https://investor.sebi.gov.in/" },
    { label: "AMFI: Association of Mutual Funds in India", url: "https://www.amfiindia.com/" },
  ],
};

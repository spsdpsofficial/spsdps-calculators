export const content = {
  seo: {
    title: "NSC Calculator: National Savings Certificate",
    description:
      "Calculate the maturity value of a National Savings Certificate (NSC) after 5 years from your investment and the interest rate, with a year-wise growth table.",
    keywords: ["nsc calculator", "national savings certificate calculator", "nsc maturity calculator", "nsc interest rate", "post office nsc"],
  },
  h1: "NSC Calculator",
  intro: [
    "The National Savings Certificate (NSC) is a fixed-income savings scheme from India Post with a 5-year term. Interest is compounded every year and paid together with your principal at maturity.",
    "Enter the amount and the interest rate in force on the day you buy the certificate. The rate is fixed for the whole term, even though the government may change the rate for new certificates every quarter.",
  ],
  howTo: [
    "Enter the amount you want to invest.",
    "Enter the interest rate notified for your purchase date.",
    "Read the maturity value and the interest earned.",
    "See how the value grows in the year-wise table.",
  ],
  formula: {
    expression: "Maturity value = P × (1 + r)^5",
    variables: [
      { symbol: "P", meaning: "amount invested." },
      { symbol: "r", meaning: "annual interest rate as a decimal (7.7% = 0.077)." },
    ],
    notes: ["The term is 5 years. Interest is compounded annually and paid at maturity."],
  },
  example: {
    scenario: "₹1,00,000 invested in an NSC at 7.7% a year for the 5-year term.",
    inputs: [
      { label: "Amount", value: "₹1,00,000" },
      { label: "Rate and term", value: "7.7% for 5 years" },
    ],
    results: [
      { label: "Maturity value", value: "₹1,44,903" },
      { label: "Interest earned", value: "₹44,903" },
    ],
    steps: ["Growth factor = 1.077⁵ = 1.4490.", "Maturity value = 1,00,000 × 1.4490 = ₹1,44,903."],
    expected: { input: { amount: 100000, annualRatePercent: 7.7 }, maturity: 144903 },
  },
  factors: [
    { title: "Interest rate", text: "The rate at the time of purchase is locked for the term." },
    { title: "Tax", text: "Interest is taxable. Under old-regime rules, reinvested interest for the first four years may qualify as a deduction. Check the current rules." },
    { title: "Premature closure", text: "Closure before maturity is allowed only in specific cases." },
  ],
  benefits: [
    "Know what you get at maturity before you invest.",
    "Compare with fixed deposits and PPF.",
    "Plan a 5-year safe investment.",
  ],
  assumptions: [
    "Annual compounding with a constant rate for 5 years.",
    "No tax is deducted.",
    "The rate you enter is the one notified on your purchase date.",
  ],
  faqs: [
    { q: "What is NSC?", a: "A government-backed savings certificate sold through post offices with a fixed 5-year term." },
    { q: "How is NSC interest paid?", a: "It compounds yearly and is paid with the principal at maturity." },
    { q: "Is the NSC rate fixed?", a: "The rate is fixed for the term of each certificate. The government reviews the rate for new purchases every quarter." },
    { q: "Is there a maximum limit?", a: "No. There is no upper limit on investment. The minimum is ₹1,000." },
    { q: "Is NSC interest taxable?", a: "Yes. It is taxable under income from other sources, though the accrued interest for the first four years may be reinvested and eligible for deduction in old-regime provisions. Confirm the current rules." },
  ],
  related: ["finance/fd-calculator", "finance/ppf-calculator", "finance/sukanya-samriddhi", "finance/scss-calculator"],
  references: [
    { label: "India Post", url: "https://www.indiapost.gov.in/" },
    { label: "National Savings Institute", url: "https://www.nsiindia.gov.in/" },
  ],
};

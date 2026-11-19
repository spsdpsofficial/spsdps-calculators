export const content = {
  seo: {
    title: "Home Loan Calculator: EMI & Total Cost",
    description:
      "Calculate your home loan EMI from property price, down payment, interest rate and tenure. See total interest, the loan amount and the full cost of your home.",
    keywords: ["home loan calculator", "home loan EMI calculator", "housing loan calculator", "home loan interest calculator", "home loan down payment"],
  },
  h1: "Home Loan Calculator",
  intro: [
    "Buying a home is usually the biggest loan most people take. Enter the property price and how much you will pay as a down payment. The calculator works out the loan amount, the monthly EMI, the total interest and what the home will really cost you over the life of the loan.",
    "Try different down payments and tenures. A higher down payment or a shorter tenure can save lakhs in interest.",
  ],
  howTo: [
    "Enter the property price and the down payment percentage.",
    "Enter the interest rate and the tenure in years.",
    "Add the lender's processing fee if you know it.",
    "Read the EMI, total interest and total cost of the home.",
  ],
  formula: {
    expression: "Loan = Price × (1 − Down payment %)\nEMI = L × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)\nTotal cost = Down payment + EMI × n + Processing fee",
    variables: [
      { symbol: "L", meaning: "loan amount after the down payment." },
      { symbol: "r", meaning: "monthly interest rate (annual rate ÷ 12 ÷ 100)." },
      { symbol: "n", meaning: "number of monthly instalments (years × 12)." },
    ],
    notes: ["The EMI uses the reducing-balance method, the same as our EMI calculator."],
  },
  example: {
    scenario: "A ₹75,00,000 flat with a 20% down payment, an 8.5% home loan for 20 years and a 0.5% processing fee.",
    inputs: [
      { label: "Down payment", value: "20% (₹15,00,000)" },
      { label: "Rate and tenure", value: "8.5% for 20 years" },
    ],
    results: [
      { label: "Loan amount", value: "₹60,00,000" },
      { label: "Monthly EMI", value: "₹52,069" },
      { label: "Total interest", value: "₹64,96,655" },
      { label: "Total cost of the home", value: "₹1,40,26,655" },
    ],
    steps: ["Down payment = 20% of 75,00,000 = ₹15,00,000, so the loan is ₹60,00,000.", "EMI for ₹60,00,000 at 8.5% over 240 months is about ₹52,069.", "Interest = 52,069 × 240 − 60,00,000 = ₹64,96,655, so the home costs about ₹1.40 crore in total."],
    expected: { input: { propertyValue: 7500000, downPaymentPercent: 20, annualRatePercent: 8.5, tenureMonths: 240, feePercent: 0.5 }, emi: 52069, interest: 6496655 },
  },
  factors: [
    { title: "Interest rate", text: "A 0.5% difference over 20 years changes the interest by several lakhs." },
    { title: "Down payment", text: "A larger down payment reduces the loan and the interest." },
    { title: "Tenure", text: "Longer tenures lower the EMI but raise total interest." },
    { title: "Floating vs fixed rates", text: "Most home loans are floating, so the EMI or tenure can change with the lender's benchmark." },
  ],
  benefits: [
    "See the true cost of a home, not only the EMI.",
    "Compare down payment and tenure choices.",
    "Plan your budget before talking to a bank.",
  ],
  assumptions: [
    "A fixed interest rate for the whole tenure.",
    "Stamp duty, registration, GST, insurance, maintenance and legal costs are not included.",
    "Processing fee is a percentage of the loan and GST on it is not added.",
    "Tax benefits on home loan interest and principal depend on your regime and are not included.",
  ],
  faqs: [
    { q: "How is a home loan EMI calculated?", a: "With the reducing-balance formula using the loan amount, monthly interest rate and number of months." },
    { q: "How much down payment is needed?", a: "Lenders commonly finance up to 75% to 90% of the property value, so you need to pay 10% to 25% yourself. The exact limit depends on the loan amount and the lender." },
    { q: "Is a longer tenure better?", a: "It lowers the EMI but raises the total interest. Choose the shortest tenure whose EMI you can comfortably afford." },
    { q: "What other costs come with buying a home?", a: "Stamp duty, registration, brokerage, GST on under-construction homes, home insurance and furnishing. See our stamp duty calculator." },
    { q: "Can I reduce my home loan interest?", a: "Part-prepayments and a lower rate through negotiation or balance transfer can both help. Try the loan prepayment calculator." },
  ],
  related: ["finance/emi-calculator", "finance/home-loan-eligibility", "finance/loan-prepayment", "finance/stamp-duty-calculator"],
  references: [
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
    { label: "National Housing Bank", url: "https://nhb.org.in/" },
    { label: "Ministry of Housing and Urban Affairs", url: "https://mohua.gov.in/" },
  ],
};

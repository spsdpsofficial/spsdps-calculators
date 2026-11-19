export const content = {
  seo: {
    title: "Business Loan Calculator: EMI & Total Cost",
    description:
      "Calculate the EMI, total interest and full cost of a business loan including the processing fee and GST on it, and see the EMI as a share of your income.",
    keywords: ["business loan calculator", "business loan EMI calculator", "MSME loan calculator", "loan processing fee calculator", "cost of business loan"],
  },
  h1: "Business Loan Calculator",
  intro: [
    "A business loan costs more than its interest. Processing fees, and GST on those fees, are deducted upfront, so you receive less than the sanctioned amount while still repaying the full amount.",
    "This calculator gives you the monthly EMI, total interest and the true cost of borrowing. Add your monthly business income to see how heavy the EMI is.",
  ],
  howTo: [
    "Enter the loan amount, interest rate per year and tenure in years.",
    "Enter the processing fee percentage and the GST rate on that fee.",
    "Optionally enter your monthly business income.",
    "Read the EMI, total interest, total cost of borrowing and the amount you will receive.",
  ],
  formula: {
    expression: "EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)\nProcessing fee = Loan × fee %\nFee GST = Processing fee × GST %\nTotal cost = Total interest + Processing fee + Fee GST",
    variables: [
      { symbol: "P", meaning: "the loan amount." },
      { symbol: "r", meaning: "monthly interest rate (annual rate ÷ 12 ÷ 100)." },
      { symbol: "n", meaning: "number of monthly instalments." },
    ],
    notes: ["The EMI uses the reducing-balance method, the same as our EMI calculator."],
  },
  example: {
    scenario: "A business takes a ₹25,00,000 loan at 14% for 5 years with a 2% processing fee plus 18% GST on the fee. Its monthly income is ₹4,00,000.",
    inputs: [
      { label: "Loan, rate, tenure", value: "₹25,00,000, 14%, 5 years" },
      { label: "Processing fee", value: "2% + 18% GST" },
    ],
    results: [
      { label: "Monthly EMI", value: "₹58,171" },
      { label: "Total interest", value: "₹9,90,238" },
      { label: "Fee including GST", value: "₹59,000" },
      { label: "Total cost of borrowing", value: "₹10,49,238" },
      { label: "EMI vs income", value: "14.5%" },
    ],
    steps: ["EMI works out to ₹58,171 over 60 months, so total repayment is ₹34,90,238.", "Processing fee = ₹50,000, GST on it = ₹9,000, so fees are ₹59,000.", "Cost of borrowing = ₹9,90,238 interest + ₹59,000 fees = ₹10,49,238."],
    expected: { input: { principal: 2500000, annualRatePercent: 14, tenureMonths: 60, feePercent: 2, feeGstPercent: 18, monthlyIncome: 400000 }, emi: 58171, interest: 990238, fees: 59000 },
  },
  factors: [
    { title: "Interest rate", text: "Rates depend on your credit score, business vintage, collateral and the scheme or lender." },
    { title: "Tenure", text: "Longer tenures lower the EMI but increase total interest." },
    { title: "Fees", text: "Processing fees, documentation, insurance and prepayment charges add to the cost." },
    { title: "Collateral and guarantees", text: "Secured loans and credit-guarantee schemes often carry lower rates." },
  ],
  benefits: [
    "See the full cost of a loan, not just the EMI.",
    "Compare lenders on total cost.",
    "Check whether the EMI fits your cash flow.",
  ],
  assumptions: [
    "A fixed interest rate on a reducing balance, with equal monthly instalments.",
    "Processing fee is deducted from the loan amount at disbursal.",
    "Foreclosure and part-payment charges, insurance and late fees are not included.",
  ],
  faqs: [
    { q: "How is a business loan EMI calculated?", a: "With the reducing-balance formula using the loan amount, monthly interest rate and number of months." },
    { q: "Are processing fees included in the EMI?", a: "No. They are usually deducted upfront. This calculator adds them to the total cost." },
    { q: "Why is GST charged on the processing fee?", a: "Lenders charge GST on their fees and services. The interest on the loan itself is not subject to GST." },
    { q: "How much EMI is safe for my business?", a: "Many lenders look closely when total EMIs take a large share of income. Keep enough cash flow for slow months." },
    { q: "Where can I find government-backed business loans?", a: "Check MUDRA and the Credit Guarantee Fund Trust for MSEs through your bank or the official portals listed below." },
    { q: "Can I reduce the interest I pay?", a: "A shorter tenure, a part-prepayment or a better credit profile can reduce total interest. Check prepayment rules first." },
  ],
  related: ["finance/emi-calculator", "finance/loan-prepayment", "business/break-even", "business/profit-margin"],
  references: [
    { label: "MUDRA (Pradhan Mantri Mudra Yojana)", url: "https://www.mudra.org.in/" },
    { label: "Ministry of MSME", url: "https://msme.gov.in/" },
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
  ],
};

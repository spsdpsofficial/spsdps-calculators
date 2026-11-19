export const content = {
  seo: {
    title: "Personal Loan Calculator: EMI & Real Cost",
    description:
      "Calculate personal loan EMI, total interest and the real cost after processing fee and GST, with the effective interest rate and the EMI as a share of income.",
    keywords: ["personal loan calculator", "personal loan EMI calculator", "personal loan interest", "effective interest rate", "personal loan processing fee"],
  },
  h1: "Personal Loan Calculator",
  intro: [
    "A personal loan is quick to get but expensive. The advertised rate is only part of the cost, because the processing fee and the GST on it are usually cut from the amount you receive. This calculator shows the EMI, the total interest and the effective interest rate once those fees are counted.",
    "Enter your monthly income to see how much of it the EMI would take, and compare lenders by their real cost.",
  ],
  howTo: [
    "Enter the loan amount, interest rate and tenure in months.",
    "Enter the lender's processing fee and the GST rate on it.",
    "Optionally enter your monthly income.",
    "Read the EMI, total cost of borrowing and the effective rate.",
  ],
  formula: {
    expression: "EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)\nFees = P × fee % × (1 + GST %)\nAmount received = P − Fees\nEffective rate = the monthly rate at which the EMIs repay the amount received, × 12",
    variables: [
      { symbol: "P", meaning: "the sanctioned loan amount." },
      { symbol: "r", meaning: "monthly interest rate (annual ÷ 12 ÷ 100)." },
      { symbol: "n", meaning: "number of monthly instalments." },
    ],
    notes: ["The effective rate is found by solving for the rate numerically. It is similar to the IRR of the cash flows."],
  },
  example: {
    scenario: "A ₹5,00,000 personal loan at 13% for 36 months, with a 2% processing fee and 18% GST on the fee.",
    inputs: [
      { label: "Rate and tenure", value: "13% for 36 months" },
      { label: "Processing fee", value: "2% plus 18% GST" },
    ],
    results: [
      { label: "Monthly EMI", value: "₹16,847" },
      { label: "Total interest", value: "₹1,06,491" },
      { label: "Fees including GST", value: "₹11,800" },
      { label: "Effective interest rate", value: "14.68%" },
    ],
    steps: ["EMI = ₹16,847 for 36 months, so interest is 16,847 × 36 − 5,00,000 = ₹1,06,491.", "Fee = 2% of 5,00,000 = ₹10,000 plus 18% GST = ₹11,800, so you receive ₹4,88,200.", "Solving for the rate at which 36 EMIs of ₹16,847 repay ₹4,88,200 gives about 14.68% a year."],
    expected: { input: { principal: 500000, annualRatePercent: 13, tenureMonths: 36, feePercent: 2, feeGstPercent: 18, monthlyIncome: 0 }, emi: 16847, effective: "14.68" },
  },
  factors: [
    { title: "Credit score", text: "A higher score usually earns a lower rate." },
    { title: "Fees", text: "Processing fees, insurance add-ons and prepayment penalties raise the real cost." },
    { title: "Tenure", text: "A longer tenure lowers the EMI but increases interest." },
    { title: "Existing EMIs", text: "Lenders look at your total EMIs compared with income before approving." },
  ],
  benefits: [
    "See the real cost of a loan, not only the headline rate.",
    "Compare offers fairly with the effective rate.",
    "Check whether the EMI fits your income.",
  ],
  assumptions: [
    "A fixed rate with equal monthly instalments on a reducing balance.",
    "Fees are deducted from the amount you receive.",
    "Insurance, late fees and foreclosure charges are not included.",
  ],
  faqs: [
    { q: "How is personal loan EMI calculated?", a: "With the reducing-balance formula from the loan amount, monthly rate and number of months." },
    { q: "Why is the effective rate higher than the quoted rate?", a: "Because the fee is cut upfront, you receive less than you repay on. The effective rate measures the cost on the money you actually get." },
    { q: "How much EMI is safe?", a: "Many lenders prefer total EMIs under about 40 to 50 per cent of income. Lower is safer." },
    { q: "Is GST charged on personal loan interest?", a: "No. GST applies to processing and other service fees, not to the interest." },
    { q: "Can I prepay a personal loan?", a: "Often yes, but some lenders charge a prepayment fee. Check the loan agreement." },
  ],
  related: ["finance/emi-calculator", "business/business-loan", "finance/loan-prepayment", "finance/credit-card-interest"],
  references: [
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
    { label: "RBI Sachet: complaints and awareness", url: "https://sachet.rbi.org.in/" },
  ],
};

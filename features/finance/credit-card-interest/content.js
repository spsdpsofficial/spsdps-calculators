export const content = {
  seo: {
    title: "Credit Card Interest Calculator in ₹",
    description:
      "Estimate the interest you pay on an unpaid credit card balance in rupees. Enter the balance, monthly rate and days, with the formula and a worked example.",
    keywords: ["credit card interest calculator", "credit card interest rate India", "credit card finance charges", "credit card revolving interest", "credit card 42% interest"],
  },
  h1: "Credit Card Interest Calculator",
  intro: [
    "If you do not pay your full credit card bill by the due date, the unpaid balance attracts interest, often called a finance charge. Card rates in India are quoted per month and can add up to a high yearly rate. This calculator estimates the cost of carrying a balance for a number of days.",
    "Enter the balance, the monthly rate from your statement and the number of days. The calculator shows the interest, the yearly equivalent and the interest per day, so you can see how quickly the cost builds.",
  ],
  howTo: [
    "Enter the balance you will not pay by the due date.",
    "Enter the monthly interest rate shown on your card statement.",
    "Enter the number of days the balance stays unpaid.",
    "Choose whether to add 18% GST on the interest, then read the cost.",
  ],
  formula: {
    expression: "Interest = Balance × (Monthly rate × 12 ÷ 100) ÷ 365 × Days",
    variables: [
      { symbol: "Balance", meaning: "the unpaid amount, in ₹." },
      { symbol: "Monthly rate", meaning: "the finance charge per month, in percent." },
      { symbol: "Days", meaning: "number of days the balance is unpaid." },
    ],
    notes: ["GST at 18% is commonly charged on interest and fees. If included, Total = Interest + GST."],
  },
  example: {
    scenario: "Rohit leaves ₹50,000 unpaid for 30 days on a card that charges 3.5% a month.",
    inputs: [
      { label: "Unpaid balance", value: "₹50,000" },
      { label: "Monthly rate", value: "3.5% (42% a year)" },
      { label: "Days", value: "30" },
    ],
    results: [
      { label: "Interest charged", value: "₹1,726.03" },
      { label: "GST at 18%", value: "₹310.68" },
      { label: "Total cost", value: "₹2,036.71" },
    ],
    steps: ["Yearly rate = 3.5% × 12 = 42%.", "Interest = 50,000 × 0.42 ÷ 365 × 30 = ₹1,726.03.", "GST = 18% of 1,726.03 = ₹310.68, so the total cost is about ₹2,036.71."],
    expected: { balance: 50000, monthlyRatePercent: 3.5, days: 30, gstPercent: 18, interest: 1726.03 },
  },
  factors: [
    { title: "Monthly rate", text: "Card rates are quoted monthly. Multiply by 12 for the yearly rate: 3.5% a month is 42% a year." },
    { title: "Days unpaid", text: "Interest grows with every day. Paying even part of the balance sooner reduces it." },
    { title: "Interest-free period", text: "Paying the full amount by the due date usually avoids interest on purchases. Missing it can remove that benefit for the cycle." },
    { title: "Fees and GST", text: "Late payment fees, cash-advance fees and GST add to the cost. They vary by card." },
  ],
  benefits: [
    "See the real cost of paying only the minimum.",
    "Compare a credit card balance with a cheaper personal loan or EMI.",
    "Decide how quickly to clear a balance.",
    "Understand the yearly cost behind a monthly rate.",
  ],
  assumptions: [
    "A constant balance for the number of days entered. Real balances change with payments and new spends.",
    "Daily interest on a 365-day year. Your issuer's method may differ.",
    "Late fees, annual fees, cash-advance charges and other fees are not included.",
    "GST of 18% is optional and assumed on interest only.",
  ],
  faqs: [
    { q: "What interest rate do credit cards charge in India?", a: "It depends on the issuer and card, and is quoted per month on the statement. Always use the rate on your own card's terms." },
    { q: "How is credit card interest calculated?", a: "Typically daily on the unpaid balance, using the monthly rate converted to a yearly rate. This calculator uses that method." },
    { q: "Does paying the minimum due avoid interest?", a: "No. Paying only the minimum avoids a late fee but the remaining balance still attracts interest." },
    { q: "Is there GST on credit card interest?", a: "GST at 18% is commonly charged on interest and fees on card statements. Check your statement for the exact charges." },
    { q: "How can I reduce credit card interest?", a: "Pay the full bill by the due date. If you cannot, pay as much as you can early, and consider converting the balance to an EMI if the rate is lower." },
  ],
  related: ["finance/emi-calculator", "finance/loan-prepayment", "finance/simple-interest", "finance/compound-interest"],
  references: [
    { label: "Reserve Bank of India: Master Direction on credit card and debit card issuance", url: "https://www.rbi.org.in/" },
    { label: "GST Portal (official)", url: "https://www.gst.gov.in/" },
  ],
};

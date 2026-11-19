export const content = {
  seo: {
    title: "Loan Prepayment Calculator: Interest Saved",
    description:
      "See how much interest and time a part-prepayment saves on your home, car or personal loan. Compare a shorter tenure with a lower EMI, with a worked example.",
    keywords: ["loan prepayment calculator", "home loan prepayment calculator", "part payment calculator", "loan interest saved", "reduce loan tenure"],
  },
  h1: "Loan Prepayment Calculator",
  intro: [
    "Paying a lump sum towards your loan principal reduces the balance on which interest is charged. This calculator shows how much interest you save and either how much sooner the loan ends or how much lower your EMI becomes.",
    "Because most loan interest is front-loaded, a prepayment in the early years saves far more than the same amount later. Try different amounts and timings to see what works best for you.",
  ],
  howTo: [
    "Enter the original loan amount, interest rate and tenure.",
    "Enter after how many EMIs you will make the prepayment, and the amount.",
    "Choose whether to keep the EMI and finish sooner, or keep the end date and lower the EMI.",
    "Read the interest saved and the new tenure or new EMI.",
  ],
  formula: {
    expression: "Remaining months = −ln(1 − B × r ÷ EMI) ÷ ln(1 + r)      New EMI = B × r × (1 + r)ᵐ ÷ [(1 + r)ᵐ − 1]",
    variables: [
      { symbol: "B", meaning: "loan balance after the prepayment." },
      { symbol: "r", meaning: "monthly interest rate (yearly rate ÷ 12 ÷ 100)." },
      { symbol: "EMI", meaning: "your existing monthly instalment." },
      { symbol: "m", meaning: "months left when you keep the end date." },
    ],
    notes: [
      "The calculator runs the loan month by month: it computes the balance after your chosen number of EMIs, subtracts the prepayment, then continues to the end.",
      "Interest saved = total interest without prepayment − total interest with it.",
    ],
  },
  example: {
    scenario: "Sunita has a ₹30,00,000 loan at 8.5% for 20 years. After 24 EMIs she prepays ₹5,00,000 and keeps her EMI.",
    inputs: [
      { label: "Loan, rate, tenure", value: "₹30,00,000, 8.5%, 20 years" },
      { label: "Prepayment", value: "₹5,00,000 after 24 EMIs" },
      { label: "Existing EMI", value: "₹26,035" },
    ],
    results: [
      { label: "Interest saved", value: "₹12,90,458" },
      { label: "New tenure", value: "172 months (14 years 4 months)" },
      { label: "Time saved", value: "68 months (5 years 8 months)" },
    ],
    steps: [
      "After 24 EMIs the balance is about ₹28,75,309; subtracting ₹5,00,000 leaves about ₹23,75,309.",
      "At the same EMI of ₹26,035, the loan now clears in 148 more months, so the total tenure is 172 months.",
      "Without prepayment total interest is about ₹32,48,327; with it, about ₹19,57,869, a saving of about ₹12,90,458.",
    ],
    expected: { interestSaved: 1290458, newTenureMonths: 172 },
  },
  factors: [
    { title: "When you prepay", text: "Early prepayment saves the most because the balance, and therefore the interest, is highest in the early years." },
    { title: "Amount prepaid", text: "A larger prepayment reduces the balance more, which cuts interest and time further." },
    { title: "Shorter tenure or lower EMI", text: "Keeping the EMI saves more interest in total. Lowering the EMI helps your monthly cash flow." },
    { title: "Prepayment charges", text: "Some lenders charge fees, especially on fixed-rate loans. Check your loan agreement." },
  ],
  benefits: [
    "Decide whether to use a bonus or savings to prepay a loan.",
    "Compare prepaying with investing the same money elsewhere.",
    "See both outcomes: a faster payoff or a lower EMI.",
    "Understand how early repayment affects total interest.",
  ],
  assumptions: [
    "A single prepayment, made right after an EMI. Several smaller prepayments are not modelled.",
    "A fixed interest rate for the whole loan. Floating-rate changes are not included.",
    "No prepayment fee, processing charge or tax benefit is included.",
    "The result is an estimate. Your lender's loan statement is the final reference.",
  ],
  faqs: [
    { q: "Does prepayment reduce EMI or tenure?", a: "It depends on the option you choose with your lender. You can usually either keep the EMI and shorten the loan or lower the EMI and keep the end date." },
    { q: "Which saves more interest?", a: "Keeping the EMI the same and shortening the tenure usually saves more total interest." },
    { q: "Is there a charge for prepaying a loan?", a: "It depends on your lender and loan type. Check your sanction letter and the lender's current policy." },
    { q: "Is prepayment better than investing the money?", a: "It depends on your loan rate, the returns and risk of the alternative, and your tax situation. This calculator shows the interest saved; the comparison is your decision." },
    { q: "Can I prepay a small amount regularly?", a: "Yes, and it also helps. This calculator models one prepayment, but you can run it for the biggest one." },
    { q: "Why is the interest saved so large?", a: "Because interest is charged every month on the balance, and a prepayment removes that interest for all the remaining months." },
  ],
  related: ["finance/emi-calculator", "finance/compound-interest", "business/business-loan", "finance/simple-interest"],
  references: [
    { label: "Reserve Bank of India: Key Facts Statement for loans", url: "https://website.rbi.org.in/web/rbi/-/notifications/key-facts-statement-kfs-for-loans-advances" },
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
  ],
};

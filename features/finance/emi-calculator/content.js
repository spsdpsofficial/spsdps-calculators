// All written content for the EMI calculator page. Original text: do not copy competitors.
// Shape documented in docs/content-schema.md. Page title/description rules: title <= 45 chars
// (the site name is appended by the layout), description 120-160 chars.

export const content = {
  seo: {
    title: "EMI Calculator: Monthly Loan EMI in ₹",
    description:
      "Calculate your monthly loan EMI, total interest and total repayment in rupees. Works for home, car and personal loans, with the formula and a worked example.",
    keywords: [
      "EMI calculator",
      "loan EMI calculator India",
      "home loan EMI calculator",
      "car loan EMI calculator",
      "personal loan EMI calculator",
      "EMI calculation formula",
    ],
  },

  h1: "EMI Calculator",

  intro: [
    "Find out what a loan will cost you every month before you sign for it. Enter the loan amount, the yearly interest rate and the tenure, and the calculator shows your monthly EMI, the total interest and the total you will repay.",
    "An EMI (equated monthly instalment) is the fixed amount you pay your lender each month. Part of it covers interest and part reduces the principal. In the early years most of each EMI is interest; over time the balance shifts towards principal. The year-wise breakup below the results shows exactly how that happens for your numbers.",
    "Use it to compare offers, test whether a longer or shorter tenure suits your budget, and decide how much loan you can comfortably carry. The same maths applies to home, car, personal and education loans that charge interest on the reducing balance.",
  ],

  howTo: [
    "Enter the loan amount in rupees, or drag the slider. You can type 1000000 or 10,00,000; the amount in lakh or crore is shown underneath.",
    "Enter the annual interest rate quoted by your lender (the rate per year, not per month).",
    "Choose the tenure in years or months. Switching the unit converts the value for you.",
    "Read the monthly EMI, total interest and total payment. The donut shows how much of the total goes to principal and how much to interest.",
    "Open the year-wise breakup to see how much principal and interest you pay each year and what balance remains.",
  ],

  formula: {
    expression: "EMI = P × r × (1 + r)ⁿ ÷ [ (1 + r)ⁿ − 1 ]",
    variables: [
      { symbol: "P", meaning: "principal: the loan amount you borrow, in ₹." },
      { symbol: "r", meaning: "monthly interest rate = annual rate ÷ 12 ÷ 100 (so 9.5% a year is 0.095 ÷ 12)." },
      { symbol: "n", meaning: "number of monthly instalments = tenure in years × 12." },
    ],
    notes: [
      "Total payment = EMI × n, and total interest = total payment − P.",
      "Each month the interest portion is the opening balance × r. The rest of the EMI repays principal, and the balance falls accordingly. If the rate is 0%, the EMI is simply P ÷ n.",
    ],
  },

  example: {
    scenario:
      "Asha takes a ₹15,00,000 loan at 9.5% a year for 10 years. Here is what the formula gives her.",
    inputs: [
      { label: "Loan amount (P)", value: "₹15,00,000" },
      { label: "Annual interest rate", value: "9.5% per year" },
      { label: "Tenure", value: "10 years (n = 120 months)" },
    ],
    results: [
      { label: "Monthly EMI", value: "₹19,410" },
      { label: "Total interest", value: "₹8,29,156" },
      { label: "Total payment", value: "₹23,29,156" },
    ],
    steps: [
      "Monthly rate r = 9.5 ÷ 12 ÷ 100 = 0.0079167 and n = 10 × 12 = 120.",
      "Putting these in the formula gives an EMI of about ₹19,409.63, shown as ₹19,410.",
      "Total payment = 19,409.63 × 120 ≈ ₹23,29,156, so total interest ≈ ₹23,29,156 − ₹15,00,000 = ₹8,29,156.",
      "Over the loan, interest is roughly 36% of everything Asha pays. Lenders usually round the EMI to a whole rupee, so the amount on your loan schedule can differ by a few rupees.",
    ],
    // Machine-checked against calculateEmi() in tests/calculate.test.js.
    expected: { principal: 1_500_000, annualRatePercent: 9.5, tenureMonths: 120, emi: 19410, totalInterest: 829156, totalPayment: 2329156 },
  },

  factors: [
    {
      title: "Interest rate",
      text: "Even a small change moves the EMI and the total interest noticeably over a long tenure. Ask whether the rate is fixed or floating and, if floating, what it is linked to.",
    },
    {
      title: "Tenure",
      text: "A longer tenure lowers the EMI but increases the total interest you pay. A shorter tenure does the opposite. Pick the shortest tenure your monthly budget can handle.",
    },
    {
      title: "Loan amount and down payment",
      text: "A bigger down payment reduces the amount borrowed, which reduces both the EMI and the interest.",
    },
    {
      title: "Fees and charges",
      text: "Processing fees, insurance premiums and other charges are not part of this EMI. They can add to what you actually pay, so read the lender's key facts statement.",
    },
    {
      title: "Part-payments and prepayment",
      text: "Paying extra towards principal shortens the loan or lowers the EMI and cuts interest. The charges, if any, depend on the loan type and your lender's terms.",
    },
    {
      title: "Rate changes on floating loans",
      text: "If your rate is floating, a change in the benchmark can change your EMI or your tenure. This calculator assumes one fixed rate for the whole loan.",
    },
  ],

  benefits: [
    "Compare loan offers on the same basis: same amount, different rates or tenures.",
    "Check affordability before applying: see whether the EMI fits comfortably within your monthly income.",
    "See the true cost of borrowing as total interest, not just the monthly figure.",
    "Test scenarios quickly: what if you borrow ₹2 lakh less, or take 5 years instead of 7?",
    "Plan around a goal such as a home, a car or education with numbers you understand.",
  ],

  assumptions: [
    "Interest is charged on the reducing balance and the rate stays the same for the full tenure.",
    "EMIs are paid at the end of each month, starting one month after disbursement. Pre-EMI interest, broken-period interest and moratoriums are not included.",
    "Processing fees, insurance, taxes and penalties are excluded.",
    "Loans quoted at a flat rate are not comparable with this reducing-balance calculation; ask the lender for the equivalent reducing-balance rate.",
    "The result is an estimate. Your lender's schedule is the final word and may differ slightly because of rounding, day-count conventions and the exact payment dates.",
  ],

  faqs: [
    {
      q: "What is an EMI?",
      a: "EMI stands for equated monthly instalment. It is the fixed amount you pay a lender every month to repay a loan with interest over an agreed tenure.",
    },
    {
      q: "How is EMI calculated?",
      a: "With the formula EMI = P × r × (1 + r)ⁿ ÷ [(1 + r)ⁿ − 1], where P is the loan amount, r is the monthly interest rate and n is the number of months. The calculator applies it for you and also shows the full breakup.",
    },
    {
      q: "Does a longer tenure reduce my EMI?",
      a: "Yes, a longer tenure lowers the monthly EMI because the repayment is spread over more months. However, you pay interest for longer, so the total interest is higher.",
    },
    {
      q: "Why is most of my early EMI interest?",
      a: "Interest is charged on the outstanding balance, which is highest at the start. As you repay principal, the balance and the monthly interest fall, so more of each later EMI goes towards principal.",
    },
    {
      q: "Does this EMI include processing fees or insurance?",
      a: "No. The calculator covers only principal and interest. Processing fees, insurance and other charges are separate, and your lender should list them in the key facts statement for your loan.",
    },
    {
      q: "Will my bank's EMI match this result exactly?",
      a: "It should be very close for a reducing-balance loan with a fixed rate, but small differences are normal because of rounding, payment dates and fees. Your sanction letter and repayment schedule are the final reference.",
    },
    {
      q: "What happens to my EMI if the interest rate changes?",
      a: "On a floating-rate loan, your lender may change the EMI or the tenure when the rate changes. Re-run the calculator with the new rate and your outstanding balance to see the effect.",
    },
    {
      q: "How much EMI can I afford?",
      a: "There is no single answer, because it depends on your income, other loans and expenses. Lenders look at your existing obligations compared with your income, and their limits differ. Keep enough room for emergencies and savings.",
    },
  ],

  // "category/slug" ids resolved from lib/tools/catalogue.js. Planned tools show as "coming soon".
  related: ["finance/loan-prepayment", "finance/compound-interest", "business/business-loan", "finance/simple-interest"],

  references: [
    {
      label: "Reserve Bank of India: Key Facts Statement (KFS) for loans and advances",
      url: "https://website.rbi.org.in/web/rbi/-/notifications/key-facts-statement-kfs-for-loans-advances",
    },
    { label: "Reserve Bank of India (official website)", url: "https://www.rbi.org.in/" },
  ],
};

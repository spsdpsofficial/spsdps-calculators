export const content = {
  seo: {
    title: "RD Calculator: Recurring Deposit Maturity",
    description:
      "Estimate the maturity amount and interest on a recurring deposit in rupees. Enter the monthly deposit, rate and tenure and see the formula with an example.",
    keywords: ["RD calculator", "recurring deposit calculator", "RD maturity calculator", "RD interest calculator India", "RD formula"],
  },
  h1: "RD Calculator",
  intro: [
    "A recurring deposit (RD) lets you save a fixed amount every month for a chosen period and earn interest on it. This calculator estimates the maturity amount, the total you deposit and the interest earned.",
    "Each monthly deposit earns interest only for the time it stays in the account, so the first deposits earn the most. Most Indian banks compound RD interest every quarter, which is what this calculator assumes.",
  ],
  howTo: [
    "Enter the amount you will deposit every month.",
    "Enter the yearly interest rate for your RD tenure.",
    "Enter the tenure in months (6 to 120).",
    "Read the maturity amount, total deposits and interest earned.",
  ],
  formula: {
    expression: "M = Σ R × (1 + q) ^ (m ÷ 3)   for each deposit, q = rate ÷ 4 ÷ 100",
    variables: [
      { symbol: "M", meaning: "maturity amount in ₹." },
      { symbol: "R", meaning: "monthly deposit." },
      { symbol: "q", meaning: "quarterly interest rate (yearly rate ÷ 4 ÷ 100)." },
      { symbol: "m", meaning: "number of months that particular deposit stays invested." },
    ],
    notes: ["A deposit made in the first month stays for the whole tenure; the last one stays for one month. The calculator adds up every deposit's growth."],
  },
  example: {
    scenario: "Imran opens an RD of ₹5,000 a month for 5 years at 6.5% a year.",
    inputs: [
      { label: "Monthly deposit (R)", value: "₹5,000" },
      { label: "Rate", value: "6.5% per year, quarterly compounding" },
      { label: "Tenure", value: "60 months" },
    ],
    results: [
      { label: "Total deposited", value: "₹3,00,000" },
      { label: "Interest earned", value: "₹54,954" },
      { label: "Maturity amount", value: "₹3,54,954" },
    ],
    steps: [
      "Quarterly rate q = 6.5 ÷ 4 = 1.625%. The first ₹5,000 compounds for 20 quarters; the last for one-third of a quarter.",
      "Adding the growth of all 60 deposits gives about ₹3,54,954.",
      "Interest = 3,54,954 − 3,00,000 = ₹54,954, before tax.",
    ],
    expected: { monthly: 5000, annualRatePercent: 6.5, months: 60, maturityRounded: 354954 },
  },
  factors: [
    { title: "Interest rate", text: "RD rates vary by bank and tenure. A small rate difference compounds over several years." },
    { title: "Tenure", text: "Longer RDs earn more because deposits stay invested longer." },
    { title: "Missed instalments", text: "Banks may charge a penalty or reduce interest for late or missed deposits. This calculator assumes none are missed." },
    { title: "Tax", text: "RD interest is taxable, and TDS may apply. It is not deducted here." },
  ],
  benefits: [
    "Plan a goal with a fixed monthly saving.",
    "Compare RD offers across banks and tenures.",
    "See how much of the maturity amount is interest.",
    "Build a savings habit without managing market risk.",
  ],
  assumptions: [
    "Quarterly compounding, the common practice among Indian banks. Your bank may differ.",
    "All deposits are made on time at the start of each month.",
    "The rate stays the same for the whole tenure.",
    "Tax, TDS, and premature-closure penalties are not included.",
  ],
  faqs: [
    { q: "How is RD maturity calculated?", a: "Each monthly deposit is grown at the quarterly compounded rate for the time it stays in the account, and the results are added up. The calculator does this for every month of your tenure." },
    { q: "Is RD interest compounded monthly or quarterly?", a: "Most Indian banks compound RD interest quarterly. Check your bank's terms, as some institutions use a different convention." },
    { q: "Can I change the monthly amount during the RD?", a: "Generally no. The amount is fixed when the RD is opened. To save more, open another RD." },
    { q: "What happens if I miss an instalment?", a: "Banks usually charge a small penalty and may pay lower interest. Check your bank's rules." },
    { q: "Is RD better than FD?", a: "They suit different needs. An RD builds a corpus from monthly savings; an FD earns interest on a lump sum you already have." },
  ],
  related: ["finance/fd-calculator", "finance/sip-calculator", "finance/ppf-calculator", "finance/compound-interest"],
  references: [
    { label: "Reserve Bank of India", url: "https://www.rbi.org.in/" },
    { label: "India Post: savings schemes", url: "https://www.indiapost.gov.in/" },
  ],
};

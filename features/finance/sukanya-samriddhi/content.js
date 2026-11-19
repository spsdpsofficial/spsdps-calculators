export const content = {
  seo: {
    title: "Sukanya Samriddhi Yojana (SSY) Calculator",
    description:
      "Estimate the Sukanya Samriddhi Yojana maturity amount from your yearly deposit and the current interest rate, with a year-wise balance table and the rules.",
    keywords: ["sukanya samriddhi calculator", "ssy calculator", "sukanya samriddhi yojana maturity", "sukanya samriddhi interest rate", "girl child savings calculator"],
  },
  h1: "Sukanya Samriddhi Yojana Calculator",
  intro: [
    "Sukanya Samriddhi Yojana (SSY) is a government small savings scheme for the girl child. An account can be opened for a girl under 10 years of age, deposits are made for 15 years, and the account matures 21 years after opening.",
    "This calculator estimates the maturity amount for a yearly deposit and the interest rate you enter. The government announces the rate every quarter, so enter the latest one from an official source.",
  ],
  howTo: [
    "Enter the amount you will deposit every year, up to ₹1,50,000.",
    "Enter the current interest rate notified for the scheme.",
    "Read the estimated maturity value, the total deposited and the interest earned.",
    "Check the year-wise table for the balance after each year.",
  ],
  formula: {
    expression: "Balance (end of year) = (Previous balance + Deposit) × (1 + r)\nrepeated for 21 years, with deposits in the first 15 years only",
    variables: [
      { symbol: "r", meaning: "annual interest rate as a decimal (8.2% = 0.082)." },
      { symbol: "Deposit", meaning: "amount deposited at the start of each of the first 15 years." },
    ],
    notes: ["The actual scheme calculates interest each month on the lowest balance between the 5th and the last day of the month and credits it yearly. This estimate uses annual compounding."],
  },
  example: {
    scenario: "A deposit of ₹1,50,000 every year for 15 years at an interest rate of 8.2%, with the account maturing after 21 years.",
    inputs: [
      { label: "Yearly deposit", value: "₹1,50,000 for 15 years" },
      { label: "Rate", value: "8.2% a year" },
    ],
    results: [
      { label: "Total deposited", value: "₹22,50,000" },
      { label: "Interest earned", value: "₹49,32,119" },
      { label: "Estimated maturity value", value: "₹71,82,119" },
    ],
    steps: ["Deposits of ₹1,50,000 are added for 15 years and each year's balance grows by 8.2%.", "From year 16 to year 21 no deposits are made but the balance keeps earning interest.", "At the end of year 21 the balance is about ₹71.8 lakh."],
    expected: { input: { yearlyDeposit: 150000, annualRatePercent: 8.2 }, maturity: 7182119 },
  },
  factors: [
    { title: "Interest rate", text: "The rate is reset every quarter by the Government of India." },
    { title: "Deposit timing", text: "Depositing before the 5th of the month earns interest for that month." },
    { title: "Deposit limits", text: "The minimum yearly deposit is ₹250 and the maximum is ₹1,50,000." },
    { title: "Rules", text: "Eligibility, partial withdrawal and closure rules are set by the Government and may change." },
  ],
  benefits: [
    "Plan long-term savings for a daughter's education or marriage.",
    "See how the interest builds over 21 years.",
    "Compare yearly deposit amounts.",
  ],
  assumptions: [
    "Annual compounding and deposits at the start of each year.",
    "A constant interest rate, though the actual rate can change every quarter.",
    "Full 15 years of deposits and maturity after 21 years.",
    "Partial withdrawals for education are not modelled.",
  ],
  faqs: [
    { q: "Who can open a Sukanya Samriddhi account?", a: "A parent or legal guardian can open an account for a girl child below the age of 10. Check the latest official rules for the number of accounts allowed." },
    { q: "What is the maximum yearly deposit?", a: "₹1,50,000 in a financial year, and the minimum is ₹250." },
    { q: "How long do I have to deposit?", a: "For 15 years from the date of opening. The account matures 21 years after opening." },
    { q: "Is the interest taxable?", a: "The scheme has had tax benefits under the old regime and tax-free interest, but tax rules change. Check the Income Tax Department for the current position." },
    { q: "Is the interest rate fixed?", a: "No. The government reviews it every quarter, so it can change during the life of the account." },
  ],
  related: ["finance/ppf-calculator", "finance/nsc-calculator", "finance/fd-calculator", "finance/rd-calculator"],
  references: [
    { label: "India Post", url: "https://www.indiapost.gov.in/" },
    { label: "National Savings Institute", url: "https://www.nsiindia.gov.in/" },
    { label: "Ministry of Finance", url: "https://www.finmin.nic.in/" },
  ],
};

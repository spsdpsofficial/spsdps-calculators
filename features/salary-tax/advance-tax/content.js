export const content = {
  seo: {
    title: "Advance Tax Calculator: Dates & Amounts",
    description:
      "Work out your advance tax instalments and due dates for the year. Enter your estimated tax and TDS to see how much to pay by 15 June, September, December and March.",
    keywords: ["advance tax calculator", "advance tax due dates", "advance tax instalments", "advance tax for freelancers", "advance tax india"],
  },
  h1: "Advance Tax Calculator",
  intro: [
    "Advance tax is income tax you pay during the year instead of in one go at the end. If your tax payable after TDS is ₹10,000 or more in a year, you generally need to pay it in instalments on set dates. It is common for freelancers, professionals, traders and people with large rental, interest or capital gains income.",
    "Enter your estimated tax for the year and the TDS you expect, and this calculator gives the instalment schedule.",
  ],
  howTo: [
    "Enter your estimated total tax for the year, including cess.",
    "Enter the TDS and TCS you expect to be deducted.",
    "Choose the financial year and the taxpayer type.",
    "Read the amount to pay by each due date.",
  ],
  formula: {
    expression: "Net tax = Estimated tax − TDS and TCS\nBy 15 June: 15% · By 15 Sep: 45% · By 15 Dec: 75% · By 15 Mar: 100%\nEach instalment = Cumulative share of net tax − amount already paid",
    variables: [
      { symbol: "Net tax", meaning: "the tax left to pay after TDS and TCS." },
      { symbol: "Cumulative share", meaning: "the part of the year's tax that should have been paid by that date." },
    ],
    notes: ["Presumptive taxpayers under sections 44AD and 44ADA can pay the whole amount in one instalment by 15 March."],
  },
  example: {
    scenario: "A freelancer expects ₹2,50,000 of tax for FY 2026-27 and ₹50,000 of TDS.",
    inputs: [
      { label: "Estimated tax and TDS", value: "₹2,50,000 and ₹50,000" },
      { label: "Net advance tax", value: "₹2,00,000" },
    ],
    results: [
      { label: "By 15 June 2026", value: "₹30,000" },
      { label: "By 15 September 2026", value: "₹60,000" },
      { label: "By 15 December 2026", value: "₹60,000" },
      { label: "By 15 March 2027", value: "₹50,000" },
    ],
    steps: ["15% of ₹2,00,000 = ₹30,000 by 15 June.", "45% is ₹90,000, so pay ₹60,000 more by 15 September.", "75% is ₹1,50,000, so ₹60,000 more by 15 December, and the last ₹50,000 by 15 March."],
    expected: { input: { fyStartYear: 2026, taxLiability: 250000, tdsTcs: 50000 }, instalments: [30000, 60000, 60000, 50000] },
  },
  factors: [
    { title: "Income estimate", text: "Your actual income may differ, so revise the estimate as the year goes." },
    { title: "TDS", text: "TDS already deducted reduces the advance tax you must pay." },
    { title: "Type of taxpayer", text: "Presumptive taxpayers and senior citizens have different rules." },
    { title: "Interest", text: "Missing or short payment attracts interest under sections 234B and 234C." },
  ],
  benefits: [
    "Know exactly what to pay and when.",
    "Avoid interest for late or short payment.",
    "Plan cash flow across the year.",
  ],
  assumptions: [
    "The tax you enter is your estimate. It is not computed here.",
    "The 15%, 45%, 75% and 100% schedule with the ₹10,000 limit is as generally known. Confirm on incometax.gov.in for the current year.",
    "Interest under sections 234B and 234C is not calculated.",
  ],
  faqs: [
    { q: "Who has to pay advance tax?", a: "Anyone whose tax payable after TDS for the year is ₹10,000 or more, apart from resident senior citizens who have no business or professional income." },
    { q: "What are the due dates?", a: "15 June, 15 September, 15 December and 15 March, with 15%, 45%, 75% and 100% of the tax due by each date." },
    { q: "What if I miss a date?", a: "Interest is charged under sections 234B and 234C. Pay as early as you can and deposit any balance as self-assessment tax." },
    { q: "Is advance tax needed for salaried people?", a: "Usually not, because the employer deducts TDS. It may be needed if you have other income such as capital gains, rent or interest that raises your tax above TDS." },
    { q: "How do I pay advance tax?", a: "Online through the Income Tax Department's e-pay tax service, using challan type 100 for advance tax." },
  ],
  related: ["salary-tax/income-tax", "salary-tax/tds", "salary-tax/capital-gains", "salary-tax/hra-calculator"],
  references: [
    { label: "Income Tax Department of India", url: "https://www.incometax.gov.in/" },
    { label: "Central Board of Direct Taxes", url: "https://incometaxindia.gov.in/" },
  ],
};

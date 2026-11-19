export const content = {
  seo: {
    title: "Salary Hike Calculator: New Salary & % Hike",
    description:
      "Find your new salary after a percentage hike, or work out the hike percentage from an old and new salary. Monthly and yearly figures in rupees with an example.",
    keywords: ["salary hike calculator", "salary increment calculator", "hike percentage calculator", "new salary after hike", "appraisal calculator India"],
  },
  h1: "Salary Hike Calculator",
  intro: [
    "After an appraisal or a job switch, two questions come up: what will my new salary be, and what percentage hike is that? This calculator answers both. Enter your current salary and either the hike percentage or the new salary.",
    "It shows the revised pay and the increase per month and per year. Remember that a hike on your CTC or gross salary does not raise your in-hand pay by the same percentage, because taxes and PF also change. Use the CTC to In-Hand Calculator to see the take-home effect.",
  ],
  howTo: [
    "Enter your current salary and choose whether it is per year or per month.",
    "Choose what you know: the hike percentage or the new salary.",
    "Enter that value.",
    "Read the hike percentage, the new salary and the increase.",
  ],
  formula: {
    expression: "New salary = Current × (1 + Hike% ÷ 100)\nHike % = (New − Current) ÷ Current × 100",
    variables: [
      { symbol: "Current", meaning: "your present salary, per month or per year." },
      { symbol: "Hike %", meaning: "the percentage increase in salary." },
      { symbol: "New", meaning: "the revised salary after the increase." },
    ],
  },
  example: {
    scenario: "Rahul earns ₹6,00,000 a year and gets a 10% hike. In the second example a job offer pays ₹7,20,000 on the same base.",
    inputs: [
      { label: "Current salary", value: "₹6,00,000 a year (₹50,000 a month)" },
      { label: "Hike", value: "10%" },
    ],
    results: [
      { label: "New salary", value: "₹6,60,000 a year (₹55,000 a month)" },
      { label: "Increase", value: "₹60,000 a year" },
      { label: "Offer of ₹7,20,000", value: "a 20% hike" },
    ],
    steps: [
      "New salary = 6,00,000 × (1 + 10 ÷ 100) = ₹6,60,000.",
      "Increase = 6,60,000 − 6,00,000 = ₹60,000 a year, or ₹5,000 a month.",
      "For the job offer: (7,20,000 − 6,00,000) ÷ 6,00,000 × 100 = 20%.",
    ],
    expected: { input: { current: 600000, mode: "percent", hikePercent: 10 }, revised: 660000 },
  },
  factors: [
    { title: "Base used for the hike", text: "A hike may apply to fixed pay, gross salary or CTC. Confirm which before comparing percentages." },
    { title: "Variable pay", text: "If part of your pay is variable, the guaranteed increase is smaller than the headline hike." },
    { title: "Taxes", text: "A higher salary moves part of your income into a higher tax band, so take-home pay grows by less than the hike." },
    { title: "Inflation", text: "A hike lower than inflation reduces your purchasing power even though the number goes up." },
  ],
  benefits: [
    "Quickly compare a new offer with your current pay.",
    "Check that an appraisal letter's figures are consistent.",
    "Convert between monthly and yearly figures.",
    "Understand the real size of a promotion.",
  ],
  assumptions: [
    "The hike applies to the whole salary equally.",
    "No tax, PF or other deductions are applied.",
    "Percentages are calculated on the salary you entered, whichever period it covers.",
  ],
  faqs: [
    { q: "How do I calculate salary hike percentage?", a: "Subtract the old salary from the new one, divide by the old salary and multiply by 100." },
    { q: "How do I calculate the new salary after a hike?", a: "Multiply the current salary by (1 + hike ÷ 100). A 10% hike on ₹6,00,000 gives ₹6,60,000." },
    { q: "Will my in-hand pay rise by the same percentage?", a: "Usually not. Tax slabs, PF and other deductions change too, so take-home pay often rises by a different percentage." },
    { q: "Is a 20% hike on CTC the same as a 20% hike on gross?", a: "Not necessarily. CTC includes employer contributions. Compare the gross and in-hand figures." },
    { q: "What is a good salary hike?", a: "It depends on your role, industry and inflation. Compare it with inflation and with market pay for your experience." },
  ],
  related: ["salary-tax/ctc-to-in-hand", "salary-tax/salary-calculator", "daily-life/percentage-calculator", "salary-tax/income-tax"],
  references: [
    { label: "Reserve Bank of India (inflation data)", url: "https://www.rbi.org.in/" },
    { label: "Income Tax Department (official portal)", url: "https://www.incometax.gov.in/" },
  ],
};

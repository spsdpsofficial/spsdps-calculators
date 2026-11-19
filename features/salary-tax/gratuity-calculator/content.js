export const content = {
  seo: {
    title: "Gratuity Calculator: Amount & Tax-Free Limit",
    description:
      "Estimate your gratuity from last drawn basic + DA and years of service. See the 15/26 formula, rounding rule and the ₹20 lakh tax-free limit with an example.",
    keywords: ["gratuity calculator", "gratuity calculation formula", "gratuity calculator India", "gratuity 15/26", "gratuity tax exemption limit"],
  },
  h1: "Gratuity Calculator",
  intro: [
    "Gratuity is a lump sum your employer pays as a thank-you for long service, usually when you leave or retire. This calculator estimates it from your last drawn monthly basic salary plus dearness allowance and the years you have worked.",
    "For employees covered by the Payment of Gratuity Act the standard formula is last drawn wage × 15 ÷ 26 × years of service. A part year of more than six months is counted as a full year. A separate formula applies if your employer is not covered by the Act.",
  ],
  howTo: [
    "Enter your last drawn monthly basic salary plus DA.",
    "Enter your completed years of service and any extra months.",
    "Choose whether your employer is covered by the Payment of Gratuity Act.",
    "Read the gratuity, the years counted and the tax-free portion.",
  ],
  formula: {
    expression: "Covered: Gratuity = Wage × 15 ÷ 26 × Years\nNot covered: Gratuity = Wage × 15 ÷ 30 × Completed years",
    variables: [
      { symbol: "Wage", meaning: "last drawn monthly basic salary + DA (for non-covered employees, the average of the last 10 months)." },
      { symbol: "15", meaning: "days of wages for every completed year." },
      { symbol: "26", meaning: "working days in a month, used for covered employees. Non-covered employees use 30." },
      { symbol: "Years", meaning: "completed years of service. For covered employees, a part year of more than 6 months counts as a full year." },
    ],
    notes: [
      "Under the Code on Social Security, 2020, wages generally include basic, DA and retaining allowance, and if other pay components exceed 50% of total pay the excess is added back to wages. Check how your employer defines wages.",
      "The tax-free limit for gratuity is ₹20 lakh. Any amount above it is taxable.",
    ],
  },
  example: {
    scenario: "Vikram worked for 12 years and his last drawn basic + DA is ₹50,000 a month. His employer is covered by the Act.",
    inputs: [
      { label: "Last drawn basic + DA", value: "₹50,000" },
      { label: "Service", value: "12 years" },
    ],
    results: [
      { label: "Gratuity", value: "₹3,46,154" },
      { label: "Tax-free portion", value: "₹3,46,154" },
    ],
    steps: [
      "Gratuity = 50,000 × 15 ÷ 26 × 12.",
      "= 50,000 × 0.5769 × 12 = ₹3,46,154 (rounded).",
      "This is below ₹20 lakh, so the whole amount is within the tax-free limit.",
    ],
    expected: { input: { wage: 50000, years: 12, months: 0, covered: true }, gratuity: 346154 },
  },
  factors: [
    { title: "Last drawn wage", text: "A higher final basic raises gratuity directly. The definition of wages can change the base." },
    { title: "Length of service", text: "Each completed year adds a further 15 days of wages. A part year over six months counts in full for covered employees." },
    { title: "Eligibility", text: "Five years of continuous service is the general rule. Death or disablement is an exception, and fixed-term employees can qualify after one year." },
    { title: "Tax limit", text: "Up to ₹20 lakh is tax-free. Government employees are covered by different rules." },
  ],
  benefits: [
    "Estimate your gratuity before changing jobs.",
    "See the effect of staying a few more months to cross a rounding point.",
    "Understand how much of the lump sum is tax-free.",
    "Plan retirement cash flow.",
  ],
  assumptions: [
    "Eligibility conditions are met. The calculator does not check the five-year rule.",
    "The wage you enter is the last drawn basic + DA, or the average of the last 10 months for non-covered employees.",
    "Rules reflect the Payment of Gratuity Act and the 20 lakh limit as reported on 11 November 2026. Labour-code rules are being phased in, so confirm with your HR team.",
    "Government employees follow separate rules that are not modelled here.",
  ],
  faqs: [
    { q: "What is the gratuity formula?", a: "For employees covered by the Act: last drawn wage × 15 ÷ 26 × years of service." },
    { q: "How many years are needed to get gratuity?", a: "Generally five years of continuous service. Death or disablement are exceptions, and fixed-term employees can qualify after one year under the new labour rules." },
    { q: "How are months counted?", a: "For covered employees, a part year of more than six months is counted as a full year. 5 years and 7 months counts as 6 years; 5 years and 6 months counts as 5." },
    { q: "Is gratuity taxable?", a: "Up to ₹20 lakh is exempt for covered employees. The amount above that is taxable." },
    { q: "Does gratuity include allowances?", a: "It is based on wages, which generally means basic, DA and retaining allowance. Under the Code on Social Security, if other components exceed 50% of total pay, the excess is added to wages." },
    { q: "When is gratuity paid?", a: "Usually when you resign, retire or are terminated, and employers should pay within a set period. Check your appointment terms." },
  ],
  related: ["salary-tax/epf-calculator", "salary-tax/ctc-to-in-hand", "daily-life/retirement-calculator", "salary-tax/income-tax"],
  references: [
    { label: "Ministry of Labour and Employment (official)", url: "https://labour.gov.in/" },
    { label: "Income Tax Department (official portal)", url: "https://www.incometax.gov.in/" },
  ],
};

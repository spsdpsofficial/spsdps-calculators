import { siteConfig } from "@/lib/constants/site";

// Content for the /guides/ page. Everything here is general explanation, not advice.
// `tools` ids must exist in the catalogue (checked by tests/guides.test.js).

export const GUIDES = {
  title: "Guides and Help",
  description: `Learn how to use ${siteConfig.shortName} calculators, read results correctly, pick the right tool and understand terms like EMI, CAGR and TDS.`,
  path: "/guides/",
  updated: siteConfig.legalReviewed,
};

export const STEPS = [
  { title: "Find your tool", text: "Use the search box (press / or Ctrl+K) or open a category from the menu. Each tool page explains what it calculates." },
  { title: "Enter your numbers", text: "Amounts are in rupees. Type plain numbers; results are shown with commas in the Indian lakh and crore style." },
  { title: "Read the result and the assumptions", text: "Check the notes under the result. They say which rule, rate or formula was used and as of which date." },
  { title: "Compare and adjust", text: "Change one input at a time (rate, tenure, amount) to see what moves the result most." },
];

export const GOALS = [
  { goal: "Know my monthly loan instalment", tools: ["finance/emi-calculator", "finance/home-loan", "finance/personal-loan"] },
  { goal: "Check how much loan I may get", tools: ["finance/home-loan-eligibility"] },
  { goal: "Plan a monthly investment", tools: ["finance/sip-calculator", "finance/lumpsum-calculator", "finance/cagr-calculator"] },
  { goal: "Compare fixed-return savings", tools: ["finance/fd-calculator", "finance/rd-calculator", "finance/ppf-calculator"] },
  { goal: "Understand my salary and tax", tools: ["salary-tax/ctc-to-in-hand", "salary-tax/income-tax", "salary-tax/hra-calculator"] },
  { goal: "Work out TDS or advance tax", tools: ["salary-tax/tds", "salary-tax/advance-tax", "salary-tax/capital-gains"] },
  { goal: "Check GST on a price", tools: ["finance/gst-calculator", "business/reverse-gst"] },
  { goal: "Plan retirement", tools: ["daily-life/retirement-calculator", "finance/nps-calculator", "finance/swp-calculator"] },
  { goal: "Check my health numbers", tools: ["health/bmi-calculator", "health/calorie-calculator", "health/water-intake"] },
  { goal: "Price a product or find break-even", tools: ["business/profit-margin", "business/markup-calculator", "business/break-even"] },
  { goal: "Quick file and text helpers", tools: ["utilities/pdf-merger", "utilities/word-counter", "utilities/qr-code-generator"] },
];

export const TIPS = [
  "Use the exact figures from your loan sanction letter, payslip or statement where you have them. Rounded numbers give rounded answers.",
  "Interest rates, tax slabs and limits change. Each tool shows the financial year or date it follows; confirm with the official source before you act.",
  "Banks round instalments and charges in their own way, so a bank's figure can differ from ours by a small amount.",
  "Results are estimates for planning. Market-linked returns (SIP, lumpsum) are not guaranteed.",
  "If a result looks wrong, re-check the unit (monthly vs yearly, percent vs rupees) and then tell us on the Contact page.",
];

export const GLOSSARY = [
  ["EMI", "Equated Monthly Instalment: the fixed amount you pay each month to repay a loan, covering interest and part of the principal."],
  ["Tenure", "The length of a loan or deposit, usually in months or years."],
  ["Reducing balance", "Interest is charged only on the principal still outstanding, so the interest part of each EMI falls over time."],
  ["Compounding", "Earning interest on earlier interest. The more often it compounds, the faster the amount grows."],
  ["CAGR", "Compound Annual Growth Rate: the steady yearly rate that would take an investment from its starting value to its ending value."],
  ["SIP and lumpsum", "A SIP invests a fixed amount at regular intervals; a lumpsum invests the whole amount at once."],
  ["FOIR", "Fixed Obligations to Income Ratio: the share of monthly income that goes to existing EMIs and similar commitments. Lenders use it to size eligibility."],
  ["TDS", "Tax Deducted at Source: tax held back by the payer (employer, bank) and deposited with the government on your behalf."],
  ["Advance tax", "Tax paid in instalments during the year, instead of in one amount at the end, when the liability crosses the prescribed limit."],
  ["Capital gains", "Profit on selling an asset such as shares, mutual funds or property. Tax depends on the asset and how long it was held."],
  ["CTC and in-hand", "CTC is the total yearly cost to the employer. In-hand pay is what reaches your account after PF, tax and other deductions."],
  ["BMI", "Body Mass Index: weight divided by height squared. A screening number only; it does not diagnose health."],
];

export const FAQS = [
  { q: "Is my data sent anywhere?", a: "No. Calculations run in your browser. The tools do not need an account and the site does not store what you type." },
  { q: "Why does the site always open in light mode?", a: "By design, every page load starts in the light theme. You can switch to dark with the theme button for the current visit; a refresh returns to light." },
  { q: "Can I use the site offline?", a: "Once a page has loaded, you can install the site from your browser and many tools keep working without internet. Rates and rules are not updated while offline." },
  { q: "How accurate are the results?", a: "They follow standard formulas and the rules stated on each tool page, but they are estimates and not professional advice. See the Disclaimer." },
  { q: "How do I report a mistake or request a tool?", a: `Use the form on the Contact page. It prepares an email to ${siteConfig.contactEmail}.` },
];

export const content = {
  seo: {
    title: "Ovulation & Fertile Window Calculator",
    description:
      "Estimate your ovulation day, fertile window and next period from your last period and cycle length, with the next three cycles. Not for contraception.",
    keywords: ["ovulation calculator", "fertile window calculator", "ovulation date calculator", "period calculator", "when do i ovulate"],
  },
  h1: "Ovulation and Fertile Window Calculator",
  intro: [
    "If you are trying to get pregnant, knowing roughly when you ovulate helps you time intercourse. Ovulation usually happens about 14 days before your next period. The days from five days before ovulation up to the day after are your fertile window, when pregnancy is most likely.",
    "Enter the first day of your last period and the usual length of your cycle to see your estimated dates for the next three cycles. These are estimates, and this tool should not be used to avoid pregnancy.",
  ],
  howTo: ["Enter the first day of your last period.", "Enter your average cycle length in days.", "Read the estimated ovulation day, fertile window and next period.", "Use the table to plan the next three cycles."],
  formula: {
    expression: "Next period = Last period start + Cycle length\nOvulation = Next period − 14 days\nFertile window = Ovulation − 5 days to Ovulation + 1 day",
    variables: [
      { symbol: "14 days", meaning: "the typical length of the phase between ovulation and the next period." },
      { symbol: "Fertile window", meaning: "sperm can survive up to about five days, and the egg lives about a day." },
    ],
  },
  example: {
    scenario: "A woman's last period began on 1 November 2026 and her cycle is 28 days long.",
    inputs: [{ label: "Last period and cycle", value: "1 November 2026, 28 days" }],
    results: [
      { label: "Ovulation", value: "15 November 2026" },
      { label: "Fertile window", value: "10 to 16 November 2026" },
      { label: "Next period", value: "29 November 2026" },
    ],
    steps: ["Next period = 1 November + 28 days = 29 November.", "Ovulation = 29 November − 14 days = 15 November.", "The fertile window runs from 10 to 16 November."],
    expected: { input: { lmp: "2026-11-01", cycleLength: 28 }, first: { nextPeriod: "2026-11-29", ovulation: "2026-11-15", fertileStart: "2026-11-10", fertileEnd: "2026-11-16" } },
  },
  factors: [
    { title: "Cycle regularity", text: "The estimate is better for regular cycles. Stress, illness and travel can move ovulation." },
    { title: "Cycle length", text: "Longer cycles ovulate later, since the phase after ovulation stays about the same." },
    { title: "Age and health", text: "Conditions such as PCOS or thyroid problems can make cycles irregular." },
  ],
  benefits: ["Plan around your fertile days.", "Track your cycle across months.", "Know when your next period is due."],
  assumptions: ["Regular cycles with ovulation 14 days before the next period.", "Dates are estimates and can vary each month.", "This tool is not a contraceptive method."],
  faqs: [
    { q: "How do I calculate my ovulation date?", a: "Count your cycle length from the first day of your last period, then subtract 14 days from the date of your next period." },
    { q: "How long is the fertile window?", a: "About six days, from five days before ovulation to one day after." },
    { q: "Can I use this to avoid pregnancy?", a: "No. Ovulation can shift, and this estimate is not reliable enough for contraception. Speak to a doctor about contraception." },
    { q: "What if my cycle is irregular?", a: "The estimate may be wrong. A doctor can advise on tracking methods such as ovulation test kits or ultrasound monitoring." },
    { q: "When should I see a doctor?", a: "If you have been trying for 12 months (or 6 months if over 35) without success, or your cycles are very irregular, talk to a doctor." },
  ],
  related: ["health/due-date", "daily-life/date-difference", "health/bmi-calculator", "daily-life/day-of-week"],
  references: [
    { label: "NHS: ovulation and fertility", url: "https://www.nhs.uk/conditions/pregnancy-and-baby/trying-to-get-pregnant/" },
    { label: "Ministry of Health and Family Welfare", url: "https://main.mohfw.gov.in/" },
  ],
};

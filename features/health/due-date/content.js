export const content = {
  seo: {
    title: "Pregnancy Due Date Calculator (EDD)",
    description:
      "Estimate your baby's due date from the first day of your last period and cycle length. See your pregnancy week, trimester and key dates. Not medical advice.",
    keywords: ["due date calculator", "pregnancy due date calculator", "edd calculator", "pregnancy week calculator", "lmp due date"],
  },
  h1: "Pregnancy Due Date Calculator",
  intro: [
    "A due date is an estimate of when a baby is likely to be born. The usual method, Naegele's rule, counts 280 days (40 weeks) from the first day of your last menstrual period, and adjusts if your cycle is not 28 days long.",
    "Enter the first day of your last period and your average cycle length. The calculator shows your estimated due date, how far along you are and the dates your trimesters end. Your doctor will confirm your dates, usually with an early ultrasound.",
  ],
  howTo: ["Enter the first day of your last period.", "Enter your usual cycle length in days.", "Optionally pick a date to see progress on, or leave it empty for today.", "Read the due date, current week and trimester."],
  formula: {
    expression: "Due date = First day of last period + 280 days + (Cycle length − 28)",
    variables: [
      { symbol: "280 days", meaning: "40 weeks, the standard length of pregnancy counted from the last period." },
      { symbol: "Cycle length − 28", meaning: "adjusts the date for cycles longer or shorter than the standard 28 days." },
    ],
    notes: ["Conception is estimated 14 days after the start of a 28-day cycle."],
  },
  example: {
    scenario: "A woman's last period began on 10 January 2026, and her cycle is 28 days.",
    inputs: [{ label: "Last period and cycle", value: "10 January 2026, 28 days" }],
    results: [
      { label: "Estimated due date", value: "17 October 2026" },
      { label: "Estimated conception", value: "around 24 January 2026" },
    ],
    steps: ["Add 280 days to 10 January 2026.", "A 28-day cycle needs no adjustment.", "The due date is 17 October 2026."],
    expected: { input: { lmp: "2026-01-10", cycleLength: 28, asOf: "2026-04-18" }, dueDate: "2026-10-17" },
  },
  factors: [
    { title: "Cycle length", text: "Longer or shorter cycles move the due date." },
    { title: "Irregular periods", text: "If you are unsure of your last period date, an ultrasound dates the pregnancy better." },
    { title: "Individual variation", text: "Most babies arrive within two weeks of the estimated date." },
  ],
  benefits: ["Get a quick estimate of your due date.", "See your pregnancy week and trimester.", "Plan appointments and leave."],
  assumptions: ["You know the first day of your last period.", "Ovulation happens around 14 days before the next period.", "Medical dating, for example from a scan, can differ and takes priority."],
  faqs: [
    { q: "How is the due date calculated?", a: "By adding 280 days to the first day of your last period, adjusted for your cycle length." },
    { q: "How accurate is a due date?", a: "It is an estimate. Only a small share of babies are born on that date, and most arrive within two weeks of it." },
    { q: "What if my cycle is irregular?", a: "The estimate may be off. Your doctor can date the pregnancy with an ultrasound." },
    { q: "What are the trimesters?", a: "The first trimester ends at 13 weeks, the second at 27 weeks and the third continues until birth." },
    { q: "Is this medical advice?", a: "No. It is a general estimate. Please see a doctor for antenatal care and to confirm your dates." },
  ],
  related: ["health/ovulation", "daily-life/date-difference", "health/bmi-calculator", "health/water-intake"],
  references: [
    { label: "NHS: pregnancy due date", url: "https://www.nhs.uk/pregnancy/" },
    { label: "Ministry of Health and Family Welfare", url: "https://main.mohfw.gov.in/" },
  ],
};

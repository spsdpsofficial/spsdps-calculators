export const content = {
  seo: {
    title: "Date Difference Calculator: Days Between",
    description:
      "Find the number of days, weeks, months and years between two dates. Also counts weekdays and weekends, with the method explained and a worked example.",
    keywords: ["date difference calculator", "days between two dates", "date duration calculator", "how many days between dates", "weekdays between dates"],
  },
  h1: "Date Difference Calculator",
  intro: [
    "Need to know how many days there are between two dates? This calculator gives the difference in years, months and days, the total number of days and weeks, and how many of those days fall on weekdays and weekends.",
    "It is useful for notice periods, project timelines, loan or deposit durations, pregnancy and travel planning, and any deadline where you need an exact count.",
  ],
  howTo: [
    "Pick the start date and the end date.",
    "Choose whether to count the end date as well. Counting both the first and last day adds one day.",
    "Read the difference in years, months and days, plus the totals.",
    "Check the weekday count if you are planning working days.",
  ],
  formula: {
    expression: "Total days = End date − Start date  (+ 1 if both dates are counted)",
    variables: [
      { symbol: "Years, months, days", meaning: "whole months are counted first, then the days left over." },
      { symbol: "Weekdays", meaning: "Monday to Friday days between the dates, with both dates included." },
    ],
    notes: ["Leap years are handled automatically. Public holidays are not excluded from the weekday count."],
  },
  example: {
    scenario: "How long is it from 1 January 2026 to 31 December 2026?",
    inputs: [
      { label: "Start date", value: "1 January 2026" },
      { label: "End date", value: "31 December 2026" },
    ],
    results: [
      { label: "Difference", value: "11 months, 30 days" },
      { label: "Total days", value: "364 (365 if both dates are counted)" },
      { label: "Weeks", value: "52 weeks" },
    ],
    steps: [
      "From 1 January to 1 December is 11 whole months, and from 1 December to 31 December is 30 days.",
      "2026 has 365 days. The gap between the first and last day is 364 days.",
      "364 ÷ 7 = 52 weeks exactly.",
    ],
    expected: { input: { start: "2026-01-01", end: "2026-12-31", includeEnd: false }, result: { months: 11, days: 30, totalDays: 364, weeks: 52 } },
  },
  factors: [
    { title: "Including the end date", text: "Some purposes (like a stay at a hotel) count nights; others (like days of leave) count both the first and last day." },
    { title: "Leap years", text: "A span that includes 29 February has one extra day." },
    { title: "Month lengths", text: "Months have 28 to 31 days, so '1 month' is not a fixed number of days." },
    { title: "Holidays", text: "Weekday counts do not remove public or local holidays." },
  ],
  benefits: [
    "Count days exactly for notice periods and deadlines.",
    "Plan working days between two dates.",
    "Work out durations for deposits, loans and leave.",
    "Avoid manual calendar counting mistakes.",
  ],
  assumptions: [
    "The Gregorian calendar and whole dates only. Times of day are ignored.",
    "If the end date is earlier than the start date, the dates are swapped.",
    "Weekends are Saturday and Sunday.",
  ],
  faqs: [
    { q: "How do I calculate the number of days between two dates?", a: "Subtract the earlier date from the later one. The calculator does this exactly and accounts for leap years." },
    { q: "Should I include the last day?", a: "It depends on your purpose. Leave it unticked to get the gap between the dates, or include it if both the first and last day count, such as days of leave." },
    { q: "Does it count business days?", a: "It counts Monday to Friday days. Public holidays are not removed." },
    { q: "How are months counted?", a: "Whole calendar months are counted first, then the remaining days, which is why the result may differ from days ÷ 30." },
    { q: "Can the end date be earlier than the start date?", a: "Yes. The calculator swaps them and tells you." },
  ],
  related: ["daily-life/age-calculator", "daily-life/time-duration", "finance/simple-interest", "daily-life/travel-budget"],
  references: [
    { label: "Timeanddate: date calculators", url: "https://www.timeanddate.com/date/" },
    { label: "Government of India portal", url: "https://www.india.gov.in/" },
  ],
};

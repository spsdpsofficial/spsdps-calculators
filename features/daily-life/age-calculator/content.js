export const content = {
  seo: {
    title: "Age Calculator: Exact Age in Years & Days",
    description:
      "Find your exact age in years, months and days from your date of birth. Also see total days lived, your birth weekday and days to your next birthday.",
    keywords: ["age calculator", "calculate age from date of birth", "exact age calculator", "age in years months days", "date of birth calculator"],
  },
  h1: "Age Calculator",
  intro: [
    "Enter a date of birth and this calculator tells you the exact age in years, months and days. It also shows the total number of months, weeks and days you have lived, the weekday you were born and how many days remain until your next birthday.",
    "By default it uses today's date, but you can pick any other date to find an age on a particular day. That is handy for forms that ask for age on a cut-off date, such as admissions, exams and job applications.",
  ],
  howTo: [
    "Enter your date of birth.",
    "Leave the second date empty to calculate age as of today, or choose a date to calculate age on that day.",
    "Read your age in years, months and days.",
    "Scroll the result for total days, your birth weekday and the countdown to your next birthday.",
  ],
  formula: {
    expression: "Age = full years + remaining months + remaining days between the birth date and the chosen date",
    variables: [
      { symbol: "Years and months", meaning: "the largest whole number of months that fits between the two dates, split into years and months." },
      { symbol: "Days", meaning: "the days left after those whole months." },
      { symbol: "Total days", meaning: "the exact difference between the two dates in days, including leap days." },
    ],
    notes: ["When a month is shorter than the birth day (for example 31 January + 1 month), the date is moved to the end of that month, which is the common calendar convention."],
  },
  example: {
    scenario: "Someone born on 15 June 1995 checks their age on 11 November 2026.",
    inputs: [
      { label: "Date of birth", value: "15 June 1995" },
      { label: "Age on", value: "11 November 2026" },
    ],
    results: [
      { label: "Age", value: "31 years, 4 months, 27 days" },
      { label: "Total days lived", value: "11,472" },
      { label: "Next birthday", value: "15 June 2027 (216 days away), turning 32" },
    ],
    steps: [
      "From 15 June 1995 to 15 June 2026 is 31 full years.",
      "From 15 June 2026 to 15 October 2026 is 4 months, and from 15 October to 11 November is 27 days.",
      "The total number of days between the two dates, counting leap days, is 11,472.",
    ],
    expected: { input: { dob: "1995-06-15", asOf: "2026-11-11" }, age: { years: 31, months: 4, days: 27, totalDays: 11472 } },
  },
  factors: [
    { title: "Leap years", text: "29 February adds a day every four years, which is included in the total days." },
    { title: "Month lengths", text: "Months have different lengths, so the 'days' part depends on which months are involved." },
    { title: "The 'age on' date", text: "Age changes every day, so the same birth date gives different results on different dates." },
    { title: "Birthday on 29 February", text: "In non-leap years the birthday is treated as 28 February." },
  ],
  benefits: [
    "Check age on a cut-off date for admissions, exams or applications.",
    "Find your exact age in days, weeks and months.",
    "Know the weekday you were born.",
    "Count down to the next birthday.",
  ],
  assumptions: [
    "The Gregorian calendar is used for all dates.",
    "Time of birth and time zones are ignored. Only dates are compared.",
    "Today's date comes from your device's clock.",
    "Some official forms count age differently, for example completed years only. Follow the form's own rule.",
  ],
  faqs: [
    { q: "How do I calculate my age from my date of birth?", a: "Count the full years between your birth date and the chosen date, then the remaining months and days. The calculator does this exactly, including leap years." },
    { q: "Can I find my age on a past or future date?", a: "Yes. Enter that date in the 'age on' field. The date must not be before your birth date." },
    { q: "How many days old am I?", a: "The total days figure shows the exact number of days from your birth date to the chosen date." },
    { q: "How is a 29 February birthday handled?", a: "In years that are not leap years, the birthday is counted on 28 February." },
    { q: "Does the calculator store my date of birth?", a: "No. The calculation happens in your browser and nothing is sent to a server." },
  ],
  related: ["daily-life/date-difference", "daily-life/time-duration", "daily-life/retirement-calculator", "health/bmi-calculator"],
  references: [
    { label: "Timeanddate: how date calculations work", url: "https://www.timeanddate.com/date/" },
    { label: "Government of India portal", url: "https://www.india.gov.in/" },
  ],
};

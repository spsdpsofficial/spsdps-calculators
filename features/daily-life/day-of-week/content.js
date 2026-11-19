export const content = {
  seo: {
    title: "Day of the Week Calculator for Any Date",
    description:
      "Find which day of the week any date falls on, past or future. Also shows the day of the year, ISO week number, quarter and whether the year is a leap year.",
    keywords: ["day of the week calculator", "what day was it on this date", "which day was i born", "weekday finder", "day of week for any date"],
  },
  h1: "Day of the Week Calculator",
  intro: [
    "Want to know which day of the week a date falls on? Pick any date, in the past or the future, and this calculator tells you the weekday. It is handy for finding the day you were born, planning events, checking historical dates and scheduling deadlines.",
    "It also shows the day of the year, the ISO week number, the quarter and whether the year is a leap year.",
  ],
  howTo: ["Pick the date.", "Read the weekday shown at the top of the result.", "Check the day of the year, ISO week and quarter if you need them."],
  formula: {
    expression: "Weekday = (days since a known reference date) mod 7",
    variables: [
      { symbol: "Leap year", meaning: "divisible by 4, except century years, which must be divisible by 400." },
      { symbol: "ISO week", meaning: "weeks start on Monday, and week 1 is the week with the year's first Thursday." },
    ],
    notes: ["The calculator uses exact date arithmetic and the Gregorian calendar throughout."],
  },
  example: {
    scenario: "Which day of the week was 15 August 1947, the day India became independent?",
    inputs: [{ label: "Date", value: "15 August 1947" }],
    results: [
      { label: "Weekday", value: "Friday" },
      { label: "Day of the year", value: "227 of 365" },
      { label: "ISO week", value: "Week 33" },
    ],
    steps: ["Count the days from a known reference date to 15 August 1947.", "Divide by 7 and use the remainder to find the weekday.", "The remainder gives Friday."],
    expected: { input: { date: "1947-08-15" }, result: { weekday: "Friday", dayOfYear: 227, isoWeek: 33 } },
  },
  factors: [
    { title: "Calendar", text: "Dates are treated in the Gregorian calendar, including very old ones." },
    { title: "Leap years", text: "29 February exists only in leap years." },
    { title: "Week numbering", text: "ISO week numbers may differ from the week numbers a calendar app shows." },
  ],
  benefits: ["Find the weekday of any birthday or event.", "Plan around the calendar.", "Check the ISO week for work and school schedules."],
  assumptions: ["The Gregorian calendar is used for all dates.", "Only the date matters, not the time or time zone."],
  faqs: [
    { q: "How do I find the day of the week for a date?", a: "Pick the date in the calculator and it shows the weekday immediately." },
    { q: "How can I find the day I was born?", a: "Enter your date of birth. The weekday is shown." },
    { q: "What is the ISO week number?", a: "A standard numbering of weeks, starting on Monday, where week 1 contains the first Thursday of the year." },
    { q: "How do I know if a year is a leap year?", a: "It is divisible by 4, but century years must also be divisible by 400. For example 2000 was a leap year, and 1900 was not." },
    { q: "Does it work for dates in the far past?", a: "Yes, but it applies the Gregorian calendar throughout, even where earlier calendars were used." },
  ],
  related: ["daily-life/date-difference", "daily-life/age-calculator", "daily-life/time-duration", "daily-life/time-zone"],
  references: [
    { label: "Timeanddate: calendars", url: "https://www.timeanddate.com/calendar/" },
    { label: "Government of India portal", url: "https://www.india.gov.in/" },
  ],
};

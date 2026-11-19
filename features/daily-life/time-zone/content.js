export const content = {
  seo: {
    title: "Time Zone Converter: India to World Time",
    description:
      "Convert a date and time between India Standard Time and cities worldwide, with daylight saving applied automatically for the date you pick.",
    keywords: ["time zone converter", "ist to est converter", "india time to us time", "world time converter", "ist to utc converter"],
  },
  h1: "Time Zone Converter",
  intro: [
    "Planning a call with a colleague abroad or catching a live match in another country? Pick a date and time in one place and see what time it is somewhere else. The converter is set up with India Standard Time (UTC+5:30) as the default, and covers cities in Asia, Europe, the Americas and Oceania.",
    "Daylight saving time is applied for the date you choose, so the answer is right in both summer and winter.",
  ],
  howTo: ["Choose the date and time.", "Select the time zone you are converting from.", "Select the time zone you want to convert to.", "Read the converted time, date and UTC offset."],
  formula: {
    expression: "Time there = UTC time + Offset of that zone on that date\nUTC time = Local time − Offset of the source zone",
    variables: [
      { symbol: "Offset", meaning: "hours and minutes a place is ahead of (+) or behind (−) UTC. India is +5:30." },
      { symbol: "Daylight saving", meaning: "some zones shift their offset by an hour in summer, so the offset depends on the date." },
    ],
    notes: ["Conversion uses your browser's built-in time zone data. India does not use daylight saving."],
  },
  example: {
    scenario: "A meeting is at 10:00 am in India on 13 November 2026. What time is that in New York?",
    inputs: [
      { label: "From", value: "10:00, 13 November 2026, India (IST)" },
      { label: "To", value: "New York (US Eastern)" },
    ],
    results: [
      { label: "Time in New York", value: "11:30 pm on 12 November 2026" },
      { label: "Offset in New York", value: "UTC−05:00" },
    ],
    steps: ["10:00 IST is 04:30 UTC, since IST is UTC+5:30.", "New York is on standard time in mid-November, UTC−5.", "04:30 minus 5 hours is 23:30 on the previous day."],
    expected: { input: { date: "2026-11-13", time: "10:00", from: "Asia/Kolkata", to: "America/New_York" }, time: "23:30" },
  },
  factors: [
    { title: "Daylight saving", text: "The US and Europe change their clocks on different dates, so the gap with India shifts during the year." },
    { title: "Date line", text: "The converted time can fall on the previous or next day." },
    { title: "Half-hour zones", text: "India and Nepal use half-hour or quarter-hour offsets." },
  ],
  benefits: ["Plan international calls and meetings.", "See the date change across the world.", "Get correct results in summer and winter."],
  assumptions: ["Time zone rules come from your browser and device.", "A single city stands for each zone. Other cities in the same country may differ.", "Future rule changes by governments are not known in advance."],
  faqs: [
    { q: "What is India's time zone?", a: "India Standard Time (IST) is UTC+5:30 throughout the year. India does not observe daylight saving time." },
    { q: "How do I convert IST to EST?", a: "EST is UTC−5, which is 10 hours 30 minutes behind IST. During US daylight time (EDT, UTC−4) the gap is 9 hours 30 minutes. This converter picks the right one for your date." },
    { q: "Why is the answer on a different date?", a: "When you cross enough time zones, local time can be the previous or next calendar day." },
    { q: "Does it handle daylight saving?", a: "Yes, for the date you pick." },
    { q: "Why do some places have a half-hour offset?", a: "A few countries, such as India and Nepal, chose offsets that are not whole hours from UTC." },
  ],
  related: ["daily-life/day-of-week", "daily-life/time-duration", "daily-life/date-difference", "daily-life/age-calculator"],
  references: [
    { label: "Timeanddate: world clock", url: "https://www.timeanddate.com/worldclock/" },
    { label: "IANA time zone database", url: "https://www.iana.org/time-zones" },
  ],
};

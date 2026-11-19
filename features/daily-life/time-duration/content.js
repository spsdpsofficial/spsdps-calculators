export const content = {
  seo: {
    title: "Time Duration Calculator: Hours Between Times",
    description:
      "Find the hours and minutes between two clock times, including overnight shifts. Subtract a break and see the result in hours, minutes and decimal hours.",
    keywords: ["time duration calculator", "hours between two times", "time difference calculator", "work hours calculator", "overnight shift hours"],
  },
  h1: "Time Duration Calculator",
  intro: [
    "Need the exact number of hours and minutes between a start and end time? Enter both times and any unpaid break. The calculator handles shifts that cross midnight and gives the answer in hours and minutes as well as decimal hours, which is handy for timesheets and billing.",
  ],
  howTo: [
    "Enter the start time and the end time.",
    "Enter any break in minutes to subtract, or leave it empty.",
    "Read the time in hours and minutes, decimal hours and total minutes.",
    "For night shifts, simply enter an end time earlier than the start time.",
  ],
  formula: {
    expression: "Minutes = End − Start  (add 24 hours if End is earlier than Start)\nNet time = Minutes − Break\nDecimal hours = Net minutes ÷ 60",
    variables: [
      { symbol: "Start, End", meaning: "clock times in 24-hour format." },
      { symbol: "Break", meaning: "unpaid minutes removed from the total." },
    ],
  },
  example: {
    scenario: "A working day from 9:30 AM to 6:15 PM with a 45-minute lunch break.",
    inputs: [
      { label: "Start", value: "09:30" },
      { label: "End", value: "18:15" },
      { label: "Break", value: "45 minutes" },
    ],
    results: [
      { label: "Before break", value: "8h 45m" },
      { label: "Time worked", value: "8h 0m" },
      { label: "Decimal hours", value: "8 hours" },
    ],
    steps: ["18:15 − 09:30 = 8 hours 45 minutes (525 minutes).", "Subtract the 45-minute break: 525 − 45 = 480 minutes.", "480 ÷ 60 = 8 hours."],
    expected: { input: { start: "09:30", end: "18:15", breakMinutes: 45 }, netMinutes: 480 },
  },
  factors: [
    { title: "Crossing midnight", text: "An end time earlier than the start time is treated as the next day." },
    { title: "Breaks", text: "Only the break length you enter is removed." },
    { title: "Spans over 24 hours", text: "Only a single span of up to 24 hours is supported. Use the date difference calculator for longer periods." },
  ],
  benefits: [
    "Fill timesheets accurately.",
    "Handle night shifts without manual arithmetic.",
    "Get decimal hours for billing and payroll.",
  ],
  assumptions: [
    "Times are in 24-hour format and on the same time zone.",
    "Daylight-saving changes do not apply in India and are ignored.",
    "Spans are less than 24 hours.",
  ],
  faqs: [
    { q: "How do I calculate hours between two times?", a: "Subtract the start time from the end time. If the end is earlier, add 24 hours first." },
    { q: "How do I convert hours and minutes to decimal hours?", a: "Divide the minutes by 60 and add them to the hours. 8h 30m is 8.5 hours." },
    { q: "Does it support night shifts?", a: "Yes. If the end time is earlier than the start time, it is treated as the next day." },
    { q: "What if my shift is longer than 24 hours?", a: "Use the date difference calculator or split it into two spans." },
    { q: "Can I subtract more than one break?", a: "Add the break lengths together and enter the total minutes." },
  ],
  related: ["daily-life/date-difference", "daily-life/age-calculator", "salary-tax/salary-calculator", "daily-life/unit-converter"],
  references: [
    { label: "Ministry of Labour & Employment", url: "https://labour.gov.in/" },
    { label: "National Institute of Standards and Technology: time", url: "https://www.nist.gov/time-and-frequency" },
  ],
};

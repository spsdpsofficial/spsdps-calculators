export const content = {
  seo: {
    title: "Running Pace Calculator: Pace & Speed",
    description:
      "Find your running pace per km and per mile and your speed in km/h from distance and time, plus projected 5K, 10K, half marathon and marathon times at that pace.",
    keywords: ["pace calculator", "running pace calculator", "min per km calculator", "marathon pace calculator", "5k 10k half marathon time calculator"],
  },
  h1: "Running Pace Calculator",
  intro: [
    "Pace tells you how long each kilometre or mile takes. Enter the distance you ran and your time, and this calculator gives your pace per kilometre and per mile, your speed in km/h, and how long common race distances would take at the same pace.",
    "It is useful for setting race targets, planning training runs and comparing runs of different lengths.",
  ],
  howTo: ["Enter the distance in kilometres.", "Enter your time in hours, minutes and seconds.", "Read your pace per kilometre and per mile and your speed.", "Check the projected race times in the table."],
  formula: {
    expression: "Pace per km = Total time ÷ Distance\nPace per mile = Pace per km × 1.609344\nSpeed (km/h) = 3600 ÷ Pace per km in seconds",
    variables: [
      { symbol: "Total time", meaning: "hours, minutes and seconds converted to seconds." },
      { symbol: "1.609344", meaning: "kilometres in a mile." },
    ],
    notes: ["Projected times multiply your pace by each race distance."],
  },
  example: {
    scenario: "A runner completes 10 km in 55 minutes.",
    inputs: [
      { label: "Distance", value: "10 km" },
      { label: "Time", value: "55 minutes" },
    ],
    results: [
      { label: "Pace per km", value: "5:30" },
      { label: "Pace per mile", value: "8:51" },
      { label: "Speed", value: "10.91 km/h" },
      { label: "Projected 5 km", value: "27:30" },
    ],
    steps: ["55 minutes = 3,300 seconds, and 3,300 ÷ 10 = 330 seconds per km, or 5:30.", "330 × 1.609344 = 531 seconds per mile, or 8:51.", "Speed = 3,600 ÷ 330 = 10.91 km/h."],
    expected: { input: { distanceKm: 10, totalSeconds: 3300 }, pace: "5:30" },
  },
  factors: [
    { title: "Terrain and weather", text: "Hills, heat and wind slow your pace." },
    { title: "Race distance", text: "Most people cannot hold a 5K pace for a marathon." },
    { title: "Fitness and training", text: "Pace improves with consistent training." },
  ],
  benefits: ["Set realistic race targets.", "Compare runs of different distances.", "Convert between km and mile pace."],
  assumptions: ["An even pace for the whole distance.", "The time is the moving time you enter.", "Projected race times are estimates, not predictions."],
  faqs: [
    { q: "How is running pace calculated?", a: "Divide your total time by the distance. For example, 55 minutes for 10 km is 5 minutes 30 seconds per km." },
    { q: "What is a good running pace?", a: "It depends on age, fitness and the distance. Compare yourself with your own earlier runs." },
    { q: "How do I convert min/km to min/mile?", a: "Multiply the pace by 1.609344. A 5:30 per km pace is about 8:51 per mile." },
    { q: "Can I predict my marathon time from a 10K?", a: "A straight multiplication is optimistic because fatigue slows you down over longer distances. Treat it as an upper-end estimate." },
    { q: "Does it work for walking and cycling?", a: "Yes, for pace and speed. The race projections are meant for running." },
  ],
  related: ["health/target-heart-rate", "health/calorie-calculator", "daily-life/time-duration", "daily-life/unit-converter"],
  references: [
    { label: "World Athletics", url: "https://worldathletics.org/" },
    { label: "Athletics Federation of India", url: "https://indianathletics.in/" },
  ],
};

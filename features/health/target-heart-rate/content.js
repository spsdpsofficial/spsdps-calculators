export const content = {
  seo: {
    title: "Target Heart Rate Calculator & Zones",
    description:
      "Find your estimated maximum heart rate and training zones by age, with an optional resting heart rate for the Karvonen method. Plan workouts by intensity.",
    keywords: ["target heart rate calculator", "heart rate zones calculator", "maximum heart rate by age", "karvonen formula calculator", "fat burn heart rate"],
  },
  h1: "Target Heart Rate Calculator",
  intro: [
    "Your heart rate shows how hard your body is working during exercise. Training in a target zone helps you match a workout to a goal, such as easy aerobic exercise, fat burning or higher-intensity fitness work.",
    "Enter your age to estimate your maximum heart rate and the five zones. If you also enter your resting heart rate, the calculator uses the Karvonen method, which adjusts zones for your fitness.",
  ],
  howTo: ["Enter your age.", "Optionally enter your resting heart rate in beats per minute.", "Choose a maximum heart rate formula, or keep the default.", "Read your zones and pick the one that fits your workout."],
  formula: {
    expression: "Max heart rate = 208 − 0.7 × Age  (or 220 − Age)\nZone (percent of max) = Max × %\nZone (Karvonen) = Resting + % × (Max − Resting)",
    variables: [
      { symbol: "Max", meaning: "estimated highest heart rate during hard exercise." },
      { symbol: "Resting", meaning: "your pulse at complete rest." },
      { symbol: "%", meaning: "the intensity of the zone, such as 50% to 60%." },
    ],
    notes: ["The Tanaka formula is generally considered more accurate across ages than 220 − age."],
  },
  example: {
    scenario: "A 30-year-old with a resting heart rate of 60 bpm.",
    inputs: [
      { label: "Age", value: "30 years" },
      { label: "Resting heart rate", value: "60 bpm" },
    ],
    results: [
      { label: "Estimated maximum", value: "187 bpm" },
      { label: "Very light zone (50–60%)", value: "124–136 bpm" },
      { label: "Light zone (60–70%)", value: "136–149 bpm" },
    ],
    steps: ["Maximum = 208 − 0.7 × 30 = 187 bpm.", "Heart-rate reserve = 187 − 60 = 127 bpm.", "50% zone starts at 60 + 0.5 × 127 = 123.5, about 124 bpm."],
    expected: { input: { age: 30, formulaId: "tanaka", restingHr: 60 }, max: 187 },
  },
  factors: [
    { title: "Fitness", text: "A fitter heart has a lower resting rate, which the Karvonen method takes into account." },
    { title: "Medicines", text: "Beta blockers and other medicines can lower your heart rate." },
    { title: "Individual variation", text: "Real maximum heart rate can differ from the formula by 10 bpm or more." },
  ],
  benefits: ["Train at the right intensity.", "Avoid overdoing workouts.", "Compare formulas and methods."],
  assumptions: ["Average adults, with no heart or other medical conditions.", "Formula values are estimates, not measurements.", "Resting heart rate is measured at rest, such as before getting out of bed."],
  faqs: [
    { q: "What is a good target heart rate?", a: "For moderate exercise, many guidelines suggest about 50 to 70 per cent of your maximum heart rate, and 70 to 85 per cent for vigorous exercise." },
    { q: "How do I find my resting heart rate?", a: "Count your pulse for 60 seconds after waking, before getting up. A healthy adult's rate is often 60 to 100 bpm." },
    { q: "Which formula should I use?", a: "Tanaka is commonly preferred for adults. The 220 − age formula is simple but less accurate for many people." },
    { q: "Is this safe for everyone?", a: "No. If you have heart disease, high blood pressure or take medicines that affect heart rate, ask your doctor before using targets." },
    { q: "What is the Karvonen method?", a: "It sets zones as a share of the gap between your resting and maximum heart rates, so it adapts to your fitness." },
  ],
  related: ["health/pace-calculator", "health/calorie-calculator", "health/bmi-calculator", "health/water-intake"],
  references: [
    { label: "American Heart Association: target heart rates", url: "https://www.heart.org/" },
    { label: "World Health Organization: physical activity", url: "https://www.who.int/" },
  ],
};

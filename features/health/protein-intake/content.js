export const content = {
  seo: {
    title: "Protein Intake Calculator: Daily Grams",
    description:
      "Estimate how much protein you need each day from your body weight and activity level, with a range in grams per kg and how to spread it across meals.",
    keywords: ["protein intake calculator", "daily protein requirement", "how much protein do i need", "protein calculator india", "protein per kg body weight"],
  },
  h1: "Protein Intake Calculator",
  intro: [
    "Protein helps build and repair muscle and supports many functions in the body. How much you need depends on your body weight and how active you are. This calculator gives a daily range in grams, and shows how much that is per meal.",
    "The ranges are general guidance for healthy adults. They are not a prescription, and people with medical conditions should ask a doctor or dietitian.",
  ],
  howTo: ["Enter your body weight in kilograms.", "Choose the option that best matches your activity or goal.", "Enter how many meals or snacks you eat in a day.", "Read your daily range and the amount per meal."],
  formula: {
    expression: "Daily protein = Body weight (kg) × grams per kg for your goal",
    variables: [
      { symbol: "Sedentary adult", meaning: "0.8 to 1.0 g per kg." },
      { symbol: "Adult over 60", meaning: "1.0 to 1.2 g per kg." },
      { symbol: "Regular exercise", meaning: "1.2 to 1.6 g per kg." },
      { symbol: "Strength training", meaning: "1.6 to 2.2 g per kg." },
    ],
    notes: ["0.8 g per kg is the commonly cited recommended daily allowance for healthy adults. Higher figures are ranges often used for active people."],
  },
  example: {
    scenario: "A 70 kg person who exercises regularly and eats four meals a day.",
    inputs: [
      { label: "Weight", value: "70 kg" },
      { label: "Activity", value: "Regular exercise (1.2–1.6 g per kg)" },
    ],
    results: [
      { label: "Daily protein", value: "84 g to 112 g" },
      { label: "Per meal over 4 meals", value: "21 g to 28 g" },
    ],
    steps: ["Low end: 70 × 1.2 = 84 g.", "High end: 70 × 1.6 = 112 g.", "Spread over 4 meals: 21 g to 28 g each."],
    expected: { input: { weightKg: 70, goalId: "active", meals: 4 }, low: 84 },
  },
  factors: [
    { title: "Body weight", text: "Needs scale with body size." },
    { title: "Activity level", text: "Regular exercise and strength training raise the amount." },
    { title: "Age", text: "Older adults may benefit from slightly more." },
    { title: "Health conditions", text: "Kidney disease and some other conditions need personalised advice." },
  ],
  benefits: ["Set a clear daily protein target.", "Spread protein across meals.", "Compare targets for different goals."],
  assumptions: ["Healthy adults without medical conditions.", "Ranges are general guidance and can differ between guidelines.", "Weight is actual body weight in kilograms."],
  faqs: [
    { q: "How much protein do I need a day?", a: "A common recommendation for a healthy adult is about 0.8 g per kg of body weight, with more for people who exercise or lift weights." },
    { q: "How much protein is in common Indian foods?", a: "Dal, paneer, curd, eggs, chicken, fish, soya and legumes are all good sources. Check food labels or a nutrition database for exact amounts." },
    { q: "Can I eat too much protein?", a: "Very high intakes can be a problem for people with kidney disease. Healthy people generally tolerate the ranges here, but ask a professional if unsure." },
    { q: "Should I spread protein across meals?", a: "Many people find it easier to meet their target and feel full by including some at each meal." },
    { q: "Do vegetarians need more?", a: "Not necessarily, but they should combine different plant sources and pay attention to total intake." },
  ],
  related: ["health/calorie-calculator", "health/macronutrient", "health/bmi-calculator", "health/water-intake"],
  references: [
    { label: "ICMR-National Institute of Nutrition", url: "https://www.nin.res.in/" },
    { label: "ISSN position stand on protein and exercise", url: "https://jissn.biomedcentral.com/" },
  ],
};

export const content = {
  seo: {
    title: "Calorie Calculator: Daily Calories & TDEE",
    description:
      "Estimate your daily calorie needs with the Mifflin-St Jeor equation. See BMR, maintenance calories and a target for losing or gaining weight gradually.",
    keywords: ["calorie calculator", "TDEE calculator", "BMR calculator", "daily calorie requirement", "calories to lose weight"],
  },
  h1: "Calorie Calculator",
  intro: [
    "Your body burns calories even at rest, and more when you move. This calculator estimates your basal metabolic rate (BMR), multiplies it by your activity level to get maintenance calories, and adjusts the result for a slow, steady change in weight.",
    "It uses the Mifflin-St Jeor equation, a widely used formula for estimating resting energy needs in healthy adults.",
  ],
  howTo: [
    "Choose your sex and enter your age, weight and height.",
    "Pick the activity level that best matches a typical week.",
    "Choose to maintain, lose or gain weight.",
    "Read your daily calorie target along with BMR and maintenance calories.",
  ],
  formula: {
    expression: "BMR (male) = 10 × weight(kg) + 6.25 × height(cm) − 5 × age + 5\nBMR (female) = 10 × weight(kg) + 6.25 × height(cm) − 5 × age − 161\nMaintenance = BMR × activity factor\nTarget = Maintenance ± daily adjustment",
    variables: [
      { symbol: "Activity factor", meaning: "1.2 sedentary, 1.375 light, 1.55 moderate, 1.725 very active, 1.9 extra active." },
      { symbol: "Adjustment", meaning: "about 275 kcal a day for 0.25 kg a week, or 550 kcal for 0.5 kg, using roughly 7,700 kcal per kg of body weight." },
    ],
    notes: ["The 7,700 kcal per kg figure is a rule of thumb. Real weight change slows as the body adapts."],
  },
  example: {
    scenario: "A 30-year-old man weighing 70 kg, 170 cm tall, moderately active, who wants to lose about 0.5 kg a week.",
    inputs: [
      { label: "Sex, age", value: "Male, 30" },
      { label: "Weight, height", value: "70 kg, 170 cm" },
      { label: "Activity", value: "Moderate (1.55)" },
    ],
    results: [
      { label: "BMR", value: "1,618 kcal" },
      { label: "Maintenance", value: "2,507 kcal" },
      { label: "Target to lose 0.5 kg a week", value: "1,957 kcal" },
    ],
    steps: ["BMR = 700 + 1,062.5 − 150 + 5 = 1,617.5.", "1,617.5 × 1.55 = 2,507.", "2,507 − 550 = 1,957 kcal a day."],
    expected: { input: { sex: "male", weightKg: 70, heightCm: 170, age: 30, activity: 1.55, adjustment: -550 }, target: 1957.1 },
  },
  factors: [
    { title: "Body composition", text: "Muscle burns more energy than fat, so two people of the same weight can need different calories." },
    { title: "Activity", text: "Choosing the right activity level matters. Most people overestimate it." },
    { title: "Age", text: "Energy needs fall slightly with age." },
    { title: "Health conditions", text: "Thyroid issues, medicines, pregnancy and breastfeeding change calorie needs." },
  ],
  benefits: [
    "A starting point for meal planning.",
    "Realistic targets for gradual weight change.",
    "A warning when a target is too low.",
  ],
  assumptions: [
    "For healthy adults. Not for children, pregnancy, breastfeeding or medical conditions.",
    "Estimates can be off by 10 per cent or more. Adjust based on your real results over a few weeks.",
    "This is general information, not medical advice.",
  ],
  faqs: [
    { q: "How many calories do I need a day?", a: "It depends on your age, sex, size and activity. This calculator estimates maintenance calories, where your weight stays steady." },
    { q: "What is BMR?", a: "Basal metabolic rate is the energy your body uses at complete rest to run basic functions like breathing and circulation." },
    { q: "What is TDEE?", a: "Total daily energy expenditure is BMR plus the energy you use through movement and exercise." },
    { q: "How fast should I lose weight?", a: "A gradual pace of about 0.25 to 0.5 kg a week is commonly suggested. Faster loss can cost muscle and nutrition." },
    { q: "Can I eat below 1,200 calories?", a: "Very low intakes should only be followed under medical supervision." },
    { q: "Why does my weight not match the estimate?", a: "Water, food timing and metabolic adaptation all affect short-term changes. Track the trend over several weeks." },
  ],
  related: ["health/macronutrient", "health/bmi-calculator", "health/water-intake", "health/ideal-weight"],
  references: [
    { label: "Ministry of Health and Family Welfare", url: "https://main.mohfw.gov.in/" },
    { label: "National Institute of Nutrition, ICMR", url: "https://www.nin.res.in/" },
    { label: "WHO: Healthy diet", url: "https://www.who.int/news-room/fact-sheets/detail/healthy-diet" },
  ],
};

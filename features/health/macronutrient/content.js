export const content = {
  seo: {
    title: "Macronutrient Calculator: Carbs, Protein, Fat",
    description:
      "Turn a daily calorie target into grams of carbohydrates, protein and fat. Choose a preset or custom split and see it checked against recommended ranges.",
    keywords: ["macro calculator", "macronutrient calculator", "protein carbs fat calculator", "macros for weight loss", "calorie split calculator"],
  },
  h1: "Macronutrient Calculator",
  intro: [
    "Calories tell you how much to eat. Macronutrients tell you what to eat: carbohydrates, protein and fat. Enter a daily calorie target and a split, and this calculator converts it into grams you can plan meals around.",
    "Pick a ready-made split or enter your own. The calculator warns if a share falls outside the commonly recommended ranges for adults.",
  ],
  howTo: [
    "Enter your daily calorie target. The calorie calculator can estimate it.",
    "Choose a preset split, or choose Custom and enter percentages that add up to 100.",
    "Read grams per day for carbohydrates, protein and fat.",
    "Check the note if a share is outside the recommended range.",
  ],
  formula: {
    expression: "Grams = (Calories × share %) ÷ calories per gram\nCarbohydrates and protein: 4 kcal per gram\nFat: 9 kcal per gram",
    variables: [
      { symbol: "Share %", meaning: "the percentage of daily calories from each macronutrient." },
      { symbol: "Recommended ranges", meaning: "for adults, about 45–65% carbohydrates, 10–35% protein and 20–35% fat." },
    ],
  },
  example: {
    scenario: "A 2,000 kcal day with a balanced 50 / 20 / 30 split.",
    inputs: [
      { label: "Calories", value: "2,000 kcal" },
      { label: "Split", value: "50% carbs, 20% protein, 30% fat" },
    ],
    results: [
      { label: "Carbohydrates", value: "250 g" },
      { label: "Protein", value: "100 g" },
      { label: "Fat", value: "67 g" },
    ],
    steps: ["Carbs: 2,000 × 0.50 = 1,000 kcal ÷ 4 = 250 g.", "Protein: 2,000 × 0.20 = 400 kcal ÷ 4 = 100 g.", "Fat: 2,000 × 0.30 = 600 kcal ÷ 9 = 66.7 g."],
    expected: { input: { calories: 2000, carbsPercent: 50, proteinPercent: 20, fatPercent: 30 }, grams: [250, 100, 67] },
  },
  factors: [
    { title: "Goal", text: "Higher protein is often used during weight loss to help preserve muscle." },
    { title: "Activity", text: "Active people may need more carbohydrates to fuel training." },
    { title: "Health conditions", text: "Diabetes, kidney disease and other conditions may need a tailored split." },
    { title: "Food preferences", text: "Vegetarian and traditional Indian diets are often carbohydrate-heavy, so adjust the split accordingly." },
  ],
  benefits: [
    "Convert a calorie target into practical grams.",
    "Compare different diet splits quickly.",
    "See whether a split is within recommended ranges.",
  ],
  assumptions: [
    "Energy values of 4, 4 and 9 kcal per gram are standard approximations.",
    "Fibre, alcohol and other components are not shown separately.",
    "General information for healthy adults, not medical or dietetic advice.",
  ],
  faqs: [
    { q: "What are macronutrients?", a: "Carbohydrates, protein and fat are the three nutrients that provide most of your calories." },
    { q: "How many calories are in a gram of each?", a: "Carbohydrates and protein have about 4 kcal per gram, and fat has about 9 kcal per gram." },
    { q: "What is a good macro split?", a: "There is no single best split. Adult guidelines allow 45–65% carbohydrates, 10–35% protein and 20–35% fat." },
    { q: "How much protein do I need?", a: "It depends on body weight, age and activity. A dietitian can recommend a daily amount in grams for you." },
    { q: "Do I need to hit the numbers exactly?", a: "No. Aim to be close on most days. Food quality matters as much as the split." },
    { q: "How do I find my calorie target?", a: "Use the calorie calculator to estimate maintenance calories and adjust for your goal." },
  ],
  related: ["health/calorie-calculator", "health/water-intake", "health/bmi-calculator", "health/body-fat"],
  references: [
    { label: "National Institute of Nutrition, ICMR", url: "https://www.nin.res.in/" },
    { label: "FAO: Food and nutrition", url: "https://www.fao.org/nutrition/en" },
    { label: "National Academies Press: Dietary Reference Intakes", url: "https://nap.nationalacademies.org/" },
  ],
};

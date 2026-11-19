export const content = {
  seo: {
    title: "Water Intake Calculator: Daily Water Needs",
    description:
      "Estimate how much water to drink each day from your body weight, exercise and weather, with the result in litres and glasses and the rule of thumb explained.",
    keywords: ["water intake calculator", "how much water to drink", "daily water requirement", "water per kg body weight", "hydration calculator"],
  },
  h1: "Water Intake Calculator",
  intro: [
    "How much water you need depends on your size, how active you are and how hot it is. This calculator uses a simple rule of thumb to give a daily estimate in litres and in glasses.",
    "It is a general guide. Your food, tea, coffee and other drinks also supply fluid, and some health conditions call for different advice.",
  ],
  howTo: [
    "Enter your body weight in kilograms.",
    "Enter your daily exercise time in minutes, or leave it empty.",
    "Choose mild or hot weather.",
    "Read the suggested daily water and the equivalent number of glasses.",
  ],
  formula: {
    expression: "Water (ml) = 35 × weight(kg) + 350 × (exercise minutes ÷ 30) + 500 if hot",
    variables: [
      { symbol: "35 ml per kg", meaning: "a commonly used baseline for adults." },
      { symbol: "350 ml per 30 minutes", meaning: "a commonly cited allowance for fluid lost in exercise." },
      { symbol: "500 ml", meaning: "extra allowance for hot or humid weather." },
    ],
    notes: ["These are rules of thumb used for general guidance. They are not clinical prescriptions."],
  },
  example: {
    scenario: "A person who weighs 70 kg and exercises for 30 minutes in mild weather.",
    inputs: [
      { label: "Weight", value: "70 kg" },
      { label: "Exercise", value: "30 minutes" },
      { label: "Weather", value: "Mild" },
    ],
    results: [
      { label: "Base need", value: "2.45 L" },
      { label: "Exercise allowance", value: "0.35 L" },
      { label: "Suggested daily water", value: "2.8 L (about 12 glasses)" },
    ],
    steps: ["35 × 70 = 2,450 ml.", "30 minutes of exercise adds 350 ml.", "2,450 + 350 = 2,800 ml, or 11.2 glasses of 250 ml, rounded up to 12."],
    expected: { input: { weightKg: 70, exerciseMinutes: 30, hot: false }, totalMl: 2800 },
  },
  factors: [
    { title: "Body size", text: "Larger bodies lose and use more water." },
    { title: "Activity and sweat", text: "Exercise and physical work increase needs." },
    { title: "Heat and humidity", text: "Hot weather raises fluid loss through sweat." },
    { title: "Food and other drinks", text: "Water-rich foods, milk, tea and coffee all count toward fluid intake." },
    { title: "Health", text: "Kidney, heart and liver conditions, pregnancy, fever and some medicines change the right amount." },
  ],
  benefits: [
    "A personalised daily target instead of a generic '8 glasses'.",
    "Adjusts for exercise and hot weather.",
    "Easy to track in glasses.",
  ],
  assumptions: [
    "For healthy adults. Children and people with medical conditions should follow professional advice.",
    "Figures are general rules of thumb.",
    "A glass is taken as 250 ml.",
  ],
  faqs: [
    { q: "How much water should I drink in a day?", a: "A common rule of thumb is about 35 ml per kg of body weight, more with exercise or heat." },
    { q: "Does tea or coffee count?", a: "Yes, most drinks contribute to fluid intake, along with water in food." },
    { q: "Can I drink too much water?", a: "Yes. Very large amounts in a short time can dilute blood sodium. Spread drinking through the day." },
    { q: "How do I know if I am drinking enough?", a: "Pale yellow urine and not feeling thirsty are simple signs. Dark urine suggests you need more." },
    { q: "Do I need more water in summer?", a: "Usually yes. The hot weather option adds a modest extra amount." },
    { q: "Should I follow this if I have kidney or heart disease?", a: "No. Follow your doctor's fluid advice, as limits may apply." },
  ],
  related: ["health/calorie-calculator", "health/bmi-calculator", "health/macronutrient", "daily-life/unit-converter"],
  references: [
    { label: "European Food Safety Authority", url: "https://www.efsa.europa.eu/" },
    { label: "National Institute of Nutrition, ICMR", url: "https://www.nin.res.in/" },
  ],
};

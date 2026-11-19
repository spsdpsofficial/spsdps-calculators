export const content = {
  seo: {
    title: "Ideal Weight Calculator: Height-Based Range",
    description:
      "Find an ideal body weight range for your height and sex using the Devine, Robinson, Miller and Hamwi formulas, alongside the healthy BMI weight range.",
    keywords: ["ideal weight calculator", "ideal body weight", "weight for height", "Devine formula", "healthy weight range"],
  },
  h1: "Ideal Weight Calculator",
  intro: [
    "Ideal body weight formulas give a rough reference weight based on height and sex. This calculator shows four classic formulas (Devine, Robinson, Miller and Hamwi), their average, and the weight range that corresponds to a healthy BMI.",
    "None of them is a target to chase. They were created for clinical dosing and general reference, so treat them as a guide.",
  ],
  howTo: [
    "Select your sex.",
    "Enter your height in centimetres.",
    "Compare the four formula results and their average.",
    "Check the BMI-based healthy range, which allows for more variation.",
  ],
  formula: {
    expression: "Devine (male) = 50 + 2.3 × inches over 5 ft; (female) = 45.5 + 2.3 × inches over 5 ft\nRobinson: male 52 + 1.9, female 49 + 1.7\nMiller: male 56.2 + 1.41, female 53.1 + 1.36\nHamwi: male 48 + 2.7, female 45.5 + 2.2",
    variables: [
      { symbol: "Inches over 5 ft", meaning: "height in inches minus 60 (height in cm ÷ 2.54 − 60)." },
      { symbol: "Result", meaning: "ideal weight in kilograms." },
    ],
  },
  example: {
    scenario: "A man who is 170 cm tall (about 66.9 inches).",
    inputs: [
      { label: "Sex", value: "Male" },
      { label: "Height", value: "170 cm" },
    ],
    results: [
      { label: "Devine", value: "65.9 kg" },
      { label: "Robinson", value: "65.2 kg" },
      { label: "Miller", value: "66.0 kg" },
      { label: "Hamwi", value: "66.7 kg" },
      { label: "Average", value: "65.9 kg" },
    ],
    steps: ["170 ÷ 2.54 = 66.93 inches, which is 6.93 inches over 5 ft.", "Devine: 50 + 2.3 × 6.93 = 65.9 kg.", "The four results are averaged to give 65.9 kg."],
    expected: { input: { sex: "male", heightCm: 170 }, average: 65.9 },
  },
  factors: [
    { title: "Frame size and muscle", text: "People with a larger frame or more muscle can be healthy above these figures." },
    { title: "Age", text: "These formulas do not adjust for age." },
    { title: "Ethnicity", text: "They were developed mainly on Western populations and may not suit South Asians." },
    { title: "Height range", text: "They are least reliable under 5 ft (152 cm) or for very tall people." },
  ],
  benefits: [
    "Several formulas compared in one place.",
    "A BMI-based range for realistic flexibility.",
    "A reference for dietitian or doctor conversations.",
  ],
  assumptions: [
    "Designed for adults.",
    "Results are rough reference points and not medical advice.",
    "The healthy BMI range uses WHO limits of 18.5 to 24.9.",
  ],
  faqs: [
    { q: "What is ideal body weight?", a: "A reference weight estimated from height and sex. It is a rough guide and not a personal target." },
    { q: "Which formula is most accurate?", a: "None is considered best. They give similar results around average height, so the calculator shows all four and their average." },
    { q: "Are these formulas right for Indians?", a: "They were derived mostly from Western data, so a lower BMI-based range may suit South Asians better. See the BMI calculator." },
    { q: "Why does my weight differ from the result?", a: "Muscle, bone density, frame size and age cause healthy variation." },
    { q: "Should I aim for the ideal weight?", a: "Focus on health habits and talk to a doctor. A single number should not be the goal." },
  ],
  related: ["health/bmi-calculator", "health/body-fat", "health/calorie-calculator", "health/water-intake"],
  references: [
    { label: "WHO: Obesity and overweight", url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" },
    { label: "National Institute of Nutrition, ICMR", url: "https://www.nin.res.in/" },
  ],
};

export const content = {
  seo: {
    title: "Body Fat Calculator: US Navy Method",
    description:
      "Estimate your body fat percentage from height, neck, waist and hip measurements using the US Navy method, with fat mass, lean mass and fitness category.",
    keywords: ["body fat calculator", "body fat percentage", "navy body fat calculator", "lean body mass", "waist neck hip body fat"],
  },
  h1: "Body Fat Calculator",
  intro: [
    "Body fat percentage tells you more than weight or BMI because it separates fat from lean tissue. This calculator estimates it from simple tape-measure readings using the US Navy circumference method.",
    "It also shows your fat mass, lean mass and a fitness category. Treat it as an estimate. Clinical methods such as DEXA scans are more precise.",
  ],
  howTo: [
    "Select your sex and enter weight and height.",
    "Measure your neck, waist and, if female, hip with a flexible tape, as shown in the hints.",
    "Enter the measurements in centimetres.",
    "Read your body fat percentage, category, fat mass and lean mass.",
  ],
  formula: {
    expression: "Men: Body fat % = 495 ÷ (1.0324 − 0.19077 × log10(waist − neck) + 0.15456 × log10(height)) − 450\nWomen: Body fat % = 495 ÷ (1.29579 − 0.35004 × log10(waist + hip − neck) + 0.22100 × log10(height)) − 450",
    variables: [
      { symbol: "Measurements", meaning: "all in centimetres, taken relaxed and without pulling the tape tight." },
      { symbol: "Fat mass", meaning: "weight × body fat %." },
      { symbol: "Lean mass", meaning: "weight − fat mass." },
    ],
  },
  example: {
    scenario: "A man, 170 cm tall, weighing 70 kg, with a 38 cm neck and 85 cm waist.",
    inputs: [
      { label: "Height", value: "170 cm" },
      { label: "Neck / waist", value: "38 cm / 85 cm" },
    ],
    results: [
      { label: "Body fat", value: "17.8%" },
      { label: "Category", value: "Fitness" },
      { label: "Fat mass / lean mass", value: "12.5 kg / 57.5 kg" },
    ],
    steps: ["Waist − neck = 47 cm.", "Density = 1.0324 − 0.19077 × log10(47) + 0.15456 × log10(170), which gives about 1.0488.", "495 ÷ 1.0488 − 450 = 17.8%."],
    expected: { input: { sex: "male", weightKg: 70, heightCm: 170, neckCm: 38, waistCm: 85 }, percent: 17.8 },
  },
  factors: [
    { title: "Measurement technique", text: "Small tape errors change the result. Measure the same way each time, ideally in the morning." },
    { title: "Body shape", text: "The method assumes an average distribution of fat, so it can be off for very muscular or unusual shapes." },
    { title: "Age and sex", text: "Women naturally carry more essential fat than men." },
    { title: "Hydration", text: "Water retention affects waist size slightly." },
  ],
  benefits: [
    "A tape and a calculator are all you need.",
    "Fat mass and lean mass give more insight than weight alone.",
    "Good for tracking trends over time.",
  ],
  assumptions: [
    "For adults. Not suitable for children, pregnancy or athletes with unusual builds.",
    "The Navy method is an estimate with an error of several percentage points.",
    "Categories follow the American Council on Exercise ranges.",
    "This is not medical advice.",
  ],
  faqs: [
    { q: "How do I measure body fat at home?", a: "Tape-measure methods like the US Navy formula are the simplest. Smart scales and skinfold calipers are other options." },
    { q: "How accurate is the Navy method?", a: "It is usually within a few percentage points of lab methods for average builds, and can be less accurate for very lean or very muscular people." },
    { q: "Where do I measure my waist?", a: "For men, at the navel. For women, at the narrowest point of the waist, with the tape level and snug but not tight." },
    { q: "What is a healthy body fat percentage?", a: "Ranges vary by sex and age. The categories shown follow ACE guidance, with fitness and average ranges generally considered acceptable." },
    { q: "Why does it ask for hip only for women?", a: "The formula for women includes hip measurement, since fat is distributed differently." },
    { q: "Is body fat better than BMI?", a: "It can be more informative, but both are screening tools. See a doctor for a full assessment." },
  ],
  related: ["health/bmi-calculator", "health/ideal-weight", "health/calorie-calculator", "health/macronutrient"],
  references: [
    { label: "WHO: Obesity and overweight", url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" },
    { label: "American Council on Exercise", url: "https://www.acefitness.org/" },
  ],
};

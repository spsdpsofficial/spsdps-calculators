export const content = {
  seo: {
    title: "BMI Calculator: Body Mass Index (WHO & India)",
    description:
      "Calculate your BMI from height and weight and see your category under both WHO and Asian-Indian cut-offs, plus a healthy weight range for your height.",
    keywords: ["BMI calculator", "BMI calculator India", "body mass index", "healthy weight for height", "BMI for Indians"],
  },
  h1: "BMI Calculator",
  intro: [
    "Body mass index (BMI) relates your weight to your height and is widely used to screen for weight categories. Enter your weight in kilograms and height in centimetres to see your BMI.",
    "Because South Asians tend to have higher health risks at lower BMI values, this calculator shows your category under the standard WHO cut-offs and under the lower Asian-Indian cut-offs, along with a healthy weight range for your height.",
  ],
  howTo: [
    "Enter your weight in kilograms.",
    "Enter your height in centimetres.",
    "Read your BMI and both categories.",
    "Check the healthy weight range for your height.",
  ],
  formula: {
    expression: "BMI = Weight (kg) ÷ [Height (m)]²\nHealthy weight = BMI limit × [Height (m)]²",
    variables: [
      { symbol: "Weight", meaning: "body weight in kilograms." },
      { symbol: "Height", meaning: "height in metres (centimetres ÷ 100)." },
      { symbol: "WHO cut-offs", meaning: "under 18.5 underweight, 18.5–24.9 normal, 25–29.9 overweight, 30 and above obese." },
      { symbol: "Asian-Indian cut-offs", meaning: "under 18.5 underweight, 18.5–22.9 normal, 23–24.9 overweight, 25 and above obese." },
    ],
  },
  example: {
    scenario: "A person who weighs 70 kg and is 170 cm tall.",
    inputs: [
      { label: "Weight", value: "70 kg" },
      { label: "Height", value: "170 cm (1.70 m)" },
    ],
    results: [
      { label: "BMI", value: "24.2" },
      { label: "WHO category", value: "Normal weight" },
      { label: "Asian-Indian category", value: "Overweight (at risk)" },
      { label: "Healthy range (Asian-Indian)", value: "53.5 – 66.2 kg" },
    ],
    steps: ["1.70² = 2.89.", "70 ÷ 2.89 = 24.2.", "24.2 is under 25 on the WHO scale but above 23 on the Asian-Indian scale."],
    expected: { input: { weightKg: 70, heightCm: 170 }, bmi: 24.22 },
  },
  factors: [
    { title: "Muscle mass", text: "Muscular people can have a high BMI without excess fat." },
    { title: "Age and sex", text: "Body fat differs with age and sex at the same BMI. BMI categories for adults do not apply to children and teenagers." },
    { title: "Ethnicity", text: "South Asians carry more body fat and higher metabolic risk at the same BMI, which is why lower cut-offs are used." },
    { title: "Fat distribution", text: "Waist circumference also matters, since fat around the abdomen carries extra risk." },
  ],
  benefits: [
    "Quick screening for underweight and overweight.",
    "Both WHO and Asian-Indian categories side by side.",
    "A weight range to aim for at your height.",
  ],
  assumptions: [
    "For adults aged 18 and above. It is not meant for children, pregnant women or competitive athletes.",
    "BMI is a screening tool, not a diagnosis or medical advice.",
    "Category limits follow the WHO and the 2009 consensus statement for Asian Indians.",
  ],
  faqs: [
    { q: "How is BMI calculated?", a: "Divide weight in kilograms by the square of height in metres." },
    { q: "What is a healthy BMI for Indians?", a: "A BMI of 18.5 to 22.9 is considered the normal range for Asian Indians, with 23 to 24.9 treated as overweight." },
    { q: "Why do WHO and Indian categories differ?", a: "South Asians have a higher risk of diabetes and heart disease at lower BMI, so lower cut-offs are recommended." },
    { q: "Is BMI accurate for athletes?", a: "Not always. Muscle weighs more than fat, so athletes may show a high BMI with a low body fat percentage." },
    { q: "Can I use BMI for children?", a: "No. Children's BMI is compared against age- and sex-specific growth charts, so ask a paediatrician." },
    { q: "Should I rely on BMI alone?", a: "No. Waist size, diet, activity, blood tests and family history give a fuller picture. Please consult a doctor." },
  ],
  related: ["health/ideal-weight", "health/body-fat", "health/calorie-calculator", "health/water-intake"],
  references: [
    { label: "WHO: Obesity and overweight", url: "https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight" },
    { label: "Ministry of Health and Family Welfare", url: "https://main.mohfw.gov.in/" },
    { label: "National Institute of Nutrition, ICMR", url: "https://www.nin.res.in/" },
  ],
};

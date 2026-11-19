export const content = {
  seo: {
    title: "Unit Converter: Length, Weight, Area & More",
    description:
      "Convert length, weight, area, volume, speed, data and temperature, including Indian units like acre, quintal and tola, with an all-units table and exact factors.",
    keywords: ["unit converter", "acre to sq ft", "kg to pounds", "tola to gram", "celsius to fahrenheit", "km to miles"],
  },
  h1: "Unit Converter",
  intro: [
    "Convert between everyday units in one place: length, weight, area, volume, speed, digital storage and temperature. It includes units common in India such as the acre, hectare, quintal, tola and square yard.",
    "Pick a category, enter a value and choose the units. You also see the same value in every other unit of that category, so one entry answers several questions.",
  ],
  howTo: [
    "Choose a category such as Length or Weight.",
    "Type the value to convert.",
    "Select the From and To units.",
    "Read the result, or scan the table for the value in every other unit.",
  ],
  formula: {
    expression: "Result = Value × (factor of From unit ÷ factor of To unit)\nFahrenheit = Celsius × 9 ÷ 5 + 32\nKelvin = Celsius + 273.15",
    variables: [
      { symbol: "Factor", meaning: "the size of a unit in the category's base unit, such as metres for length or kilograms for weight." },
      { symbol: "Temperature", meaning: "converted through Celsius, since the scales have different zero points." },
    ],
    notes: ["1 inch = 2.54 cm, 1 foot = 0.3048 m, 1 mile = 1,609.344 m, 1 pound = 0.45359237 kg and 1 acre = 4,046.8564224 m². The tola uses 11.6638038 g."],
  },
  example: {
    scenario: "How many square feet are in an acre?",
    inputs: [
      { label: "Category", value: "Area" },
      { label: "Value", value: "1 acre" },
    ],
    results: [
      { label: "In square feet", value: "43,560 sq ft" },
      { label: "In hectares", value: "0.404686 hectare" },
    ],
    steps: ["1 acre = 4,046.8564224 m².", "1 sq ft = 0.09290304 m².", "4,046.8564224 ÷ 0.09290304 = 43,560."],
    expected: { category: "area", from: "acre", to: "sqft", value: 1, answer: 43560 },
  },
  factors: [
    { title: "Regional units", text: "Land units such as bigha, guntha and katha differ by state, so they are not included." },
    { title: "Data units", text: "This tool uses 1,024-based units (1 KB = 1,024 bytes), as many operating systems do." },
    { title: "Gallons", text: "US and imperial gallons are different sizes, so both are listed." },
    { title: "Rounding", text: "Results show up to six decimal places." },
  ],
  benefits: [
    "Seven categories in one tool.",
    "Includes Indian units such as acre, quintal and tola.",
    "Shows every unit at once.",
  ],
  assumptions: [
    "Conversion factors are exact SI or legal definitions, except where noted.",
    "Temperature below absolute zero is rejected.",
    "Local or regional land measures are not included.",
  ],
  faqs: [
    { q: "How many square feet are in an acre?", a: "One acre is 43,560 square feet." },
    { q: "How many kilograms are in a quintal?", a: "A quintal is 100 kg, and a tonne is 1,000 kg." },
    { q: "How do I convert Celsius to Fahrenheit?", a: "Multiply by 9, divide by 5 and add 32. For example, 100 °C is 212 °F." },
    { q: "How much is a tola in grams?", a: "The Indian standard tola is 11.6638038 grams." },
    { q: "Why do US and imperial gallons differ?", a: "A US gallon is 3.785 litres and an imperial gallon is 4.546 litres." },
    { q: "Is 1 KB 1,000 or 1,024 bytes?", a: "Here, 1 KB is 1,024 bytes. Some storage makers use 1,000, so disk sizes may differ slightly." },
  ],
  related: ["daily-life/fuel-cost", "daily-life/percentage-calculator", "health/bmi-calculator", "daily-life/electricity-bill"],
  references: [
    { label: "Legal Metrology, Department of Consumer Affairs", url: "https://consumeraffairs.nic.in/" },
    { label: "NIST: SI units and conversions", url: "https://www.nist.gov/pml/owm/metric-si/si-units" },
  ],
};

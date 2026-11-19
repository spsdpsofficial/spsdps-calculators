export const content = {
  seo: {
    title: "Percentage Calculator: Find %, Change & More",
    description:
      "Calculate percentages quickly: X% of a number, what percent one number is of another, percentage increase or decrease, and adding or subtracting a percentage.",
    keywords: ["percentage calculator", "percentage increase calculator", "percentage change", "how to calculate percentage", "x percent of y"],
  },
  h1: "Percentage Calculator",
  intro: [
    "Percentages come up everywhere: marks, discounts, interest, GST, salary hikes and price changes. This calculator handles the four questions people ask most often, so you do not have to remember which formula to use.",
    "Pick what you want to find, enter the two numbers and the answer appears instantly.",
  ],
  howTo: [
    "Choose the question: X% of Y, X is what % of Y, % change, or add/subtract a percentage.",
    "Enter the numbers in the fields shown.",
    "Read the result below. Percentage change also shows the absolute change.",
    "Change any number to see the answer update.",
  ],
  formula: {
    expression: "X% of Y = (X ÷ 100) × Y\nX is what % of Y = (X ÷ Y) × 100\n% change = (New − Old) ÷ Old × 100\nAdd X% = Y × (1 + X ÷ 100), subtract X% = Y × (1 − X ÷ 100)",
    variables: [
      { symbol: "X, Y", meaning: "the numbers you enter." },
      { symbol: "Old, New", meaning: "the starting and ending values for percentage change." },
    ],
    notes: ["A change from a negative starting value is measured against its absolute value."],
  },
  example: {
    scenario: "What is 15% of ₹2,400?",
    inputs: [
      { label: "Percentage", value: "15%" },
      { label: "Amount", value: "₹2,400" },
    ],
    results: [
      { label: "15% of ₹2,400", value: "₹360" },
      { label: "After adding 15%", value: "₹2,760" },
      { label: "After subtracting 15%", value: "₹2,040" },
    ],
    steps: ["15 ÷ 100 = 0.15.", "0.15 × 2,400 = 360.", "Adding gives 2,400 + 360 = 2,760, subtracting gives 2,400 − 360 = 2,040."],
    expected: { percent: 15, base: 2400, answer: 360 },
  },
  factors: [
    { title: "The base matters", text: "A 20% rise followed by a 20% fall does not return to the start, because the second percentage is taken on a larger number." },
    { title: "Percentage points vs percent", text: "Going from 10% to 12% is a rise of 2 percentage points but a 20% increase." },
    { title: "Direction", text: "A negative change means a decrease." },
  ],
  benefits: [
    "Four common calculations in one place.",
    "Quick checks for discounts, hikes and marks.",
    "Instant results with no formulas to remember.",
  ],
  assumptions: [
    "Results are shown to up to four decimal places.",
    "The starting value for percentage change and the total in 'what %' cannot be zero.",
  ],
  faqs: [
    { q: "How do I calculate a percentage of a number?", a: "Divide the percentage by 100 and multiply by the number. For example, 15% of 2,400 is 0.15 × 2,400 = 360." },
    { q: "How do I find what percent one number is of another?", a: "Divide the first number by the second and multiply by 100." },
    { q: "How is percentage increase calculated?", a: "Subtract the old value from the new one, divide by the old value and multiply by 100." },
    { q: "Why is a 20% increase and a 20% decrease not equal?", a: "Because each percentage is taken on a different base. 100 up 20% is 120, and 120 down 20% is 96." },
    { q: "Can I use negative numbers?", a: "Yes. A negative result in percentage change means a decrease." },
    { q: "How do I reverse a percentage addition?", a: "Divide the final amount by (1 + X ÷ 100). To remove 18% GST from ₹1,180, divide by 1.18 to get ₹1,000." },
  ],
  related: ["daily-life/discount-calculator", "finance/gst-calculator", "salary-tax/salary-hike", "business/profit-margin"],
  references: [
    { label: "NCERT textbooks (percentages)", url: "https://ncert.nic.in/textbook.php" },
    { label: "Wikipedia: Percentage", url: "https://en.wikipedia.org/wiki/Percentage" },
  ],
};

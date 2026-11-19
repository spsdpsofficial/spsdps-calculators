export const content = {
  seo: {
    title: "Break-Even Calculator: Units & Sales Needed",
    description:
      "Find how many units and how much sales revenue you need to cover your costs, plus the volume required for a target profit, with the formula explained.",
    keywords: ["break even calculator", "break even point", "break even analysis", "contribution margin", "break even units"],
  },
  h1: "Break-Even Calculator",
  intro: [
    "The break-even point is the sales volume at which your income exactly covers your costs. Below it you make a loss, above it a profit. Knowing it helps you price products, plan a new venture and decide whether a business idea is realistic.",
    "Enter your fixed costs, selling price and variable cost per unit. You can also enter a target profit to see how much you must sell to reach it.",
  ],
  howTo: [
    "Add your fixed costs for the period, such as monthly rent, salaries and EMIs.",
    "Enter the selling price and variable cost for one unit.",
    "Optionally enter the profit you want to earn.",
    "Read the break-even units and sales, and the volume needed for your target profit.",
  ],
  formula: {
    expression: "Contribution per unit = Price − Variable cost\nBreak-even units = Fixed costs ÷ Contribution per unit\nBreak-even sales = Break-even units × Price\nUnits for target profit = (Fixed costs + Target profit) ÷ Contribution per unit",
    variables: [
      { symbol: "Fixed costs", meaning: "costs that stay the same however much you sell." },
      { symbol: "Variable cost", meaning: "cost that rises with each unit sold." },
      { symbol: "Contribution", meaning: "the amount each sale adds towards covering fixed costs and profit." },
    ],
  },
  example: {
    scenario: "A small business has ₹1,00,000 of monthly fixed costs and sells a product at ₹250 with a variable cost of ₹150.",
    inputs: [
      { label: "Fixed costs", value: "₹1,00,000" },
      { label: "Price / variable cost", value: "₹250 / ₹150" },
      { label: "Target profit", value: "₹50,000" },
    ],
    results: [
      { label: "Contribution per unit", value: "₹100 (40%)" },
      { label: "Break-even point", value: "1,000 units, ₹2,50,000 sales" },
      { label: "For ₹50,000 profit", value: "1,500 units" },
    ],
    steps: ["Contribution = 250 − 150 = ₹100 per unit.", "Break-even units = 1,00,000 ÷ 100 = 1,000.", "For the target: (1,00,000 + 50,000) ÷ 100 = 1,500 units."],
    expected: { input: { fixedCosts: 100000, price: 250, variableCost: 150, targetProfit: 50000 }, result: { breakEvenUnits: 1000, breakEvenRevenue: 250000, targetUnits: 1500 } },
  },
  factors: [
    { title: "Price", text: "A higher price raises the contribution and lowers break-even volume." },
    { title: "Variable costs", text: "Cutting material or packaging costs has the same effect." },
    { title: "Fixed costs", text: "Lower rent or fewer salaries reduce the volume you need to cover." },
    { title: "Product mix", text: "With several products, use an average price and cost for a rough estimate." },
  ],
  benefits: [
    "Know the sales level where you stop losing money.",
    "Set realistic monthly sales targets.",
    "Test the effect of price and cost changes.",
  ],
  assumptions: [
    "One product with a constant price and variable cost.",
    "Fixed costs do not change with volume in the period.",
    "Prices and costs exclude GST.",
    "Units are rounded up to whole units.",
  ],
  faqs: [
    { q: "What is the break-even point?", a: "The level of sales at which total revenue equals total costs, so profit is zero." },
    { q: "How do I calculate break-even units?", a: "Divide fixed costs by the contribution per unit, which is selling price minus variable cost." },
    { q: "What is contribution margin?", a: "The part of each sale left after variable costs. It goes towards fixed costs and then profit." },
    { q: "What if the price is lower than the variable cost?", a: "You lose money on every sale, so there is no break-even point until you raise the price or cut costs." },
    { q: "How do I include a target profit?", a: "Add it to fixed costs before dividing by the contribution. The calculator does this when you enter a target." },
    { q: "How often should I recalculate?", a: "Whenever prices, rent or material costs change." },
  ],
  related: ["business/profit-margin", "business/markup-calculator", "business/business-loan", "business/price-comparison"],
  references: [
    { label: "Ministry of Micro, Small & Medium Enterprises", url: "https://msme.gov.in/" },
    { label: "Institute of Chartered Accountants of India", url: "https://www.icai.org/" },
  ],
};

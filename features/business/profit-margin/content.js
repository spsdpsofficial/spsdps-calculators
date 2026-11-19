export const content = {
  seo: {
    title: "Profit Margin Calculator: Margin and Price",
    description:
      "Calculate gross profit margin from cost and selling price, or find the selling price or cost for a target margin. Shows profit and markup with formulas.",
    keywords: ["profit margin calculator", "gross margin calculator", "selling price from margin", "profit percentage", "margin vs markup"],
  },
  h1: "Profit Margin Calculator",
  intro: [
    "Profit margin tells you how much of every rupee of sales you keep as profit. This calculator finds the margin from your cost and selling price, or works the other way: the price you must charge, or the cost you must stay under, to hit a target margin.",
    "It also shows markup alongside margin, since mixing up the two is one of the most common pricing mistakes.",
  ],
  howTo: [
    "Choose what you want to find: margin, selling price or cost.",
    "Enter the two values asked for, in rupees or percent.",
    "Read the profit, margin and markup.",
    "Try different prices to see how the margin moves.",
  ],
  formula: {
    expression: "Profit = Selling price − Cost\nMargin % = Profit ÷ Selling price × 100\nMarkup % = Profit ÷ Cost × 100\nPrice for a target margin = Cost ÷ (1 − Margin ÷ 100)",
    variables: [
      { symbol: "Margin", meaning: "profit as a percentage of the selling price. It can never reach 100%." },
      { symbol: "Markup", meaning: "profit as a percentage of cost. It can be above 100%." },
    ],
  },
  example: {
    scenario: "A shop buys an item for ₹800 and sells it for ₹1,000.",
    inputs: [
      { label: "Cost price", value: "₹800" },
      { label: "Selling price", value: "₹1,000" },
    ],
    results: [
      { label: "Profit", value: "₹200" },
      { label: "Profit margin", value: "20%" },
      { label: "Markup", value: "25%" },
    ],
    steps: ["Profit = 1,000 − 800 = 200.", "Margin = 200 ÷ 1,000 = 20%.", "Markup = 200 ÷ 800 = 25%."],
    expected: { input: { mode: "margin", cost: 800, price: 1000 }, result: { profit: 200, marginPercent: 20, markupPercent: 25 } },
  },
  factors: [
    { title: "Cost definition", text: "Gross margin usually uses direct costs only. Net margin also removes overheads, interest and tax." },
    { title: "Discounts", text: "A discount lowers the selling price, which cuts the margin more than most people expect." },
    { title: "GST", text: "Use prices excluding GST, since GST collected is not your income." },
    { title: "Volume", text: "A thin margin can still earn well at high volumes." },
  ],
  benefits: [
    "Price products with confidence.",
    "Avoid mixing up margin and markup.",
    "Find the maximum cost that still protects your margin.",
  ],
  assumptions: [
    "Margin here is gross margin on one item or order. Overheads and taxes are not deducted.",
    "Prices are entered excluding GST.",
    "A target margin must be below 100%.",
  ],
  faqs: [
    { q: "How do I calculate profit margin?", a: "Subtract cost from the selling price, divide by the selling price and multiply by 100." },
    { q: "What is the difference between margin and markup?", a: "Margin is profit divided by selling price, while markup is profit divided by cost. A 25% markup equals a 20% margin." },
    { q: "How do I set a price for a 30% margin?", a: "Divide the cost by 0.70. A ₹700 cost needs a ₹1,000 price." },
    { q: "What is a good profit margin?", a: "It varies widely by industry. Compare with similar businesses rather than a fixed number." },
    { q: "Can the margin be negative?", a: "Yes. A negative margin means you sell below cost and make a loss." },
  ],
  related: ["business/markup-calculator", "business/break-even", "business/reverse-gst", "daily-life/percentage-calculator"],
  references: [
    { label: "Ministry of Micro, Small & Medium Enterprises", url: "https://msme.gov.in/" },
    { label: "Institute of Chartered Accountants of India", url: "https://www.icai.org/" },
  ],
};

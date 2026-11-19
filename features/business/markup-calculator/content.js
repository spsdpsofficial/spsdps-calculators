export const content = {
  seo: {
    title: "Markup Calculator: Selling Price from Cost",
    description:
      "Find the selling price from cost and markup percentage, or work out markup from cost and price. Also shows profit and the equivalent profit margin.",
    keywords: ["markup calculator", "markup percentage", "selling price from cost", "markup vs margin", "cost plus pricing"],
  },
  h1: "Markup Calculator",
  intro: [
    "Markup is the percentage you add on top of your cost to arrive at a selling price. It is the most common way small shops and traders price goods: buy at ₹800, add 25%, sell at ₹1,000.",
    "This calculator moves between cost, markup and selling price in any direction and shows the equivalent profit margin, so you can compare it with margin-based pricing.",
  ],
  howTo: [
    "Choose what you want to find: selling price, markup or cost.",
    "Enter the two known values.",
    "Read the selling price, profit, margin and markup.",
    "Adjust the markup until the price and margin suit you.",
  ],
  formula: {
    expression: "Selling price = Cost × (1 + Markup ÷ 100)\nMarkup % = (Selling price − Cost) ÷ Cost × 100\nCost = Selling price ÷ (1 + Markup ÷ 100)",
    variables: [
      { symbol: "Markup", meaning: "profit as a percentage of cost." },
      { symbol: "Margin", meaning: "profit as a percentage of selling price, shown for comparison." },
    ],
  },
  example: {
    scenario: "A trader buys goods for ₹800 and adds a 25% markup.",
    inputs: [
      { label: "Cost price", value: "₹800" },
      { label: "Markup", value: "25%" },
    ],
    results: [
      { label: "Selling price", value: "₹1,000" },
      { label: "Profit", value: "₹200" },
      { label: "Profit margin", value: "20%" },
    ],
    steps: ["Markup amount = 800 × 25% = 200.", "Selling price = 800 + 200 = 1,000.", "Margin = 200 ÷ 1,000 = 20%."],
    expected: { input: { mode: "price", cost: 800, markup: 25 }, result: { price: 1000, profit: 200, marginPercent: 20 } },
  },
  factors: [
    { title: "Competition", text: "Market prices often cap how much markup you can apply." },
    { title: "Overheads", text: "Markup must cover rent, wages and other costs, not just goods." },
    { title: "GST", text: "Apply GST on top of the selling price after markup." },
    { title: "Product type", text: "Fast-moving goods usually carry lower markup than slow-moving or specialised goods." },
  ],
  benefits: [
    "Price quickly with cost-plus pricing.",
    "See the margin hidden behind any markup.",
    "Work backwards from a price to the cost.",
  ],
  assumptions: [
    "Prices exclude GST.",
    "Markup is on cost price.",
    "Overheads and discounts are not included.",
  ],
  faqs: [
    { q: "How do I calculate markup?", a: "Subtract cost from the selling price, divide by cost and multiply by 100." },
    { q: "What is the difference between markup and margin?", a: "Markup is based on cost and margin on selling price. A 25% markup is a 20% margin." },
    { q: "What markup gives a 50% margin?", a: "A 100% markup. The price is double the cost, so half the price is profit." },
    { q: "Can markup be over 100%?", a: "Yes. A product sold at three times its cost has a 200% markup." },
    { q: "Does markup include GST?", a: "No. Add GST separately after setting your price." },
  ],
  related: ["business/profit-margin", "business/reverse-gst", "finance/gst-calculator", "daily-life/discount-calculator"],
  references: [
    { label: "Ministry of Micro, Small & Medium Enterprises", url: "https://msme.gov.in/" },
    { label: "GST portal", url: "https://www.gst.gov.in/" },
  ],
};

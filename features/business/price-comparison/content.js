export const content = {
  seo: {
    title: "Price Comparison Calculator: Best Unit Price",
    description:
      "Compare the unit price of two or three products or pack sizes to find the best value. See the price per gram, litre or piece and how much you save.",
    keywords: ["price comparison calculator", "unit price calculator", "best value calculator", "price per kg calculator", "compare pack sizes"],
  },
  h1: "Price Comparison Calculator",
  intro: [
    "A bigger pack is not always cheaper, and a 'family pack' deal can hide a higher price per gram. This calculator compares the real unit price of up to three products or pack sizes so you can pick the best value.",
    "It works for groceries, wholesale buying, supplier quotes and anything priced by quantity, as long as you use the same unit for every option.",
  ],
  howTo: [
    "Enter the price and quantity of Product A and Product B. Add Product C if you have a third option.",
    "Use the same unit for every product, such as grams, litres or pieces.",
    "Read the price per unit for each product, ranked from cheapest.",
    "Check how much more the other options cost and how much you save.",
  ],
  formula: {
    expression: "Unit price = Price ÷ Quantity\nExtra cost % = (Unit price − Cheapest unit price) ÷ Cheapest unit price × 100\nSaving % = (Dearest − Cheapest) ÷ Dearest × 100",
    variables: [
      { symbol: "Price", meaning: "what you pay for the pack." },
      { symbol: "Quantity", meaning: "how much is in the pack, in a consistent unit." },
    ],
  },
  example: {
    scenario: "A 500 g pack costs ₹250 and a 1 kg (1,000 g) pack costs ₹460.",
    inputs: [
      { label: "Product A", value: "₹250 for 500 g" },
      { label: "Product B", value: "₹460 for 1,000 g" },
    ],
    results: [
      { label: "Product A", value: "₹0.50 per gram" },
      { label: "Product B", value: "₹0.46 per gram (best value)" },
      { label: "Saving with B", value: "8%" },
    ],
    steps: ["A: 250 ÷ 500 = ₹0.50 per gram.", "B: 460 ÷ 1,000 = ₹0.46 per gram.", "B is cheaper per gram by (0.50 − 0.46) ÷ 0.50 = 8%."],
    expected: { input: [{ name: "Product A", price: 250, quantity: 500 }, { name: "Product B", price: 460, quantity: 1000 }], best: "Product B", savingPercent: 8 },
  },
  factors: [
    { title: "Same units", text: "Convert everything to one unit first, such as 1 kg = 1,000 g." },
    { title: "Wastage", text: "A cheaper bulk pack is no bargain if part of it goes unused or spoils." },
    { title: "Quality and brand", text: "Unit price does not capture quality differences." },
    { title: "Discounts and GST", text: "Compare final prices, after discounts and with the same tax treatment." },
  ],
  benefits: [
    "See the real cost per unit at a glance.",
    "Compare suppliers and pack sizes fairly.",
    "Spot deals that are not really deals.",
  ],
  assumptions: [
    "All products are measured in the same unit.",
    "Only price per unit is compared. Quality, shelf life and convenience are not.",
    "A product is included only when both its price and quantity are above zero.",
  ],
  faqs: [
    { q: "How do I compare prices of different pack sizes?", a: "Divide each price by its quantity to get the unit price and pick the lowest." },
    { q: "Is the bigger pack always cheaper?", a: "No. Always check the unit price, because some larger packs cost more per gram." },
    { q: "Can I compare different units, like grams and kilograms?", a: "Convert them to the same unit first. The unit converter can help." },
    { q: "How many products can I compare?", a: "Up to three. Leave Product C empty to compare two." },
    { q: "Does it include GST?", a: "Enter prices the way you will actually pay them, with GST included for every product." },
  ],
  related: ["daily-life/unit-converter", "daily-life/discount-calculator", "daily-life/percentage-calculator", "business/profit-margin"],
  references: [
    { label: "Legal Metrology, Department of Consumer Affairs", url: "https://consumeraffairs.nic.in/" },
    { label: "National Consumer Helpline", url: "https://consumerhelpline.gov.in/" },
  ],
};

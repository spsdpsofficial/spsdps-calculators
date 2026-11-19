export const content = {
  seo: {
    title: "Gold Price Calculator with GST",
    description:
      "Calculate the price of gold or silver jewellery from weight, purity, rate per gram, making charges and GST. See the metal value and the final amount to pay.",
    keywords: ["gold calculator", "gold price calculator", "gold jewellery price calculator", "gold making charges calculator", "22k gold price calculator"],
  },
  h1: "Gold and Silver Price Calculator",
  intro: [
    "A jeweller's bill for gold jewellery has several parts: the value of the metal, making charges and GST. This calculator shows each part, so you can check a quote or compare shops.",
    "You enter the rate per gram yourself, since prices change through the day and differ by city. Get the current rate from your jeweller or a trusted source before you calculate.",
  ],
  howTo: [
    "Enter the weight of the jewellery in grams.",
    "Enter the current rate per gram for pure metal.",
    "Pick the purity, such as 22K.",
    "Enter the making charge percentage and the GST rate, then read the total.",
  ],
  formula: {
    expression: "Metal value = Weight × Rate × Purity\nMaking charges = Metal value × Making %\nGST = (Metal value + Making charges) × GST %\nTotal = Metal value + Making charges + GST",
    variables: [
      { symbol: "Purity", meaning: "fineness: 24K = 0.999, 22K = 0.916, 18K = 0.75, 14K = 0.585." },
      { symbol: "Rate", meaning: "rate per gram of pure metal, entered by you." },
    ],
    notes: ["Some jewellers charge making fees per gram or as a flat amount. Convert them to a percentage of the metal value to use this tool."],
  },
  example: {
    scenario: "10 grams of 22K gold jewellery, with the 24K rate at ₹10,000 per gram, 10% making charges and 3% GST.",
    inputs: [
      { label: "Weight and purity", value: "10 g, 22K (0.916)" },
      { label: "Rate, making, GST", value: "₹10,000 per gram, 10%, 3%" },
    ],
    results: [
      { label: "Metal value", value: "₹91,600" },
      { label: "Making charges", value: "₹9,160" },
      { label: "GST", value: "₹3,022.80" },
      { label: "Total price", value: "₹1,03,782.80" },
    ],
    steps: ["Metal value = 10 × 10,000 × 0.916 = ₹91,600.", "Making charges = 10% of 91,600 = ₹9,160.", "GST = 3% of (91,600 + 9,160) = ₹3,022.80, so the total is ₹1,03,782.80."],
    expected: { input: { weightGrams: 10, ratePerGram: 10000, purity: 0.916, makingPercent: 10, gstPercent: 3 }, total: "103782.80" },
  },
  factors: [
    { title: "Daily rate", text: "Gold and silver rates change through the day and differ across cities." },
    { title: "Purity", text: "Higher carat means more pure gold and a higher price per gram. Look for the hallmark." },
    { title: "Making charges", text: "These vary widely between jewellers and designs, and are often negotiable." },
    { title: "Stones", text: "Stones are priced separately and are not included here." },
  ],
  benefits: [
    "Check a jeweller's estimate line by line.",
    "Compare quotes across shops.",
    "Understand how making charges change the bill.",
  ],
  assumptions: [
    "The metal rate is whatever you enter. No live price is used.",
    "Making charges are a percentage of the metal value.",
    "One GST rate is applied on metal and making charges together.",
    "Stones, hallmarking fees and old-gold exchange are not included.",
  ],
  faqs: [
    { q: "How is the price of gold jewellery calculated?", a: "Weight × rate × purity gives the metal value. Making charges and GST are then added." },
    { q: "Does this show today's gold rate?", a: "No. You enter the rate yourself because this tool does not fetch live prices." },
    { q: "What is the difference between 22K and 24K?", a: "24K is almost pure gold and 22K is about 91.6% gold mixed with other metals for strength." },
    { q: "What GST applies to gold?", a: "GST on gold and jewellery has been 3% on the metal value, with a different rate on making charges in some invoices. Check your bill and the latest GST notifications." },
    { q: "Can I use this for silver?", a: "Yes. Enter the silver rate per gram, and choose the 24K (99.9%) option for pure silver, or adjust the rate for lower purity." },
  ],
  related: ["finance/gst-calculator", "daily-life/discount-calculator", "finance/inflation-calculator", "finance/lumpsum-calculator"],
  references: [
    { label: "Bureau of Indian Standards (hallmarking)", url: "https://www.bis.gov.in/" },
    { label: "GST portal", url: "https://www.gst.gov.in/" },
  ],
};

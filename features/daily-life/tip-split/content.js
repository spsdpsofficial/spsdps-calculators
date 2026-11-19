export const content = {
  seo: {
    title: "Tip & Bill Split Calculator",
    description:
      "Add a tip to a restaurant bill and split the total between friends. See the tip, the total and each person's share, with an option to round up to a whole rupee.",
    keywords: ["tip calculator", "bill split calculator", "restaurant bill splitter", "split bill with tip", "tip calculator india"],
  },
  h1: "Tip and Bill Split Calculator",
  intro: [
    "Dining out with friends often ends with a calculator. Enter the bill, choose a tip percentage and the number of people, and this calculator shows the total and what each person should pay.",
    "You can round each share up to a whole rupee, which makes paying in cash or by UPI easier. Any extra from rounding goes to the tip.",
  ],
  howTo: ["Enter the bill amount.", "Set the tip percentage.", "Enter how many people are sharing.", "Choose whether to round each share up, then read each person's share."],
  formula: {
    expression: "Tip = Bill × Tip %\nTotal = Bill + Tip\nShare = Total ÷ Number of people",
    variables: [
      { symbol: "Tip %", meaning: "the percentage of the bill you want to leave as a tip." },
      { symbol: "Rounded share", meaning: "the share rounded up to the next whole rupee." },
    ],
  },
  example: {
    scenario: "A dinner bill of ₹2,450 with a 10% tip, shared equally by 3 friends who round up.",
    inputs: [
      { label: "Bill and tip", value: "₹2,450 and 10%" },
      { label: "People", value: "3, rounded up" },
    ],
    results: [
      { label: "Tip", value: "₹245" },
      { label: "Total", value: "₹2,695" },
      { label: "Each person pays", value: "₹899 (exact share ₹898.33)" },
    ],
    steps: ["Tip = 10% of 2,450 = ₹245, so the total is ₹2,695.", "Share = 2,695 ÷ 3 = ₹898.33.", "Rounding up gives ₹899 each, ₹2 more than needed in total."],
    expected: { input: { bill: 2450, tipPercent: 10, people: 3, roundUp: true }, share: 899 },
  },
  factors: [
    { title: "Service charge", text: "Many restaurants already add a service charge. Check the bill before tipping." },
    { title: "Number of people", text: "The share changes as more or fewer people split the bill." },
    { title: "Rounding", text: "Rounding up each share keeps the payments simple." },
  ],
  benefits: ["Split bills fairly in seconds.", "See the tip and total clearly.", "Pay simple whole-rupee amounts."],
  assumptions: ["The bill is split equally.", "The tip is a percentage of the bill amount you enter, before the tip.", "Taxes on the bill are part of the bill amount you enter."],
  faqs: [
    { q: "How much should I tip at a restaurant in India?", a: "There is no fixed rule. Many people leave about 5 to 10 per cent when there is no service charge. Follow your own judgment and local custom." },
    { q: "Is the service charge the same as a tip?", a: "No. A service charge is added by the restaurant to the bill. A tip is what you choose to give." },
    { q: "How do I split a bill unequally?", a: "This calculator splits equally. For unequal splits, calculate each person's items separately." },
    { q: "Why round up?", a: "It makes cash or UPI payments easier, and the extra goes to the tip." },
    { q: "Is the tip calculated before or after tax?", a: "On the bill amount you enter. Enter the pre-tax amount if you want to tip on that." },
  ],
  related: ["daily-life/percentage-calculator", "daily-life/discount-calculator", "daily-life/travel-budget", "finance/gst-calculator"],
  references: [
    { label: "Ministry of Consumer Affairs", url: "https://consumeraffairs.nic.in/" },
    { label: "Government of India portal", url: "https://www.india.gov.in/" },
  ],
};

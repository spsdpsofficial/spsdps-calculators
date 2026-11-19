export const content = {
  seo: {
    title: "Travel Budget Calculator: Trip Cost Estimator",
    description:
      "Plan a trip budget from travellers, nights, transport, stay, food, local travel and activities. Includes a safety buffer and shows cost per person and per day.",
    keywords: ["travel budget calculator", "trip cost calculator", "holiday budget planner", "vacation cost estimate", "trip expense calculator"],
  },
  h1: "Travel Budget Calculator",
  intro: [
    "A holiday goes more smoothly when you know roughly what it will cost. This calculator adds up transport, stay, food, local travel and activities for your group, adds a safety buffer for surprises and shows the cost per person and per day.",
    "All numbers are your own estimates, so you can try cheaper and pricier options and compare.",
  ],
  howTo: [
    "Enter the number of travellers, nights and rooms.",
    "Add transport per person, the room rate, food and local travel estimates.",
    "Add a total for activities, tickets and shopping.",
    "Set a safety buffer, commonly 10 to 15 per cent, and read the total.",
  ],
  formula: {
    expression: "Days = Nights + 1\nSubtotal = Transport × People + Stay × Rooms × Nights + Food × People × Days + Local × Days + Activities\nTotal = Subtotal × (1 + Buffer ÷ 100)",
    variables: [
      { symbol: "Transport", meaning: "round-trip fare per person." },
      { symbol: "Stay", meaning: "cost of one room for one night." },
      { symbol: "Food and Local", meaning: "per person per day, and per day for the whole group." },
      { symbol: "Buffer", meaning: "extra percentage kept aside for unplanned costs." },
    ],
  },
  example: {
    scenario: "Two people travel for 3 nights, sharing one room.",
    inputs: [
      { label: "Transport", value: "₹6,000 per person" },
      { label: "Room", value: "₹3,500 per night" },
      { label: "Food", value: "₹1,200 per person per day" },
      { label: "Local travel", value: "₹1,500 per day" },
      { label: "Activities", value: "₹3,000" },
    ],
    results: [
      { label: "Subtotal", value: "₹41,100" },
      { label: "Buffer (10%)", value: "₹4,110" },
      { label: "Total budget", value: "₹45,210 (₹22,605 per person)" },
    ],
    steps: ["Transport 6,000 × 2 = 12,000, stay 3,500 × 3 = 10,500.", "Food 1,200 × 2 × 4 days = 9,600, local travel 1,500 × 4 = 6,000, plus activities 3,000.", "Subtotal 41,100 plus 10% buffer gives 45,210."],
    expected: { input: { people: 2, nights: 3, transportPerPerson: 6000, stayPerRoomNight: 3500, rooms: 1, foodPerPersonDay: 1200, localPerDay: 1500, activities: 3000, bufferPercent: 10 }, total: 45210 },
  },
  factors: [
    { title: "Season", text: "Peak-season fares and room rates can be much higher." },
    { title: "Group size", text: "Rooms, local transport and some tickets are shared, so cost per person usually falls as the group grows." },
    { title: "Booking time", text: "Early bookings often cost less for flights and trains." },
    { title: "Hidden costs", text: "Visas, insurance, tips, baggage and currency fees add up, so keep a buffer." },
  ],
  benefits: [
    "Set a realistic budget before booking.",
    "Compare different trip styles.",
    "Split costs fairly between travellers.",
  ],
  assumptions: [
    "Trip length is nights plus one day.",
    "All rates are your estimates in rupees.",
    "Foreign-currency conversion and taxes are not modelled.",
  ],
  faqs: [
    { q: "How do I plan a travel budget?", a: "List main costs: transport, stay, food, local travel and activities, estimate each, then add a buffer." },
    { q: "How much buffer should I keep?", a: "Many travellers keep 10 to 15 per cent for unexpected costs. Use more for longer or less predictable trips." },
    { q: "How are food costs counted?", a: "Food is per person per day, multiplied by the number of travellers and the number of days." },
    { q: "Can I use this for international trips?", a: "Yes, if you convert the costs into rupees first. Exchange-rate changes and fees are not included." },
    { q: "Does it include flights?", a: "Enter the round-trip fare per person in the transport field." },
  ],
  related: ["daily-life/fuel-cost", "daily-life/date-difference", "daily-life/percentage-calculator", "daily-life/discount-calculator"],
  references: [
    { label: "Incredible India (Ministry of Tourism)", url: "https://www.incredibleindia.gov.in/" },
    { label: "Indian Railways (IRCTC)", url: "https://www.irctc.co.in/" },
  ],
};

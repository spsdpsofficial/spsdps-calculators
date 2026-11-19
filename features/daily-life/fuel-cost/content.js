export const content = {
  seo: {
    title: "Fuel Cost Calculator: Trip Fuel Expense",
    description:
      "Estimate the fuel cost of a trip from distance, mileage and the price per litre. See litres needed, total cost and cost per km for one-way or round trips.",
    keywords: ["fuel cost calculator", "petrol cost calculator", "trip cost calculator", "diesel cost for trip", "cost per km calculator"],
  },
  h1: "Fuel Cost Calculator",
  intro: [
    "Planning a road trip or comparing the running cost of two vehicles? Enter the distance, your vehicle's mileage and the current fuel price to see how many litres you will need and what it will cost.",
    "Choose a round trip to double the distance automatically. The cost per kilometre makes it easy to compare cars, bikes or a cab fare.",
  ],
  howTo: [
    "Enter the one-way distance in kilometres.",
    "Enter your real-world mileage in km per litre.",
    "Enter today's fuel price per litre from the pump.",
    "Choose one way or round trip, then read the total cost.",
  ],
  formula: {
    expression: "Fuel needed (L) = Distance ÷ Mileage\nTotal cost = Fuel needed × Price per litre\nCost per km = Total cost ÷ Distance",
    variables: [
      { symbol: "Distance", meaning: "total kilometres, doubled for a round trip." },
      { symbol: "Mileage", meaning: "kilometres your vehicle covers on one litre." },
      { symbol: "Price", meaning: "fuel price per litre at the pump." },
    ],
  },
  example: {
    scenario: "A 450 km drive in a car that gives 18 km/l, with fuel at ₹100 per litre.",
    inputs: [
      { label: "Distance", value: "450 km" },
      { label: "Mileage", value: "18 km/l" },
      { label: "Fuel price", value: "₹100 per litre" },
    ],
    results: [
      { label: "Fuel needed", value: "25 litres" },
      { label: "Fuel cost", value: "₹2,500" },
      { label: "Cost per km", value: "₹5.56" },
    ],
    steps: ["450 ÷ 18 = 25 litres.", "25 × 100 = ₹2,500.", "2,500 ÷ 450 = ₹5.56 per km."],
    expected: { input: { distance: 450, mileage: 18, price: 100 }, result: { litres: 25, cost: 2500 } },
  },
  factors: [
    { title: "Real mileage", text: "City traffic, highway speed, load and A/C use can change mileage by a large margin." },
    { title: "Fuel price", text: "Pump prices differ by city and state and change over time." },
    { title: "Other trip costs", text: "Tolls, parking and wear and tear are not included." },
    { title: "Fuel type", text: "Diesel, petrol and CNG have different prices and mileage units." },
  ],
  benefits: [
    "Budget a trip before you leave.",
    "Compare two vehicles by cost per km.",
    "Split fuel cost fairly among co-travellers.",
  ],
  assumptions: [
    "Mileage and price stay constant for the whole trip.",
    "Tolls, parking and maintenance are not included.",
    "Fuel prices must be entered by you, since they change often.",
  ],
  faqs: [
    { q: "How do I calculate the fuel cost of a trip?", a: "Divide the distance by mileage to get litres, then multiply by the price per litre." },
    { q: "How do I find my vehicle's real mileage?", a: "Fill the tank, reset the trip meter, drive normally, then refill and divide the distance by the litres added." },
    { q: "Does this work for CNG or electric vehicles?", a: "For CNG, enter the km/kg as mileage and the price per kg. For electric vehicles, use km per unit and the price per unit." },
    { q: "How can I split the cost between passengers?", a: "Divide the total cost by the number of people travelling." },
    { q: "Are tolls included?", a: "No. Add tolls and parking separately, or use the travel budget calculator." },
  ],
  related: ["daily-life/travel-budget", "daily-life/unit-converter", "daily-life/electricity-bill", "daily-life/percentage-calculator"],
  references: [
    { label: "Petroleum Planning & Analysis Cell", url: "https://ppac.gov.in/" },
    { label: "Bureau of Energy Efficiency", url: "https://beeindia.gov.in/" },
  ],
};

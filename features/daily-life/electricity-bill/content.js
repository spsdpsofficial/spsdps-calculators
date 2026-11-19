export const content = {
  seo: {
    title: "Electricity Bill Calculator: Slab Estimate",
    description:
      "Estimate your monthly electricity bill from units used, slab rates, fixed charges and duty. Enter your own tariff to see a slab-wise cost and average rate per unit.",
    keywords: ["electricity bill calculator", "electricity bill calculator India", "slab wise electricity bill", "units to bill calculator", "power bill estimate"],
  },
  h1: "Electricity Bill Calculator",
  intro: [
    "Most Indian households are billed on a slab system: the first block of units costs less per unit, and the rate rises as consumption goes up. This calculator splits your units across three slabs, adds the fixed charge and electricity duty, and gives an estimated bill.",
    "Tariffs differ by state, distribution company and consumer category, and they are revised regularly. So the slabs are entered by you, using the rates printed on your bill or your DISCOM's website. The default values are only an example.",
  ],
  howTo: [
    "Enter the units (kWh) consumed in the billing period.",
    "Fill in the slab sizes and per-unit rates from your own tariff.",
    "Add the fixed or meter charge and the duty or tax percentage from your bill.",
    "Read the estimated bill, the slab-wise cost and the average cost per unit.",
  ],
  formula: {
    expression: "Energy charge = Σ (units in slab × slab rate)\nBill = (Energy charge + Fixed charge) × (1 + Duty ÷ 100)",
    variables: [
      { symbol: "Units in slab", meaning: "units falling inside each slab, filled from the first slab onwards." },
      { symbol: "Fixed charge", meaning: "monthly meter or connection charge." },
      { symbol: "Duty", meaning: "electricity duty or tax, charged here on energy plus fixed charge." },
    ],
    notes: ["Some DISCOMs charge duty only on energy charges, or add fuel adjustment charges. Your actual bill may differ."],
  },
  example: {
    scenario: "A household uses 250 units. Slab 1: 100 units at ₹3.50, slab 2: 100 units at ₹5, slab 3: rest at ₹7. Fixed charge ₹100, duty 5%.",
    inputs: [
      { label: "Units", value: "250" },
      { label: "Fixed charge", value: "₹100" },
      { label: "Duty", value: "5%" },
    ],
    results: [
      { label: "Energy charge", value: "₹1,200" },
      { label: "Estimated bill", value: "₹1,365" },
      { label: "Average per unit", value: "₹5.46" },
    ],
    steps: ["100 × 3.50 = 350, 100 × 5 = 500 and 50 × 7 = 350, so energy charge = ₹1,200.", "Add the ₹100 fixed charge to get ₹1,300.", "Duty at 5% is ₹65, giving a bill of ₹1,365."],
    expected: { input: { units: 250, slab1Units: 100, rate1: 3.5, slab2Units: 100, rate2: 5, rate3: 7, fixedCharge: 100, dutyPercent: 5 }, total: 1365 },
  },
  factors: [
    { title: "Slab structure", text: "Higher usage pushes more units into costlier slabs." },
    { title: "Consumer category", text: "Domestic, commercial and agricultural connections have different tariffs." },
    { title: "Fixed and demand charges", text: "Some tariffs charge on sanctioned load rather than a flat amount." },
    { title: "Surcharges", text: "Fuel or power purchase adjustments, late fees and arrears are added on some bills." },
  ],
  benefits: [
    "Estimate next month's bill from expected usage.",
    "See how much each slab contributes.",
    "Test the effect of saving 20 or 30 units.",
  ],
  assumptions: [
    "Three slabs only. If your tariff has more, combine or approximate the later ones.",
    "Duty is applied on energy plus fixed charge.",
    "Time-of-day tariffs, subsidies, fuel surcharges and arrears are not included.",
    "No official tariff is built in. You supply the rates.",
  ],
  faqs: [
    { q: "How is an electricity bill calculated in India?", a: "Units consumed are charged slab by slab at different rates, then a fixed charge and duty or taxes are added." },
    { q: "Where do I find my slab rates?", a: "On your bill, or the tariff order published on your electricity distribution company's website and the state regulatory commission's website." },
    { q: "Why does my actual bill differ?", a: "Surcharges, fuel adjustments, subsidies, arrears and rounding can change the final amount." },
    { q: "How can I reduce my bill?", a: "Reduce units in the highest slab first. Efficient appliances, LED lighting and avoiding standby power all help." },
    { q: "What is a unit of electricity?", a: "One unit is one kilowatt-hour (kWh): using 1,000 watts for one hour." },
    { q: "Are the default rates official?", a: "No. They are placeholders for illustration, so please enter your own tariff." },
  ],
  related: ["daily-life/fuel-cost", "daily-life/percentage-calculator", "daily-life/unit-converter", "daily-life/travel-budget"],
  references: [
    { label: "Ministry of Power, Government of India", url: "https://powermin.gov.in/" },
    { label: "Central Electricity Regulatory Commission", url: "https://cercind.gov.in/" },
    { label: "Bureau of Energy Efficiency", url: "https://beeindia.gov.in/" },
  ],
};

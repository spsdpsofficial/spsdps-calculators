export const content = {
  seo: {
    title: "Stamp Duty & Registration Charges Calculator",
    description:
      "Calculate stamp duty and registration charges on a property purchase in India from the property value and your state's rates, and see the total cost.",
    keywords: ["stamp duty calculator", "registration charges calculator", "property registration cost", "stamp duty india", "stamp duty and registration fee"],
  },
  h1: "Stamp Duty and Registration Calculator",
  intro: [
    "When you buy a property in India you pay stamp duty and a registration fee to the state government on top of the price. These are charged as a percentage of the property value, and the rates differ from state to state and sometimes by gender, city or property type.",
    "Enter your state's rates and the property value. The calculator shows what you will pay and how much it adds to the total cost of the home.",
  ],
  howTo: [
    "Enter the property value on which duty is charged.",
    "Enter the stamp duty rate and the registration fee rate for your state.",
    "Add any other local charges, if known.",
    "Read the total charges and the total cost including them.",
  ],
  formula: {
    expression: "Stamp duty = Value × stamp duty %\nRegistration fee = Value × registration %\nTotal = Stamp duty + Registration fee + Other charges",
    variables: [
      { symbol: "Value", meaning: "the agreement value or the government's circle rate, whichever is higher, as per your state's rules." },
      { symbol: "Rates", meaning: "set by the state government, so you must enter the current ones." },
    ],
    notes: ["This calculator has no built-in state rate table, because rates change often. Check your state's official source for the latest figures."],
  },
  example: {
    scenario: "A property valued at ₹75,00,000 with 5% stamp duty and 1% registration fee.",
    inputs: [
      { label: "Property value", value: "₹75,00,000" },
      { label: "Stamp duty and registration", value: "5% and 1%" },
    ],
    results: [
      { label: "Stamp duty", value: "₹3,75,000" },
      { label: "Registration fee", value: "₹75,000" },
      { label: "Total charges", value: "₹4,50,000" },
    ],
    steps: ["Stamp duty = 5% of 75,00,000 = ₹3,75,000.", "Registration = 1% of 75,00,000 = ₹75,000.", "Total = ₹4,50,000, which is 6% of the property value."],
    expected: { input: { propertyValue: 7500000, stampDutyPercent: 5, registrationPercent: 1, otherCharges: 0 }, total: 450000 },
  },
  factors: [
    { title: "State", text: "Each state sets its own stamp duty and registration rates." },
    { title: "Circle rate", text: "Duty is often charged on the higher of the sale price and the government's circle rate." },
    { title: "Buyer category", text: "Some states give lower rates to women or first-time buyers." },
    { title: "Property type", text: "Rates can differ for flats, land, under-construction and resale properties." },
  ],
  benefits: [
    "Budget the full cost of a property before buying.",
    "Compare the impact of different rates.",
    "Avoid surprises at registration.",
  ],
  assumptions: [
    "Rates are the ones you enter, applied to the single value you enter.",
    "Slab-wise, flat-fee, surcharge and cess structures used by some states are not built in.",
    "GST, brokerage and legal fees are not included unless you add them under other charges.",
  ],
  faqs: [
    { q: "What is stamp duty?", a: "A tax paid to the state government when a property document is registered, calculated as a percentage of the property value." },
    { q: "How do I find my state's rate?", a: "Check the website of your state's stamp and registration department or ask the sub-registrar office. Rates change, so confirm before you pay." },
    { q: "Is stamp duty charged on the price or the circle rate?", a: "In many states, it is charged on the higher of the two. Check your state's rule." },
    { q: "Can I get a deduction for stamp duty?", a: "A deduction may be available under old-regime provisions in the year of purchase. Check the Income Tax Department's guidance for the current rules." },
    { q: "Is the registration fee separate?", a: "Yes. It is a separate government charge, commonly a small percentage, and some states cap it at a fixed amount." },
  ],
  related: ["finance/home-loan", "finance/home-loan-eligibility", "finance/gst-calculator", "finance/emi-calculator"],
  references: [
    { label: "Government of India portal", url: "https://www.india.gov.in/" },
    { label: "Income Tax Department", url: "https://www.incometax.gov.in/" },
  ],
};

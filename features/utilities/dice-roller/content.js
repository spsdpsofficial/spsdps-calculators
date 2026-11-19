export const content = {
  seo: {
    title: "Dice Roller & Coin Flip Online",
    description:
      "Roll up to 20 dice from d4 to d100 or flip a coin online. Uses your browser's secure random generator for fair results. Free, with no sign-up.",
    keywords: ["dice roller", "roll a dice online", "coin flip", "flip a coin", "virtual dice"],
  },
  h1: "Dice Roller and Coin Flip",
  intro: [
    "Need a quick, fair roll for a board game, a classroom activity or a tie-break? Roll up to 20 dice at once, choose from 4, 6, 8, 10, 12, 20 or 100-sided dice, or flip a coin up to 100 times.",
    "Every result comes from your browser's secure random number generator, and each face has an equal chance. Nothing is sent to a server.",
  ],
  howTo: ["Choose Roll dice or Flip coin.", "Set the number of dice (and sides) or flips.", "Press Roll or Flip.", "Read the total and each result."],
  formula: {
    expression: "Each die: result = 1 + random whole number below the number of sides\nCoin: heads or tails with equal probability",
    variables: [
      { symbol: "Possible total", meaning: "from the number of dice (all ones) up to dice × sides (all maximum)." },
      { symbol: "Fair chance", meaning: "each face of each die has a probability of 1 ÷ sides." },
    ],
    notes: ["The random numbers come from the Web Crypto API with rejection sampling, which avoids bias."],
  },
  example: {
    scenario: "Rolling two ordinary six-sided dice, as in many board games.",
    inputs: [
      { label: "Dice", value: "2" },
      { label: "Sides", value: "6" },
    ],
    results: [
      { label: "Lowest possible total", value: "2" },
      { label: "Highest possible total", value: "12" },
      { label: "Most likely total", value: "7 (6 ways out of 36)" },
    ],
    steps: ["Each die shows a number from 1 to 6.", "The total of two dice ranges from 2 to 12.", "7 can be made in six ways, so it is the most common total."],
    expected: { count: 2, sides: 6, min: 2, max: 12 },
  },
  factors: [
    { title: "Number of sides", text: "More sides means a wider range and a smaller chance of each number." },
    { title: "Number of dice", text: "Adding dice makes totals cluster around the middle." },
    { title: "Randomness", text: "Rolls are independent. Past results do not change the next roll." },
  ],
  benefits: ["Fair, unbiased results.", "Works for board games and tie-breaks.", "No download, no sign-up."],
  assumptions: ["Each face has an equal chance.", "Rolls are independent.", "Not meant for gambling, lotteries or any use that needs certified randomness."],
  faqs: [
    { q: "Is the dice roller fair?", a: "Yes. It uses your browser's cryptographic random generator and avoids the bias that a simple remainder method can add." },
    { q: "How many dice can I roll?", a: "Up to 20 at a time, with 4, 6, 8, 10, 12, 20 or 100 sides." },
    { q: "Is a coin flip really 50-50?", a: "In this tool, yes. Each flip is heads or tails with equal probability." },
    { q: "Does it remember earlier rolls?", a: "No. Each roll is independent and nothing is stored." },
    { q: "Can I use this to settle a decision?", a: "Yes, for friendly decisions. For anything legal or regulated, use an officially approved method." },
  ],
  related: ["utilities/random-number-generator", "utilities/password-generator", "daily-life/percentage-calculator", "utilities/word-counter"],
  references: [
    { label: "MDN: Crypto.getRandomValues()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues" },
    { label: "W3C: Web Cryptography API", url: "https://www.w3.org/TR/WebCryptoAPI/" },
  ],
};

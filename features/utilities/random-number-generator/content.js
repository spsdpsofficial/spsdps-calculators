export const content = {
  seo: {
    title: "Random Number Generator: Pick in a Range",
    description:
      "Generate random whole numbers between any minimum and maximum. Choose how many, avoid repeats and sort them. Uses your browser's secure random generator.",
    keywords: ["random number generator", "random number between", "pick a random number", "lottery number generator", "unique random numbers"],
  },
  h1: "Random Number Generator",
  intro: [
    "Need a number for a draw, a game, a sample or a quick decision? Set a minimum and maximum, choose how many numbers you want and press Generate. You can ask for numbers with no repeats and have them sorted.",
    "Numbers come from your browser's cryptographically secure random generator, with every value in the range equally likely.",
  ],
  howTo: [
    "Enter the minimum and maximum numbers, both included in the range.",
    "Enter how many numbers you want.",
    "Tick No repeats for unique numbers, and Sort results if you want them in order.",
    "Press Generate. Use Copy numbers to copy them.",
  ],
  formula: {
    expression: "Number = Minimum + random integer from 0 to (Maximum − Minimum)",
    variables: [
      { symbol: "Range size", meaning: "Maximum − Minimum + 1, the count of possible values." },
      { symbol: "No repeats", meaning: "each value can appear at most once, which needs a count no larger than the range size." },
    ],
    notes: ["Values are picked without modulo bias, so each number in the range has the same chance."],
  },
  example: {
    scenario: "Draw 6 different numbers from 1 to 49.",
    inputs: [
      { label: "Range", value: "1 to 49" },
      { label: "Count", value: "6, no repeats" },
    ],
    results: [{ label: "Result", value: "Six different numbers, for example 4, 11, 19, 27, 38, 46" }],
    steps: ["The range holds 49 possible numbers.", "Each pick is chosen uniformly from the numbers not yet drawn.", "The six picks are shown, sorted if you ticked Sort."],
    expected: { input: { min: 1, max: 49, count: 6, unique: true }, count: 6 },
  },
  factors: [
    { title: "Inclusive range", text: "Both the minimum and the maximum can be drawn." },
    { title: "Repeats", text: "Without the No repeats option, the same number can appear more than once, as with dice." },
    { title: "Whole numbers only", text: "This tool generates integers. Decimals are not supported." },
    { title: "Not for gambling guarantees", text: "Random numbers do not make a lottery ticket more likely to win." },
  ],
  benefits: [
    "Fair, unbiased picks for draws and games.",
    "Unique numbers for raffles and samples.",
    "Nothing is stored or sent.",
  ],
  assumptions: [
    "Range up to about 4.29 billion values wide, and up to 1,000 numbers at a time.",
    "Uses crypto.getRandomValues with rejection sampling.",
    "Results are not recorded, so keep your own record for any official draw.",
  ],
  faqs: [
    { q: "How do I pick a random number between 1 and 10?", a: "Set the minimum to 1, the maximum to 10 and press Generate." },
    { q: "Is it truly random?", a: "It uses your browser's secure random generator, which is suitable for security uses and much stronger than Math.random." },
    { q: "How do I get numbers with no repeats?", a: "Tick No repeats. The count cannot be larger than the number of values in the range." },
    { q: "Can I use this for a raffle?", a: "Yes, for informal draws. Give each entry a number and draw unique numbers. For official contests, follow the rules and record keeping required for your draw." },
    { q: "Can it generate decimals?", a: "Not at present. It generates whole numbers only." },
  ],
  related: ["utilities/password-generator", "utilities/word-counter", "daily-life/percentage-calculator", "utilities/qr-code-generator"],
  references: [
    { label: "MDN: Crypto.getRandomValues()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues" },
    { label: "NIST: Random number generation", url: "https://csrc.nist.gov/projects/random-bit-generation" },
  ],
};

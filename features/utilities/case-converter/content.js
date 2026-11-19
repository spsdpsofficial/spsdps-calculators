export const content = {
  seo: {
    title: "Case Converter: Upper, Lower, Title Case",
    description:
      "Convert text to UPPER CASE, lower case, Title Case, Sentence case, camelCase, snake_case, kebab-case and more in one click. Free, private and runs in your browser.",
    keywords: ["case converter", "uppercase to lowercase", "title case converter", "sentence case converter", "camelCase converter"],
  },
  h1: "Case Converter",
  intro: [
    "Fix text that was typed with caps lock on, format a heading in Title Case, or turn a phrase into a variable name. Paste your text, click a case and it converts instantly.",
    "Besides everyday cases, it supports the cases developers use for naming: camelCase, PascalCase, snake_case, kebab-case and CONSTANT_CASE. Your text stays in your browser.",
  ],
  howTo: [
    "Type or paste text into the box.",
    "Click the case you want. The text in the box is replaced.",
    "Click again with another case to convert further, or use Copy text.",
    "Use Clear to start over.",
  ],
  formula: {
    expression: "UPPER = all letters capitals\nlower = all letters small\nTitle Case = first letter of every word capital\nSentence case = first letter of every sentence capital\ncamelCase = words joined, each capitalised except the first",
    variables: [
      { symbol: "Word splitting", meaning: "for code cases, words are split at spaces, underscores, hyphens and lower-to-upper changes in camelCase." },
    ],
    notes: ["Title Case here capitalises every word. Style guides that keep small words such as 'of' or 'the' in lower case need a manual touch-up."],
  },
  example: {
    scenario: "Turn the phrase 'the quick Brown fox' into a variable name.",
    inputs: [{ label: "Text", value: "the quick Brown fox" }],
    results: [
      { label: "camelCase", value: "theQuickBrownFox" },
      { label: "snake_case", value: "the_quick_brown_fox" },
      { label: "Title Case", value: "The Quick Brown Fox" },
    ],
    steps: ["The phrase is split into the, quick, brown and fox.", "For camelCase the first word stays lower case and the others start with a capital letter.", "The words are then joined without spaces."],
    expected: { id: "camel", input: "the quick Brown fox", output: "theQuickBrownFox" },
  },
  factors: [
    { title: "Names and acronyms", text: "Converting to lower or sentence case also lowers proper names and acronyms, so check them afterwards." },
    { title: "Language", text: "Letter case applies to scripts that have it, such as Latin, Greek and Cyrillic. Devanagari has no upper or lower case." },
    { title: "Special letters", text: "Some letters change length when capitalised, such as the German ß." },
  ],
  benefits: [
    "Fix accidental caps lock text in a click.",
    "Format headings and sentences consistently.",
    "Generate variable names for code.",
  ],
  assumptions: [
    "Conversion is done by your browser's built-in text functions.",
    "Title Case capitalises every word.",
    "Your text is not stored or sent anywhere.",
  ],
  faqs: [
    { q: "How do I change uppercase text to lowercase?", a: "Paste the text and click 'lower case'." },
    { q: "What is sentence case?", a: "The first letter of each sentence is a capital and the rest is lower case, as in normal writing." },
    { q: "What is the difference between camelCase and PascalCase?", a: "camelCase starts with a lower-case letter (myValue) while PascalCase starts with a capital (MyValue)." },
    { q: "Does it work for Hindi?", a: "Hindi script has no upper or lower case, so those conversions leave it unchanged. Any English words in the text are converted." },
    { q: "Is my text safe?", a: "Yes. It is processed on your device and never uploaded." },
  ],
  related: ["utilities/word-counter", "utilities/url-encoder-decoder", "utilities/json-formatter", "utilities/password-generator"],
  references: [
    { label: "MDN: String.prototype.toUpperCase", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase" },
    { label: "Unicode: Case mapping FAQ", url: "https://www.unicode.org/faq/casemap_charprop.html" },
  ],
};

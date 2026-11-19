export const content = {
  seo: {
    title: "Word Counter: Words and Characters Count",
    description:
      "Count words, characters, sentences and paragraphs as you type, with reading and speaking time. Works with English, Hindi and other languages in your browser.",
    keywords: ["word counter", "character counter", "count words online", "reading time calculator", "sentence counter"],
  },
  h1: "Word Counter",
  intro: [
    "Paste or type your text and see the number of words, characters, sentences and paragraphs update instantly. It also estimates how long the text takes to read or speak, which is useful for essays, social posts, speeches and blog articles.",
    "Everything happens in your browser. Your text is not uploaded or stored anywhere.",
  ],
  howTo: [
    "Type or paste text into the box.",
    "Read the live counts below the box.",
    "Check the reading and speaking time estimates.",
    "Use Clear to start again.",
  ],
  formula: {
    expression: "Words = pieces of text separated by spaces that contain a letter or number\nReading time = Words ÷ 200 words per minute\nSpeaking time = Words ÷ 130 words per minute",
    variables: [
      { symbol: "Characters", meaning: "every visible symbol, counted as a person sees it, so an emoji counts as one." },
      { symbol: "Sentences", meaning: "pieces of text ending with a full stop, question mark, exclamation mark or the Hindi purna viram (।)." },
      { symbol: "Paragraphs", meaning: "blocks of text separated by a blank line." },
    ],
  },
  example: {
    scenario: "Counting the text: Hello world. This is a test!",
    inputs: [{ label: "Text", value: "Hello world. This is a test!" }],
    results: [
      { label: "Words", value: "6" },
      { label: "Characters", value: "28 (23 without spaces)" },
      { label: "Sentences", value: "2" },
    ],
    steps: ["Splitting on spaces gives six words.", "The sentence is 28 characters long including 5 spaces, so 23 without spaces.", "Two full stops or exclamation marks end two sentences."],
    expected: { text: "Hello world. This is a test!", counts: { words: 6, characters: 28, charactersNoSpaces: 23, sentences: 2 } },
  },
  factors: [
    { title: "Hyphens and apostrophes", text: "A hyphenated word such as 'well-known' counts as one word." },
    { title: "Numbers", text: "Numbers count as words." },
    { title: "Reading speed", text: "People read at different speeds. 200 words per minute is an average, and technical text takes longer." },
    { title: "Language", text: "Words are split at spaces, so languages written without spaces between words are not counted accurately." },
  ],
  benefits: [
    "Stay within essay, application or social media limits.",
    "Estimate how long a speech will run.",
    "Private: nothing is sent to a server.",
  ],
  assumptions: [
    "Words are separated by whitespace.",
    "Reading and speaking speeds are averages and for estimation only.",
    "Different word processors may count slightly differently.",
  ],
  faqs: [
    { q: "How are words counted?", a: "Text is split at spaces and line breaks, and each piece that contains a letter or number counts as a word." },
    { q: "Does it count Hindi text?", a: "Yes. Hindi and other languages that separate words with spaces are counted, and the purna viram (।) ends a sentence." },
    { q: "Is my text saved?", a: "No. The text stays in your browser and is lost when you close or refresh the page." },
    { q: "Why does another tool show a different count?", a: "Tools differ in how they treat hyphens, symbols and numbers. The difference is usually small." },
    { q: "How is reading time worked out?", a: "By dividing the word count by 200 words per minute. Speaking time uses 130 words per minute." },
  ],
  related: ["utilities/case-converter", "utilities/json-formatter", "utilities/url-encoder-decoder", "utilities/random-number-generator"],
  references: [
    { label: "Unicode Standard Annex 29: Text segmentation", url: "https://www.unicode.org/reports/tr29/" },
    { label: "MDN: Intl.Segmenter", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter" },
  ],
};

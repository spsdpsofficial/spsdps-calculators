export const content = {
  seo: {
    title: "JSON Formatter & Validator: Beautify, Minify",
    description:
      "Format, beautify, minify and validate JSON online. See the line and column of a syntax error, choose indentation and sort keys. Runs privately in your browser.",
    keywords: ["JSON formatter", "JSON validator", "JSON beautifier", "JSON minify", "format JSON online"],
  },
  h1: "JSON Formatter & Validator",
  intro: [
    "Paste JSON from an API, a config file or a log and turn it into a readable, indented layout, or shrink it to a single line for use in code. If the JSON has a mistake, the tool tells you the line and column where parsing failed.",
    "Your JSON is processed entirely in your browser. It is never uploaded, so it is safe to use with internal or sensitive data.",
  ],
  howTo: [
    "Paste your JSON in the box.",
    "Choose the indentation and, if you want, tick Sort keys.",
    "Click Format to beautify, Minify to compress, or Validate to only check it.",
    "If there is an error, fix the line and column mentioned and try again. Use Copy to copy the result.",
  ],
  formula: {
    expression: "Format = parse the text, then write it back with indentation\nMinify = parse the text, then write it back with no extra spaces\nValidate = check that the text parses",
    variables: [
      { symbol: "Valid JSON", meaning: "double-quoted keys and strings, no trailing commas, no comments, and values that are strings, numbers, true, false, null, arrays or objects." },
    ],
  },
  example: {
    scenario: "Beautify a compact JSON object.",
    inputs: [{ label: "JSON", value: '{"name":"Asha","skills":["Excel","SQL"]}' }],
    results: [{ label: "Output", value: "The same data on several lines, indented by 2 spaces" }],
    steps: ["The text is parsed into an object.", "It is written back with each key on its own line.", "Nested arrays are indented one level deeper."],
    expected: { input: { source: '{"name":"Asha","skills":["Excel","SQL"]}', action: "format" }, output: '{\n  "name": "Asha",\n  "skills": [\n    "Excel",\n    "SQL"\n  ]\n}' },
  },
  factors: [
    { title: "Trailing commas", text: "A comma after the last item is the most common reason valid-looking JSON fails." },
    { title: "Quotes", text: "Keys and strings need double quotes. Single quotes are not valid JSON." },
    { title: "Comments", text: "JSON does not allow comments. Remove them before pasting." },
    { title: "Large numbers", text: "Numbers beyond 15–16 digits lose precision when parsed in a browser. Keep such IDs as strings." },
  ],
  benefits: [
    "Read API responses easily.",
    "Find syntax errors by line and column.",
    "Safe for sensitive data because nothing is uploaded.",
  ],
  assumptions: [
    "Standard JSON only (RFC 8259). JSON5, comments and trailing commas are rejected.",
    "Duplicate keys keep the last value, as in a browser.",
    "Very large files may be slow in the browser.",
  ],
  faqs: [
    { q: "How do I format JSON?", a: "Paste it and click Format. The tool re-writes it with line breaks and indentation." },
    { q: "Why does it say invalid JSON?", a: "There is a syntax mistake such as a missing quote, extra comma or unescaped character. The message shows where the parser stopped." },
    { q: "What does minify do?", a: "It removes all unnecessary spaces and line breaks to make the JSON as short as possible." },
    { q: "Does sorting keys change my data?", a: "Only the order of keys inside objects. Arrays keep their order, and the meaning of the data does not change." },
    { q: "Is my JSON uploaded?", a: "No. Parsing and formatting happen on your device." },
    { q: "Can it fix broken JSON?", a: "No. It points to the problem, and you fix it." },
  ],
  related: ["utilities/url-encoder-decoder", "utilities/word-counter", "utilities/case-converter", "utilities/qr-code-generator"],
  references: [
    { label: "RFC 8259: The JSON data interchange format", url: "https://www.rfc-editor.org/rfc/rfc8259" },
    { label: "MDN: JSON.parse", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse" },
  ],
};

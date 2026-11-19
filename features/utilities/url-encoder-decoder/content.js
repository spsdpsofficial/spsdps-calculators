export const content = {
  seo: {
    title: "URL Encoder & Decoder: Percent Encoding",
    description:
      "Encode text for use in a URL or decode percent-encoded strings like %20 and %E0%A4%A8 back to readable text. Handles Hindi and other Unicode. Runs in your browser.",
    keywords: ["URL encoder", "URL decoder", "percent encoding", "encodeURIComponent online", "decode %20"],
  },
  h1: "URL Encoder & Decoder",
  intro: [
    "URLs can only contain a limited set of characters. Spaces, symbols and non-English letters have to be converted into percent-encoded form, such as %20 for a space. This tool encodes text for safe use in a URL and decodes encoded strings back to plain text.",
    "Choose between encoding a single value (such as a search query) and encoding a whole URL while keeping its structure. Conversion happens as you type and never leaves your browser.",
  ],
  howTo: [
    "Choose the conversion: encode or decode, for a single value or a whole URL.",
    "Paste or type your text in the input box.",
    "Read the result below, or fix the error message if the input is invalid.",
    "Use Copy result to copy it.",
  ],
  formula: {
    expression: "Each unsafe character is written as % followed by the hexadecimal value of each byte of its UTF-8 form.\nSpace → %20,  & → %26,  é → %C3%A9",
    variables: [
      { symbol: "Encode (value)", meaning: "encodeURIComponent: also encodes / ? & = # : so a value cannot break the URL." },
      { symbol: "Encode (whole URL)", meaning: "encodeURI: keeps those structural characters so the link keeps working." },
    ],
  },
  example: {
    scenario: "Encode a search phrase to use as a query value.",
    inputs: [{ label: "Text", value: "chai & samosa/₹50" }],
    results: [{ label: "Encoded", value: "chai%20%26%20samosa%2F%E2%82%B950" }],
    steps: ["Spaces become %20 and & becomes %26.", "The slash becomes %2F so it is not treated as a path separator.", "The rupee sign is three bytes in UTF-8, so it becomes %E2%82%B9."],
    expected: { mode: "encode-component", input: "chai & samosa/₹50", output: "chai%20%26%20samosa%2F%E2%82%B950" },
  },
  factors: [
    { title: "Value or whole URL", text: "Encoding a whole URL as a value would also encode the :// and slashes, which breaks the link." },
    { title: "Double encoding", text: "Encoding text that is already encoded turns % into %25. Decode first if unsure." },
    { title: "Plus signs", text: "In forms a + can mean a space. This tool uses %20, which is correct everywhere in a URL." },
    { title: "Unicode", text: "Characters outside English are encoded as UTF-8 bytes." },
  ],
  benefits: [
    "Build safe links and query strings.",
    "Read encoded URLs from logs and emails.",
    "Handles Hindi and other scripts.",
  ],
  assumptions: [
    "Uses your browser's standard encodeURI and decodeURI functions with UTF-8.",
    "Invalid percent sequences show an error instead of producing partial output.",
    "Nothing is uploaded.",
  ],
  faqs: [
    { q: "What is URL encoding?", a: "Replacing characters that are not allowed in a URL with a % sign and their hexadecimal byte values." },
    { q: "What does %20 mean?", a: "It is an encoded space." },
    { q: "What is the difference between the two encode options?", a: "Value encoding converts everything unsafe, including / ? & and =. Whole-URL encoding keeps those so the URL structure stays intact." },
    { q: "Why do I get an invalid sequence error?", a: "Decoding fails when a % is not followed by two hexadecimal digits, or the bytes do not form valid UTF-8." },
    { q: "Can I decode a link in Hindi?", a: "Yes. Encoded Devanagari such as %E0%A4%A8 decodes back to the original letters." },
  ],
  related: ["utilities/json-formatter", "utilities/qr-code-generator", "utilities/case-converter", "utilities/word-counter"],
  references: [
    { label: "RFC 3986: URI generic syntax", url: "https://www.rfc-editor.org/rfc/rfc3986" },
    { label: "MDN: encodeURIComponent", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent" },
  ],
};

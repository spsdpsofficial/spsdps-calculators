export const content = {
  seo: {
    title: "Base64 Encoder & Decoder Online",
    description:
      "Encode text to Base64 or decode Base64 back to text in your browser. Supports Unicode and Indian languages, URL-safe output and clear errors. Nothing is uploaded.",
    keywords: ["base64 encoder", "base64 decoder", "base64 encode online", "base64 decode online", "url safe base64"],
  },
  h1: "Base64 Encoder and Decoder",
  intro: [
    "Base64 is a way of writing data using only letters, numbers and a few symbols, so it can travel safely through systems that handle text, such as emails, URLs and JSON. Developers meet it in API tokens, data URLs and configuration files.",
    "Paste text to encode it, or paste Base64 to decode it. The conversion happens in your browser, so your text is not uploaded. Unicode text, including Hindi and other Indian languages, is handled correctly.",
  ],
  howTo: ["Choose Encode or Decode.", "Type or paste your input.", "For encoding, tick URL-safe output if the result will go in a URL.", "Copy the result."],
  formula: {
    expression: "Every 3 bytes of input → 4 Base64 characters (6 bits each)",
    variables: [
      { symbol: "Alphabet", meaning: "A–Z, a–z, 0–9, + and /. The URL-safe form uses - and _ instead of + and /." },
      { symbol: "Padding", meaning: "= signs added at the end so the length is a multiple of 4." },
    ],
    notes: ["Base64 is encoding, not encryption. Anyone can decode it, so never use it to hide secrets."],
  },
  example: {
    scenario: "Encode the text “Hello, World!” to Base64.",
    inputs: [{ label: "Input", value: "Hello, World!" }],
    results: [{ label: "Base64", value: "SGVsbG8sIFdvcmxkIQ==" }],
    steps: ["The text is converted to bytes using UTF-8.", "Every three bytes become four Base64 characters.", "Padding with = completes the final group."],
    expected: { text: "Hello, World!", base64: "SGVsbG8sIFdvcmxkIQ==" },
  },
  factors: [
    { title: "Character encoding", text: "This tool uses UTF-8, which covers all languages and symbols." },
    { title: "URL-safe form", text: "Standard Base64 contains + and /, which have special meanings in URLs." },
    { title: "Size", text: "Base64 output is about one third larger than the input." },
  ],
  benefits: ["Encode and decode with one click.", "Handles Unicode and emoji.", "Private: conversion happens in your browser."],
  assumptions: ["Text is treated as UTF-8.", "Files and images are not supported, only text.", "Decoded data that is not valid UTF-8 text cannot be shown."],
  faqs: [
    { q: "What is Base64?", a: "A way to represent bytes as plain text using 64 safe characters." },
    { q: "Is Base64 encryption?", a: "No. It is easily reversed, so it offers no secrecy." },
    { q: "What is URL-safe Base64?", a: "A variant that uses - and _ instead of + and /, and often drops the = padding, so it can be used in URLs." },
    { q: "Why does decoding fail?", a: "The input may have characters outside the Base64 alphabet, a wrong length, or may decode to binary data instead of text." },
    { q: "Is my text sent anywhere?", a: "No. Everything runs in your browser." },
  ],
  related: ["utilities/url-encoder-decoder", "utilities/json-formatter", "utilities/password-generator", "utilities/word-counter"],
  references: [
    { label: "RFC 4648: Base64 data encodings", url: "https://www.rfc-editor.org/rfc/rfc4648" },
    { label: "MDN: Base64", url: "https://developer.mozilla.org/en-US/docs/Glossary/Base64" },
  ],
};

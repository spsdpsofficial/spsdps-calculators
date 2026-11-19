/** Split text into words for code-style cases: handles spaces, _ - and camelCase boundaries. */
function toWords(text) {
  return text
    .replace(/([\p{Ll}\p{N}])(\p{Lu})/gu, "$1 $2")
    .replace(/(\p{Lu})(\p{Lu}\p{Ll})/gu, "$1 $2")
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

const capitalise = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

function sentenceCase(text) {
  return text.toLowerCase().replace(/(^\s*|[.!?]\s+|\n\s*)(\p{L})/gu, (_, before, letter) => before + letter.toUpperCase());
}

function titleCase(text) {
  return text.toLowerCase().replace(/(^|[\s(["“-])(\p{L})/gu, (_, before, letter) => before + letter.toUpperCase());
}

export const CASES = [
  { id: "upper", label: "UPPER CASE", convert: (t) => t.toUpperCase() },
  { id: "lower", label: "lower case", convert: (t) => t.toLowerCase() },
  { id: "title", label: "Title Case", convert: titleCase },
  { id: "sentence", label: "Sentence case", convert: sentenceCase },
  { id: "camel", label: "camelCase", convert: (t) => toWords(t).map((w, i) => (i === 0 ? w.toLowerCase() : capitalise(w))).join("") },
  { id: "pascal", label: "PascalCase", convert: (t) => toWords(t).map(capitalise).join("") },
  { id: "snake", label: "snake_case", convert: (t) => toWords(t).map((w) => w.toLowerCase()).join("_") },
  { id: "kebab", label: "kebab-case", convert: (t) => toWords(t).map((w) => w.toLowerCase()).join("-") },
  { id: "constant", label: "CONSTANT_CASE", convert: (t) => toWords(t).map((w) => w.toUpperCase()).join("_") },
];

export function convertCase(id, text) {
  const found = CASES.find((c) => c.id === id);
  return found ? found.convert(text) : text;
}

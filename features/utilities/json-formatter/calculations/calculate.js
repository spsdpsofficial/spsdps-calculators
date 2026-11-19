/** Recursively sort object keys (arrays keep their order). */
export function sortKeys(value) {
  if (Array.isArray(value)) return value.map(sortKeys);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((k) => [k, sortKeys(value[k])]));
  }
  return value;
}

/**
 * Minimal strict JSON (RFC 8259) syntax scanner. Returns the index where the text first stops being valid,
 * or null if it is valid. Used because current browsers no longer include a position in their error message.
 */
export function findJsonErrorPosition(text) {
  let i = 0;
  const fail = () => { throw i; };
  const ws = () => { while (i < text.length && " \t\n\r".includes(text[i])) i++; };
  const literal = (word) => { if (!text.startsWith(word, i)) fail(); i += word.length; };
  const digits = () => { const start = i; while (i < text.length && text[i] >= "0" && text[i] <= "9") i++; if (i === start) fail(); };

  function string() {
    i++; // opening quote
    while (i < text.length && text[i] !== '"') {
      const c = text[i];
      if (c < " ") fail(); // raw control characters are not allowed
      if (c === "\\") {
        i++;
        if (text[i] === "u") { for (let k = 1; k <= 4; k++) { if (!/[0-9a-fA-F]/.test(text[i + k] ?? "")) { i += k; fail(); } } i += 4; }
        else if (!'"\\/bfnrt'.includes(text[i] ?? "x")) fail();
      }
      i++;
    }
    if (text[i] !== '"') fail();
    i++;
  }

  function number() {
    if (text[i] === "-") i++;
    if (text[i] === "0") i++; else digits();
    if (text[i] === ".") { i++; digits(); }
    if (text[i] === "e" || text[i] === "E") { i++; if (text[i] === "+" || text[i] === "-") i++; digits(); }
  }

  function value() {
    ws();
    const c = text[i];
    if (c === "{") {
      i++; ws();
      if (text[i] === "}") { i++; return; }
      for (;;) {
        ws(); if (text[i] !== '"') fail(); string(); ws();
        if (text[i] !== ":") fail(); i++; value(); ws();
        if (text[i] === ",") { i++; continue; }
        if (text[i] === "}") { i++; return; }
        fail();
      }
    } else if (c === "[") {
      i++; ws();
      if (text[i] === "]") { i++; return; }
      for (;;) {
        value(); ws();
        if (text[i] === ",") { i++; continue; }
        if (text[i] === "]") { i++; return; }
        fail();
      }
    } else if (c === '"') string();
    else if (c === "t") literal("true");
    else if (c === "f") literal("false");
    else if (c === "n") literal("null");
    else if (c === "-" || (c >= "0" && c <= "9")) number();
    else fail();
  }

  try {
    value(); ws();
    if (i < text.length) fail();
    return null;
  } catch (position) {
    if (typeof position === "number") return position;
    throw position;
  }
}

/** Turn a parser message into a friendly one with line and column when they can be found. */
export function describeJsonError(message, source) {
  const lineCol = message.match(/line (\d+) column (\d+)/i);
  if (lineCol) return `Invalid JSON at line ${lineCol[1]}, column ${lineCol[2]}. ${message}`;
  const pos = message.match(/position (\d+)/i);
  const index = pos ? Number(pos[1]) : findJsonErrorPosition(source);
  if (index !== null) {
    const before = source.slice(0, index);
    const line = before.split("\n").length;
    const column = before.length - before.lastIndexOf("\n");
    return `Invalid JSON at line ${line}, column ${column}. ${message}`;
  }
  return `Invalid JSON. ${message}`;
}

/**
 * action: "format" | "minify" | "validate". indent: number of spaces or "\t".
 * Returns { output } or { error }.
 */
export function processJson({ source, action, indent = 2, sort = false }) {
  if (source.trim() === "") return { error: "Paste some JSON first." };
  let parsed;
  try {
    parsed = JSON.parse(source);
  } catch (e) {
    return { error: describeJsonError(e.message, source) };
  }
  if (sort) parsed = sortKeys(parsed);
  if (action === "validate") return { output: "", valid: true };
  return { output: action === "minify" ? JSON.stringify(parsed) : JSON.stringify(parsed, null, indent), valid: true };
}

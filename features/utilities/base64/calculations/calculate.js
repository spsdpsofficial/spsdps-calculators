/** Base64 encode/decode for UTF-8 text. Works in browsers and Node (uses btoa/atob and TextEncoder/Decoder). */
export const MODES = [
  { id: "encode", label: "Encode text to Base64" },
  { id: "decode", label: "Decode Base64 to text" },
];

function bytesToBase64(bytes) {
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(binary);
}

export function encodeBase64(text, { urlSafe = false } = {}) {
  const base64 = bytesToBase64(new TextEncoder().encode(text));
  return urlSafe ? base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : base64;
}

/** Accepts standard or URL-safe Base64, with or without padding, and ignores whitespace. */
export function decodeBase64(input) {
  const cleaned = input.replace(/\s+/g, "");
  if (!/^[A-Za-z0-9+/_-]*={0,2}$/.test(cleaned)) return { error: "This is not valid Base64. It may contain characters other than letters, digits, + / - _ and =." };
  let base64 = cleaned.replace(/-/g, "+").replace(/_/g, "/").replace(/=+$/, "");
  if (base64.length % 4 === 1) return { error: "This is not valid Base64. The length is not possible for Base64 data." };
  base64 += "=".repeat((4 - (base64.length % 4)) % 4);
  let binary;
  try {
    binary = atob(base64);
  } catch {
    return { error: "This is not valid Base64." };
  }
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  try {
    return { output: new TextDecoder("utf-8", { fatal: true }).decode(bytes) };
  } catch {
    return { error: "The data decoded successfully but is not UTF-8 text (it may be a file or an image), so it cannot be shown here." };
  }
}

export function convertBase64(mode, input, options) {
  return mode === "encode" ? { output: encodeBase64(input, options) } : decodeBase64(input);
}

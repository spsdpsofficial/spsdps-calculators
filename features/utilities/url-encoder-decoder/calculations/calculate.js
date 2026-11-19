export const MODES = [
  { id: "encode-component", label: "Encode (query value / path part)", hint: "encodeURIComponent: encodes everything except letters, digits and - _ . ! ~ * ' ( )" },
  { id: "encode-url", label: "Encode (whole URL)", hint: "encodeURI: keeps characters that structure a URL, such as : / ? & = #" },
  { id: "decode-component", label: "Decode (query value / path part)", hint: "decodeURIComponent" },
  { id: "decode-url", label: "Decode (whole URL)", hint: "decodeURI: leaves encoded reserved characters such as %2F as they are" },
];

/** Run one conversion. Decoding malformed input returns { error } instead of throwing. */
export function convertUrl(mode, input) {
  try {
    switch (mode) {
      case "encode-component": return { output: encodeURIComponent(input) };
      case "encode-url": return { output: encodeURI(input) };
      case "decode-component": return { output: decodeURIComponent(input) };
      case "decode-url": return { output: decodeURI(input) };
      default: return { error: "Unknown mode." };
    }
  } catch (e) {
    if (e instanceof URIError) return { error: "This text has an invalid % sequence or broken character, so it cannot be converted." };
    throw e;
  }
}

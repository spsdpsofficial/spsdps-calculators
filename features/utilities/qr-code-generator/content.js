export const content = {
  seo: {
    title: "QR Code Generator: Free Text & Link QR Codes",
    description:
      "Create a QR code for a link, text, UPI payment link or Wi-Fi details and download it as PNG or SVG. Made in your browser, so your data is never uploaded.",
    keywords: ["QR code generator", "create QR code", "free QR code", "URL to QR code", "QR code for link"],
  },
  h1: "QR Code Generator",
  intro: [
    "Turn a website link, a message, a phone number or a UPI payment link into a QR code that any phone camera can scan. Type or paste the content, choose the error-correction level and download the code as a PNG image or a scalable SVG.",
    "The code is generated on your device. What you type is never uploaded, and the codes do not expire or track scans.",
  ],
  howTo: [
    "Type or paste the text or link you want to encode.",
    "Choose an error-correction level. Medium is a good default.",
    "Check the preview, then scan it with your phone to test it.",
    "Download the PNG for sharing or the SVG for printing at any size.",
  ],
  formula: {
    expression: "Text → bytes (UTF-8) → data bits → error-correction codewords (Reed–Solomon) → placed in a square grid → best of 8 masks chosen",
    variables: [
      { symbol: "Version", meaning: "the grid size, from version 1 (21 × 21 modules) to version 10 (57 × 57) in this tool." },
      { symbol: "Error correction", meaning: "L recovers about 7% of damage, M 15%, Q 25% and H 30%. Higher levels make bigger codes." },
      { symbol: "Quiet zone", meaning: "the blank border of 4 modules that scanners need around the code." },
    ],
    notes: ["At the Medium level this tool can encode up to 213 bytes, which is enough for most links."],
  },
  example: {
    scenario: "Make a QR code for a short website link.",
    inputs: [
      { label: "Text", value: "https://www.example.com" },
      { label: "Error correction", value: "Medium" },
    ],
    results: [
      { label: "Size", value: "Version 2, a 25 × 25 module grid" },
      { label: "Capacity used", value: "23 of 26 bytes available" },
    ],
    steps: ["The link is 23 bytes long.", "Version 1 at the Medium level holds only 14 bytes, so version 2 (26 bytes) is chosen.", "Error-correction data and a mask are added, and the code is drawn."],
    expected: { text: "https://www.example.com", level: "M", version: 2, size: 25 },
  },
  factors: [
    { title: "Length of text", text: "Longer text makes a denser code that is harder to scan when printed small." },
    { title: "Error correction", text: "Higher levels survive scratches or logos but make the code larger." },
    { title: "Print size and contrast", text: "Print dark on light, keep the white border and make the code at least 2 cm wide." },
    { title: "Link type", text: "Prefer a short URL for printed codes. Test the finished code on more than one phone." },
  ],
  benefits: [
    "Free, with no sign-up or watermark.",
    "Private: no data leaves your device.",
    "PNG for sharing and SVG for sharp printing.",
  ],
  assumptions: [
    "Byte-mode encoding of UTF-8 text, so any language and emoji work.",
    "Supports up to 271 bytes at the Low level and 213 bytes at the Medium level.",
    "Codes are static: the content is fixed once printed.",
    "Always test a code before printing or sharing it.",
  ],
  faqs: [
    { q: "How do I create a QR code for a link?", a: "Paste the link into the box. The code appears instantly. Download it as PNG or SVG." },
    { q: "Can I make a UPI payment QR code?", a: "Yes. Enter a UPI link such as upi://pay?pa=name@bank&pn=Shop and scan the result to confirm it opens your payment app. Check the payee name before accepting payments." },
    { q: "Do QR codes expire?", a: "These codes do not expire, because the text is stored in the picture itself and not on a server." },
    { q: "What is the error-correction level?", a: "Extra data that lets a scanner read a code even if part of it is dirty or damaged. Higher levels are more robust but larger." },
    { q: "Why is my text too long?", a: "This tool supports versions 1 to 10. Shorten the text, use a short link or choose a lower error-correction level." },
    { q: "Is my data safe?", a: "Yes. The code is generated in your browser and nothing is uploaded or stored." },
  ],
  related: ["utilities/url-encoder-decoder", "utilities/password-generator", "utilities/json-formatter", "utilities/image-resizer"],
  references: [
    { label: "ISO/IEC 18004: QR Code bar code symbology", url: "https://www.iso.org/standard/62021.html" },
    { label: "NPCI: UPI", url: "https://www.npci.org.in/what-we-do/upi/product-overview" },
    { label: "QR Code standard background (DENSO WAVE)", url: "https://www.qrcode.com/en/" },
  ],
};

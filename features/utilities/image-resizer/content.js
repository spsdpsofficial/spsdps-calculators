export const content = {
  seo: {
    title: "Image Resizer: Resize & Convert Photos Online",
    description:
      "Resize JPG, PNG and WebP images by pixels or percentage, keep the aspect ratio and set the quality. Everything runs in your browser, so photos are never uploaded.",
    keywords: ["image resizer", "resize image online", "resize photo to 200kb", "change image size", "convert png to jpg"],
  },
  h1: "Image Resizer",
  intro: [
    "Resize a photo for a form, a website or a message without installing anything. Choose an image, set the new width and height (or a percentage), pick a format and quality, and download the result.",
    "The image is processed by your browser and never uploaded, so it is safe for ID photos and personal pictures. Smaller dimensions and lower quality both reduce the file size.",
  ],
  howTo: [
    "Choose an image from your device.",
    "Enter a new width or height. With Keep aspect ratio ticked, the other side follows automatically. Or use the quick scale buttons.",
    "Choose JPEG, PNG or WebP, and the quality for JPEG and WebP.",
    "Click Resize image, then Download.",
  ],
  formula: {
    expression: "New height = New width × (Original height ÷ Original width)\nNew size = Original size × Percentage ÷ 100",
    variables: [
      { symbol: "Aspect ratio", meaning: "the proportion of width to height. Keeping it avoids stretched pictures." },
      { symbol: "Quality", meaning: "for JPEG and WebP, lower quality gives a smaller file with more visible compression." },
    ],
    notes: ["File size depends on the picture. If you need an exact size such as under 200 KB, lower the dimensions or quality and check the result."],
  },
  example: {
    scenario: "Shrink a 4000 × 3000 pixel photo to 1000 pixels wide.",
    inputs: [
      { label: "Original", value: "4000 × 3000 px" },
      { label: "New width", value: "1000 px, aspect ratio kept" },
    ],
    results: [{ label: "New size", value: "1000 × 750 px" }],
    steps: ["The width is divided by 4 (4000 → 1000).", "The height follows: 3000 × 1000 ÷ 4000 = 750.", "The picture is redrawn at that size and saved in the chosen format."],
    expected: { original: { originalWidth: 4000, originalHeight: 3000 }, width: 1000, height: 750 },
  },
  factors: [
    { title: "Dimensions", text: "Fewer pixels means a much smaller file." },
    { title: "Format", text: "JPEG suits photos, PNG suits graphics and screenshots, and WebP is often smallest for both." },
    { title: "Quality setting", text: "Around 80 to 90 usually looks fine while saving space." },
    { title: "Enlarging", text: "Making a picture bigger cannot add detail, so it looks soft." },
  ],
  benefits: [
    "Private: the image never leaves your device.",
    "Meets size limits for forms and portals.",
    "Converts between JPG, PNG and WebP.",
  ],
  assumptions: [
    "Images up to 25 MB, and outputs up to 10,000 pixels on a side.",
    "Transparent areas become white when saving as JPEG.",
    "Photo metadata such as location is not copied to the new file.",
    "Format support depends on your browser, for example for WebP output.",
  ],
  faqs: [
    { q: "How do I resize an image without losing quality?", a: "Reducing size always discards some detail, but keeping the aspect ratio, using a high quality setting and not enlarging keeps it looking good." },
    { q: "How can I reduce a photo to under 200 KB?", a: "Reduce the width to around 1000 pixels, use JPEG at 70 to 85% quality and check the size shown. Repeat with smaller values if needed." },
    { q: "Is my picture uploaded?", a: "No. It is resized by your browser on your device." },
    { q: "Does it remove location data?", a: "The saved copy does not include the original's metadata, such as GPS location or camera details." },
    { q: "Why is my PNG still large?", a: "PNG is lossless. Reduce the dimensions or save as JPEG or WebP for a smaller file." },
    { q: "Which formats can I open?", a: "Any image format your browser supports, which usually includes JPG, PNG, WebP, GIF and BMP." },
  ],
  related: ["utilities/pdf-compressor", "utilities/pdf-merger", "utilities/qr-code-generator", "daily-life/unit-converter"],
  references: [
    { label: "MDN: Canvas API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" },
    { label: "MDN: Image file type and format guide", url: "https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types" },
  ],
};

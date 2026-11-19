export const content = {
  seo: {
    title: "PDF Compressor: Reduce PDF Size Online",
    description:
      "Optimise a PDF's structure and remove document details to reduce its size. Runs in your browser with no upload. Honest about limits: images are not recompressed.",
    keywords: ["PDF compressor", "reduce PDF size", "compress PDF online", "optimise PDF", "make PDF smaller"],
  },
  h1: "PDF Compressor",
  intro: [
    "This tool re-saves your PDF with a leaner internal structure and, if you wish, removes details such as the title and author. For PDFs that have many internal objects it can noticeably reduce the size, and it works entirely in your browser, so your document is never uploaded.",
    "Please note its limits. It does not recompress or downsample images. A scanned or photo-heavy PDF is large because of its images, and may not shrink at all. In that case the tool tells you so and keeps your original file unchanged.",
  ],
  howTo: [
    "Choose a PDF from your device.",
    "Leave the option ticked to remove document details, or untick it to keep them.",
    "Click Optimise PDF and compare the before and after sizes.",
    "Download the optimised file only if it is smaller.",
  ],
  formula: {
    expression: "Saving % = (Original size − New size) ÷ Original size × 100",
    variables: [
      { symbol: "Object streams", meaning: "a way of packing the PDF's internal objects together so they take less space." },
      { symbol: "Document details", meaning: "title, author, subject, keywords, creator and producer fields." },
    ],
  },
  example: {
    scenario: "A 2.4 MB text-based report with many small objects is optimised and comes out at 1.8 MB.",
    inputs: [{ label: "Original", value: "2.4 MB" }],
    results: [
      { label: "Optimised", value: "1.8 MB" },
      { label: "Saving", value: "25%" },
    ],
    steps: ["The PDF is read and its structure re-packed.", "Document details are removed if selected.", "Saving = (2.4 − 1.8) ÷ 2.4 = 25%. Actual savings vary a lot from file to file."],
    expected: { before: 2400000, after: 1800000, percent: 25 },
  },
  factors: [
    { title: "Images", text: "Photos and scans make up most of the size of many PDFs, and this tool leaves them untouched." },
    { title: "Fonts", text: "Embedded fonts add size and are kept so the document still looks right." },
    { title: "How it was created", text: "PDFs from some tools are already tightly packed, so there is little to save." },
    { title: "Passwords", text: "Protected PDFs must be unlocked first." },
  ],
  benefits: [
    "Private: no upload or account.",
    "Never makes a file bigger. The original is kept if nothing is saved.",
    "Can strip author and title details before sharing.",
  ],
  assumptions: [
    "Images are not recompressed, resampled or converted to a lower quality.",
    "Results vary widely. Some PDFs shrink by a quarter or more, and many shrink by little or nothing.",
    "Files up to 50 MB. Password-protected or damaged PDFs are rejected.",
    "For a big reduction on scanned documents, use a tool that recompresses images, or rescan at a lower resolution.",
  ],
  faqs: [
    { q: "How do I reduce the size of a PDF?", a: "Try this tool first. If the PDF is full of images, rescanning at a lower resolution or using an image-recompressing tool will help more." },
    { q: "Why did my PDF not get smaller?", a: "Its size probably comes from images, which this tool does not change. The original is returned unchanged." },
    { q: "Is my PDF uploaded?", a: "No. It is processed in your browser." },
    { q: "Will it lower the quality?", a: "No. Text, images and fonts are kept as they are. Only the internal structure and optional document details change." },
    { q: "What details are removed?", a: "Title, author, subject, keywords, creator and producer. Page content is not touched." },
    { q: "Can it make a PDF under 100 KB?", a: "Not reliably. That usually needs image recompression, which this tool does not do." },
  ],
  related: ["utilities/pdf-merger", "utilities/image-resizer", "utilities/word-counter", "utilities/qr-code-generator"],
  references: [
    { label: "pdf-lib documentation", url: "https://pdf-lib.js.org/" },
    { label: "Adobe: PDF reference and specification", url: "https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/PDF32000_2008.pdf" },
  ],
};

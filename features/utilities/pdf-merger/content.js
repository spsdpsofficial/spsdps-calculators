export const content = {
  seo: {
    title: "PDF Merger: Combine PDF Files Online",
    description:
      "Merge several PDF files into one document in the order you choose. Files are combined in your browser and never uploaded, so it is safe for private documents.",
    keywords: ["PDF merger", "merge PDF files", "combine PDF", "join PDF online", "merge PDFs free"],
  },
  h1: "PDF Merger",
  intro: [
    "Combine several PDF files into one document: bank statements, scanned forms, certificates or application documents. Add your files, put them in the order you want and download a single merged PDF.",
    "The files are merged inside your browser and are never uploaded to a server, which makes this a safer choice for documents with personal details.",
  ],
  howTo: [
    "Click Add PDF files and choose two or more PDFs. You can add more in several rounds.",
    "Use Up and Down to arrange the order, or Remove to drop a file.",
    "Click Merge and download.",
    "Open the merged file and check the pages before you send it.",
  ],
  formula: {
    expression: "Merged pages = pages of file 1 + pages of file 2 + … in the order shown",
    variables: [
      { symbol: "Order", meaning: "files appear in the list order from top to bottom." },
    ],
    notes: ["Pages are copied as they are, so text, images and page sizes stay the same. Bookmarks and form fields from the original files may not carry over."],
  },
  example: {
    scenario: "Merge a 2-page application form, a 3-page statement and a 1-page certificate.",
    inputs: [
      { label: "Files", value: "form.pdf (2 pages), statement.pdf (3 pages), certificate.pdf (1 page)" },
    ],
    results: [{ label: "Result", value: "merged.pdf with 6 pages" }],
    steps: ["The files are added in the order shown.", "All pages of each file are copied into a new document.", "The new document is saved and downloaded."],
    expected: { pages: [2, 3, 1], total: 6 },
  },
  factors: [
    { title: "File size", text: "The merged file is about as large as all inputs added together." },
    { title: "Password protection", text: "Protected PDFs must be unlocked first." },
    { title: "Order", text: "Check the list order before merging. Changing it afterwards means merging again." },
    { title: "Device memory", text: "Very large files may be slow or fail on phones." },
  ],
  benefits: [
    "No upload, no sign-up and no watermark.",
    "Control over page order.",
    "Works on phones and computers.",
  ],
  assumptions: [
    "Up to 20 files, 50 MB each and 100 MB in total.",
    "Password-protected or damaged PDFs are rejected with a message naming the file.",
    "Interactive features such as bookmarks and fillable fields may be lost.",
    "Uses the open-source pdf-lib library, loaded only when this page is used.",
  ],
  faqs: [
    { q: "How do I merge PDF files?", a: "Add the files, arrange them in the order you want and click Merge and download." },
    { q: "Are my PDFs uploaded?", a: "No. The merging happens in your browser and the files never leave your device." },
    { q: "Why can't I merge a particular file?", a: "It may be password-protected or damaged. The message names the file. Remove the password and try again." },
    { q: "Is there a size limit?", a: "Up to 20 files, 50 MB each and 100 MB in total, because browsers have limited memory." },
    { q: "Will the quality change?", a: "No. Pages are copied as they are, with no recompression." },
    { q: "Can I merge images?", a: "Not directly. Convert images to PDF first, then merge." },
  ],
  related: ["utilities/pdf-compressor", "utilities/image-resizer", "utilities/word-counter", "utilities/qr-code-generator"],
  references: [
    { label: "Adobe: PDF reference and specification", url: "https://opensource.adobe.com/dc-acrobat-sdk-docs/pdfstandards/PDF32000_2008.pdf" },
    { label: "pdf-lib documentation", url: "https://pdf-lib.js.org/" },
  ],
};

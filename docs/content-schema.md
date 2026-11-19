# `content.js` schema

```js
export const content = {
  seo: { title, description, keywords: [] },   // title <= 45 chars (brand appended), description 110-165 chars
  h1: "EMI Calculator",
  intro: ["first paragraph shown under H1", "more paragraphs shown below the calculator"],
  howTo: ["step", "..."],
  formula: { expression: "EMI = ...", variables: [{ symbol, meaning }], notes: ["..."] },
  example: { scenario, inputs: [{label, value}], results: [{label, value}], steps: ["..."], expected: { /* numbers asserted in tests */ } },
  factors: [{ title, text }],
  benefits: ["..."],
  assumptions: ["..."],
  faqs: [{ q, a }],                            // 5-8
  related: ["finance/loan-prepayment"],        // "category/slug" ids; planned tools show as "coming soon"
  references: [{ label, url }],                // https only; official sources
};
```

The last-reviewed date is **not** here: it lives in `lib/tools/catalogue.js` so the page and sitemap share one value.

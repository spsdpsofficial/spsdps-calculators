# Adding a tool

All 81 catalogue tools are live. To add another:

1. Add a `planned(category, slug, name, description, keyword)` line to `lib/tools/catalogue.js`.
2. `npm run new-tool -- <category> <slug>` creates the folder and route. Add `--custom` for a hand-built UI (text boxes, file uploads, canvas); otherwise you get a declarative form.
3. Write the **pure logic** in `calculations/calculate.js` (no React, no DOM, no rounding of intermediate values). Reuse shared maths where it exists: `lib/finance/{loan,gst}.js`, `lib/tax/*`, `lib/business/pricing.js`, `lib/helpers/dates.js`, `lib/utilities/{random,pdf}.js`.
4. Write **tests first** in `tests/calculate.test.js`: a reference value checked independently (another language or a published example), normal case, boundaries, zero and invalid input. Assert the page example (`example.expected` in `content.js`) so the page can never disagree with the calculator.
5. Form tools: describe fields and `run(values)` in `spec.js` (see `lib/forms/validateFields.js` for field options such as `min`, `max`, `integer`, `optional`, `showIf`). Custom tools: build the component in `components/` using `components/tools/ui.js`, and mark it `"use client"`.
6. Fill `content.js` (see `docs/content-schema.md`).
7. Tax, rate or tariff tools: verify against the official source, state the financial year and effective date, and link the source in `references`.
8. `node scripts/make-live.mjs YYYY-MM-DD <category>/<slug>` marks it live with the review date. Use only a date you really reviewed it.
9. `npm run check` (lint + tests + build). Do not publish if it fails.

`tests/catalogue.test.js` enforces: title length (45 max), description length (110–165), all sections present, 5–8 FAQs, valid related links, https references, no TODO text, and that live tools have a route, content, index, calculations and tests.

A tool that is not `live` is never in the sitemap and its route is `noindex`.

## Helper scripts
- `scripts/new-tool.mjs`: scaffold a tool (above).
- `scripts/gen-boilerplate.mjs category/slug ...`: regenerate the client wrapper, `index.js` and route for form tools.
- `scripts/make-live.mjs DATE category/slug ...`: mark tools live.
- `scripts/verify-qr-dump.mjs` + `scripts/verify-qr.py`: decode generated QR codes with OpenCV after any change to the QR encoder.
- `scripts/serve-out.mjs`: serve the built `out/` folder locally.

## Prompt template for an LLM owner
```
You own ONLY: features/<category>/<slug>/** and app/<category>/<slug>/page.js
Stack: Next.js 16 App Router, JavaScript only, Tailwind CSS 4. No TypeScript, no database.
Do not edit shared components, lib/**, globals.css, package files, other tools.
Do not add dependencies. Run `npm run new-tool` first, follow docs/adding-a-tool.md.
Return: changed files, formula, assumptions, sources, and the ACTUAL lint/test/build output.
```

// Scaffold a new tool:  npm run new-tool -- finance sip-calculator          (form-based tool)
//                       npm run new-tool -- utilities my-tool --custom      (hand-built UI)
// 1. Add the tool to lib/tools/catalogue.js as planned(...) first.
// 2. This creates features/<category>/<slug>/{calculations,tests,spec.js|components,content.js,index.js}
//    and the thin route app/<category>/<slug>/page.js. Existing files are never overwritten.
// 3. Fill in the maths, spec and content, then run:  node scripts/make-live.mjs YYYY-MM-DD category/slug
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { pascal, writeBoilerplate } from "./lib/boilerplate.mjs";

const args = process.argv.slice(2);
const custom = args.includes("--custom");
const [category, slug] = args.filter((a) => !a.startsWith("--"));
if (!category || !slug) {
  console.error("Usage: npm run new-tool -- <category> <slug> [--custom]   e.g. finance sip-calculator");
  process.exit(1);
}

const { TOOLS } = await import(pathToFileURL(path.resolve("lib/tools/catalogue.js")).href);
const tool = TOOLS.find((t) => t.category === category && t.slug === slug);
if (!tool) {
  console.error(`"${category}/${slug}" is not in lib/tools/catalogue.js. Add a planned(...) entry there first.`);
  process.exit(1);
}

const name = `${pascal(slug)}Tool`;
const dir = path.join("features", category, slug);

const files = {
  [`${dir}/calculations/calculate.js`]: `// Pure logic for ${tool.name}: values in, values out. No DOM, React or formatting.
export function calculate(input) {
  throw new Error("Not implemented: ${slug}");
}
`,
  [`${dir}/tests/calculate.test.js`]: `import { describe, it } from "vitest";

// Check results against an independent reference (another language or a published example), and cover
// zero, boundary and invalid input. The page example in content.js should be asserted here too.
describe("${slug}", () => {
  it.todo("matches a known reference value");
  it.todo("handles zero, boundary and invalid input");
});
`,
  [`${dir}/content.js`]: `// Page content: see docs/content-schema.md and any finished tool for the shape.
// Rules enforced by tests/catalogue.test.js: title <= 45 chars, description 110-165 chars, 5-8 FAQs,
// related ids that exist, https references, no TODO text. Replace every placeholder.
export const content = {
  seo: { title: "${tool.name}", description: "", keywords: ["${tool.keyword}"] },
  h1: "${tool.name}",
  intro: [],
  howTo: [],
  formula: { expression: "", variables: [], notes: [] },
  example: { scenario: "", inputs: [], results: [], steps: [] },
  factors: [],
  benefits: [],
  assumptions: [],
  faqs: [],
  related: [],
  references: [],
};
`,
};

if (custom) {
  files[`${dir}/components/${name}.js`] = `"use client";

// Hand-built UI. Shared pieces: components/tools/ui.js (buttons, TextArea, CopyButton, downloads).
export default function ${name}() {
  return <section aria-label="${tool.name}">Build the ${tool.name} UI here.</section>;
}
`;
} else {
  files[`${dir}/spec.js`] = `// Declarative form: fields are validated and rendered by FormCalculator (see lib/forms/validateFields.js).
import { calculate } from "./calculations/calculate";

export const spec = {
  ariaLabel: "${tool.name}",
  fields: [
    // { id: "amount", label: "Amount", prefix: "₹", min: 1, max: 1e9, default: 100000 },
  ],
  run(values) {
    const result = calculate(values);
    return { rows: [{ label: "Result", value: String(result), emphasis: true }] };
  },
};
`;
}

for (const [file, body] of Object.entries(files)) {
  if (fs.existsSync(file)) {
    console.warn(`skip (exists): ${file}`);
    continue;
  }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
  console.warn(`created: ${file}`);
}
console.warn(`created/kept: ${writeBoilerplate(category, slug, { customComponent: custom })} + index.js + app route`);
console.warn("\nNext: write the maths, tests, spec and content, then: node scripts/make-live.mjs YYYY-MM-DD " + `${category}/${slug}`);

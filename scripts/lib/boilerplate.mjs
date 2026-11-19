// Shared by scripts/new-tool.mjs: writes the files every spec-based tool needs.
import fs from "node:fs";
import path from "node:path";

export const pascal = (slug) => slug.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");

function write(file, body, { overwrite = false } = {}) {
  if (fs.existsSync(file) && !overwrite) return false;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, body);
  return true;
}

/** Component (client wrapper around FormCalculator), index.js and the thin route page. */
export function writeBoilerplate(category, slug, { customComponent = false } = {}) {
  const name = `${pascal(slug)}Tool`;
  const dir = path.join("features", category, slug);
  if (!customComponent) {
    write(
      path.join(dir, "components", `${name}.js`),
      `"use client";

import FormCalculator from "@/components/calculator/FormCalculator";
import { spec } from "../spec";

export default function ${name}() {
  return <FormCalculator spec={spec} />;
}
`,
    );
  }
  write(
    path.join(dir, "index.js"),
    `export { default } from "./components/${name}";
export { content } from "./content";
`,
  );
  write(
    path.join("app", category, slug, "page.js"),
    `import ToolPage from "@/components/calculator/ToolPage";
import ${name}, { content } from "@/features/${category}/${slug}";
import { buildToolMetadata } from "@/lib/seo/metadata";

export const metadata = buildToolMetadata("${category}", "${slug}", content);

export default function Page() {
  return (
    <ToolPage categorySlug="${category}" toolSlug="${slug}" content={content}>
      <${name} />
    </ToolPage>
  );
}
`,
  );
  return name;
}

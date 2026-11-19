// Mark catalogue tools as live:  node scripts/make-live.mjs 2026-11-11 finance/sip-calculator finance/gst-calculator ...
import fs from "node:fs";

const [date, ...ids] = process.argv.slice(2);
if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "") || ids.length === 0) {
  console.error("Usage: node scripts/make-live.mjs <YYYY-MM-DD> <category/slug> [...]");
  process.exit(1);
}
const file = "lib/tools/catalogue.js";
let text = fs.readFileSync(file, "utf8");
for (const id of ids) {
  const [category, slug] = id.split("/");
  const pattern = new RegExp(`planned\\("${category}", "${slug}", (.*)\\),\\n`);
  if (!pattern.test(text)) {
    console.error(`not planned or not found: ${id}`);
    process.exit(1);
  }
  text = text.replace(pattern, `live("${category}", "${slug}", $1, "${date}"),\n`);
}
fs.writeFileSync(file, text);
console.warn(`marked live: ${ids.join(", ")}`);

// node scripts/gen-boilerplate.mjs finance/sip-calculator ...  (spec-based tools only)
import { writeBoilerplate } from "./lib/boilerplate.mjs";
for (const id of process.argv.slice(2)) {
  const [category, slug] = id.split("/");
  console.warn(`${id} -> ${writeBoilerplate(category, slug)}`);
}

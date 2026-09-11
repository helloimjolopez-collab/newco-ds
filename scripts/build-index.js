/**
 * build-index.js — write src/tokens/index.css: a single entry that @imports every
 * token stylesheet in the correct load order (primitives FIRST). Consumers can then
 * pull the whole system with one line and never get the "primitives missing → page
 * unstyled, no error" failure. Storybook and the npm `./css` export both use it.
 */
import { writeFileSync } from "node:fs";

// Order matters: primitives must load before the themes that reference them.
const ORDER = [
  "primitives.css",
  "themes/light.css",
  "themes/midnight.css",
  "layout.css",
  "layout-contextual.css",
  "type.css",
  "motion.css",
  "breakpoints.css",
];

const css =
  `/*\n` +
  ` NewCo design tokens — single entry point.\n` +
  ` @imports every token file in load order (primitives first, so the themes that\n` +
  ` reference it resolve). Generated — do not edit. Run \`npm run build-tokens\`.\n` +
  `*/\n` +
  ORDER.map((f) => `@import "./${f}";`).join("\n") + "\n";

writeFileSync("src/tokens/index.css", css);
console.log(`index.css: @imports ${ORDER.length} files (primitives first).`);

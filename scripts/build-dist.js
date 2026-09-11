import { copyFileSync, mkdirSync } from "node:fs";

// The npm package's published payload lives in npm/ (peer to nuget/). It ships the
// split, mode-by-selector token files — never the old flat tokens.css.
mkdirSync("npm", { recursive: true });
mkdirSync("npm/themes", { recursive: true });

const CSS = [
  "index.css",
  "primitives.css",
  "themes/light.css",
  "themes/midnight.css",
  "layout.css",
  "layout-contextual.css",
  "type.css",
  "motion.css",
  "breakpoints.css",
];
for (const f of CSS) copyFileSync(`src/tokens/${f}`, `npm/${f}`);

copyFileSync("src/tokens/tokens.js", "npm/tokens.js");
copyFileSync("tokens/newco-design-tokens.json", "npm/tokens.json");

console.log(`npm/ built: ${CSS.length} css files (index + themes/ + scales), tokens.js, tokens.json`);

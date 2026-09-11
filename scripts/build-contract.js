/**
 * build-contract.js — emit npm/README.md and npm/contract.json.
 *
 * WHY: a developer installs the package, opens node_modules, and sees a folder of
 * stylesheets with no indication which he may name. The boundary has to ship with
 * the package, not live only in repo docs. Two outputs, two audiences:
 *
 *   npm/README.md    — for a human opening node_modules: the counts, the load
 *                      order, which files are safe to name.
 *   npm/contract.json — for a machine: the consumable names, so a team that wants
 *                       enforcement can lint against it. Opt-in; blocks nothing.
 *
 * Both are generated from the emitted CSS, so the numbers cannot drift.
 * Runs inside build-dist, after the stylesheets are copied into npm/.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const DECL = /^\s*(--[a-z0-9-]+)\s*:/gim;

// `contract` answers "may I name this?"; `load` answers "must I include this file?".
// They differ only on primitives.css — which is exactly why it needed labelling.
const FILES = [
  { file: "primitives.css",        contract: false, load: true,  role: "Raw ramps (colour/type/unit). Load it; do not name it." },
  { file: "themes/light.css",      contract: true,  load: true,  role: "Colour + elevation contract, Light Mode." },
  { file: "themes/midnight.css",   contract: true,  load: true,  role: "Colour + elevation contract, Midnight Mode. Same names." },
  { file: "type.css",              contract: true,  load: true,  role: "Type scale. Compose from these." },
  { file: "layout.css",            contract: true,  load: true,  role: "Spacing, radii, border widths." },
  { file: "layout-contextual.css", contract: false, load: false, role: "Per-component metrics. This repo's components use these." },
  { file: "motion.css",            contract: true,  load: true,  role: "Durations and easings." },
  { file: "breakpoints.css",       contract: true,  load: true,  role: "Breakpoint values." },
];

const rows = [];
for (const f of FILES) {
  const path = `npm/${f.file}`;
  if (!existsSync(path)) { console.error(`build-contract: ${path} missing. Run build-dist first.`); process.exit(1); }
  const css = readFileSync(path, "utf8");
  rows.push({ ...f, names: [...new Set([...css.matchAll(DECL)].map((m) => m[1]))].sort() });
}

const contractNames = [...new Set(rows.filter((r) => r.contract).flatMap((r) => r.names))].sort();
if (!contractNames.length) { console.error("build-contract: the contract is empty. Refusing to write."); process.exit(1); }

const infra = rows.filter((r) => !r.contract).reduce((n, r) => n + r.names.length, 0);
const total = rows.reduce((n, r) => n + r.names.length, 0);
const themed = rows.find((r) => r.file === "themes/light.css").names.length;

writeFileSync("npm/contract.json", JSON.stringify({
  $comment: "The names a consumer may use. Generated from the emitted CSS by scripts/build-contract.js — do not hand-edit. Lint against `contract` if you want the boundary enforced; nothing here blocks a primitive.",
  version: JSON.parse(readFileSync("package.json", "utf8")).version,
  generated: new Date().toISOString().slice(0, 10),
  counts: { contract: contractNames.length, infrastructure: infra, declarationsAcrossAllFiles: total },
  loadOrder: rows.filter((r) => r.load).map((r) => r.file),
  files: Object.fromEntries(rows.map((r) => [r.file, { contract: r.contract, mustLoad: r.load, count: r.names.length, role: r.role }])),
  contract: contractNames,
}, null, 2) + "\n");

const tick = (b) => (b ? "yes" : "**no**");
const table = rows.map((r) => `| \`${r.file}\` | ${r.names.length} | ${tick(r.contract)} | ${tick(r.load)} | ${r.role} |`).join("\n");
const loadBlock = rows.filter((r) => r.load).map((r) => `<link rel="stylesheet" href="${r.file}">`).join("\n");

writeFileSync("npm/README.md",
`# NewCo design tokens

**The themed contract (colour + elevation) is ${themed} names.** Your full working
vocabulary across every file below is **${contractNames.length}**. If you add up every
declaration in this folder you get ${total} — that number is not the contract, and the
table says why. Or load everything with one line: \`import "@helloimjolopez-newco/newco-tokens/css"\`.

## Link these, in this order

\`\`\`html
${loadBlock}
\`\`\`

\`primitives.css\` must come first. Every semantic token resolves through it via
\`var()\`, so if it is missing all colour resolves to nothing and the page renders
unstyled **with no console error**.

## The files

| File | Names | Safe to name? | Must load? | What it is |
|---|---|---|---|---|
${table}

Each file repeats this in its own header.

## Theming

One name, two values, resolved by selector. Colour AND the four \`--elevation-*\`
shadows both live in the theme files and flip together. Set \`data-theme="midnight"\`
(or \`"dark"\`) on \`<html>\` to flip the page, or on any element to flip just that
subtree — it composes both ways. Never put a mode in a property name; that form no
longer exists.

## A raised surface is a recipe

A surface token is only a fill. To lift it the way the demo does, pair it with an
elevation shadow and (for the page) the sheet radius:

\`\`\`css
background:    var(--semantic-color-fill-surface-elevated-sheet);
box-shadow:    var(--elevation-sheet);      /* page / sheet */
border-radius: var(--contextual-layout-units-sheet-cornerradius-cornerradius);
\`\`\`

Cards use \`--elevation-widget\`, overlays/popovers use \`--elevation-overlay\`.

## Type

No composite styles, no classes. Name the scale:

\`\`\`css
font-family: var(--semantic-type-family-brand);
font-size:   var(--semantic-type-font-size-14);
font-weight: var(--semantic-type-weight-500);
line-height: var(--semantic-type-line-height-20pt-single);
\`\`\`

## Layout units carry their unit

\`\`\`css
border-radius: var(--contextual-layout-units-card-cornerradius-cornerradius);            /* correct */
border-radius: calc(var(--contextual-layout-units-card-cornerradius-cornerradius) * 1px); /* WRONG */
\`\`\`

The second is \`calc(4px * 1px)\`, not a length — the browser drops it silently.

## Machine-readable

\`contract.json\` lists every consumable name plus per-file counts; lint against it if
you want the boundary enforced.

---

Repo: https://github.com/helloimjolopez-collab/newco-ds
`);

console.log(`npm/contract.json: ${contractNames.length} consumable names (${infra} infrastructure, not counted)`);
console.log("npm/README.md written");

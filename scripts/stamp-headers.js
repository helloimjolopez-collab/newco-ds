/**
 * stamp-headers.js — give every emitted stylesheet a header that says whether a
 * developer may name the properties inside it, how many it declares, and what
 * breaks if you get it wrong.
 *
 * WHY: Style Dictionary stamps every file with the same "Do not edit" line, so
 * primitives.css (a raw ramp you must load but never name) and themes/light.css
 * (the colour contract) introduced themselves identically. A developer judges the
 * system by the first file he opens and its line count; an unlabelled 466-line
 * ramp reads as "too granular to adopt". Counts are computed here, never typed, so
 * they cannot drift from the file they describe.
 *
 * Runs after style-dictionary, before the files are copied into npm/.
 *
 * Usage: node scripts/stamp-headers.js [--check]
 *   --check  verify every file carries a header; exit 1 if not, without writing.
 *            Wire into CI so a new emitted file cannot ship unlabelled.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const SRC = "src/tokens";
const LOAD_ORDER = "Load primitives.css FIRST; every file below resolves through it.";

const FILES = [
  {
    path: `${SRC}/primitives.css`,
    kind: "INFRASTRUCTURE",
    lines: [
      "The raw ramps (colour, type, unit). NOT part of the token contract.",
      "",
      "You must LOAD this file — every semantic token resolves through it via",
      "var(), so without it colour resolves to nothing and the page renders",
      "unstyled with no console error. But product code should not NAME these.",
      "",
      "Primitives have ONE value forever: `var(--primitive-color-brand-400)` stays",
      "that purple in Midnight, while `var(--semantic-color-fill-action-primary-rest)`",
      "flips. Reach for a primitive only when you want a value that ignores the theme.",
    ],
  },
  {
    path: `${SRC}/themes/light.css`,
    kind: "CONTRACT",
    lines: [
      "The colour + elevation contract, Light Mode. Name these freely.",
      "",
      LOAD_ORDER,
      "",
      "themes/midnight.css declares the SAME names with Midnight values (colour and",
      "the four --elevation-* shadows both flip), so a component names a token once",
      "and both modes resolve by selector. Never put a mode in a property name — that",
      "form is gone and resolves to nothing.",
    ],
  },
  {
    path: `${SRC}/themes/midnight.css`,
    kind: "CONTRACT",
    lines: [
      "The colour + elevation contract, Midnight Mode. Identical names to light.css.",
      "",
      "Midnight is NewCo's brand name for dark. Both selectors are emitted:",
      '[data-theme="midnight"] is the brand name, [data-theme="dark"] is what every',
      "framework and prefers-color-scheme uses, so a consumer needn't learn ours.",
      "Set the attribute on <html> to theme the page, or on any element to theme just",
      "that subtree — it composes both ways (a light island inside a dark island).",
    ],
  },
  {
    path: `${SRC}/type.css`,
    kind: "CONTRACT",
    lines: [
      "The type SCALE (atomic). Name these freely.",
      "",
      "There are no composite text styles and no type classes — compose at the call site:",
      "",
      "  font-family:    var(--semantic-type-family-brand);",
      "  font-size:      var(--semantic-type-font-size-14);",
      "  font-weight:    var(--semantic-type-weight-500);",
      "  line-height:    var(--semantic-type-line-height-20pt-single);",
      "",
      "The named text styles live in Figma text styles, where a designer applies them.",
    ],
  },
  {
    path: `${SRC}/layout.css`,
    kind: "CONTRACT",
    lines: [
      "Spacing, radii and border widths. Name these freely.",
      "",
      "Values already carry their unit — use them directly. Do NOT wrap in",
      "calc(... * 1px): that yields calc(4px * 1px), which is not a length, so the",
      "browser silently drops the declaration.",
    ],
  },
  {
    path: `${SRC}/layout-contextual.css`,
    kind: "COMPONENT INTERNALS",
    lines: [
      "Per-component metrics (Button, Card, Input, NavItem, Page, Sheet, focus ring).",
      "",
      "This repo's own components use these. Product code generally should not —",
      "prefer layout.css. They exist so a component's geometry can be tuned without",
      "moving the whole scale. This is where sheet cornerradius lives.",
    ],
  },
  {
    path: `${SRC}/motion.css`,
    kind: "CONTRACT",
    lines: [
      "Durations and easings. Name these freely.",
      "",
      "These DO live in the Figma Variables panel (the Motion collection), so unlike",
      "some systems, a Figma export carries them.",
    ],
  },
  {
    path: `${SRC}/breakpoints.css`,
    kind: "CONTRACT",
    lines: ["The breakpoint values. Name these freely."],
  },
];

const COUNT_RE = /^\s*--[a-z0-9-]+\s*:/gim;
const MARKER = "NEWCO DESIGN TOKENS";

function build(file, count) {
  const bar = "=".repeat(74);
  return [
    "/*", ` ${bar}`, ` ${MARKER} — ${file.kind}`, ` ${bar}`, "",
    ...file.lines.map((l) => (l ? ` ${l}` : "")), "",
    ` Declares ${count} custom ${count === 1 ? "property" : "properties"}.`,
    " Generated — do not edit. Run `npm run build-tokens`.",
    ` ${bar}`, "*/", "",
  ].join("\n");
}

const stripHeader = (css) => css.replace(/^\s*\/\*[\s\S]*?\*\/\s*/, "");
const check = process.argv.includes("--check");
let changed = 0; const missing = [];

for (const file of FILES) {
  if (!existsSync(file.path)) { missing.push(`${file.path} does not exist`); continue; }
  const raw = readFileSync(file.path, "utf8");
  if (check) { if (!raw.includes(MARKER)) missing.push(`${file.path} has no NewCo header`); continue; }
  const body = stripHeader(raw);
  const count = (body.match(COUNT_RE) || []).length;
  writeFileSync(file.path, build(file, count) + body);
  changed++;
  console.log(`  ${file.kind.padEnd(20)} ${file.path.replace(SRC + "/", "").padEnd(24)} ${count}`);
}

if (missing.length) {
  console.error(
    (check ? "Header check failed:\n" : "stamp-headers could not run:\n") +
      missing.map((m) => "  " + m).join("\n") +
      "\n\nEvery emitted stylesheet must say whether its properties are safe to name."
  );
  process.exit(1);
}
console.log(check ? "All stylesheets carry a NewCo header." : `Stamped ${changed} stylesheets.`);

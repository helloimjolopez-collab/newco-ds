/**
 * build-responsive-layout.js — emits src/tokens/layout-responsive.css from
 * tokens/figma-source/responsive-layout.json (the "Responsive: Layout" collection,
 * which unlike the other layout collections DOES vary by breakpoint — TopNav,
 * SheetContainer and Sheet metrics). Desktop is the base in :root; Tablet and Mobile
 * are emitted as max-width media-query overrides, and only where the value differs
 * from the wider breakpoint, so the file stays minimal. Mirrors main's Shell: Layout
 * -> layout-responsive.css.
 */
import { readFileSync, writeFileSync } from "node:fs";

const src = JSON.parse(readFileSync("tokens/figma-source/responsive-layout.json", "utf8"));
const kebab = (n) => n.split("/").map((s) => s.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")).join("-");
const varName = (n) => `--responsive-layout-units-${kebab(n)}`;
const px = (v) => `${v}px`;

// breakpoint widths (from the Breakpoints collection): tablet 798, mobile 393
const TABLET = 798, MOBILE = 393;

const desktop = src.vars.map(([n, vals]) => `  ${varName(n)}: ${px(vals[0])};`).join("\n");
const overrides = (idx, prevIdx) =>
  src.vars.filter(([, vals]) => vals[idx] !== vals[prevIdx]).map(([n, vals]) => `    ${varName(n)}: ${px(vals[idx])};`).join("\n");

const tablet = overrides(1, 0);
const mobile = overrides(2, 1);

let css =
  `/*\n NewCo design tokens — Responsive: Layout (CONTRACT).\n` +
  ` Per-breakpoint chrome + sheet metrics. Desktop is the base; Tablet (<=${TABLET}px)\n` +
  ` and Mobile (<=${MOBILE}px) override only what changes. Generated — do not edit.\n*/\n` +
  `:root {\n${desktop}\n}\n`;
if (tablet) css += `\n@media (max-width: ${TABLET}px) {\n  :root {\n${tablet}\n  }\n}\n`;
if (mobile) css += `\n@media (max-width: ${MOBILE}px) {\n  :root {\n${mobile}\n  }\n}\n`;

writeFileSync("src/tokens/layout-responsive.css", css);
console.log(`layout-responsive.css: ${src.vars.length} tokens (desktop base + ${tablet ? "tablet" : "no tablet"} + ${mobile ? "mobile" : "no mobile"} overrides).`);

#!/usr/bin/env node
/**
 * build-token-source.js
 *
 * Assembles the W3C DTCG token source (`tokens/newco-design-tokens.json`) from
 * the raw Figma variable graph pulled out of the Spired branch:
 *
 *   tokens/figma-source/primitives.json   { "Brand/600": "#41377d", ... }
 *   tokens/figma-source/semantics.json    [ ["Surface/Sheet/Base","=Warm Neutral/100","=Midnight/Sheet"], ... ]
 *
 * Output shape mirrors the Figma collection/mode structure 1:1 and matches the
 * CSS-variable naming the design demo already consumes
 * (e.g. --semantic-color-light-mode-surface-sheet-base):
 *
 *   {
 *     "primitive-color": { "brand": { "600": {"$type":"color","$value":"#41377d"} }, ... },
 *     "semantic-color": {
 *       "light-mode":   { "surface": { "sheet": { "base": {"$type":"color","$value":"{primitive-color.warm-neutral.100}"} } } },
 *       "midnight-mode":{ ... }
 *     }
 *   }
 *
 * This is the transform the CI sync will run against a live Figma REST pull.
 * For now it runs against the seed dump committed under tokens/figma-source/.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "..", "tokens", "figma-source");
const OUT = resolve(__dirname, "..", "tokens", "newco-design-tokens.json");

// Slug matches the demo's Style Dictionary output: lowercase, any run of
// non-alphanumerics collapses to a single hyphen. "Warm Neutral/100" -> parts
// ["warm-neutral","100"]; "Amethyst/55 @ 13%" -> ["amethyst","55-13"].
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const pathParts = (name) => name.split("/").map(slug);

function setLeaf(tree, parts, leaf) {
  let cur = tree;
  for (let i = 0; i < parts.length - 1; i++) {
    if (typeof cur[parts[i]] !== "object" || cur[parts[i]] === null || "$value" in (cur[parts[i]] || {})) cur[parts[i]] = {};
    cur = cur[parts[i]];
  }
  cur[parts[parts.length - 1]] = leaf;
}

// "=Warm Neutral/100" -> "{primitive-color.warm-neutral.100}" ; hex stays literal
function encodeValue(cell) {
  if (typeof cell === "string" && cell.startsWith("=")) {
    return `{primitive-color.${pathParts(cell.slice(1)).join(".")}}`;
  }
  return typeof cell === "string" ? cell.toLowerCase() : cell;
}

const primitives = JSON.parse(readFileSync(resolve(SRC, "primitives.json"), "utf8"));
const semantics = JSON.parse(readFileSync(resolve(SRC, "semantics.json"), "utf8"));

const out = { "primitive-color": {}, "semantic-color": { "light-mode": {}, "midnight-mode": {} } };

for (const [name, hex] of Object.entries(primitives)) {
  setLeaf(out["primitive-color"], pathParts(name), { $type: "color", $value: hex.toLowerCase() });
}
for (const [name, light, midnight] of semantics) {
  const parts = pathParts(name);
  setLeaf(out["semantic-color"]["light-mode"], parts, { $type: "color", $value: encodeValue(light) });
  setLeaf(out["semantic-color"]["midnight-mode"], parts, { $type: "color", $value: encodeValue(midnight) });
}

// ── Non-color collections (unit, layout, type, motion, elevation, breakpoints) ─
const nc = JSON.parse(readFileSync(resolve(SRC, "non-color.json"), "utf8"));
const num = (v) => ({ $type: "number", $value: v });
const str = (v) => ({ $type: "string", $value: v });
const index = {}; // figma name -> dtcg dotted path (for alias resolution)

// pass 1: register every non-color token's dtcg path
const reg = (name, coll) => { index[name] = coll + "." + pathParts(name).join("."); };
for (const [n] of nc["Primitive: Unit"].vars) reg(n, "primitive-unit");
for (const [n] of nc["Breakpoints"].vars) reg(n, "breakpoints");
for (const [n] of nc["Motion"].durations) reg(n, "motion");
for (const [n] of nc["Motion"].easings) reg(n, "motion");
for (const [n] of nc["Elevation"].vars) reg(n, "elevation");
for (const grp of ["families", "sizes", "weights", "letterSpacing", "lineHeights"]) for (const [n] of nc["Primitive: Type"][grp]) reg(n, "primitive-type");
for (const [n] of nc["Semantic: Layout & Units"].vars) reg(n, "semantic-layout-units");

const encNC = (v) => (typeof v === "string" && v.startsWith("=")) ? `{${index[v.slice(1)]}}` : v;

// pass 2: emit
out["primitive-unit"] = {};
for (const [n, v] of nc["Primitive: Unit"].vars) setLeaf(out["primitive-unit"], pathParts(n), num(v));
out["breakpoints"] = {};
for (const [n, v] of nc["Breakpoints"].vars) setLeaf(out["breakpoints"], pathParts(n), num(v));
out["motion"] = {};
for (const [n, v] of nc["Motion"].durations) setLeaf(out["motion"], pathParts(n), str(`${v}ms`));
for (const [n, v] of nc["Motion"].easings) setLeaf(out["motion"], pathParts(n), str(v));
out["elevation"] = {}; out["elevation-midnight"] = {};
for (const [n, l, m] of nc["Elevation"].vars) { setLeaf(out["elevation"], pathParts(n), str(l)); setLeaf(out["elevation-midnight"], pathParts(n), str(m)); }
out["primitive-type"] = {};
for (const [n, v] of nc["Primitive: Type"].families) setLeaf(out["primitive-type"], pathParts(n), str(v));
for (const [n, v] of nc["Primitive: Type"].sizes) setLeaf(out["primitive-type"], pathParts(n), { $type: "number", $value: encNC(v) });
for (const [n, v] of nc["Primitive: Type"].weights) setLeaf(out["primitive-type"], pathParts(n), num(v));
for (const [n, v] of nc["Primitive: Type"].letterSpacing) setLeaf(out["primitive-type"], pathParts(n), num(v));
for (const [n, v] of nc["Primitive: Type"].lineHeights) setLeaf(out["primitive-type"], pathParts(n), num(v));
out["semantic-layout-units"] = {};
for (const [n, v] of nc["Semantic: Layout & Units"].vars) setLeaf(out["semantic-layout-units"], pathParts(n), { $type: "number", $value: encNC(v) });

// semantic typography roles (Desktop mode), aliasing Primitive: Type
const st = JSON.parse(readFileSync(resolve(SRC, "semantic-type.json"), "utf8"));
out["semantic-type"] = {};
for (const [n, v] of st.vars) {
  const isFamily = /FontFamily$/.test(n);
  setLeaf(out["semantic-type"], pathParts(n), { $type: isFamily ? "string" : "number", $value: encNC(v) });
}

// ── Validation: every alias must resolve to a real primitive leaf ────────────
function resolvePath(tree, dotted) {
  let cur = tree;
  for (const p of dotted.split(".")) {
    if (cur == null || typeof cur !== "object" || !(p in cur)) return undefined;
    cur = cur[p];
  }
  return cur;
}
const broken = [];
function walk(node, trail) {
  for (const [k, v] of Object.entries(node)) {
    if (v && typeof v === "object" && "$value" in v) {
      const val = v.$value;
      if (typeof val === "string" && /^\{.+\}$/.test(val)) {
        const target = val.slice(1, -1);
        const hit = resolvePath(out, target);
        if (!hit || !("$value" in hit)) broken.push({ token: trail.concat(k).join("."), target });
      }
    } else if (v && typeof v === "object") {
      walk(v, trail.concat(k));
    }
  }
}
walk(out["semantic-color"], ["semantic-color"]);

const nPrim = Object.keys(primitives).length;
const nSem = semantics.length;
writeFileSync(OUT, JSON.stringify(out, null, 2) + "\n", "utf8");
console.log(`primitives: ${nPrim}  semantics: ${nSem} (x2 modes)`);
if (broken.length) {
  console.error(`\n⚠  ${broken.length} unresolved alias reference(s):`);
  for (const b of broken.slice(0, 40)) console.error(`   ${b.token}  ->  {${b.target}}`);
  process.exitCode = 1;
} else {
  console.log("✓ all alias references resolve. Wrote tokens/newco-design-tokens.json");
}

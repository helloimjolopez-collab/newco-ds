#!/usr/bin/env node
// Asserts each colour ladder's named order matches its luminance order (lightest first),
// in Light mode. Ported from Pathway. Skips <3-rung groups, On Subtle/On Strong pairings,
// and any value that isn't a resolvable solid hex.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const T = path.join(__dirname, '..', 'src', 'tokens');

// lightest -> heaviest
const LADDER = ['mono', 'white', 'xlight', 'faint', 'subtle', 'base', 'medium', 'contrast', 'bold', 'strong', 'strongest', 'black'];
const NOT_A_RUNG = new Set(['on', 'subtle', 'strong']); // "on-subtle"/"on-strong" handled below

// build var map from primitives + light theme
const map = {};
for (const f of ['primitives.css', 'themes/light.css']) {
  const css = fs.readFileSync(path.join(T, f), 'utf8');
  for (const m of css.matchAll(/(--[a-z0-9-]+)\s*:\s*([^;]+);/g)) map[m[1].trim()] = m[2].trim();
}
function resolve(v, depth = 0) {
  if (depth > 8 || v == null) return null;
  v = v.trim();
  const vm = v.match(/^var\((--[a-z0-9-]+)\)$/);
  if (vm) return resolve(map[vm[1]], depth + 1);
  const hx = v.match(/^#([0-9a-fA-F]{6})$/);
  if (hx) return [0, 2, 4].map(i => parseInt(hx[1].slice(i, i + 2), 16));
  return null; // rgba/color-mix/alpha -> skip
}
function lum([r, g, b]) { const f = c => { c /= 255; return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); }

// group semantic colour tokens by name-minus-final-rung
const groups = {};
for (const name of Object.keys(map)) {
  if (!name.startsWith('--semantic-color-')) continue;
  const parts = name.split('-');
  const last = parts[parts.length - 1];
  if (last === 'subtle' && parts[parts.length - 2] === 'on') continue; // on-subtle
  if (last === 'strong' && parts[parts.length - 2] === 'on') continue; // on-strong
  if (!LADDER.includes(last)) continue;
  const key = parts.slice(0, -1).join('-');
  const rgb = resolve(map[name]);
  if (!rgb) continue;
  (groups[key] = groups[key] || []).push({ rung: last, L: lum(rgb) });
}
let failed = false;
for (const [key, rungs] of Object.entries(groups)) {
  if (rungs.length < 3) continue;
  const byName = [...rungs].sort((a, b) => LADDER.indexOf(a.rung) - LADDER.indexOf(b.rung));
  const byLum = [...rungs].sort((a, b) => b.L - a.L); // lightest first
  const nn = byName.map(r => r.rung).join('>');
  const ll = byLum.map(r => r.rung).join('>');
  if (nn !== ll) {
    console.error(`✗ ${key}\n    named:  ${nn}\n    actual: ${ll}`);
    failed = true;
  }
}
if (failed) { console.error('check-ladder-order FAILED'); process.exit(1); }
console.log('✓ check-ladder-order: every ladder runs lightest→heaviest by luminance');

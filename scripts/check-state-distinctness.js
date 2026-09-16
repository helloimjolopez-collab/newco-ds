#!/usr/bin/env node
// Fails if rest/hover/pressed within one Action group resolve to the SAME primitive.
// Ported from Pathway. Compares the primitive alias (not rendered hex) per theme file.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const T = path.join(__dirname, '..', 'src', 'tokens');
const FILES = ['themes/light.css', 'themes/midnight.css'];
const STATES = ['rest', 'hover', 'pressed'];
let failed = false;

for (const f of FILES) {
  const css = fs.readFileSync(path.join(T, f), 'utf8');
  const alias = {};
  for (const m of css.matchAll(/(--semantic-color-[a-z0-9-]+)\s*:\s*var\((--primitive-color-[a-z0-9-]+)\)/g)) {
    alias[m[1]] = m[2];
  }
  const groups = {};
  for (const name of Object.keys(alias)) {
    const parts = name.split('-');
    const last = parts[parts.length - 1];
    if (!STATES.includes(last)) continue;
    // Policed on fill + stroke only: those surfaces must give per-state feedback.
    // Foreground text is allowed to stay constant across states (e.g. a secondary
    // button whose label colour never changes, only its fill/border) — that is a
    // deliberate demo behaviour, not a collision bug.
    const tier = name.replace('--semantic-color-', '').split('-')[0];
    if (tier !== 'fill' && tier !== 'stroke') continue;
    const key = parts.slice(0, -1).join('-');
    (groups[key] = groups[key] || {})[last] = alias[name];
  }
  for (const [key, byState] of Object.entries(groups)) {
    const present = STATES.filter(s => byState[s]);
    for (let i = 0; i < present.length; i++)
      for (let j = i + 1; j < present.length; j++)
        if (byState[present[i]] === byState[present[j]]) {
          console.error(`✗ ${f}: ${key} — ${present[i]} and ${present[j]} both resolve to ${byState[present[i]]}`);
          failed = true;
        }
  }
}
if (failed) { console.error('check-state-distinctness FAILED'); process.exit(1); }
console.log('✓ check-state-distinctness: no rest/hover/pressed collisions');

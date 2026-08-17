#!/usr/bin/env node
/**
 * figma-probe.mjs — one-off diagnostic, safe to delete.
 *
 * 1. Lists every branch of a Figma file with its own file key. Branch keys are not
 *    exposed in the Figma URL; ?branch_data=true on the file endpoint is the only way.
 * 2. Probes GET /variables/local so we learn whether this plan/token can use the
 *    Variables REST API.
 *
 * Never prints the token.
 */
const TOKEN = process.env.FIGMA_TOKEN;
const KEY = process.env.FILE_KEY;

if (!TOKEN || !KEY) {
  console.error("Missing FIGMA_TOKEN or FILE_KEY.");
  process.exit(2);
}

const H = { "X-Figma-Token": TOKEN };

console.log("=============== 1. BRANCH LIST ===============");
const fRes = await fetch(
  `https://api.figma.com/v1/files/${KEY}?branch_data=true&depth=1`,
  { headers: H }
);
console.log(`HTTP ${fRes.status}`);

if (fRes.ok) {
  const d = await fRes.json();
  console.log(`PARENT FILE: ${d.name}`);
  const bs = d.branches || [];
  console.log(`\n${bs.length} branch(es) found:\n`);
  for (const b of bs) console.log(`  key: ${b.key}    name: ${b.name}`);
  if (!bs.length) {
    console.log("  (none returned — the file may have no branches, or they belong");
    console.log("   to another account and are invisible to this token)");
  }
} else {
  console.log(await fRes.text());
}

console.log("\n=========== 2. VARIABLES ENDPOINT PROBE ===========");
const vRes = await fetch(
  `https://api.figma.com/v1/files/${KEY}/variables/local`,
  { headers: H }
);
console.log(`GET /variables/local -> HTTP ${vRes.status}`);

if (vRes.ok) {
  const meta = (await vRes.json()).meta || {};
  console.log(
    `WORKS. variables: ${Object.keys(meta.variables || {}).length}` +
      `   collections: ${Object.keys(meta.variableCollections || {}).length}`
  );
} else {
  console.log(await vRes.text());
}

#!/usr/bin/env node
/**
 * sync-tokens.js — pull the token graph straight from Figma. No manual export.
 * ---------------------------------------------------------------------------
 * Calls the Figma **Variables REST API**, regenerates the raw seed dumps under
 * tokens/figma-source/, then you run `npm run build-tokens`. Designed to run in
 * CI (GitHub Actions) on a schedule or on demand, authenticated by an **org
 * Plan Access Token** — NOT a personal token, NOT a plugin JSON export, NOT a
 * local file watcher.
 *
 * Auth / config (env):
 *   FIGMA_TOKEN     – org Plan Access Token (GitHub secret). Never commit it.
 *   FIGMA_FILE_KEY  – the file (or branch) key to read variables from.
 *
 * Plan gating: GET /v1/files/:key/variables/local has historically required an
 * Enterprise org. Organization plans expose Plan Access Tokens but may still
 * 403 here. This script surfaces that clearly so governance can pick the path:
 *   200 → CI-native REST sync (best case).
 *   403 → fall back to a Figma→Git plugin (TokenNexus / TokenSync) or a Dev-Mode
 *         MCP pull run from a session. Output is identical (the two seed dumps),
 *         so the rest of the pipeline is unchanged.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "tokens", "figma-source");

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;
const PRIMITIVE_COLLECTION = process.env.NEWCO_PRIMITIVE_COLLECTION || "Primitive: Color";
const SEMANTIC_COLLECTION = process.env.NEWCO_SEMANTIC_COLLECTION || "Semantic: Color";

if (!TOKEN || !FILE_KEY) {
  console.error("Missing FIGMA_TOKEN and/or FIGMA_FILE_KEY. See .env.example.");
  process.exit(2);
}

const hex = (c) => {
  const h = (x) => Math.round(x * 255).toString(16).padStart(2, "0");
  let s = "#" + h(c.r) + h(c.g) + h(c.b);
  if (c.a !== undefined && c.a < 1) s += h(c.a);
  return s;
};

async function main() {
  const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/variables/local`, {
    headers: { "X-Figma-Token": TOKEN },
  });
  if (res.status === 403) {
    console.error(
      "\n403 from /variables/local — the Variables REST API is not enabled for this token/plan.\n" +
      "Use the plugin (TokenNexus/TokenSync) or Dev-Mode MCP fallback to regenerate\n" +
      "tokens/figma-source/{primitives,semantics}.json, then run `npm run build-tokens`.\n"
    );
    process.exit(3);
  }
  if (!res.ok) {
    console.error(`Figma API error ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const { meta } = await res.json();
  const vars = Object.values(meta.variables);
  const colls = meta.variableCollections;
  const byId = Object.fromEntries(vars.map((v) => [v.id, v]));

  const collByName = {};
  for (const c of Object.values(colls)) collByName[c.name] = c;
  const primColl = collByName[PRIMITIVE_COLLECTION];
  const semColl = collByName[SEMANTIC_COLLECTION];
  if (!primColl || !semColl) {
    console.error(`Could not find collections "${PRIMITIVE_COLLECTION}" / "${SEMANTIC_COLLECTION}".`);
    process.exit(1);
  }
  const modeId = (coll, re) => (coll.modes.find((m) => re.test(m.name)) || coll.modes[0]).modeId;

  const encode = (val) => {
    if (val && val.type === "VARIABLE_ALIAS") { const t = byId[val.id]; return "=" + (t ? t.name : val.id); }
    if (val && val.r !== undefined) return hex(val);
    return val;
  };

  const primMode = primColl.modes[0].modeId;
  const primitives = {};
  for (const v of vars) if (v.variableCollectionId === primColl.id && v.resolvedType === "COLOR") {
    primitives[v.name] = encode(v.valuesByMode[primMode]);
  }
  const light = modeId(semColl, /light/i);
  const midnight = modeId(semColl, /midnight|dark/i);
  const semantics = [];
  for (const v of vars) if (v.variableCollectionId === semColl.id && v.resolvedType === "COLOR") {
    semantics.push([v.name, encode(v.valuesByMode[light]), encode(v.valuesByMode[midnight])]);
  }

  mkdirSync(OUT, { recursive: true });
  writeFileSync(resolve(OUT, "primitives.json"), JSON.stringify(primitives, null, 2) + "\n");
  writeFileSync(resolve(OUT, "semantics.json"), JSON.stringify(semantics) + "\n");
  console.log(`Pulled ${Object.keys(primitives).length} primitives, ${semantics.length} semantics from Figma.`);
  console.log("Now run: npm run build-tokens");
}
main().catch((e) => { console.error(e); process.exit(1); });

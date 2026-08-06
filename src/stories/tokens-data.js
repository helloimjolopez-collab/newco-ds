// Shared token data + resolver for the Storybook galleries.
// Reads the committed DTCG source so the galleries are COMPLETE and structured,
// never hand-curated.
import dtcg from "../../tokens/newco-design-tokens.json";

export { dtcg };

export function getByPath(root, pathArr) {
  let c = root;
  for (const p of pathArr) {
    if (!c || typeof c !== "object") return undefined;
    c = c[p];
  }
  return c;
}

/** Follow {alias} chains to a concrete hex. */
export function resolveColor(val) {
  if (typeof val !== "string") return null;
  if (val.startsWith("{")) {
    const leaf = getByPath(dtcg, val.slice(1, -1).split("."));
    return leaf && "$value" in leaf ? resolveColor(leaf.$value) : null;
  }
  return val; // literal hex
}

/** Short label for what a token points at, e.g. "{primitive-color.brand.600}" -> "brand · 600". */
export function aliasLabel(val) {
  if (typeof val === "string" && val.startsWith("{")) {
    return val.slice(1, -1).replace(/^primitive-color\./, "").replace(/\./g, " · ");
  }
  return typeof val === "string" ? val : "";
}

/** Yield [pathArray, leaf] for every DTCG leaf under a node. */
export function leaves(node, trail = []) {
  const out = [];
  for (const [k, v] of Object.entries(node || {})) {
    if (v && typeof v === "object" && "$value" in v) out.push([[...trail, k], v]);
    else if (v && typeof v === "object") out.push(...leaves(v, [...trail, k]));
  }
  return out;
}

export const PRIMITIVES = dtcg["primitive-color"];
export const SEM_LIGHT = dtcg["semantic-color"]["light-mode"];
export const SEM_MIDNIGHT = dtcg["semantic-color"]["midnight-mode"];

/** Sort helper for ramp steps like "50", "300", "55 @ 13%". */
export function stepSort(a, b) {
  const na = parseInt(a, 10), nb = parseInt(b, 10);
  if (!isNaN(na) && !isNaN(nb) && na !== nb) return na - nb;
  return a.localeCompare(b);
}

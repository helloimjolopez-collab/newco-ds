import StyleDictionary from "style-dictionary";

// ─── number/px transform ───────────────────────────────────────────────────────
// Figma's variable export marks spacing, sizing, font-size, line-height and
// letter-spacing tokens with $type: "number" rather than "dimension". Style
// Dictionary's built-in size transforms only fire on "dimension"-typed tokens, so
// these would come out as bare integers (padding:12 is ignored; line-height:22 is
// a MULTIPLIER, not px). This appends "px" to every numeric "number" token except
// font-weight (CSS weight is unitless).
StyleDictionary.registerTransform({
  name: "number/px",
  type: "value",
  filter: (token) => {
    const type = token.$type ?? token.type;
    if (type !== "number") return false;
    if (typeof (token.$value ?? token.value) !== "number") return false;
    const pathStr = token.path.join("/");
    if (pathStr.includes("weight") || pathStr.includes("fontweight")) return false;
    return true;
  },
  transform: (token) => `${token.$value ?? token.value}px`,
});

StyleDictionary.registerTransformGroup({
  name: "css-with-px",
  transforms: [
    "attribute/cti", "name/kebab", "time/seconds", "html/icon", "size/rem",
    "color/css", "asset/url", "fontFamily/css", "cubicBezier/css",
    "strokeStyle/css/shorthand", "border/css/shorthand", "typography/css/shorthand",
    "transition/css/shorthand", "shadow/css/shorthand", "number/px",
  ],
});

// ─── mode as selector, not as a name segment ──────────────────────────────────
// build-token-source nests each mode as a path segment (semantic-color.light-mode.*
// and, since this change, elevation.light-mode.*). Stock name/kebab folds that into
// the property name (--semantic-color-light-mode-*), which doubles every colour into
// two unrelated names and makes real theme switching impossible. This transform
// drops the mode segment so both modes share ONE name; the per-mode theme files
// below scope them with a selector instead.
//
// NewCo layout/type are single-value in the seed (no mode segment), so only colour
// and elevation carry a mode to strip — hence a short regex and no responsive layout
// format (unlike Pathway, whose layout is moded).
const MODE_SEGMENTS = /^(light-mode|midnight-mode)$/i;

StyleDictionary.registerTransform({
  name: "name/newco-modeless",
  type: "name",
  transform: (token) =>
    token.path.filter((s) => !MODE_SEGMENTS.test(String(s))).join("-").toLowerCase(),
});

StyleDictionary.registerTransformGroup({
  name: "css-modeless",
  transforms: [
    "attribute/cti", "name/newco-modeless", "time/seconds", "html/icon", "size/rem",
    "color/css", "asset/url", "fontFamily/css", "cubicBezier/css",
    "strokeStyle/css/shorthand", "border/css/shorthand", "typography/css/shorthand",
    "transition/css/shorthand", "shadow/css/shorthand", "number/px",
  ],
});

// Flat JS map for npm consumers. NOTE: do NOT name this "javascript/esm" — Style
// Dictionary ships a built-in of that name that emits the NESTED tree and silently
// shadows a custom one, breaking flat consumers. Keep the name unique.
StyleDictionary.registerFormat({
  name: "newco/js-flat",
  format: ({ dictionary }) => {
    const tokens = {};
    dictionary.allTokens.forEach((t) => {
      tokens[t.path.join("-")] = { value: t.$value ?? t.value, type: t.$type ?? t.type ?? "unknown", path: t.path };
    });
    return `const tokens = ${JSON.stringify(tokens, null, 2)};\n\nexport default tokens;\n`;
  },
});

// ── routing helpers ──
// Theme files carry semantic COLOUR *and* ELEVATION: both vary by mode, so both are
// resolved by [data-theme] selector under one name. If elevation is left OUT of this
// filter its two values collide on one name and last-one-wins — shipping midnight
// shadows in light mode with no error. (Verify from the emitted files, not here.)
const isThemed = (t) => { const c = String(t.path[0]).toLowerCase(); return c === "semantic-color" || c === "elevation"; };
const inMode = (t, re) => re.test(String(t.path[1]));

const config = {
  source: ["tokens/newco-design-tokens.json"],
  preprocessors: ["tokens-studio"],
  platforms: {
    // Final-name collections (no mode): primitives, motion, breakpoints.
    css: {
      transformGroup: "css-with-px",
      buildPath: "src/tokens/",
      files: [
        {
          // Primitives — REQUIRED to load (every semantic resolves through these
          // via var()) but never named by product code. See its stamped header.
          destination: "primitives.css",
          format: "css/variables",
          filter: (t) => String(t.path[0]).toLowerCase().startsWith("primitive"),
          options: { outputReferences: false },
        },
        { destination: "motion.css", format: "css/variables", filter: (t) => String(t.path[0]).toLowerCase() === "motion", options: { outputReferences: false } },
        { destination: "breakpoints.css", format: "css/variables", filter: (t) => String(t.path[0]).toLowerCase() === "breakpoints", options: { outputReferences: false } },
      ],
    },
    // Modeless collections: colour + elevation (by selector) and the single-value
    // layout / contextual / type scales.
    cssModeless: {
      transformGroup: "css-modeless",
      buildPath: "src/tokens/",
      files: [
        {
          // Colour + elevation, Light. ":root, [data-theme=light]" so a light island
          // can sit inside a dark island (top bar with white panels), not just the reverse.
          destination: "themes/light.css",
          format: "css/variables",
          filter: (t) => isThemed(t) && inMode(t, /light/i),
          options: { selector: ':root, [data-theme="light"]', outputReferences: true },
        },
        {
          // Same names, Midnight values. "midnight" is the brand name; "dark" is what
          // frameworks and prefers-color-scheme use — a consumer needn't learn ours.
          destination: "themes/midnight.css",
          format: "css/variables",
          filter: (t) => isThemed(t) && inMode(t, /midnight|dark/i),
          options: { selector: '[data-theme="midnight"], [data-theme="dark"]', outputReferences: true },
        },
        { destination: "layout.css", format: "css/variables", filter: (t) => String(t.path[0]).toLowerCase() === "semantic-layout-units", options: { outputReferences: true } },
        { destination: "layout-contextual.css", format: "css/variables", filter: (t) => String(t.path[0]).toLowerCase() === "contextual-layout-units", options: { outputReferences: true } },
        { destination: "type.css", format: "css/variables", filter: (t) => String(t.path[0]).toLowerCase() === "semantic-type", options: { outputReferences: true } },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "src/tokens/",
      files: [{ destination: "tokens.js", format: "newco/js-flat", options: { outputReferences: false } }],
    },
  },
};

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();
console.log("Style Dictionary build complete.");

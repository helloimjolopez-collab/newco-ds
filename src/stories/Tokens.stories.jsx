import React from "react";

/* Resolve a CSS custom property (following var() alias chains) to a real color. */
function resolve(name) {
  const probe = document.createElement("span");
  probe.style.color = `var(${name})`;
  probe.style.display = "none";
  document.body.appendChild(probe);
  const c = getComputedStyle(probe).color;
  probe.remove();
  return c;
}

function Swatch({ name }) {
  const color = resolve(name);
  const label = name.replace(/^--/, "");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0" }}>
      <span style={{
        width: 44, height: 44, borderRadius: 10, background: color,
        border: "1px solid rgba(0,0,0,.12)", boxShadow: "inset 0 0 0 1px rgba(0,0,0,.03)", flex: "0 0 auto",
      }} />
      <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 1.4 }}>
        <div style={{ color: "#111" }}>{label}</div>
        <div style={{ color: "#888" }}>{color}</div>
      </div>
    </div>
  );
}

function Grid({ names }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2px 28px" }}>
      {names.map((n) => <Swatch key={n} name={n} />)}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ marginBottom: 34 }}>
      <h3 style={{ font: "600 15px/1.3 'Red Hat Text',sans-serif", margin: "0 0 12px", color: "#111" }}>{title}</h3>
      {children}
    </section>
  );
}

const SURFACE = (mode) => [
  `--semantic-color-${mode}-surface-canvas-base`,
  `--semantic-color-${mode}-surface-nav-base`,
  `--semantic-color-${mode}-surface-sheet-base`,
  `--semantic-color-${mode}-surface-widget-header`,
  `--semantic-color-${mode}-surface-widget-base`,
  `--semantic-color-${mode}-surface-overlay-base`,
];
const BRAND = ["0","5","10","20","30","40","50","60","70","80","90","100","200","300","400","430","450","500","600","700","800","850","900","925","950"]
  .map((s) => `--primitive-color-brand-${s}`);
const SEMANTIC = (mode) => [
  "text-static-primary-base","text-static-secondary-base","text-action-primary-base",
  "fill-action-primary-base","fill-static-info-base","fill-static-positive-base",
  "fill-static-negative-base","fill-static-danger-base","fill-static-alert-base",
  "fill-static-accent_amethyst-base","stroke-static-neutral-base","icon-static-neutral-base",
].map((p) => `--semantic-color-${mode}-${p}`);

export default { title: "Tokens/Colors" };

export const SurfacesLight = () => (
  <div style={{ padding: 24 }}>
    <Section title="Surfaces — Light mode (warm-paper elevation stack)"><Grid names={SURFACE("light-mode")} /></Section>
  </div>
);
export const SurfacesMidnight = () => (
  <div style={{ padding: 24, background: "#29252f" }}>
    <Section title="Surfaces — Midnight mode"><Grid names={SURFACE("midnight-mode")} /></Section>
  </div>
);
export const BrandRamp = () => (
  <div style={{ padding: 24 }}><Section title="Primitive · Brand ramp (Spired indigo)"><Grid names={BRAND} /></Section></div>
);
export const SemanticSampler = () => (
  <div style={{ padding: 24 }}>
    <Section title="Semantic roles — Light"><Grid names={SEMANTIC("light-mode")} /></Section>
    <Section title="Semantic roles — Midnight"><Grid names={SEMANTIC("midnight-mode")} /></Section>
  </div>
);

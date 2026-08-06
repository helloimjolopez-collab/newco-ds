import React from "react";
import { PRIMITIVES, stepSort } from "./tokens-data";

export default { title: "Tokens/Primitives", parameters: { layout: "fullscreen" } };

function Chip({ label, hex }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0", minWidth: 230 }}>
      <span style={{ width: 40, height: 40, borderRadius: 9, background: hex,
        border: "1px solid rgba(0,0,0,.12)", flex: "0 0 auto" }} />
      <div style={{ fontFamily: "monospace", fontSize: 12, lineHeight: 1.35 }}>
        <div style={{ color: "#1b1b1b" }}>{label}</div>
        <div style={{ color: "#8a807e" }}>{hex}</div>
      </div>
    </div>
  );
}

function Family({ name, ramp }) {
  const steps = Object.keys(ramp).sort(stepSort);
  return (
    <section style={{ marginBottom: 30 }}>
      <h3 style={{ font: "600 15px/1.3 'Red Hat Text',sans-serif", margin: "0 0 4px", color: "#19143c" }}>{name}</h3>
      <div style={{ fontFamily: "monospace", fontSize: 11, color: "#b3a8a6", margin: "0 0 12px" }}>
        --primitive-color-{name.toLowerCase().replace(/ /g, "-")}-*
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "0 24px" }}>
        {steps.map((s) => <Chip key={s} label={`${name} / ${s}`} hex={ramp[s].$value} />)}
      </div>
    </section>
  );
}

// One family per top-level key under primitive-color.
const FAMILIES = Object.keys(PRIMITIVES);

export const Palette = () => (
  <div style={{ padding: 28, background: "#fcf9f9", minHeight: "100vh" }}>
    <h2 style={{ font: "700 20px/1.2 'Red Hat Text',sans-serif", margin: "0 0 6px", color: "#19143c" }}>
      Primitives — the raw palette
    </h2>
    <p style={{ font: "400 13px/1.5 'Red Hat Text',sans-serif", color: "#605756", maxWidth: 720, margin: "0 0 26px" }}>
      The private layer: brand ramp, warm/cool neutrals, status hues, accents, and the Midnight canvas set.
      Apps should reference <strong>semantics</strong>, not these directly. {FAMILIES.length} families.
    </p>
    {FAMILIES.map((f) => <Family key={f} name={f} ramp={PRIMITIVES[f]} />)}
  </div>
);

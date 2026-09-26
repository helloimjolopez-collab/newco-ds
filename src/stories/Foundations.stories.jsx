import React from "react";
import { dtcg, leaves, resolveVal } from "./tokens-data";

export default { title: "Tokens/Foundations", parameters: { layout: "fullscreen" } };

const Page = ({ title, blurb, children }) => (
  <div style={{ padding: 28, background: "#fcf9f9", minHeight: "100vh", fontFamily: "'Red Hat Text',sans-serif" }}>
    <h2 style={{ font: "700 20px/1.2 'Red Hat Text'", margin: "0 0 6px", color: "#19143c" }}>{title}</h2>
    {blurb && <p style={{ font: "400 13px/1.5 'Red Hat Text'", color: "#605756", margin: "0 0 22px", maxWidth: 720 }}>{blurb}</p>}
    {children}
  </div>
);
const mono = { fontFamily: "monospace", fontSize: 12 };
const rowsOf = (key) => leaves(dtcg[key] || {}).map(([p, leaf]) => [p.join(" / "), resolveVal(leaf.$value)]);

// Spacing & sizing bars
export const SpacingAndRadius = () => {
  const gaps = rowsOf("semantic-layout-units").filter(([n]) => /gap|padding/i.test(n));
  const radii = rowsOf("semantic-layout-units").filter(([n]) => /radius/i.test(n));
  const Bar = ([n, v]) => (
    <div key={n} style={{ display: "grid", gridTemplateColumns: "320px 70px 1fr", gap: 12, alignItems: "center", padding: "3px 0" }}>
      <span style={mono}>{n}</span><span style={{ ...mono, color: "#8a807e" }}>{v}</span>
      <span style={{ height: 14, width: parseFloat(v) || 1, background: "#6e64be", borderRadius: 3, maxWidth: "100%" }} />
    </div>
  );
  return (
    <Page title="Spacing, Padding & Radius" blurb="Semantic layout tokens (Desktop mode) resolving to the Unit scale. Bar length = px value.">
      <h3 style={{ font: "600 13px 'Red Hat Text'", color: "#41377d" }}>Gap & Padding</h3>{gaps.map(Bar)}
      <h3 style={{ font: "600 13px 'Red Hat Text'", color: "#41377d", marginTop: 20 }}>Corner Radius</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>{radii.map(([n, v]) => (
        <div key={n} style={{ textAlign: "center" }}>
          <div style={{ width: 72, height: 72, background: "#e7e8fb", border: "1px solid #6e64be", borderRadius: Math.min(parseFloat(v), 36) }} />
          <div style={{ ...mono, fontSize: 10, marginTop: 4 }}>{n.split(" / ").pop()}<br />{v}</div>
        </div>))}</div>
    </Page>
  );
};

export const Typography = () => {
  const sizes = rowsOf("primitive-type").filter(([n]) => n.startsWith("size"));
  const weights = rowsOf("primitive-type").filter(([n]) => n.startsWith("weight"));
  const fam = rowsOf("primitive-type").find(([n]) => n.startsWith("family"));
  return (
    <Page title="Typography (primitives)" blurb={`Brand font: ${fam ? fam[1] : ""}. Size ramp (aliases the Unit scale) and weight ramp. Semantic type roles (Heading/Text/Label) are the next integration.`}>
      <h3 style={{ font: "600 13px 'Red Hat Text'", color: "#41377d" }}>Size ramp</h3>
      {sizes.map(([n, v]) => <div key={n} style={{ display: "flex", alignItems: "baseline", gap: 16, borderBottom: "1px solid #efe5e5", padding: "6px 0" }}>
        <span style={{ ...mono, width: 90, color: "#8a807e" }}>{n} · {v}</span>
        <span style={{ fontSize: parseFloat(v), color: "#19143c" }}>NewCo {v}</span></div>)}
      <h3 style={{ font: "600 13px 'Red Hat Text'", color: "#41377d", marginTop: 20 }}>Weights</h3>
      {weights.map(([n, v]) => <div key={n} style={{ fontSize: 20, fontWeight: parseInt(v), color: "#19143c" }}>{n} — {v} — The quick brown fox</div>)}
    </Page>
  );
};

export const Motion = () => {
  const durs = rowsOf("motion").filter(([n]) => n.startsWith("duration"));
  const eas = rowsOf("motion").filter(([n]) => n.startsWith("easing"));
  return (
    <Page title="Motion" blurb="Durations (ms) and easing curves.">
      <h3 style={{ font: "600 13px 'Red Hat Text'", color: "#41377d" }}>Durations</h3>
      {durs.map(([n, v]) => <div key={n} style={mono}>{n} — {v}</div>)}
      <h3 style={{ font: "600 13px 'Red Hat Text'", color: "#41377d", marginTop: 16 }}>Easings</h3>
      {eas.map(([n, v]) => <div key={n} style={mono}>{n} — {v}</div>)}
    </Page>
  );
};

export const Elevation = () => {
  const light = rowsOf("elevation"), dark = rowsOf("elevation-midnight");
  return (
    <Page title="Elevation" blurb="Shadow tokens, Light and Midnight.">
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        {[["Light", "#fcf9f9", light], ["Midnight", "#29252f", dark]].map(([label, bg, set]) => (
          <div key={label} style={{ background: bg, padding: 28, borderRadius: 12 }}>
            <div style={{ ...mono, color: label === "Midnight" ? "#eceaf3" : "#605756", marginBottom: 14 }}>{label}</div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>{set.map(([n, v]) => (
              <div key={n} style={{ textAlign: "center" }}>
                <div style={{ width: 88, height: 64, background: label === "Midnight" ? "#3a3645" : "#fff", borderRadius: 10, boxShadow: v }} />
                <div style={{ ...mono, fontSize: 10, marginTop: 8, color: label === "Midnight" ? "#b5b1c6" : "#8a807e" }}>{n}</div>
              </div>))}</div>
          </div>))}
      </div>
    </Page>
  );
};

export const Breakpoints = () => (
  <Page title="Breakpoints" blurb="Responsive breakpoints (px).">
    {rowsOf("breakpoints").map(([n, v]) => <div key={n} style={mono}>{n} — {v}</div>)}
  </Page>
);

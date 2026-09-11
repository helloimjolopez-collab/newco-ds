import React from "react";
import { dtcg, resolveVal, stepSort } from "./tokens-data";

export default { title: "Tokens/Type", parameters: { layout: "fullscreen" } };

const ST = dtcg["semantic-type"] || {};
const BRAND = resolveVal((ST.family?.brand || {}).$value) || "Google Sans Flex";
const px = (v) => (typeof v === "string" ? parseFloat(v) : v);

function Page({ title, blurb, children }) {
  return (
    <div style={{ padding: 28, background: "#fcf9f9", minHeight: "100vh", fontFamily: `'${BRAND}',sans-serif` }}>
      <h2 style={{ font: `700 20px/1.2 '${BRAND}'`, margin: "0 0 6px", color: "#19143c" }}>{title}</h2>
      <p style={{ font: `400 13px/1.5 '${BRAND}'`, color: "#605756", margin: "0 0 26px", maxWidth: 720 }}>{blurb}</p>
      {children}
    </div>
  );
}

function Row({ label, meta, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 20, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid #efe5e5" }}>
      <div style={{ fontFamily: "monospace", fontSize: 11, color: "#8a807e" }}>
        {label}<br /><span style={{ color: "#b3a8a6" }}>{meta}</span>
      </div>
      {children}
    </div>
  );
}

// ── Font size (with the real line-height paired where the step matches) ──
export const FontSize = () => {
  const sizes = Object.keys(ST["font-size"] || {}).sort(stepSort);
  return (
    <Page title="Type — Font size" blurb={`Every semantic font-size step, rendered in ${BRAND}. Sizes alias the primitive size ramp.`}>
      {sizes.map((s) => {
        const v = px(resolveVal(ST["font-size"][s].$value));
        return (
          <Row key={s} label={`font-size / ${s}`} meta={`${v}px`}>
            <div style={{ fontFamily: `'${BRAND}'`, fontSize: v, fontWeight: 500, color: "#19143c", lineHeight: 1.1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              NewCo — the quick brown fox
            </div>
          </Row>
        );
      })}
    </Page>
  );
};

// ── Weight ──
export const Weight = () => {
  const weights = Object.keys(ST.weight || {}).sort(stepSort);
  return (
    <Page title="Type — Weight" blurb={`The four brand weights of ${BRAND}.`}>
      {weights.map((w) => {
        const v = resolveVal(ST.weight[w].$value);
        return (
          <Row key={w} label={`weight / ${w}`} meta={String(v)}>
            <div style={{ fontFamily: `'${BRAND}'`, fontSize: 26, fontWeight: parseInt(v) || 400, color: "#19143c" }}>
              NewCo — the quick brown fox
            </div>
          </Row>
        );
      })}
    </Page>
  );
};

// ── Letter spacing ──
export const LetterSpacing = () => {
  const items = Object.keys(ST["letter-spacing"] || {});
  return (
    <Page title="Type — Letter spacing" blurb="Tracking steps for labels and display text.">
      {items.map((k) => {
        const v = resolveVal(ST["letter-spacing"][k].$value);
        return (
          <Row key={k} label={`letter-spacing / ${k}`} meta={String(v)}>
            <div style={{ fontFamily: `'${BRAND}'`, fontSize: 20, fontWeight: 600, letterSpacing: `${px(v) || 0}px`, color: "#19143c", textTransform: "uppercase" }}>
              NEWCO DESIGN SYSTEM
            </div>
          </Row>
        );
      })}
    </Page>
  );
};

// ── Family ──
export const Family = () => (
  <Page title="Type — Family" blurb="The single brand family. The web component and every gallery read it from --primitive-type-family-brand.">
    <Row label="family / brand" meta={BRAND}>
      <div style={{ fontFamily: `'${BRAND}'`, fontSize: 34, fontWeight: 400, color: "#19143c" }}>
        NewCo — the quick brown fox jumps
      </div>
    </Row>
  </Page>
);

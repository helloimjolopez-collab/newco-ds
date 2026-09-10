import React from "react";

// Figma source — Spired branch Color documentation page.
export const FIGMA_COLOR_DOCS =
  "https://www.figma.com/design/zbfRuhk4GeEXSA3D1s7hmu/Spired_V1-0.1?node-id=4-19";
export const FIGMA_FILE =
  "https://www.figma.com/design/zbfRuhk4GeEXSA3D1s7hmu/Spired_V1-0.1";

export const C = {
  bg: "#fcf9f9",
  ink: "#191919",
  head: "#19143c",
  sub: "#41377d",
  muted: "#8c8380",
  line: "#ece4e4",
  mono: "ui-monospace, SFMono-Regular, Menlo, monospace",
  sans: "'Google Sans Flex', system-ui, sans-serif",
  midBg: "#29252f",
  midInk: "#eceaf3",
  midMuted: "#8f8aa1",
};

export function Page({ children }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "28px 32px", fontFamily: C.sans, color: C.ink, boxSizing: "border-box" }}>
      <div style={{ maxWidth: 1040, margin: "0 auto" }}>{children}</div>
    </div>
  );
}

export function DocHeader({ title, kicker, children }) {
  return (
    <header style={{ marginBottom: 24, borderBottom: `1px solid ${C.line}`, paddingBottom: 16 }}>
      {kicker && <div style={{ font: `600 11px ${C.sans}`, letterSpacing: ".08em", textTransform: "uppercase", color: C.sub, marginBottom: 6 }}>{kicker}</div>}
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <h1 style={{ font: `700 26px/1.15 ${C.sans}`, margin: 0, color: C.head }}>{title}</h1>
        <a href={FIGMA_COLOR_DOCS} target="_blank" rel="noreferrer"
          style={{ font: `600 12px ${C.sans}`, color: "#fff", background: C.sub, textDecoration: "none", padding: "6px 12px", borderRadius: 999, whiteSpace: "nowrap" }}>
          ↗ Figma color docs (Spired branch)
        </a>
      </div>
      {children && <p style={{ font: `400 13.5px/1.55 ${C.sans}`, color: "#5f5654", margin: "8px 0 0", maxWidth: 720 }}>{children}</p>}
    </header>
  );
}

export function GroupH({ children, count }) {
  return (
    <h3 style={{ font: `600 12px ${C.sans}`, letterSpacing: ".06em", textTransform: "uppercase", color: C.sub, margin: "22px 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
      {children}
      {count != null && <span style={{ font: `500 11px ${C.mono}`, color: C.muted }}>{count}</span>}
    </h3>
  );
}

// One compact swatch chip: [swatch] #hex  · ref   — single line, tight.
export function Swatch({ hex, label, sub, dark = false, alpha = false }) {
  const ink = dark ? C.midInk : C.ink;
  const muted = dark ? C.midMuted : C.muted;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 9, minWidth: 0 }}>
      <span style={{ flex: "0 0 auto", width: 22, height: 22, borderRadius: 5, background: alpha ? checker(hex) : hex || "transparent", border: "1px solid rgba(120,110,110,.30)" }} />
      <span style={{ minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {label && <span style={{ font: `500 12px ${C.mono}`, color: ink }}>{label}</span>}
        {sub && <span style={{ font: `400 11.5px ${C.mono}`, color: muted, marginLeft: 8 }}>{sub}</span>}
      </span>
    </div>
  );
}

// Show alpha swatches over a checkerboard so transparency reads.
function checker(hex) {
  return `linear-gradient(${hex},${hex}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50%/12px 12px`;
}

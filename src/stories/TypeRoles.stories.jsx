import React from "react";
import { dtcg, resolveVal } from "./tokens-data";

export default { title: "Tokens/Type Roles", parameters: { layout: "fullscreen" } };

const ST = dtcg["semantic-type"] || {};

// Collect "role" nodes: any node that has a FontSize (or FontWeight) child leaf.
function collectRoles(node, trail, out) {
  const keys = Object.keys(node);
  if (keys.includes("fontsize") || keys.includes("fontweight")) {
    out.push([trail, node]);
    return;
  }
  for (const k of keys) if (node[k] && typeof node[k] === "object" && !("$value" in node[k])) collectRoles(node[k], [...trail, k], out);
}

function sample(node) {
  const g = (k) => (node[k] && "$value" in node[k] ? resolveVal(node[k].$value) : undefined);
  return {
    size: g("fontsize"), weight: g("fontweight"), lh: g("lineheight"),
    ls: g("letterspacing"), family: g("fontfamily") || "Google Sans Flex",
  };
}

function Group({ name }) {
  const out = [];
  collectRoles(ST[name] || {}, [], out);
  return (
    <div style={{ marginBottom: 32 }}>
      <h3 style={{ font: "600 14px 'Red Hat Text'", color: "#41377d", textTransform: "capitalize", margin: "0 0 12px" }}>{name}</h3>
      {out.map(([trail, node]) => {
        const s = sample(node);
        return (
          <div key={trail.join("/")} style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20, alignItems: "baseline", padding: "8px 0", borderBottom: "1px solid #efe5e5" }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#8a807e" }}>
              {trail.join(" / ")}<br />
              <span style={{ color: "#b3a8a6" }}>{s.size} · {s.weight}{s.lh ? ` · lh ${s.lh}` : ""}</span>
            </div>
            <div style={{ fontFamily: s.family, fontSize: parseFloat(s.size) || 16, fontWeight: parseInt(s.weight) || 400, lineHeight: s.lh ? `${parseFloat(s.lh)}px` : "normal", letterSpacing: s.ls ? `${parseFloat(s.ls)}px` : "normal", color: "#19143c" }}>
              Spired — the quick brown fox
            </div>
          </div>
        );
      })}
    </div>
  );
}

export const Headings = () => <div style={{ padding: 28, background: "#fcf9f9", minHeight: "100vh" }}><h2 style={{ font: "700 20px 'Red Hat Text'", color: "#19143c" }}>Semantic Type — Headings</h2><Group name="heading" /></div>;
export const BodyText = () => <div style={{ padding: 28, background: "#fcf9f9", minHeight: "100vh" }}><h2 style={{ font: "700 20px 'Red Hat Text'", color: "#19143c" }}>Semantic Type — Text</h2><Group name="text" /></div>;
export const Labels = () => <div style={{ padding: 28, background: "#fcf9f9", minHeight: "100vh" }}><h2 style={{ font: "700 20px 'Red Hat Text'", color: "#19143c" }}>Semantic Type — Labels</h2><Group name="label" /></div>;

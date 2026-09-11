import React from "react";
import { SEM_LIGHT, SEM_MIDNIGHT, getByPath, resolveColor, aliasLabel, leaves } from "./tokens-data";

export default { title: "Tokens/Semantics", parameters: { layout: "fullscreen" } };

function Cell({ raw, dark }) {
  const hex = resolveColor(raw);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ width: 26, height: 26, borderRadius: 6, background: hex || "transparent",
        border: "1px solid rgba(128,128,128,.35)", flex: "0 0 auto" }} />
      <div style={{ fontFamily: "monospace", fontSize: 11, lineHeight: 1.3 }}>
        <div style={{ color: dark ? "#eceaf3" : "#2a2625" }}>{hex}</div>
        <div style={{ color: dark ? "#b5b1c6" : "#928b92" }}>{aliasLabel(raw)}</div>
      </div>
    </div>
  );
}

function Category({ cat }) {
  const lightCat = SEM_LIGHT[cat] || {};
  const all = leaves(lightCat); // [[path], leaf]
  // group by first path segment (role family: Action / Static / Contextual…)
  const groups = {};
  for (const [path, leaf] of all) {
    const g = path[0];
    (groups[g] ||= []).push([path, leaf]);
  }
  return (
    <div style={{ padding: 28, background: "#fcf9f9", minHeight: "100vh" }}>
      <h2 style={{ font: "700 20px/1.2 'Google Sans Flex',sans-serif", margin: "0 0 6px", color: "#19143c", textTransform: "capitalize" }}>
        Semantic · {cat}
      </h2>
      <p style={{ font: "400 13px/1.5 'Google Sans Flex',sans-serif", color: "#605756", margin: "0 0 22px" }}>
        Role tokens for <strong>{cat}</strong>, shown in Light and Midnight, with the primitive each one references.
        Consume these — they carry the theming.
      </p>
      {Object.keys(groups).sort().map((g) => (
        <section key={g} style={{ marginBottom: 26 }}>
          <h3 style={{ font: "600 13px/1.3 'Google Sans Flex',sans-serif", margin: "0 0 10px", color: "#41377d", textTransform: "capitalize" }}>{g}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(240px,1.4fr) 1fr 1fr", gap: "8px 16px", alignItems: "center" }}>
            <div style={{ font: "600 11px 'Google Sans Flex'", color: "#928b92" }}>token</div>
            <div style={{ font: "600 11px 'Google Sans Flex'", color: "#928b92" }}>Light</div>
            <div style={{ font: "600 11px 'Google Sans Flex'", color: "#928b92" }}>Midnight</div>
            {groups[g].map(([path, lleaf]) => {
              const mleaf = getByPath(SEM_MIDNIGHT[cat], path);
              return (
                <React.Fragment key={path.join("/")}>
                  <div style={{ fontFamily: "monospace", fontSize: 11, color: "#2a2625" }}>{path.slice(1).join(" / ")}</div>
                  <Cell raw={lleaf.$value} />
                  <div style={{ background: "#29252f", borderRadius: 8, padding: "6px 8px" }}><Cell raw={mleaf ? mleaf.$value : lleaf.$value} dark /></div>
                </React.Fragment>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

// One page per REAL top-level semantic-color group (foreground, fill, stroke,
// scrim). Text+Icon are folded into Foreground and Surface lives under Fill, so
// there are no separate Text/Icon/Surface pages any more.
export const Foreground = () => <Category cat="foreground" />;
export const Fill = () => <Category cat="fill" />;
export const Stroke = () => <Category cat="stroke" />;
export const Scrim = () => <Category cat="scrim" />;

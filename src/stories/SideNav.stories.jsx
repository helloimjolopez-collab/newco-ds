import React from "react";
// Side-effect import: registers <newco-side-nav> and <newco-side-nav-item>.
import "../components/side-nav/newco-side-nav.js";

/**
 * Library / Side Nav
 *
 * <newco-side-nav> is a real Web Component (custom element). These stories render
 * the actual element — the same one you ship — not a React re-implementation.
 */

const DEFAULT_ITEMS = [
  { icon: "dashboard", label: "Home" },
  { icon: "groups", label: "People", expandable: true },
  { label: "Members", level: 1 },
  { label: "Households", level: 1 },
  { icon: "volunteer_activism", label: "Giving" },
  { icon: "event", label: "Calendar", expandable: true },
  { icon: "bar_chart", label: "Reporting" },
  { icon: "settings", label: "Settings", disabled: true },
];

function Backdrop({ theme, children }) {
  const bg =
    theme === "midnight"
      ? "var(--semantic-color-midnight-mode-fill-surface-canvas)"
      : "var(--semantic-color-light-mode-fill-surface-canvas)";
  return (
    <div style={{ display: "flex", height: "560px", background: bg }}>
      {children}
      <div style={{ flex: 1 }} />
    </div>
  );
}

function SideNav({ theme = "light", collapsed = false, elevated = false, activeIndex = 1, brand = "NewCo", items = DEFAULT_ITEMS }) {
  const ref = React.useRef(null);
  // Log selection so the Actions panel shows the event contract.
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onSel = (e) => console.log("newco-select", e.detail.value);
    el.addEventListener("newco-select", onSel);
    return () => el.removeEventListener("newco-select", onSel);
  }, []);
  return (
    <Backdrop theme={theme}>
      <newco-side-nav ref={ref} theme={theme} {...(collapsed ? { collapsed: true } : {})} {...(elevated ? { elevated: true } : {})} label="Primary">
        <div slot="header" style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 6px", minWidth: 0 }}>
          <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 26, color: "var(--semantic-color-light-mode-fill-action-selection-indicator)" }}>
            hub
          </span>
          {!collapsed && <strong style={{ font: "600 15px 'Red Hat Text',sans-serif", color: "var(--newco-nav-item-fg-selected)" }}>{brand}</strong>}
        </div>
        {items.map((it, i) => (
          <newco-side-nav-item
            key={it.label + i}
            {...(it.icon ? { icon: it.icon } : {})}
            label={it.label}
            {...(it.level ? { level: it.level } : {})}
            {...(it.expandable ? { expandable: true } : {})}
            {...(it.disabled ? { disabled: true } : {})}
            {...(i === activeIndex ? { active: true } : {})}
          />
        ))}
      </newco-side-nav>
    </Backdrop>
  );
}

export default {
  title: "Library/Side Nav",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "App side navigation as a framework-agnostic Web Component. Icon + label items, an active state with a brand indicator, a collapsible icon rail, and Light/Midnight theming — all driven by NewCo tokens. See docs/side-nav.md for how to absorb it into any stack.",
      },
    },
  },
  argTypes: {
    theme: { control: { type: "inline-radio" }, options: ["light", "midnight"], description: "Colour mode" },
    collapsed: { control: "boolean", description: "Icon-only rail" },
    elevated: { control: "boolean", description: "Floating/overlay presentation (overlay elevation shadow)" },
    activeIndex: { control: { type: "number", min: 0, max: 5 }, description: "Which item is current" },
    brand: { control: "text" },
  },
  args: { theme: "light", collapsed: false, elevated: false, activeIndex: 1, brand: "NewCo" },
};

// First story = Playground ("Try it"), per docs/storybook-authoring.md.
export const Playground = {
  render: (args) => <SideNav {...args} />,
};

export const Collapsed = {
  args: { collapsed: true },
  render: (args) => <SideNav {...args} />,
};

export const Midnight = {
  args: { theme: "midnight" },
  render: (args) => <SideNav {...args} />,
};

// The rail as a floating overlay/drawer — carries the overlay elevation shadow.
export const Overlay = {
  name: "Overlay (elevated)",
  args: { elevated: true },
  parameters: {
    docs: {
      description: {
        story:
          "Use `elevated` when the rail floats over content (a drawer, or the mobile overlay). It lifts off the canvas with the `--elevation-overlay` token and drops its flush divider — matching the demo's drawer.",
      },
    },
  },
  render: (args) => (
    <div style={{ position: "relative", height: 560, background: "var(--semantic-color-light-mode-fill-surface-elevated-sheet)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, padding: 40, color: "#8a8080", font: "600 22px 'Red Hat Text',sans-serif" }}>Page content behind the drawer…</div>
      <div style={{ position: "absolute", insetBlock: 0, insetInlineStart: 0, width: 260 }}>
        <SideNav {...args} />
      </div>
    </div>
  ),
};

export const LightAndMidnight = {
  name: "Light + Midnight",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: 24, flexWrap: "wrap", background: "#eae6e6" }}>
      <div style={{ width: 260, height: 520 }}><SideNav theme="light" /></div>
      <div style={{ width: 260, height: 520 }}><SideNav theme="midnight" /></div>
    </div>
  ),
};

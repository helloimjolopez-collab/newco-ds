import React from "react";
// Side-effect import: registers <newco-side-nav>, <newco-side-nav-item>, <newco-side-nav-group>.
import "../components/side-nav/newco-side-nav.js";

/**
 * Library / Side Nav
 *
 * A real Web Component (custom element) — the same one you ship. Destinations
 * (<newco-side-nav-item>) select/navigate; groupers (<newco-side-nav-group>)
 * expand/collapse a contained group. Collapsed, a grouper reveals a flyout.
 */

// A small, on-brand logo mark (not a random icon): a rounded brand tile + wordmark.
function Logo({ collapsed }) {
  return (
    <div slot="header" style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 6px", minWidth: 0 }}>
      <span aria-hidden style={{
        width: 28, height: 28, borderRadius: 8, flex: "0 0 auto", display: "grid", placeItems: "center",
        background: "var(--semantic-color-fill-action-primary-rest)",
        color: "#fff", font: "700 15px 'Google Sans Flex',sans-serif",
      }}>N</span>
      {!collapsed && <strong style={{ font: "700 16px 'Google Sans Flex',sans-serif", letterSpacing: "-0.2px", color: "var(--newco-nav-item-fg-selected)" }}>NewCo</strong>}
    </div>
  );
}

/**
 * Stateful wrapper so the stories actually WORK: clicking a destination sets it
 * active; clicking a grouper toggles it open; the header button collapses the rail.
 */
function SideNav({ theme = "light", collapsed: collapsedArg = false, elevated = false }) {
  const ref = React.useRef(null);
  const [collapsed, setCollapsed] = React.useState(collapsedArg);
  const [active, setActive] = React.useState("home");
  const [open, setOpen] = React.useState({ people: true, calendar: false });
  React.useEffect(() => setCollapsed(collapsedArg), [collapsedArg]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onSel = (e) => { setActive(e.detail.value); console.log("newco-select", e.detail.value); };
    const onTog = (e) => { setOpen((o) => ({ ...o, [e.detail.value]: e.detail.expanded })); };
    el.addEventListener("newco-select", onSel);
    el.addEventListener("newco-toggle", onTog);
    return () => { el.removeEventListener("newco-select", onSel); el.removeEventListener("newco-toggle", onTog); };
  }, []);

  const A = (v) => (active === v ? { active: true } : {});

  // data-theme on the wrapper resolves the modeless canvas colour for the backdrop.
  return (
    <div data-theme={theme} style={{ display: "flex", height: 620, background: "var(--semantic-color-fill-surface-canvas)" }}>
      <newco-side-nav ref={ref} theme={theme} label="Primary" {...(collapsed ? { collapsed: true } : {})} {...(elevated ? { elevated: true } : {})}>
        <div slot="header" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", gap: 8 }}>
          <Logo collapsed={collapsed} />
          <button onClick={() => setCollapsed((c) => !c)} aria-label="Collapse" title="Collapse"
            style={{ flex: "0 0 auto", width: 32, height: 32, display: "grid", placeItems: "center", border: 0, borderRadius: 8, background: "transparent", cursor: "pointer", color: "var(--newco-nav-item-fg)" }}>
            <span className="material-symbols-rounded" aria-hidden style={{ fontSize: 20 }}>{collapsed ? "menu" : "menu_open"}</span>
          </button>
        </div>

        <newco-side-nav-item icon="dashboard" label="Home" value="home" {...A("home")} />

        <newco-side-nav-group icon="groups" label="People" value="people" {...(open.people ? { expanded: true } : {})}>
          <newco-side-nav-item label="Members" value="members" level={1} {...A("members")} />
          <newco-side-nav-item label="Households" value="households" level={1} {...A("households")} />
          <newco-side-nav-item label="Directory" value="directory" level={1} {...A("directory")} />
        </newco-side-nav-group>

        <newco-side-nav-item icon="volunteer_activism" label="Giving" value="giving" {...A("giving")} />

        <newco-side-nav-group icon="event" label="Calendar" value="calendar" {...(open.calendar ? { expanded: true } : {})}>
          <newco-side-nav-item label="Events" value="events" level={1} {...A("events")} />
          <newco-side-nav-item label="Registrations" value="registrations" level={1} {...A("registrations")} />
        </newco-side-nav-group>

        <newco-side-nav-item icon="bar_chart" label="Reporting" value="reporting" {...A("reporting")} />
        <newco-side-nav-item icon="settings" label="Settings" value="settings" disabled />
      </newco-side-nav>
      <div style={{ flex: 1 }} />
    </div>
  );
}

export default {
  title: "Library/Side Nav",
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "App side navigation as a framework-agnostic Web Component. Destinations select; groupers expand/collapse a contained group (Trail state) and, when the rail is collapsed, reveal a flyout of their items. Light/Midnight via one attribute; everything is token-driven. See docs/side-nav.md." } },
  },
  argTypes: {
    theme: { control: { type: "inline-radio" }, options: ["light", "midnight"], description: "Colour mode" },
    collapsed: { control: "boolean", description: "Icon-only rail (hover a group for its flyout)" },
    elevated: { control: "boolean", description: "Floating/overlay presentation (overlay shadow)" },
  },
  args: { theme: "light", collapsed: false, elevated: false },
};

export const Playground = { render: (a) => <SideNav {...a} /> };
export const Collapsed = { name: "Collapsed (hover a group)", args: { collapsed: true }, render: (a) => <SideNav {...a} /> };
export const Midnight = { args: { theme: "midnight" }, render: (a) => <SideNav {...a} /> };

export const LightAndMidnight = {
  name: "Light + Midnight",
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: "flex", gap: 24, padding: 24, flexWrap: "wrap", background: "#eae6e6" }}>
      <div style={{ width: 260, height: 600 }}><SideNav theme="light" /></div>
      <div style={{ width: 260, height: 600 }}><SideNav theme="midnight" /></div>
    </div>
  ),
};

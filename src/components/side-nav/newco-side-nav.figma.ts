/**
 * Figma Code Connect — maps the Figma "SideNav" components to the shipped
 * <newco-side-nav> / <newco-side-nav-item> web components, so Figma Dev Mode
 * shows the real code snippet for the selected layer.
 *
 * Publish with a Figma access token that can write to the file:
 *   FIGMA_TOKEN=figd_… npx figma connect publish
 * (dry run: `npx figma connect publish --dry-run`)
 */
import figma, { html } from "@figma/code-connect/html";

// ── SideNav.Container ───────────────────────────────────────────────────────
figma.connect("https://www.figma.com/design/zbfRuhk4GeEXSA3D1s7hmu?node-id=40004059-1375", {
  props: {
    // "Collapsed" and "Collapsed.Stroked" modes → the icon-only rail.
    collapsed: figma.enum("Mode", {
      Base: false,
      Stroked: false,
      "Mobile.Base": false,
      "Mobile.Stroked": false,
      Collapsed: true,
      "Collapsed.Stroked": true,
    }),
    items: figma.children("*"),
  },
  example: ({ collapsed, items }) => html`
    <newco-side-nav label="Primary" theme="light" collapsed=${collapsed}>
      <span slot="brand">
        <span class="material-symbols-rounded">hub</span>
        <span class="brand-text">NewCo</span>
      </span>
      ${items}
    </newco-side-nav>
  `,
});

// ── SideNavItem ─────────────────────────────────────────────────────────────
figma.connect("https://www.figma.com/design/zbfRuhk4GeEXSA3D1s7hmu?node-id=40003954-284", {
  props: {
    label: figma.textContent("Nav Label"),
    level: figma.enum("NestingLevel", { "0": 0, "1": 1 }),
    active: figma.enum("State", {
      Base: false,
      Hovered: false,
      Active: true,
      "Trail (Expand-Collapse)": false,
    }),
  },
  example: ({ label, level, active }) => html`
    <newco-side-nav-item
      icon="home"
      label=${label}
      level=${level}
      active=${active}
    ></newco-side-nav-item>
  `,
});

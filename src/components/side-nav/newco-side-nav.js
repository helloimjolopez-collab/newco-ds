/**
 * <newco-side-nav> — NewCo Design System side navigation.
 *
 * A framework-agnostic Web Component (Lit) that renders a vertical app nav rail.
 * It is styled entirely from NewCo tokens (the `--semantic-color-*` and
 * `--contextual-layout-units-*` custom properties shipped in
 * `@helloimjolopez-newco/newco-tokens/css`), so it themes with the rest of your
 * product and needs no CSS of its own.
 *
 * Works in React, Vue, Angular, Blazor/Radzen and plain HTML: attributes in,
 * DOM events out.
 *
 *   import "@helloimjolopez-newco/newco-tokens/components/side-nav";
 *
 *   <newco-side-nav label="Primary" theme="light">
 *     <newco-side-nav-item icon="home" label="Home" active></newco-side-nav-item>
 *     <newco-side-nav-item icon="groups" label="People"></newco-side-nav-item>
 *     <newco-side-nav-item icon="settings" label="Settings"></newco-side-nav-item>
 *   </newco-side-nav>
 *
 * Theming: set `theme="midnight"` on <newco-side-nav> (or drive it from your
 * app's theme). The role custom properties are declared once on the container
 * and inherited by the items, so one attribute flips the whole rail.
 *
 * Collapse: set the `collapsed` attribute (or call `.toggle()`). The rail shrinks
 * to an icon rail; labels are hidden but kept accessible via `title`/aria-label.
 *
 * Events: an item click emits `newco-select` (bubbles, composed) with
 * `detail: { value, label, item }`. `preventDefault()` is respected for links.
 */
import { LitElement, html, css, nothing } from "lit";

/* Map NewCo semantic/contextual tokens onto stable role properties, declared on
   the container so slotted <newco-side-nav-item> inherit them. Light by default;
   midnight when the host (or an ancestor via data-theme) is midnight. Each role
   falls back to the theme-agnostic alias from theme.css when present, else the
   explicit light-mode token, so the component works with or without theme.css. */
const ROLE_VARS = (mode) => `
  --newco-nav-surface: var(--semantic-color-${mode}-mode-fill-surface-canvas-base);
  --newco-nav-border: var(--semantic-color-${mode}-mode-stroke-static-neutral-subtle);
  --newco-nav-item-fg: var(--semantic-color-${mode}-mode-foreground-action-selection-base);
  --newco-nav-item-fg-hover: var(--semantic-color-${mode}-mode-foreground-action-selection-hover);
  --newco-nav-item-fg-selected: var(--semantic-color-${mode}-mode-foreground-action-selection-selected);
  --newco-nav-item-fg-disabled: var(--semantic-color-${mode}-mode-foreground-action-selection-disabled);
  --newco-nav-item-bg-hover: var(--semantic-color-${mode}-mode-fill-action-selection-hover);
  --newco-nav-item-bg-selected: var(--semantic-color-${mode}-mode-fill-action-selection-selected);
  --newco-nav-item-bg-trail: var(--semantic-color-${mode}-mode-fill-action-selection-trail);
  --newco-nav-indicator: var(--semantic-color-${mode}-mode-fill-action-selection-indicator);
  --newco-nav-focus: var(--semantic-color-${mode}-mode-stroke-focusring-base);
`;

export class NewcoSideNav extends LitElement {
  static properties = {
    collapsed: { type: Boolean, reflect: true },
    theme: { type: String, reflect: true },
    label: { type: String },
  };

  constructor() {
    super();
    this.collapsed = false;
    this.theme = "light";
    this.label = "Primary navigation";
  }

  static styles = css`
    :host {
      ${/* light is the default role set */ ""}
      display: block;
      box-sizing: border-box;
      inline-size: var(--newco-nav-width, 260px);
      block-size: 100%;
      font-family: "Red Hat Text", system-ui, -apple-system, sans-serif;
    }
    /* role tokens — light default, midnight override (attribute or ancestor) */
    :host { ${""} }
    .rail {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: var(--contextual-layout-units-navitem-gap-icontolabel, 8px);
      block-size: 100%;
      padding: var(--contextual-layout-units-page-padding-top, 12px)
        var(--newco-nav-pad-x, 12px);
      background: var(--newco-nav-surface, #f7f3f3);
      border-inline-end: var(--semantic-layout-units-borderwidth-base, 1px) solid
        var(--newco-nav-border, rgba(0, 0, 0, 0.08));
      transition: inline-size 160ms ease;
      overflow: hidden;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      min-block-size: 44px;
      padding: 4px 6px 10px;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      min-inline-size: 0;
      color: var(--newco-nav-item-fg-selected, #1b1822);
      font-weight: 600;
      font-size: 15px;
      white-space: nowrap;
      overflow: hidden;
    }
    nav {
      display: flex;
      flex-direction: column;
      gap: 2px;
      overflow-y: auto;
      overflow-x: hidden;
      flex: 1 1 auto;
    }
    .toggle {
      appearance: none;
      border: 0;
      background: transparent;
      color: var(--newco-nav-item-fg, #524e59);
      inline-size: 32px;
      block-size: 32px;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      flex: 0 0 auto;
    }
    .toggle:hover {
      background: var(--newco-nav-item-bg-hover, rgba(0, 0, 0, 0.05));
      color: var(--newco-nav-item-fg-hover, #1b1822);
    }
    .toggle:focus-visible {
      outline: 2px solid var(--newco-nav-focus, #827ad9);
      outline-offset: 1px;
    }
    .material-symbols-rounded {
      font-family: "Material Symbols Rounded";
      font-weight: normal;
      font-style: normal;
      font-size: 22px;
      line-height: 1;
      letter-spacing: normal;
      white-space: nowrap;
      -webkit-font-feature-settings: "liga";
      font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
    }
    :host([collapsed]) { --newco-nav-width: 72px; }
    :host([collapsed]) .brand > .brand-text { display: none; }
  `;

  /* Emit midnight role tokens when theme=midnight (or a data-theme ancestor). */
  _themeStyle() {
    const mode = this.theme === "midnight" ? "midnight" : "light";
    return html`<style>
      :host { ${ROLE_VARS(mode)} }
    </style>`;
  }

  toggle() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(
      new CustomEvent("newco-collapse", {
        detail: { collapsed: this.collapsed },
        bubbles: true,
        composed: true,
      })
    );
  }

  _syncChildren() {
    for (const el of this.querySelectorAll("newco-side-nav-item")) {
      el.collapsed = this.collapsed;
    }
  }

  updated(changed) {
    if (changed.has("collapsed")) this._syncChildren();
  }

  render() {
    return html`
      ${this._themeStyle()}
      <div class="rail" part="rail">
        <div class="header" part="header">
          <span class="brand"><slot name="brand"></slot></span>
          <button
            class="toggle"
            part="toggle"
            type="button"
            aria-label=${this.collapsed ? "Expand navigation" : "Collapse navigation"}
            aria-expanded=${this.collapsed ? "false" : "true"}
            @click=${() => this.toggle()}
          >
            <span class="material-symbols-rounded" aria-hidden="true"
              >${this.collapsed ? "chevron_right" : "chevron_left"}</span
            >
          </button>
        </div>
        <nav part="nav" aria-label=${this.label}>
          <slot @slotchange=${() => this._syncChildren()}></slot>
        </nav>
      </div>
    `;
  }
}

export class NewcoSideNavItem extends LitElement {
  static properties = {
    icon: { type: String },
    label: { type: String },
    active: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    collapsed: { type: Boolean, reflect: true },
    href: { type: String },
    level: { type: Number, reflect: true },
    value: { type: String },
  };

  constructor() {
    super();
    this.active = false;
    this.disabled = false;
    this.collapsed = false;
    this.level = 0;
  }

  static styles = css`
    :host {
      display: block;
    }
    .item {
      position: relative;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: var(--contextual-layout-units-navitem-gap-icontolabel, 8px);
      inline-size: 100%;
      min-block-size: 40px;
      padding: var(--contextual-layout-units-navitem-large-padding-vertical, 10px)
        var(--contextual-layout-units-navitem-large-padding-horizontal, 14px);
      border: 0;
      border-radius: var(--contextual-layout-units-navitem-large-radius-radius, 999px);
      background: transparent;
      color: var(--newco-nav-item-fg, #524e59);
      font: inherit;
      font-family: "Red Hat Text", system-ui, sans-serif;
      font-size: 14px;
      font-weight: 500;
      text-align: start;
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
      transition: background 120ms ease, color 120ms ease;
    }
    /* nesting indent (level 1 destinations sit under a group) */
    :host([level="1"]) .item { padding-inline-start: 34px; }
    .icon {
      flex: 0 0 auto;
      display: inline-flex;
      color: inherit;
    }
    .label {
      min-inline-size: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .indicator {
      position: absolute;
      inset-inline-start: 0;
      inset-block: 8px;
      inline-size: 3px;
      border-radius: 3px;
      background: var(--newco-nav-indicator, #6e64be);
      opacity: 0;
    }
    .item:hover {
      background: var(--newco-nav-item-bg-hover, rgba(0, 0, 0, 0.05));
      color: var(--newco-nav-item-fg-hover, #1b1822);
    }
    .item:focus-visible {
      outline: 2px solid var(--newco-nav-focus, #827ad9);
      outline-offset: -2px;
    }
    :host([active]) .item {
      background: var(--newco-nav-item-bg-selected, #dddbfa);
      color: var(--newco-nav-item-fg-selected, #1b1822);
      font-weight: 600;
    }
    :host([active]) .indicator { opacity: 1; }
    :host([disabled]) .item {
      color: var(--newco-nav-item-fg-disabled, rgba(0, 0, 0, 0.35));
      cursor: not-allowed;
      pointer-events: none;
    }
    .material-symbols-rounded {
      font-family: "Material Symbols Rounded";
      font-size: 22px;
      line-height: 1;
      font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
    }
    /* collapsed rail: icon only, centered; label removed from flow */
    :host([collapsed]) .item { justify-content: center; padding-inline: 0; }
    :host([collapsed]) .label { display: none; }
    :host([collapsed]) .indicator { inset-block: 6px; }
  `;

  _onClick(e) {
    if (this.disabled) {
      e.preventDefault();
      return;
    }
    const ev = new CustomEvent("newco-select", {
      detail: { value: this.value ?? this.label, label: this.label, item: this },
      bubbles: true,
      composed: true,
      cancelable: true,
    });
    const ok = this.dispatchEvent(ev);
    if (!ok) e.preventDefault(); // consumer called preventDefault → block navigation
  }

  render() {
    const inner = html`
      <span class="indicator" aria-hidden="true"></span>
      ${this.icon
        ? html`<span class="icon material-symbols-rounded" aria-hidden="true">${this.icon}</span>`
        : nothing}
      <span class="label">${this.label}</span>
      <slot></slot>
    `;
    const title = this.collapsed ? this.label : nothing;
    return this.href && !this.disabled
      ? html`<a
          class="item"
          part="item"
          href=${this.href}
          title=${title || nothing}
          aria-current=${this.active ? "page" : nothing}
          @click=${this._onClick}
          >${inner}</a
        >`
      : html`<button
          class="item"
          part="item"
          type="button"
          ?disabled=${this.disabled}
          title=${title || nothing}
          aria-current=${this.active ? "page" : nothing}
          @click=${this._onClick}
        >
          ${inner}
        </button>`;
  }
}

if (!customElements.get("newco-side-nav")) customElements.define("newco-side-nav", NewcoSideNav);
if (!customElements.get("newco-side-nav-item"))
  customElements.define("newco-side-nav-item", NewcoSideNavItem);

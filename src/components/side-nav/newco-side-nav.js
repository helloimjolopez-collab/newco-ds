/**
 * <newco-side-nav> — NewCo Design System side navigation.
 *
 * A framework-agnostic Web Component (Lit) that is a faithful build of the Figma
 * "SideNav.Container" + "SideNavItem" components. Every colour, size and radius
 * comes from NewCo tokens (`--semantic-color-*`, `--contextual-layout-units-*`,
 * `--elevation-*`), so it matches Figma 1:1 and themes Light ↔ Midnight.
 *
 *   import "@helloimjolopez-newco/newco-tokens/components/side-nav";
 *
 *   <newco-side-nav label="Primary" theme="light">
 *     <div slot="header">…logo / module switcher…</div>
 *     <newco-side-nav-item icon="dashboard" label="Home" active></newco-side-nav-item>
 *     <newco-side-nav-item icon="groups" label="People" expandable></newco-side-nav-item>
 *     <newco-side-nav-item label="A nested destination" level="1"></newco-side-nav-item>
 *   </newco-side-nav>
 *
 * Anatomy (from Figma): container = Fill/Surface/Canvas/Base panel, 260px wide
 * (84px collapsed), a `header` slot + the item list. Each item is a 44px row with
 * a full-radius (999) pill — transparent at rest, Fill/Action/Selection/Hover on
 * hover, Fill/Action/Selection/Selected when active with a 4px brand indicator
 * stripe on the leading edge. Leading icon + label use Foreground/Action/Selection.
 * Collapsed items stack a larger icon over a small 2-line label. Level-1 items are
 * indented with no icon.
 *
 * Theme: set `theme="midnight"`. Collapse: set `collapsed`. Float over content:
 * set `elevated` (overlay elevation). Bordered rail: set `stroked`.
 * Item click emits `newco-select` (bubbles, composed): detail { value, label, item }.
 */
import { LitElement, html, css, nothing } from "lit";

const ROLE_VARS = (mode) => {
  const elev = mode === "midnight" ? "--elevation-midnight-overlay" : "--elevation-overlay";
  return `
  --newco-nav-surface: var(--semantic-color-${mode}-mode-fill-surface-canvas);
  --newco-nav-border: var(--semantic-color-${mode}-mode-stroke-static-neutral-subtle);
  --newco-nav-item-fg: var(--semantic-color-${mode}-mode-foreground-action-selection-base);
  --newco-nav-item-fg-hover: var(--semantic-color-${mode}-mode-foreground-action-selection-hover);
  --newco-nav-item-fg-selected: var(--semantic-color-${mode}-mode-foreground-action-selection-selected);
  --newco-nav-item-fg-disabled: var(--semantic-color-${mode}-mode-foreground-action-selection-disabled);
  --newco-nav-item-bg-hover: var(--semantic-color-${mode}-mode-fill-action-selection-hover);
  --newco-nav-item-bg-selected: var(--semantic-color-${mode}-mode-fill-action-selection-selected);
  --newco-nav-indicator: var(--semantic-color-${mode}-mode-fill-action-selection-indicator);
  --newco-nav-focus: var(--semantic-color-${mode}-mode-stroke-focusring-base);
  --newco-nav-shadow: var(${elev});
`;
};

export class NewcoSideNav extends LitElement {
  static properties = {
    collapsed: { type: Boolean, reflect: true },
    elevated: { type: Boolean, reflect: true },
    stroked: { type: Boolean, reflect: true },
    theme: { type: String, reflect: true },
    label: { type: String },
  };

  constructor() {
    super();
    this.collapsed = false;
    this.elevated = false;
    this.stroked = false;
    this.theme = "light";
    this.label = "Primary navigation";
  }

  static styles = css`
    :host {
      display: block;
      box-sizing: border-box;
      inline-size: var(--newco-nav-width, 260px);
      block-size: 100%;
      font-family: "Red Hat Text", system-ui, -apple-system, sans-serif;
    }
    .rail {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      block-size: 100%;
      /* Figma: padding 8 (top) / 16 (sides) / 56 (bottom); gap 0 between items. */
      padding: 8px 16px 56px;
      background: var(--newco-nav-surface, #f7f3f3);
      transition: inline-size 160ms ease;
      overflow: hidden;
    }
    .header {
      min-block-size: 44px;
      display: flex;
      align-items: center;
    }
    .header:not(.has-content) { display: none; }
    nav {
      display: flex;
      flex-direction: column;
      gap: 0;
      overflow-y: auto;
      overflow-x: hidden;
      flex: 1 1 auto;
      scrollbar-width: none;
    }
    nav::-webkit-scrollbar { width: 0; height: 0; }
    :host([stroked]) .rail {
      border-inline-end: var(--semantic-layout-units-borderwidth-base, 1px) solid
        var(--newco-nav-border, rgba(0, 0, 0, 0.08));
    }
    :host([collapsed]) { --newco-nav-width: 84px; }
    :host([collapsed]) .rail { padding-inline: 12px; }
    /* Overlay / drawer: lift with the overlay elevation, no flush divider. */
    :host([elevated]) .rail {
      box-shadow: var(--newco-nav-shadow);
      border-inline-end: 0;
    }
  `;

  _themeStyle() {
    const mode = this.theme === "midnight" ? "midnight" : "light";
    return html`<style>:host{${ROLE_VARS(mode)}}</style>`;
  }

  toggle() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(
      new CustomEvent("newco-collapse", { detail: { collapsed: this.collapsed }, bubbles: true, composed: true })
    );
  }

  _syncChildren() {
    for (const el of this.querySelectorAll("newco-side-nav-item")) el.collapsed = this.collapsed;
    // hide the header slot wrapper when nothing is slotted into it
    const hdr = this.renderRoot?.querySelector(".header");
    const slot = hdr?.querySelector('slot[name="header"]');
    if (hdr && slot) hdr.classList.toggle("has-content", slot.assignedNodes({ flatten: true }).length > 0);
  }

  updated(changed) {
    if (changed.has("collapsed")) this._syncChildren();
  }

  render() {
    return html`
      ${this._themeStyle()}
      <div class="rail" part="rail">
        <div class="header" part="header">
          <slot name="header" @slotchange=${() => this._syncChildren()}></slot>
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
    expandable: { type: Boolean, reflect: true },
    expanded: { type: Boolean, reflect: true },
    href: { type: String },
    level: { type: Number, reflect: true },
    value: { type: String },
  };

  constructor() {
    super();
    this.active = false;
    this.disabled = false;
    this.collapsed = false;
    this.expandable = false;
    this.expanded = false;
    this.level = 0;
  }

  static styles = css`
    :host { display: block; }
    /* Figma SideNavItem: a 44px row = [4px indicator gutter] + 4px gap + pill.
       The pill (Container.Main) carries the hover/selected fill + 999 radius and
       is inset from the item edge; the stripe sits OUTSIDE the pill in the gutter. */
    .item {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 4px;
      inline-size: 100%;
      min-block-size: 44px;
      padding: 4px 0;
      border: 0;
      background: transparent;
      color: var(--newco-nav-item-fg, #524e59);
      font-family: "Red Hat Text", system-ui, sans-serif;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.35;
      text-align: start;
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
    }
    /* 4px-wide gutter column; the short stripe is vertically centred within it. */
    .indicator {
      flex: 0 0 4px;
      inline-size: 4px;
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    .stripe {
      inline-size: 4px;
      block-size: 16px;
      border-radius: 0 4px 4px 0;
      background: var(--newco-nav-indicator, #6e64be);
      opacity: 0;
    }
    :host([active]) .stripe { opacity: 1; }
    /* The pill = Container.Main: the fill + radius live here, not on the row. */
    .pill {
      flex: 1 1 auto;
      min-inline-size: 0;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      gap: 6px;
      min-block-size: 36px;
      padding-inline: 8px;
      border-radius: 999px;
      background: transparent;
      transition: background 120ms ease, color 120ms ease;
    }
    /* Level-1 (nested): no icon, label indented to line up under the parent label. */
    :host([level="1"]) .pill { padding-inline-start: 38px; }
    .lead {
      flex: 0 0 auto;
      inline-size: 24px;
      block-size: 24px;
      display: grid;
      place-items: center;
      color: inherit;
    }
    .lead .material-symbols-rounded { font-size: 20px; }
    .label {
      flex: 1 1 auto;
      min-inline-size: 0;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .chev {
      flex: 0 0 auto;
      display: inline-flex;
      color: inherit;
      transition: transform 140ms ease;
    }
    .chev .material-symbols-rounded { font-size: 18px; }
    :host([expanded]) .chev { transform: rotate(180deg); }
    .material-symbols-rounded {
      font-family: "Material Symbols Rounded";
      line-height: 1;
      font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
      user-select: none;
    }
    .item:hover .pill {
      background: var(--newco-nav-item-bg-hover, rgba(0, 0, 0, 0.05));
    }
    .item:hover { color: var(--newco-nav-item-fg-hover, #1b1822); }
    .item:focus-visible { outline: none; }
    .item:focus-visible .pill {
      outline: 2px solid var(--newco-nav-focus, #827ad9);
      outline-offset: -2px;
    }
    :host([active]) .pill {
      background: var(--newco-nav-item-bg-selected, #dddbfa);
    }
    :host([active]) .item {
      color: var(--newco-nav-item-fg-selected, #1b1822);
      font-weight: 600;
    }
    :host([disabled]) .item {
      color: var(--newco-nav-item-fg-disabled, rgba(0, 0, 0, 0.35));
      cursor: not-allowed;
      pointer-events: none;
    }
    /* Collapsed rail: no gutter; icon over a small 2-line label, centred pill. */
    :host([collapsed]) .indicator { display: none; }
    :host([collapsed]) .pill {
      flex-direction: column;
      gap: 4px;
      padding: 6px 2px;
      min-block-size: 44px;
      justify-content: center;
      text-align: center;
      white-space: normal;
    }
    :host([collapsed]) .lead .material-symbols-rounded { font-size: 22px; }
    :host([collapsed]) .label {
      flex: none;
      inline-size: 100%;
      font-size: 10px;
      line-height: 1.15;
      font-weight: 500;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    :host([collapsed]) .chev { display: none; }
  `;

  _onClick(e) {
    if (this.disabled) { e.preventDefault(); return; }
    if (this.expandable) this.expanded = !this.expanded;
    const ev = new CustomEvent("newco-select", {
      detail: { value: this.value ?? this.label, label: this.label, item: this, expanded: this.expanded },
      bubbles: true, composed: true, cancelable: true,
    });
    if (!this.dispatchEvent(ev)) e.preventDefault();
  }

  render() {
    const showIcon = this.icon && this.level !== 1;
    const inner = html`
      <span class="indicator" aria-hidden="true"><span class="stripe"></span></span>
      <span class="pill">
        ${showIcon
          ? html`<span class="lead"><span class="material-symbols-rounded" aria-hidden="true">${this.icon}</span></span>`
          : nothing}
        <span class="label">${this.label}</span>
        ${this.expandable && !this.collapsed
          ? html`<span class="chev"><span class="material-symbols-rounded" aria-hidden="true">expand_more</span></span>`
          : nothing}
      </span>
    `;
    const title = this.collapsed ? this.label : nothing;
    return this.href && !this.disabled
      ? html`<a class="item" part="item" href=${this.href} title=${title || nothing}
          aria-current=${this.active ? "page" : nothing} aria-expanded=${this.expandable ? String(this.expanded) : nothing}
          @click=${this._onClick}>${inner}</a>`
      : html`<button class="item" part="item" type="button" ?disabled=${this.disabled} title=${title || nothing}
          aria-current=${this.active ? "page" : nothing} aria-expanded=${this.expandable ? String(this.expanded) : nothing}
          @click=${this._onClick}>${inner}</button>`;
  }
}

if (!customElements.get("newco-side-nav")) customElements.define("newco-side-nav", NewcoSideNav);
if (!customElements.get("newco-side-nav-item")) customElements.define("newco-side-nav-item", NewcoSideNavItem);

/**
 * <newco-side-nav> — NewCo Design System side navigation (Web Component / Lit).
 *
 * A faithful, framework-agnostic build of the NewCo demo's local side nav. Every
 * colour, size and radius comes from NewCo tokens (`--semantic-color-*`,
 * `--contextual-layout-units-*`, `--elevation-*`, `--primitive-type-family-brand`),
 * so it matches the demo and flips Light <-> Midnight with one attribute.
 *
 * Two kinds of row, exactly as the demo:
 *   • <newco-side-nav-item>  — a DESTINATION. Clicking navigates / selects it
 *                              (active + pressed states). Fires `newco-select`.
 *   • <newco-side-nav-group> — a GROUPER. Clicking expands/collapses the group
 *                              it contains (Trail state while open); it does NOT
 *                              navigate. Fires `newco-toggle`. Its children are
 *                              its default slot. When the rail is collapsed,
 *                              hovering a group opens a flyout listing its items.
 *
 *   import "@helloimjolopez-newco/newco-tokens/components/side-nav";
 *
 *   <newco-side-nav label="Primary" theme="light">
 *     <div slot="header">…logo…</div>
 *     <newco-side-nav-item icon="dashboard" label="Home" active></newco-side-nav-item>
 *     <newco-side-nav-group icon="groups" label="People" expanded>
 *       <newco-side-nav-item label="Members"></newco-side-nav-item>
 *       <newco-side-nav-item label="Households"></newco-side-nav-item>
 *     </newco-side-nav-group>
 *   </newco-side-nav>
 */
import { LitElement, html, css, nothing } from "lit";

// Role vars are MODELESS: they point at the one-name-per-token contract, and the
// theme is chosen by the `data-theme` attribute the container reflects onto itself
// (see NewcoSideNav.updated). The loaded themes/*.css then resolve every
// --semantic-color-* and --elevation-* to the Light or Midnight value, which
// inherits into the slotted items. No mode-in-name property is referenced.
const ROLE_VARS = `
  --newco-nav-surface: var(--semantic-color-contextual-fill-surface-chrome);
  --newco-nav-border: var(--semantic-color-stroke-static-neutral-subtle);
  --newco-nav-item-fg: var(--semantic-color-foreground-action-selection-base);
  --newco-nav-item-fg-hover: var(--semantic-color-foreground-action-selection-hover);
  --newco-nav-item-fg-selected: var(--semantic-color-foreground-action-selection-selected);
  --newco-nav-item-fg-disabled: var(--semantic-color-foreground-action-selection-disabled);
  --newco-nav-item-bg-hover: var(--semantic-color-fill-action-selection-hover);
  --newco-nav-item-bg-selected: var(--semantic-color-fill-action-selection-selected);
  --newco-nav-item-bg-trail: var(--semantic-color-fill-action-selection-trail);
  --newco-nav-indicator: var(--semantic-color-fill-action-selection-indicator);
  --newco-nav-focus: var(--semantic-color-stroke-focusring-base);
  --newco-nav-flyout-surface: var(--semantic-color-fill-surface-elevated-overlay-base);
  --newco-nav-shadow: var(--elevation-overlay);
  --newco-nav-font: var(--primitive-type-family-brand, "Google Sans Flex");
`;

// Shared row CSS used by both the destination item and the group header.
const ROW_CSS = css`
  .row {
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
    font-family: var(--newco-nav-font, "Google Sans Flex"), system-ui, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.35;
    text-align: start;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
  }
  .indicator {
    flex: 0 0 4px; inline-size: 4px; align-self: stretch;
    display: flex; align-items: center; justify-content: flex-start;
  }
  .stripe {
    inline-size: 4px; block-size: 16px; border-radius: 0 4px 4px 0;
    background: var(--newco-nav-indicator, #6e64be); opacity: 0;
  }
  .pill {
    flex: 1 1 auto; min-inline-size: 0; box-sizing: border-box;
    display: flex; align-items: center; gap: 8px;
    min-block-size: 36px; padding-inline: 8px; border-radius: 999px;
    background: transparent;
    transition: background 120ms ease, color 120ms ease;
  }
  .lead {
    flex: 0 0 auto; inline-size: 28px; block-size: 28px; border-radius: 8px;
    display: grid; place-items: center; color: inherit;
  }
  .lead .material-symbols-rounded { font-size: 20px; }
  .label { flex: 1 1 auto; min-inline-size: 0; overflow: hidden; text-overflow: ellipsis; }
  .chev { flex: 0 0 auto; display: inline-flex; color: inherit; transition: transform 160ms ease; }
  .chev .material-symbols-rounded { font-size: 18px; }
  .material-symbols-rounded {
    font-family: "Material Symbols Rounded"; line-height: 1;
    font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
    user-select: none;
  }
  .row:hover .pill { background: var(--newco-nav-item-bg-hover, rgba(0, 0, 0, 0.05)); }
  .row:hover { color: var(--newco-nav-item-fg-hover, #1b1822); }
  .row:focus-visible { outline: none; }
  .row:focus-visible .pill {
    outline: 2px solid var(--newco-nav-focus, #827ad9); outline-offset: -2px;
  }
`;

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
      display: block; box-sizing: border-box;
      inline-size: var(--newco-nav-width, 260px);
      block-size: 100%;
      font-family: var(--newco-nav-font, "Google Sans Flex"), system-ui, -apple-system, sans-serif;
    }
    .rail {
      box-sizing: border-box; display: flex; flex-direction: column; block-size: 100%;
      padding: 8px 16px 56px;
      background: var(--newco-nav-surface, #f7f3f3);
      transition: inline-size 320ms cubic-bezier(0.32, 0.72, 0, 1);
      overflow: hidden;
    }
    .header { min-block-size: 44px; display: flex; align-items: center; }
    .header:not(.has-content) { display: none; }
    nav {
      display: flex; flex-direction: column; gap: 6px;
      padding-block-start: 8px;
      overflow-y: auto; overflow-x: hidden; flex: 1 1 auto; scrollbar-width: none;
    }
    nav::-webkit-scrollbar { width: 0; height: 0; }
    :host([stroked]) .rail {
      border-inline-end: var(--semantic-layout-units-borderwidth-base, 1px) solid
        var(--newco-nav-border, rgba(0, 0, 0, 0.08));
    }
    :host([collapsed]) { --newco-nav-width: 84px; }
    :host([collapsed]) .rail { padding-inline: 12px; }
    :host([elevated]) .rail { box-shadow: var(--newco-nav-shadow); border-inline-end: 0; }
  `;

  _themeStyle() {
    // Static, modeless. The theme is selected by the data-theme attribute below.
    return html`<style>:host{${ROLE_VARS}}</style>`;
  }

  toggle() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent("newco-collapse", { detail: { collapsed: this.collapsed }, bubbles: true, composed: true }));
  }

  _syncChildren() {
    for (const el of this.querySelectorAll("newco-side-nav-item, newco-side-nav-group")) {
      // only the top-level rows follow the rail's collapsed state
      if (el.parentElement === this) el.collapsed = this.collapsed;
    }
    const hdr = this.renderRoot?.querySelector(".header");
    const slot = hdr?.querySelector('slot[name="header"]');
    if (hdr && slot) hdr.classList.toggle("has-content", slot.assignedNodes({ flatten: true }).length > 0);
  }

  updated(changed) {
    if (changed.has("collapsed")) this._syncChildren();
    // Reflect the theme to data-theme on the host so the loaded themes/*.css
    // resolve --semantic-color-* / --elevation-* to the right mode, which then
    // inherits into the slotted items. This is how the modeless contract themes.
    if (changed.has("theme")) this.setAttribute("data-theme", this.theme === "midnight" ? "midnight" : "light");
  }

  firstUpdated() { this.setAttribute("data-theme", this.theme === "midnight" ? "midnight" : "light"); }

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

  static styles = [ROW_CSS, css`
    :host { display: block; }
    :host([level="1"]) .pill { padding-inline-start: 38px; }
    :host([active]) .stripe { opacity: 1; }
    :host([active]) .pill { background: var(--newco-nav-item-bg-selected, #dddbfa); }
    :host([active]) .row { color: var(--newco-nav-item-fg-selected, #1b1822); }
    /* Pressed = momentary selected fill, distinct feedback for destinations. */
    .row:active .pill { background: var(--newco-nav-item-bg-selected, #dddbfa); }
    :host([disabled]) .row { color: var(--newco-nav-item-fg-disabled, rgba(0,0,0,.35)); cursor: not-allowed; pointer-events: none; }
    /* Collapsed rail: icon over a small 2-line label. */
    :host([collapsed]) .indicator { display: none; }
    :host([collapsed]) .pill { flex-direction: column; gap: 4px; padding: 6px 2px; min-block-size: 44px; justify-content: center; text-align: center; white-space: normal; }
    :host([collapsed]) .lead .material-symbols-rounded { font-size: 22px; }
    :host([collapsed]) .label { flex: none; inline-size: 100%; font-size: 10px; line-height: 1.15; font-weight: 500; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  `];

  _onClick(e) {
    if (this.disabled) { e.preventDefault(); return; }
    const ev = new CustomEvent("newco-select", {
      detail: { value: this.value ?? this.label, label: this.label, item: this },
      bubbles: true, composed: true, cancelable: true,
    });
    if (!this.dispatchEvent(ev)) e.preventDefault();
  }

  render() {
    const showIcon = this.icon && this.level !== 1;
    const inner = html`
      <span class="indicator" aria-hidden="true"><span class="stripe"></span></span>
      <span class="pill">
        ${showIcon ? html`<span class="lead"><span class="material-symbols-rounded" aria-hidden="true">${this.icon}</span></span>` : nothing}
        <span class="label">${this.label}</span>
      </span>`;
    const title = this.collapsed ? this.label : nothing;
    return this.href && !this.disabled
      ? html`<a class="row" part="item" href=${this.href} title=${title || nothing} aria-current=${this.active ? "page" : nothing} @click=${this._onClick}>${inner}</a>`
      : html`<button class="row" part="item" type="button" ?disabled=${this.disabled} title=${title || nothing} aria-current=${this.active ? "page" : nothing} @click=${this._onClick}>${inner}</button>`;
  }
}

export class NewcoSideNavGroup extends LitElement {
  static properties = {
    icon: { type: String },
    label: { type: String },
    expanded: { type: Boolean, reflect: true },
    collapsed: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    value: { type: String },
    _flyout: { state: true },
  };

  constructor() {
    super();
    this.expanded = false;
    this.collapsed = false;
    this.disabled = false;
    this._flyout = false;
    this._pos = { top: 0, left: 0 };
    this._closeTimer = null;
  }

  static styles = [ROW_CSS, css`
    :host { display: block; }
    /* Trail = expanded grouper: distinct pill fill + selected foreground. */
    :host([expanded]:not([collapsed])) .pill { background: var(--newco-nav-item-bg-trail, rgba(0,0,0,.035)); }
    :host([expanded]:not([collapsed])) .row { color: var(--newco-nav-item-fg-selected, #1b1822); }
    :host([expanded]:not([collapsed])) .chev { transform: rotate(180deg); }
    :host([disabled]) .row { color: var(--newco-nav-item-fg-disabled, rgba(0,0,0,.35)); cursor: not-allowed; pointer-events: none; }
    /* Children panel: indented, animated open/closed. */
    .panel {
      display: grid; grid-template-rows: 0fr;
      transition: grid-template-rows 240ms cubic-bezier(0.32,0.72,0,1);
    }
    :host([expanded]:not([collapsed])) .panel { grid-template-rows: 1fr; }
    .panel > .panel-inner { overflow: hidden; min-height: 0; display: flex; flex-direction: column; gap: 6px; padding-top: 6px; }
    /* Collapsed rail: icon over a small 2-line label, no chevron. */
    :host([collapsed]) .indicator { display: none; }
    :host([collapsed]) .pill { flex-direction: column; gap: 4px; padding: 6px 2px; min-block-size: 44px; justify-content: center; text-align: center; white-space: normal; }
    :host([collapsed]) .lead .material-symbols-rounded { font-size: 22px; }
    :host([collapsed]) .label { flex: none; inline-size: 100%; font-size: 10px; line-height: 1.15; font-weight: 500; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
    :host([collapsed]) .chev { display: none; }
    :host([collapsed]) .panel { display: none; }
    /* Collapsed flyout — a fixed panel to the right of the rail, escapes the
       rail's overflow clip. Shown on hover/focus of a collapsed group. */
    .flyout {
      position: fixed; z-index: 1000; min-inline-size: 200px; max-inline-size: 280px;
      padding: 8px; border-radius: 12px;
      background: var(--newco-nav-flyout-surface, #ffffff);
      box-shadow: var(--newco-nav-shadow);
      border: 1px solid var(--newco-nav-border, rgba(0,0,0,.08));
      font-family: var(--newco-nav-font, "Google Sans Flex"), system-ui, sans-serif;
      display: flex; flex-direction: column; gap: 4px;
    }
    .flyout-title {
      font-size: 12px; font-weight: 600; color: var(--newco-nav-item-fg-selected, #1b1822);
      padding: 4px 10px 6px;
    }
  `];

  connectedCallback() { super.connectedCallback(); }
  disconnectedCallback() { super.disconnectedCallback(); clearTimeout(this._closeTimer); }

  _toggle(e) {
    if (this.disabled) return;
    if (this.collapsed) return; // in rail mode the flyout handles reveal
    this.expanded = !this.expanded;
    this.dispatchEvent(new CustomEvent("newco-toggle", {
      detail: { value: this.value ?? this.label, label: this.label, expanded: this.expanded, group: this },
      bubbles: true, composed: true,
    }));
  }

  _openFlyout() {
    if (!this.collapsed || this.disabled) return;
    clearTimeout(this._closeTimer);
    const r = this.getBoundingClientRect();
    this._pos = { top: Math.max(8, r.top), left: r.right + 8 };
    this._flyout = true;
  }
  _closeFlyout() {
    clearTimeout(this._closeTimer);
    this._closeTimer = setTimeout(() => { this._flyout = false; }, 120);
  }

  updated(changed) {
    if (changed.has("collapsed") && !this.collapsed) this._flyout = false;
  }

  render() {
    const showIcon = !!this.icon;
    const header = html`
      <button class="row" part="item" type="button" ?disabled=${this.disabled}
        aria-expanded=${String(this.collapsed ? false : this.expanded)}
        title=${this.collapsed ? this.label : nothing}
        @click=${this._toggle}>
        <span class="indicator" aria-hidden="true"><span class="stripe"></span></span>
        <span class="pill">
          ${showIcon ? html`<span class="lead"><span class="material-symbols-rounded" aria-hidden="true">${this.icon}</span></span>` : nothing}
          <span class="label">${this.label}</span>
          <span class="chev"><span class="material-symbols-rounded" aria-hidden="true">expand_more</span></span>
        </span>
      </button>`;

    // The default slot lives in the inline panel when expanded, or in the flyout
    // when the rail is collapsed and hovered — one slot, relocated.
    const slot = html`<slot></slot>`;
    return html`
      <div part="group"
        @mouseenter=${this._openFlyout} @mouseleave=${this._closeFlyout}
        @focusin=${this._openFlyout} @focusout=${this._closeFlyout}>
        ${header}
        ${this.collapsed ? nothing : html`<div class="panel"><div class="panel-inner">${slot}</div></div>`}
        ${this.collapsed && this._flyout
          ? html`<div class="flyout" style="top:${this._pos.top}px;left:${this._pos.left}px"
              @mouseenter=${this._openFlyout} @mouseleave=${this._closeFlyout}>
              <div class="flyout-title">${this.label}</div>${slot}</div>`
          : nothing}
      </div>`;
  }
}

if (!customElements.get("newco-side-nav")) customElements.define("newco-side-nav", NewcoSideNav);
if (!customElements.get("newco-side-nav-item")) customElements.define("newco-side-nav-item", NewcoSideNavItem);
if (!customElements.get("newco-side-nav-group")) customElements.define("newco-side-nav-group", NewcoSideNavGroup);

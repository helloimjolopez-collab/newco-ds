# Side Nav — absorbing the `<newco-side-nav>` web component

`<newco-side-nav>` is the NewCo app navigation rail, shipped as a **real Web
Component** (a custom element built with Lit). It is not React-only: it runs in
React, Vue, Angular, Svelte, Blazor/Radzen and plain HTML. Attributes go in, DOM
events come out. It carries no colours of its own — every surface, text and
state colour comes from NewCo tokens, so it themes with the rest of your product
and flips Light ↔ Midnight with one attribute.

---

## 1. Install

```bash
npm i @helloimjolopez-newco/newco-tokens
```

`lit` comes along as a dependency; your bundler tree-shakes it.

## 2. Load the tokens once (app shell)

The component reads CSS custom properties from the token stylesheet. Include it
once, high up:

```html
<link rel="stylesheet" href="@helloimjolopez-newco/newco-tokens/css" />
```

or in JS/bundler land:

```js
import "@helloimjolopez-newco/newco-tokens/css";
```

Blazor / Radzen (NuGet consumers) link the static asset instead:

```html
<link rel="stylesheet" href="_content/NewCo.Tokens/newco-tokens.css" />
```

You also need the two brand fonts (Google Sans Flex + Material Symbols Rounded) —
the same `<link>`s the rest of NewCo uses. The item `icon` attribute is a
[Material Symbols](https://fonts.google.com/icons) ligature name (`home`,
`groups`, `settings`, …).

## 3. Register the element

A single side-effect import defines `<newco-side-nav>` and
`<newco-side-nav-item>`:

```js
import "@helloimjolopez-newco/newco-tokens/components/side-nav";
```

## 4. Use it

```html
<newco-side-nav label="Primary" theme="light">
  <div slot="header">…logo…</div>

  <!-- DESTINATIONS: clicking selects/navigates -->
  <newco-side-nav-item icon="dashboard" label="Home" value="home" active></newco-side-nav-item>

  <!-- GROUPER: clicking expands/collapses the group it contains -->
  <newco-side-nav-group icon="groups" label="People" value="people" expanded>
    <newco-side-nav-item label="Members" value="members" level="1"></newco-side-nav-item>
    <newco-side-nav-item label="Households" value="households" level="1"></newco-side-nav-item>
  </newco-side-nav-group>

  <newco-side-nav-item icon="event" label="Calendar" value="calendar"></newco-side-nav-item>
  <newco-side-nav-item icon="settings" label="Settings" disabled></newco-side-nav-item>
</newco-side-nav>
```

Two kinds of row, exactly as the NewCo demo:

- **`<newco-side-nav-item>` is a destination.** Clicking it selects/navigates
  (active + a distinct pressed state) and fires **`newco-select`**.
- **`<newco-side-nav-group>` is a grouper.** Clicking it expands/collapses the
  group it *contains* (its own child items are its default slot), showing the
  **Trail** state while open; it does not navigate, it fires **`newco-toggle`**.
  When the rail is `collapsed`, hovering a grouper opens a **flyout** listing its
  items so they stay reachable.

State is yours to own: listen for the events and set `active` on the chosen item
and `expanded` on the chosen group (React example in Framework notes). That is
the whole integration. No component CSS to import, no theme provider.

---

## API

### `<newco-side-nav>` (container)

| Attribute / prop | Type | Default | Purpose |
|---|---|---|---|
| `theme` | `"light" \| "midnight"` | `"light"` | Colour mode. Drive it from your app theme. |
| `collapsed` | boolean | `false` | Icon-only rail. Labels hidden but kept accessible. |
| `elevated` | boolean | `false` | Floating/overlay presentation — adds the overlay elevation shadow (`--elevation-overlay` / `--elevation-midnight-overlay`) and drops the flush divider. Use for a drawer or the mobile overlay; leave off for a persistent flush rail. |
| `stroked` | boolean | `false` | Adds the trailing divider border (`Stroke/Static/Neutral/Subtle`) — the Figma "Stroked" mode. |
| `label` | string | `"Primary navigation"` | `aria-label` for the `<nav>` region. |

- **Slot `header`** — the top of the rail (logo / collapse control), matching the
  Figma `Slot.NavHeader`. Optional; hidden when empty.
- **Default slot** — your `<newco-side-nav-item>`s and `<newco-side-nav-group>`s.
- **Method** `el.toggle()` — flip collapsed.
- **Event** `newco-collapse` — `detail: { collapsed }`.
- **CSS parts** — `rail`, `header`, `nav` for escape-hatch styling.
- No built-in collapse button; place your own control in the `header` slot and
  drive `collapsed` (or call `toggle()`), as in the demo.

### `<newco-side-nav-item>` — a destination

| Attribute / prop | Type | Default | Purpose |
|---|---|---|---|
| `icon` | string | — | Material Symbols ligature name. |
| `label` | string | — | Visible text (and collapsed tooltip). |
| `active` | boolean | `false` | Current destination (`aria-current="page"`, brand indicator stripe + selection pill). |
| `disabled` | boolean | `false` | Non-interactive. |
| `href` | string | — | Render as a link; omit to render a `<button>`. |
| `level` | `0 \| 1` | `0` | `1` indents a child destination under a group and drops the leading icon. |
| `value` | string | `label` | Payload sent on select. |

- **Event `newco-select`** — bubbles & composed, `detail: { value, label, item }`.
  Call `preventDefault()` in your handler to stop link navigation (e.g. to route
  client-side). Clicking also gives a pressed state distinct from the resting
  `active` selection.
- **CSS part** — `item`.

### `<newco-side-nav-group>` — a grouper

| Attribute / prop | Type | Default | Purpose |
|---|---|---|---|
| `icon` | string | — | Material Symbols ligature name for the group header. |
| `label` | string | — | Group name (and collapsed flyout title / tooltip). |
| `expanded` | boolean | `false` | Whether the contained group is open. Toggles on click; shows the Trail state + flips the chevron while open. |
| `disabled` | boolean | `false` | Non-interactive. |
| `value` | string | `label` | Payload sent on toggle. |

- **Default slot** — the group's child `<newco-side-nav-item level="1">`s.
- **Event `newco-toggle`** — bubbles & composed, `detail: { value, label, expanded, group }`.
  A grouper does **not** fire `newco-select`; it only opens/closes its group.
- **Collapsed rail** — when the parent `<newco-side-nav>` is `collapsed`, a grouper
  shows icon-only and, on hover/focus, opens a **flyout** (overlay elevation) that
  lists its child items so they remain reachable.
- **CSS parts** — `item` (the header row), `group`.

---

## Theming

`theme="light"` and `theme="midnight"` are self-contained — set it on the
`<newco-side-nav>` and the whole rail (including items) recolours, because the
role custom properties are declared on the container and inherited by the items.

If your app already flips the whole page with the `data-theme` attribute (via the
optional `theme.css` alias layer), bind the nav's `theme` to the same source so
they stay in lockstep.

## Framework notes

- **React** — render the tags directly. Booleans: include the attribute only when
  true (`{...(collapsed ? { collapsed: true } : {})}`); listen with a `ref` +
  `addEventListener("newco-select", …)`.
- **Vue** — `<newco-side-nav :collapsed="isCollapsed" @newco-select="onSelect">`.
  Tell Vue these are custom elements (`compilerOptions.isCustomElement`).
- **Angular** — add `CUSTOM_ELEMENTS_SCHEMA`; bind `[attr.active]` and
  `(newco-select)`.
- **Blazor / Radzen** — drop the tags in `.razor`; pass attributes normally, and
  wire `newco-select` through a tiny JS interop shim (DOM event → `.NET` callback).

## Accessibility

- The rail is a `<nav aria-label>`; items are real `<button>`/`<a>` so keyboard
  and screen-reader behaviour is native.
- Active item sets `aria-current="page"`. Collapsed items expose their label via
  `title` and remain reachable.
- Focus rings use the brand focus token; nothing is removed.

## Live examples

Storybook → **Library / Side Nav** (Playground, Collapsed, Midnight, Light +
Midnight). The stories render this exact element, not a re-implementation.

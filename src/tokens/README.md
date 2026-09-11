# NewCo design tokens — the CSS

**The number to quote a developer is not the line count. It is 514 — the names you may actually use.** Everything else in these files is infrastructure you load but never name.

Load these, **in this order** (primitives first, or every colour resolves to nothing with no console error):

```html
<link rel="stylesheet" href="primitives.css">
<link rel="stylesheet" href="themes/light.css">
<link rel="stylesheet" href="themes/midnight.css">
<link rel="stylesheet" href="type.css">
<link rel="stylesheet" href="layout.css">
<link rel="stylesheet" href="layout-contextual.css">
<link rel="stylesheet" href="motion.css">
<link rel="stylesheet" href="breakpoints.css">
```

Or, from the npm package, one line loads them all in order: `@import "@helloimjolopez-newco/newco-tokens/css";`

## The files

| File | Names | Safe to name? | Must load? | What it is |
|---|---|---|---|---|
| `primitives.css` | 466 | **no** | yes | Raw ramps (colour/type/unit). Load it; never name it. |
| `themes/light.css` | 417 | yes | yes | Colour + elevation contract, Light. |
| `themes/midnight.css` | 417 | yes | yes | Same names, Midnight values. |
| `type.css` | 39 | yes | yes | Type scale (atomic). |
| `layout.css` | 39 | yes | yes | Spacing, radii, border widths. |
| `layout-contextual.css` | 37 | **no** | yes | Per-component metrics; this repo's components use them. |
| `motion.css` | 14 | yes | yes | Durations + easings. |
| `breakpoints.css` | 5 | yes | yes | Breakpoint values. |

Each file repeats this in its own stamped header, and `../../npm/contract.json` lists every consumable name machine-readably (lint against it if you want the boundary enforced).

## Theming — one name, two values, by selector

Colour **and** the four `--elevation-*` shadows are one name each; the value flips by `data-theme`. Set `data-theme="midnight"` (or `"dark"`) on `<html>` for the page, or on any element for a subtree — it composes both ways. **Never** put a mode in a property name; that form no longer exists.

## Which surface goes on what (so nobody guesses)

- **Top nav / side nav / app frame →** `--semantic-color-contextual-fill-surface-chrome`
- **Content page →** `--semantic-color-fill-surface-elevated-sheet`
- **Cards / tiles / tables →** `--semantic-color-fill-surface-elevated-card-base`
- **Modals / popovers / menus / toasts →** `--semantic-color-fill-surface-elevated-overlay-base`

A raised surface is a **recipe** — fill + elevation + radius:

```css
background:    var(--semantic-color-fill-surface-elevated-sheet);
box-shadow:    var(--elevation-sheet);      /* cards: --elevation-widget; overlays: --elevation-overlay */
border-radius: var(--contextual-layout-units-sheet-cornerradius-cornerradius);
```

## Type is a scale — compose it

```css
font-family: var(--semantic-type-family-brand);
font-size:   var(--semantic-type-font-size-14);
font-weight: var(--semantic-type-weight-500);
line-height: var(--semantic-type-line-height-20pt-single);
```

## Can I use a primitive?

Yes, but know the cost: primitives have one value forever. `var(--primitive-color-brand-400)` stays that purple in Midnight; `var(--semantic-color-fill-action-primary-rest)` flips. Reach for a primitive only when you want a value that ignores the theme.

## Layout units carry their unit

```css
border-radius: var(--contextual-layout-units-card-cornerradius-cornerradius);            /* correct */
border-radius: calc(var(--contextual-layout-units-card-cornerradius-cornerradius) * 1px); /* WRONG — calc(4px * 1px) is dropped silently */
```

_Generated set; do not hand-edit the `.css` files. Rebuild with `npm run build-all`._

# NewCo design tokens

**The themed contract (colour + elevation) is 405 names.** Your full working
vocabulary across every file below is **502**. If you add up every
declaration in this folder you get 1411 — that number is not the contract, and the
table says why. Or load everything with one line: `import "@helloimjolopez-newco/newco-tokens/css"`.

## Link these, in this order

```html
<link rel="stylesheet" href="primitives.css">
<link rel="stylesheet" href="themes/light.css">
<link rel="stylesheet" href="themes/midnight.css">
<link rel="stylesheet" href="type.css">
<link rel="stylesheet" href="layout.css">
<link rel="stylesheet" href="motion.css">
<link rel="stylesheet" href="breakpoints.css">
```

`primitives.css` must come first. Every semantic token resolves through it via
`var()`, so if it is missing all colour resolves to nothing and the page renders
unstyled **with no console error**.

## The files

| File | Names | Safe to name? | Must load? | What it is |
|---|---|---|---|---|
| `primitives.css` | 466 | **no** | yes | Raw ramps (colour/type/unit). Load it; do not name it. |
| `themes/light.css` | 405 | yes | yes | Colour + elevation contract, Light Mode. |
| `themes/midnight.css` | 405 | yes | yes | Colour + elevation contract, Midnight Mode. Same names. |
| `type.css` | 39 | yes | yes | Type scale. Compose from these. |
| `layout.css` | 39 | yes | yes | Spacing, radii, border widths. |
| `layout-contextual.css` | 38 | **no** | **no** | Per-component metrics. This repo's components use these. |
| `motion.css` | 14 | yes | yes | Durations and easings. |
| `breakpoints.css` | 5 | yes | yes | Breakpoint values. |

Each file repeats this in its own header.

## Theming

One name, two values, resolved by selector. Colour AND the four `--elevation-*`
shadows both live in the theme files and flip together. Set `data-theme="midnight"`
(or `"dark"`) on `<html>` to flip the page, or on any element to flip just that
subtree — it composes both ways. Never put a mode in a property name; that form no
longer exists.

## A raised surface is a recipe

A surface token is only a fill. To lift it the way the demo does, pair it with an
elevation shadow and (for the page) the sheet radius:

```css
background:    var(--semantic-color-fill-surface-elevated-sheet);
box-shadow:    var(--elevation-sheet);      /* page / sheet */
border-radius: var(--contextual-layout-units-sheet-cornerradius-cornerradius);
```

Cards use `--elevation-widget`, overlays/popovers use `--elevation-overlay`.

## Type

No composite styles, no classes. Name the scale:

```css
font-family: var(--semantic-type-family-brand);
font-size:   var(--semantic-type-font-size-14);
font-weight: var(--semantic-type-weight-500);
line-height: var(--semantic-type-line-height-20pt-single);
```

## Layout units carry their unit

```css
border-radius: var(--contextual-layout-units-card-cornerradius-cornerradius);            /* correct */
border-radius: calc(var(--contextual-layout-units-card-cornerradius-cornerradius) * 1px); /* WRONG */
```

The second is `calc(4px * 1px)`, not a length — the browser drops it silently.

## Machine-readable

`contract.json` lists every consumable name plus per-file counts; lint against it if
you want the boundary enforced.

---

Repo: https://github.com/helloimjolopez-collab/newco-ds

# Adoption — how tribes absorb NewCo

The goal: a tribe adopts NewCo with **low effort and no framework switch**. Tokens
are just CSS variables (npm) or a static web asset (NuGet), so adoption is a
*value swap*, not a rewrite.

## By ecosystem

| Stack | Install | Consume | Effort |
|-------|---------|---------|--------|
| React / Vue / Angular / Svelte / plain web | `npm i @helloimjolopez-newco/newco-tokens` | `@import ".../css"`, use `var(--…)` | Low |
| Tailwind | same | map tokens in `theme.extend` to the CSS vars | Low |
| **Blazor / Radzen** | `dotnet add package NewCo.Tokens` | one `<link>` to `_content/NewCo.Tokens/newco-tokens.css`, use `var(--…)` | Low |
| Own tooling | consume `dist/tokens.json` (DTCG) | feed your Style Dictionary | Low–Med |

The key point for engineering leadership: **no team leaves their framework.** A
Blazor+Radzen tribe keeps Radzen and re-skins it with NewCo tokens; a React tribe
keeps React. Nothing here forces a migration.

## Components (next phase) — and the Radix/shadcn question

Components ship as **Web Components (Lit)**: real custom elements (`<newco-button>`)
that work in React, Vue, Angular, plain HTML, and **Blazor/Radzen** (attributes in,
DOM events out; complex object props use light JS interop).

**Can a Radzen app consume a Radix or shadcn component? No.** Radix Primitives and
shadcn/ui are **React-only** — they need a React runtime and can't render inside
Blazor. So they can't be the *shared, cross-framework* component source.

What we keep from that world is the **strategy**: start from an accessible headless
primitive. The web-components-native equivalents are **Shoelace / Web Awesome**
(Lit, WAI-ARIA-focused) or thin Lit components built to the WAI-ARIA APG, using
**Floating UI** for overlays. Those *are* consumable by Radzen. React-only tribes
may still use shadcn internally, but the org-wide library is Web Components.

## Recommended rollout

1. **Tokens first** (this package) — reskin existing UI by swapping to `var(--…)`.
2. **Pilot tribe** validates npm + NuGet consumption in a real app.
3. **Components** land incrementally (Button → inputs → nav), each mapped to Figma
   via Code Connect, each usable without touching the host framework.

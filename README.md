# NewCo (Spired) Design System — Tokens

`@helloimjolopez-newco/newco-tokens`

The single source of truth for NewCo's visual language, delivered as a versioned
npm package. Every value is a **1:1 reflection of the Figma variable library**
(the Spired branch) — pulled programmatically, never hand-maintained.

> **First-pass status.** This repo is a foundation for review. It ships the full
> **color system** (417 primitives, 490 semantics, Light + **Midnight** modes) as
> CSS/JS/JSON, plus Storybook and the CI sync pipeline. Type, spacing, motion,
> elevation, and the **Web Component** library (starting with Button) are the
> documented next steps — see [Roadmap](#roadmap).

---

## What a consuming team gets

Install once, theme forever. Three artifacts are published in `dist/`:

| File | Format | Use it when… |
|------|--------|--------------|
| `dist/tokens.css` | CSS custom properties | You style with CSS/SCSS/Tailwind/Blazor/Radzen — **the default** |
| `dist/tokens.js`  | ESM object            | You need tokens in JS/TS (theming logic, RN, charts) |
| `dist/tokens.json`| W3C DTCG              | You feed your own Style Dictionary / tooling |

```bash
npm install @helloimjolopez-newco/newco-tokens
```

```css
/* one import; every token becomes a CSS variable */
@import "@helloimjolopez-newco/newco-tokens/css";

.card {
  background: var(--semantic-color-light-mode-surface-widget-base);
  color:      var(--semantic-color-light-mode-text-static-primary-base);
  border:     1px solid var(--semantic-color-light-mode-stroke-static-neutral-base);
}
```

Because it's just CSS variables, **any framework can absorb it** — React, Vue,
Angular, Svelte, plain HTML, and **Blazor / Radzen** (they render normal DOM, so
`var(--…)` works with zero interop). That framework-agnostic surface is the whole
point; see [docs/adoption.md](docs/adoption.md).

### Naming convention

```
--{collection}-{mode?}-{group}-{...path}
   primitive-color                → --primitive-color-brand-600
   semantic-color · light-mode    → --semantic-color-light-mode-surface-sheet-base
   semantic-color · midnight-mode → --semantic-color-midnight-mode-surface-sheet-base
```

Semantics **reference** primitives (`var()`), so the alias chain from Figma is
preserved in the output. This is the same naming the live Spired demo already
consumes.

> **Theming note (open design decision).** Modes are currently namespaced *in the
> variable name* (`…-light-mode-…` / `…-midnight-mode-…`). A thin role-alias layer
> (`--surface-sheet` resolving per `:root[data-theme="midnight"]`) is the intended
> next iteration so apps flip themes with one attribute. Flagged for the dev review.

---

## Architecture

```
Figma (Spired branch variables)          <- single source of truth
      |  sync-tokens.js  (REST, Plan Access Token, in CI - no manual export)
      v
tokens/figma-source/*.json               <- raw graph snapshot (primitives + semantics)
      |  build-token-source.js           <- -> W3C DTCG, validates every alias resolves
      v
tokens/newco-design-tokens.json          <- DTCG source of truth (committed)
      |  style-dictionary.config.js      <- Style Dictionary v5
      v
src/tokens/{tokens.css,tokens.js}  ->  build-dist.js  ->  dist/{tokens.css,tokens.js,tokens.json}
      |
      v
npm publish  ->  consuming tribes
```

Every step is a plain, reviewable Node script. No bespoke build server.

---

## Staying in sync with Figma (no exports, ever)

The contract: **change a variable in Figma -> it lands in the repo only after an
approving review.** Mechanism:

1. A GitHub Action runs `sync-tokens.js` (schedule + manual "Run workflow"). It
   authenticates with an **org Plan Access Token** (a GitHub *secret*) and pulls
   variables via the **Figma Variables REST API**.
2. If anything changed, it opens a **Pull Request** with the token diff.
3. A maintainer **reviews and merges** — the approval gate.
4. Merge triggers the publish workflow -> version bump -> `npm publish`.

No plugin exports, no local watcher, no hand-edited JSON.

**One thing to verify with the developer:** the `variables/local` REST endpoint
was historically Enterprise-gated. On an **Organization** plan with a Plan Access
Token it may or may not be enabled — `sync-tokens.js` fails loudly with the
fallback if it 403s. Fallbacks (identical output, same PR gate): a Figma->Git
plugin (TokenNexus / TokenSync) or a Dev-Mode MCP pull. See
[docs/governance.md](docs/governance.md).

---

## Local development

```bash
npm install
npm run build-tokens     # figma-source -> DTCG -> CSS/JS  (validates aliases)
npm run build-dist       # + assemble dist/
npm run storybook        # browse the token galleries
npm run sync-tokens      # pull latest from Figma (needs FIGMA_TOKEN, FIGMA_FILE_KEY)
```

## Roadmap

- **Type, spacing, motion, elevation** collections (same pipeline).
- **Role-alias theming layer** (`[data-theme="midnight"]`).
- **Web Components (Lit)** — framework-agnostic, accessible, consumable by Blazor/
  Radzen and everything else. First component: **Button**. Mapped back to Figma
  via **Code Connect**. (Radix/shadcn are React-only and can't be the shared base;
  see [docs/adoption.md](docs/adoption.md).)
- **Surface system polish**: fold `Fill/Static/Neutral/*` dark values into the
  Midnight palette; add role variants where groups are currently single-option.

See [docs/governance.md](docs/governance.md) for versioning, ownership, and
security posture, and [docs/adoption.md](docs/adoption.md) for how tribes migrate.

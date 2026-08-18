# NewCo Design System — Tokens

`@helloimjolopez-newco/newco-tokens`

The single source of truth for NewCo's visual language, delivered as a versioned
npm package. Every value is a **1:1 reflection of the Figma variable library**
(the NewCo branch) — pulled programmatically, never hand-maintained.

**▶ Live Storybook:** https://helloimjolopez-collab.github.io/newco-ds/

## Packages

Both registries publish from the **same build, in lockstep** — identical version, identical values.

| Registry | Package | Install |
|----------|---------|---------|
| **npm** | [`@helloimjolopez-newco/newco-tokens`](https://www.npmjs.com/package/@helloimjolopez-newco/newco-tokens) | `npm install @helloimjolopez-newco/newco-tokens` |
| **NuGet** (.NET / Blazor / Radzen) | [`NewCo.Tokens`](https://www.nuget.org/packages/NewCo.Tokens) | `dotnet add package NewCo.Tokens` |

.NET delivery details (Razor Class Library, static-web-asset stylesheet, C# constants): [nuget/README.md](nuget/README.md).

> **Scope — the full token library.** Every Figma collection ships, not just color:
>
> | Collection | Contents |
> |---|---|
> | **Color** | 330 primitives (231 solid + 99 alpha) → 490 semantic roles · Light + **Midnight** |
> | **Type** | 75 primitives → 554 semantic roles · Desktop + Mobile |
> | **Layout & Units** (incl. **radius** + spacing) | 33 primitives → 74 semantic roles · responsive (Desktop/Tablet/Mobile) |
> | **Motion** | 14 (durations + easings) |
> | **Elevation** | Light + Midnight shadow sets |
> | **Breakpoints** | 5 |
>
> Delivered as CSS / JS / JSON (npm) and a Razor Class Library (NuGet), plus Storybook and the CI sync pipeline.

---

## What a consuming team gets

Install once, theme forever. Three artifacts are published in `npm/`:

| File | Format | Use it when… |
|------|--------|--------------|
| `npm/tokens.css` | CSS custom properties | You style with CSS/SCSS/Tailwind/Blazor/Radzen — **the default** |
| `npm/tokens.js`  | ESM object            | You need tokens in JS/TS (theming logic, RN, charts) |
| `npm/tokens.json`| W3C DTCG              | You feed your own Style Dictionary / tooling |

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
preserved in the output. This is the same naming the live NewCo demo already
consumes.

> **Theming note (open design decision).** Modes are currently namespaced *in the
> variable name* (`…-light-mode-…` / `…-midnight-mode-…`). A thin role-alias layer
> (`--surface-sheet` resolving per `:root[data-theme="midnight"]`) is the intended
> next iteration so apps flip themes with one attribute. Flagged for the dev review.

---

## Architecture

```
Figma (NewCo branch variables)          <- single source of truth
      |  Figma plugin Git sync (Plugin API) -> seed dumps, via adapter
      v
tokens/figma-source/*.json               <- raw graph: color + type + layout/units + motion + elevation + breakpoints
      |  build-token-source.js           <- -> W3C DTCG, validates every alias resolves
      v
tokens/newco-design-tokens.json          <- DTCG source of truth (committed)
      |  style-dictionary.config.js      <- Style Dictionary v5
      v
src/tokens/{tokens.css,tokens.js}
      |  build-dist.js   ->  npm/{tokens.css,tokens.js,tokens.json}   (npm package)
      |  build-nuget.js  ->  nuget/  (NewCo.Tokens RCL: newco-tokens.css + C# constants)
      v
npm publish  +  dotnet nuget push   ->  consuming teams   (single build, lockstep version)
```

Every step is a plain, reviewable Node script. No bespoke build server.

---

## Staying in sync with Figma

The contract: **change a variable in Figma -> it lands in the repo only after an
explicit, reviewable step.**

`tokens/figma-source/` holds one seed dump per Figma collection. Everything
downstream of those files is offline and deterministic:

```
tokens/figma-source/*.json  ->  build-token-source.js  ->  DTCG  ->  style-dictionary  ->  CSS/JS/JSON
```

**Why not the REST API?** The Figma Variables REST endpoint
(`/v1/files/:key/variables/local`) requires the `file_variables:read` scope, which
Figma grants on **Enterprise only**. We are on the **Organization** plan, where that
scope is not offered - no token can unlock it. Verified 2026-08-17 against a live
403. The REST sync workflow that used to live here has been removed; it could never
have run on our plan.

**The supported route: plugin Git sync.** Figma plugins that push variables straight
to a repo use the **Plugin API**, which is not plan-gated the way REST is. Options,
in order of maturity:

| Plugin | Notes |
|--------|-------|
| Tokens Studio | Most established, two-way GitHub sync, best documented |
| TokenNexus | Maps Figma variables to Git-hosted tokens |
| TokenSync | W3C DTCG, Figma <-> GitHub |

**One adapter is required.** These plugins emit **W3C DTCG** - the same shape as this
repo's *output* (`tokens/newco-design-tokens.json`), not its *input*. The seed dumps
use a deliberately compact shape:

```
primitive-color.json   { "Amethyst/0": "#faf9fe", "Amethyst/150 @ 30%": "#d3c6fd4d" }
semantic-color.json    [ ["Fill/Action/Primary/Base", "=Brand/400", "=Brand/300"], ... ]
                         ^ name                        ^ Light        ^ Midnight
```

Do **not** wire a plugin's DTCG straight into style-dictionary. `build-token-source.js`
is what produces the published CSS variable names (e.g.
`--semantic-color-light-mode-surface-sheet-base`), and those are consumed by the demo
and shipped in both the npm and NuGet packages. Bypassing it would rename every
emitted variable - a breaking change for all consumers.

Instead: have the plugin write DTCG to a staging path, then convert DTCG -> the two
seed shapes above. The rest of the pipeline, and every published name, stays
identical.

Either way the change arrives as a **pull request** with the token diff, and a
maintainer's merge is the approval gate.

## Local development

```bash
npm install
npm run build-tokens     # figma-source -> DTCG -> CSS/JS  (validates aliases)
npm run build-dist       # + assemble npm/
npm run storybook        # browse the token galleries
```

## Roadmap

- ✅ **Type, spacing/layout (incl. radius), motion, elevation, breakpoints** collections — shipped, same pipeline.
- ✅ **NuGet delivery** (`NewCo.Tokens` RCL) — shipped, lockstep with npm.
- **Role-alias theming layer** (`[data-theme="midnight"]`).
- **Web Components (Lit)** — framework-agnostic, accessible, consumable by Blazor/
  Radzen and everything else. First component: **Button**. Mapped back to Figma
  via **Code Connect**. (Radix/shadcn are React-only and can't be the shared base;
  see [docs/adoption.md](docs/adoption.md).)
- **Surface system polish**: fold `Fill/Static/Neutral/*` dark values into the
  Midnight palette; add role variants where groups are currently single-option.

See [docs/governance.md](docs/governance.md) for versioning, ownership, and
security posture, and [docs/adoption.md](docs/adoption.md) for how tribes migrate.

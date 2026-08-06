# NewCo.Tokens (.NET / NuGet)

NewCo (Spired) design tokens for .NET, built for **Blazor** and **Radzen** teams.
Same tokens as the npm package `@helloimjolopez-newco/newco-tokens`, same Figma
source of truth — just delivered as a NuGet **Razor Class Library**.

## Install

```bash
dotnet add package NewCo.Tokens
```

## Use

Reference the stylesheet (served automatically as a static web asset) once, in
`App.razor` / `index.html` / `_Host.cshtml`:

```html
<link rel="stylesheet" href="_content/NewCo.Tokens/newco-tokens.css" />
```

Then style with the CSS variables — works in Razor markup, component `<style>`,
and alongside Radzen components:

```razor
<div style="background: var(--semantic-color-light-mode-surface-widget-base);
            color: var(--semantic-color-light-mode-text-static-primary-base);
            border: 1px solid var(--semantic-color-light-mode-stroke-static-neutral-base);">
  Hello NewCo
</div>
```

### Avoid magic strings (optional)

A generated `NewCoTokens` constants class gives you the variable names:

```razor
@using NewCo.Tokens
<div style="background: var(@NewCoTokens.SemanticColorLightModeSurfaceWidgetBase)">…</div>
```

## Why this works with Radzen

Radzen components render normal DOM, so they inherit these CSS variables like any
other element — you can theme Radzen with NewCo tokens today. The forthcoming
**Web Components** (Lit) will drop in as plain custom elements for cases where you
want NewCo's own components rather than Radzen's.

## Versioning

Version tracks the npm package 1:1; CI runs `dotnet pack -p:Version=<npm version>`
so `NewCo.Tokens` and `@helloimjolopez-newco/newco-tokens` never drift.

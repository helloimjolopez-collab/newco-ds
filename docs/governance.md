# Governance, versioning & security

This document is for the engineering lead reviewing whether `newco-tokens` is
safe to depend on, maintainable, and ready for org-wide adoption.

## Ownership & source of truth

- **Design owns the values.** The Figma Spired-branch variable library is the
  single source of truth. Engineers never hand-edit token values.
- **This repo owns the delivery.** It transforms Figma → DTCG → CSS/JS/JSON and
  publishes to npm. Code owners approve pipeline/tooling changes.
- Suggested `CODEOWNERS`: design-system maintainers on `/tokens/**`,
  `style-dictionary.config.js`, `/scripts/**`, `/.github/**`.

## The sync + approval gate

```
Figma change → sync-tokens.js (CI) → PR with token diff → human review → merge → publish
```

- Token changes arrive as **reviewable pull requests**, never silent pushes.
- The DTCG build **validates every alias resolves** before a PR can pass CI, so a
  deleted/renamed primitive can't ship a broken semantic.
- Publishing is a **separate, manually-dispatched** workflow with an explicit
  version bump (patch/minor/major) — nothing auto-publishes on merge unless you
  choose to wire it that way.

## Versioning (SemVer, token-flavored)

| Bump | When |
|------|------|
| patch | a token **value** changed |
| minor | tokens **added** (new roles/ramps) |
| major | tokens **renamed/removed** (breaking for consumers) |

Renames are the only truly breaking change for CSS-variable consumers, so they
must be deliberate and announced. Consider a deprecation window (keep the old
variable aliased to the new one for one minor release).

## Security posture (for review)

- **Secrets:** the Figma **Plan Access Token** and **npm publish token** live only
  as GitHub Actions secrets. Prefer an **org Plan Access Token** (admin-managed,
  revocable, not tied to a person) over personal tokens.
- **Supply chain:** package ships only `dist/` + the DTCG JSON (see `files` in
  package.json) — no scripts run on install. Pin CI actions to SHAs; enable
  Dependabot; the token pipeline's only runtime dep is Style Dictionary.
- **Publish access:** `publishConfig.access` is `restricted` — decide public vs a
  private registry (GitHub Packages / npm org) as part of adoption.
- **Provenance:** consider `npm publish --provenance` from CI for a verifiable
  build-to-artifact chain.
- **Plan-gating caveat:** the Figma `variables/local` REST endpoint may be
  Enterprise-only; `sync-tokens.js` 403s loudly with documented fallbacks
  (TokenNexus/TokenSync plugin, or Dev-Mode MCP pull) — same PR gate either way.

## Token economy

Is 1,395 variables "too many"? It's the right **coverage**, with a leaner
**representation** available.

- 1,395 emitted CSS vars = ~417 primitives + ~490 semantics **×2 modes**. The
  ×2 is an encoding artifact (Light + Midnight as separate names), not extra
  decisions. A `[data-theme]` role-alias layer collapses it to ~490 semantics.
- Consumers touch **semantics only** (~490); primitives are the private palette.
- Primitive bulk is largely **alpha variants** stored as discrete tokens.
  Generating alpha via `color-mix()`/relative-color CSS trims primitives ~30–40%.
- Judge health by **coverage + no dead tokens + one-obvious-choice**, not raw
  count. Action: run a usage audit to prune unreferenced semantics; adopt the
  theming alias + alpha-via-CSS to ~halve the published surface with zero loss.

## Maintainability checklist for the reviewer

- [ ] Confirm the Figma REST path (Org plan + Plan Access Token) or pick a fallback.
- [ ] Decide registry (public npm vs private) + set `publishConfig` accordingly.
- [ ] Add `CODEOWNERS`, branch protection, required CI on `main`.
- [ ] Decide auto-publish-on-merge vs manual dispatch.
- [ ] Approve the theming model (mode-in-name vs `[data-theme]` alias layer).

# Governance, versioning & security

This document is for the engineering lead reviewing whether `newco-tokens` is
safe to depend on, maintainable, and ready for org-wide adoption.

## Ownership & source of truth

- **Design owns the values.** The Figma NewCo-branch variable library is the
  single source of truth. Engineers never hand-edit token values.
- **This repo owns the delivery.** It transforms Figma → DTCG → CSS/JS/JSON and
  publishes to npm. Code owners approve pipeline/tooling changes.
- Suggested `CODEOWNERS`: design-system maintainers on `/tokens/**`,
  `style-dictionary.config.js`, `/scripts/**`, `/.github/**`.

## The sync + approval gate

```
Figma change → plugin Git sync → adapter → PR with token diff → human review → merge → publish
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

- **Secrets:** the only secret this repo needs is the **npm publish token**, as a
  GitHub Actions secret. There is deliberately **no Figma token** — the token sync
  runs via Dev Mode from a session, not from CI, so no Figma credential is stored.
- **Supply chain:** package ships only `npm/` + the DTCG JSON (see `files` in
  package.json) — no scripts run on install. Pin CI actions to SHAs; enable
  Dependabot; the token pipeline's only runtime dep is Style Dictionary.
- **Publish access:** `publishConfig.access` is `restricted` — decide public vs a
  private registry (GitHub Packages / npm org) as part of adoption.
- **Provenance:** consider `npm publish --provenance` from CI for a verifiable
  build-to-artifact chain.
- **No Figma REST dependency (resolved):** the `variables/local` REST endpoint
  requires the `file_variables:read` scope, which Figma grants on **Enterprise only**.
  On our Organization plan that scope is not offered, so the REST path is closed —
  verified 2026-08-17 against a live 403. The dead sync workflow and script have been
  removed. Variables reach the repo via a **Figma plugin Git sync** (Plugin API, not
  plan-gated), which also means **no long-lived Figma credential in CI** — a stronger
  posture than the REST design it replaces.

## Token economy

Is the color variable count "too many"? It's the right **coverage**, with a
leaner **representation** available.

- ~1,310 emitted color CSS vars = **330 primitives** (231 solid + 99 alpha) +
  **490 semantics ×2 modes**. The ×2 is an encoding artifact (Light + Midnight as
  separate names), not extra decisions. A `[data-theme]` role-alias layer
  collapses it to ~490 semantics.
- Consumers touch **semantics only** (~490); primitives are the private palette.
- The alpha layer was pruned to the **99 alphas actually referenced by a
  semantic** (down from ~205) — no speculative per-ramp ladders. A future
  `color-mix()`/relative-color pass could trim further if desired.
- Judge health by **coverage + no dead tokens + one-obvious-choice**, not raw
  count. Action: run a usage audit to prune unreferenced semantics; adopt the
  theming alias + alpha-via-CSS to ~halve the published surface with zero loss.

## Maintainability checklist for the reviewer

- [ ] Decide registry (public npm vs private) + set `publishConfig` accordingly.
- [ ] Add `CODEOWNERS`, branch protection, required CI on `main`.
- [ ] Decide auto-publish-on-merge vs manual dispatch.
- [ ] Pick the plugin Git sync (Tokens Studio / TokenNexus / TokenSync) and connect it.
- [ ] Write the DTCG → seed-dump adapter so published CSS variable names don't change.
- [ ] Approve the theming model (mode-in-name vs `[data-theme]` alias layer).

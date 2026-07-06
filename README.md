# Ropel

**Ropel** is a custom Shopify theme built from scratch on top of Shopify's [Skeleton theme](https://github.com/Shopify/skeleton-theme).
A learning project structured and maintained to production standards: CI checks on every push, secret scanning, and Shopify theme best practices.

## Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) — `npm install -g @shopify/cli@latest`
- Access to a Shopify store for development

If you use VS Code, install the [Shopify Liquid extension](https://shopify.dev/docs/storefronts/themes/tools/shopify-liquid-vscode) for syntax highlighting, linting, and autocompletion.

## Development

Start a local development server connected to the development store:

```bash
shopify theme dev -e development
```

The first run opens a browser window to authenticate with Shopify. The theme is uploaded as an unpublished **development theme** — it never affects the live, published theme.

Store configuration lives in [`shopify.theme.toml`](shopify.theme.toml). The store URL is not a secret; API tokens and other credentials are never committed (see [Security](#security)).

### Quality checks

Run [Theme Check](https://shopify.dev/docs/storefronts/themes/tools/theme-check) locally before pushing:

```bash
shopify theme check
```

The same check runs in CI and must pass before merging.

## Theme architecture

```
.
├── assets          # Static assets (CSS, JS, images, fonts)
├── blocks          # Reusable, nestable, customizable UI components
├── config          # Global theme settings and customization options
├── layout          # Top-level page wrappers (layout templates)
├── locales         # Translation files
├── sections        # Modular full-width page components
├── snippets        # Reusable Liquid fragments
└── templates       # JSON templates composing sections into pages
```

See Shopify's [theme architecture documentation](https://shopify.dev/docs/storefronts/themes/architecture) for details.

## CI

Every push and pull request runs [`.github/workflows/ci.yml`](.github/workflows/ci.yml):

- **Theme Check** — Liquid/theme linting, fails the build on errors
- **gitleaks** — scans the full git history for accidentally committed secrets

## Security

This is a public repository. The rules that keep it safe:

- `.env*` and `.shopify/` (CLI session data) are gitignored and must never be committed.
- No API tokens, webhook secrets, or store credentials belong in theme code or `config/settings_data.json`.
- GitHub secret scanning with push protection is enabled on the repository, and gitleaks runs in CI as a second barrier.
- If a secret ever leaks: rotate it immediately — removing it from git history is not enough.

## License

Based on Shopify's Skeleton theme, released under the [MIT License](LICENSE.md).

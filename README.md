# Business Toolkit

A free, connected business finance toolkit for small businesses, sellers, freelancers, and marketers in the Philippines (₱). Ten calculators share values and suggest a logical next step, so figures never need to be retyped — and a session-wide **Business Snapshot** pulls the latest result from every tool into one view.

This is the **Phase 1** build: a fully static site. Every calculation runs client-side — no account, no backend, no database.

## Calculators

| Category | Calculator | Route |
|---|---|---|
| Pricing | Profit Margin | `/profit-margin-calculator` |
| Pricing | Markup | `/markup-calculator` |
| Pricing | Discount | `/discount-calculator` |
| Marketing | ROAS | `/roas-calculator` |
| Marketing | ROI | `/roi-calculator` |
| Marketing | Commission | `/commission-calculator` |
| Finance | Break-even | `/break-even-calculator` |
| Finance | Cash Flow | `/cash-flow-calculator` |
| Finance | Tax | `/tax-calculator` |
| Finance | Invoice | `/invoice-calculator` |

Plus a calculator hub (`/calculators`), a session-only Business Snapshot (`/snapshot`), and About/Contact/Privacy/Terms pages.

## Features

- **Connected calculators** — each result suggests a next step and carries shared figures (revenue, cost, price, etc.) forward into it.
- **Business Snapshot** — the latest figure from every calculator used this session, grouped by category.
- **Temporary history** — recent calculations stored in `sessionStorage`, reopenable with one click, cleared when the tab closes.
- **SEO-first** — every calculator page is pre-rendered, with a unique title/description, worked examples, FAQ, breadcrumbs, and JSON-LD (`WebApplication`, `BreadcrumbList`, `FAQPage`).
- **Ad-ready** — a reusable `<AdSlot>` component reserves space for two in-content ad slots per page without shifting layout; no ad network is wired up yet.
- **No backend required** — formulas are pure, unit-tested functions that run entirely in the browser.

## Tech stack

- [Nuxt 4](https://nuxt.com) + Vue 3, with every public route pre-rendered (`routeRules`)
- [Pinia](https://pinia.vuejs.org) for session state (history, shared values, snapshot)
- [Nuxt Content](https://content.nuxt.com) for per-calculator SEO content (markdown + frontmatter)
- [Tailwind CSS v4](https://tailwindcss.com) for styling (dark theme, emerald accent)
- [Vitest](https://vitest.dev) for unit-testing the calculator formulas
- `@nuxtjs/sitemap`, `@nuxtjs/robots`, `nuxt-schema-org` for SEO plumbing

## Getting started

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:3000`.

### Other commands

```bash
npm run build      # production build (SSR/server output)
npm run generate   # static site generation (Phase 1 target)
npm run preview    # preview the production build locally
npm test           # run the calculator formula unit tests
```

## Project structure

```text
app/
├── pages/              # index, calculators hub, [calculator].vue template, snapshot, legal pages
├── components/
│   ├── calculator/     # input field, result card, next steps, history list
│   ├── snapshot/       # snapshot panel, drawer, account prompt
│   └── AdSlot.vue
├── config/
│   └── calculators.ts  # registry: route, fields, formula, next steps, shared-value mapping
├── utils/calc/         # pure formula functions + unit tests (one pair per calculator)
├── stores/             # Pinia: history, sharedValues, snapshot, reopen
└── composables/
    └── useHistoryStorage.ts   # sessionStorage adapter (swap for an API in Phase 2)
content/
└── calculators/        # SEO content per calculator (markdown + frontmatter)
```

New calculators are added by writing a formula module, a content file, and a registry entry — no changes needed elsewhere.

## Roadmap

Phase 1 (this build) ships the static experience. Later phases, not yet implemented, extend it without rewriting:

- **Phase 2** — accounts and persistent history (replaces the session-only storage adapter with an API-backed one).
- **Phase 3** — PDF exports and paid plans.

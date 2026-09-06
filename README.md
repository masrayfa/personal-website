# @sanii-app/web — Personal Website

TanStack Start (file-based router) + Vite, with Tailwind, shadcn/ui, Elysia API (engagements) on Neon Postgres (Drizzle), and react-i18next (6 locales).

## Run

```bash
npm install
npm run dev      # dev server on :3000
npm run build    # production build
npm run serve    # preview build
npm run deploy   # wrangler deploy
```

Env vars live in `.env` / `.env.example` (`VITE_DATABASE_URL` etc.). `prestart` writes dev vars via `scripts/write-dev-vars.mjs`.

## Structure

- `src/routes/` — file-based routes (`/`, `/$widgetId`, `/$widgetId/$contentId`, `/api/$`)
- `src/features/` — per-widget content components, filter widget, global widget, persona
- `src/stores/` — zustand stores (filter, layout, persona)
- `src/api/` — Elysia app + engagements module (Drizzle/Neon)
- `src/lib/` — i18n, theme provider, content collections
- `docs/` — FILTER_WIDGET_QUICK_START.md (how to add a filter to a widget)

## Filters

Filter state lives in `src/stores/filter-store.ts` (`toggleFilter`). Each content component derives its filtered list from `getActiveFilters(...)` — see `docs/FILTER_WIDGET_QUICK_START.md`.

## i18n

Locale files in `src/lib/locales/`. Add keys to `en.ts` first, then mirror across the other 5 locales; types come from `src/lib/i18n.d.ts`.
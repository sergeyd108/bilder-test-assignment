# Currency Converter

Client-side currency converter with configurable per-direction fees. Rates
from ECB, fees persisted to `localStorage`.

Stack: React 19 + TypeScript + Vite + Tailwind / DaisyUI.

## Run

```bash
npm install
npm run dev   # http://localhost:5173
```

Node.js 22+.

## Scripts

| Command             | Description                               |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | Vite dev server with the ECB proxy        |
| `npm run build`     | Type-check and produce a production build |
| `npm run preview`   | Serve the production build locally        |
| `npm run typecheck` | `tsc -b`                                  |
| `npm run lint`      | `oxlint` then `eslint`                    |
| `npm run fmt`       | Format with `oxfmt`                       |

## Pages

- `/` — conversion form (amount + from/to).
- `/fees` — fees table (add / edit / remove).

## Conversion

```
result = amount × (1 − fee) × rate
rate   = rates[to] / rates[from]   // ECB rates are EUR-quoted
fee    = configured fee for (from, to), or 0.01 default
```

Fees are direction-specific (`EUR→GBP` ≠ `GBP→EUR`), stored as fractions in
`[0, 1]` under the `conversion-fees` key in `localStorage`.

## Proxy

ECB sends no CORS headers, so the app calls `/api/ecb/*` and a proxy strips
the prefix and forwards to `https://www.ecb.europa.eu/*`:

- **Dev** — `vite.config.ts` → `server.proxy` (`changeOrigin: true`).
- **Prod** — `vercel.json` → `rewrites`.

## Deployment

Static SPA on Vercel. `.github/workflows/deploy.yml` runs on push to `main`:
`npm ci` → `npm run lint` → `npm run typecheck` → `vercel deploy --prod`.

Required GitHub secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## Config

| Variable           | Default | Description                                    |
| ------------------ | ------- | ---------------------------------------------- |
| `VITE_DEFAULT_FEE` | `0.01`  | Fee applied when none is configured for a pair |

## Layout

```
src/
  components/    shared UI (Layout, Navbar, FormField)
  constants/     app-wide constants
  features/
    conversion/  form, hook, result card
    fees/        form, table, storage hook + context
    rates/       ECB XML fetch + context
  pages/         IndexPage, FeesPage
  App.tsx        router + providers
  main.tsx       entry
```

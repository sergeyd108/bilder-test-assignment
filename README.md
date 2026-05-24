# Currency Converter

A client-side currency conversion UI with configurable per-direction fees.
Rates are fetched live from the European Central Bank; fees are persisted to
`localStorage`.

Stack: **React 19 + TypeScript + Vite + Tailwind / DaisyUI**.

## Requirements

- Node.js 22+
- npm

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Scripts

| Command             | Description                                      |
| ------------------- | ------------------------------------------------ |
| `npm run dev`       | Start the Vite dev server (with the ECB proxy)   |
| `npm run build`     | Type-check and produce a production build        |
| `npm run preview`   | Serve the production build locally               |
| `npm run typecheck` | Run `tsc -b`                                     |
| `npm run lint`      | Run `oxlint` then `eslint`                       |
| `npm run fmt`       | Format the codebase with `oxfmt`                 |

## How it works

### Pages

- `/` &mdash; conversion form: enter an amount and pick the source/target
  currencies; the result, fee applied and cross rate are displayed.
- `/fees` &mdash; fees table: add, edit or remove a fee for a `(from, to)`
  pair. Entries are persisted to `localStorage` under the `conversion-fees`
  key.

### Conversion formula

```
result = amount × (1 − fee) × rate
```

- `fee` is taken from the configured list for the exact `(from, to)`
  direction. If no fee is configured for that direction, the **default fee of
  `0.01` (1%)** is applied.
- `rate` is a cross rate derived from ECB's EUR-quoted rates:
  `rate = rates[to] / rates[from]`. This works between any two supported
  currencies, not just from EUR &mdash; e.g. GBP → USD is computed via the
  shared EUR base.

### Fees

- Fees are direction-specific &mdash; `EUR → GBP` and `GBP → EUR` are
  independent entries with their own values.
- Fees are fractions in `[0, 1]` (e.g. `0.2` means 20%).
- All changes are written to `localStorage` immediately.

### Rates source

Daily reference rates are fetched from the ECB XML feed:
`https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml`.

The endpoint does not send CORS headers, so the Vite dev server proxies
requests from `/api/ecb/*` to `https://www.ecb.europa.eu/*` (see
`vite.config.ts`). All network calls happen from the browser through this
proxy.

## Configuration

A single optional environment variable is supported (see `.env.example`):

| Variable            | Default | Description                                    |
| ------------------- | ------- | ---------------------------------------------- |
| `VITE_DEFAULT_FEE`  | `0.01`  | Fee applied when none is configured for a pair |

## Project layout

```
src/
  components/             shared UI primitives (Layout, Navbar, FormField)
  constants/              app-wide constants and defaults
  features/
    conversion/           conversion form, hook, result card
    fees/                 fees form, table, storage hook + context
    rates/                ECB XML fetch + rates context
  pages/                  route entries (IndexPage, FeesPage)
  App.tsx                 router + providers
  main.tsx                React entry point
```

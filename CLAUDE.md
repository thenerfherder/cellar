# Cellar — Personal Wine Cellar Management

## Vision

Cellar is a personal wine cellar management tool, aiming to be the best-in-class tool for serious wine collectors. It should feel like a beautifully designed companion app — part inventory system, part sommelier, part cellar organizer — built for someone who cares about both their wines and their software.

The goal is to make managing a personal cellar genuinely delightful: knowing what you have, when to drink it, where it lives, and how to best enjoy it.

## Core Principles

- **Personal first**: This is for one person's cellar, not a social platform. Opinionated, fast, and focused.
- **Beautiful UI**: Clean, minimal, high-contrast design. No clutter. Every element earns its place.
- **Data-rich but simple**: Show the right data at the right time. Avoid overwhelming the user.
- **Fast**: The app should feel instant. No unnecessary loading states or animations.

## Tech Stack

- **React 18** + **Vite** — frontend framework and build tool
- **Tailwind CSS** — styling (utility-first, no component libraries)
- **Recharts** — data visualization
- **Firebase** — Auth (Google OAuth via `signInWithPopup`) + Firestore (wine data, ratings, catalog — per-user)
- **Anthropic Claude API** — AI-generated tasting notes (optional, requires `VITE_ANTHROPIC_API_KEY`)
- **localStorage** — rack layouts per rack (client-side only)
- **GitHub Pages** — deployment target (base path: `/cellar/`)

## Current Features

### Dashboard View
- **Stats cards**: total bottles, estimated value, average price, unique varietals and regions
- **Visualizations**: segmented bars by varietal and country/region; drinkability breakdown; vintage/peak year bar chart
- **Collection table**: grouped by producer/wine, sortable by vintage, quantity, price, drinkability; quick filters (ready now, at/past peak, not ready); food pairing search; special bottles highlighted blue, final-year wines highlighted red
- **Detail modals**: drill into country, varietal, drinkability status, vintage, or individual wine
- **AI tasting notes**: generate sommelier-quality notes for any wine via the Anthropic API
- **Star ratings**: per-wine personal ratings stored in Firestore; community average and count shown alongside

### Rack View
- **Multiple racks**: create, rename, and delete named racks; tab-based switching via `RackTab`
- **Visual rack grid**: drag-and-drop bottles into physical positions (configurable rows 1–20, cols 1–24)
- **Unplaced palette**: bottles not yet assigned; drag to rack or back to remove
- **Auto-fill**: instantly assign all unplaced bottles to empty slots
- **Varietal color coding**: each varietal gets a distinct color, shown in a legend
- **Hover tooltips**: producer, wine, vintage, region, price, drink window
- **Position labels**: slots labeled A1, B3, etc.; wine detail shows which rack + position each bottle occupies
- **Persistent layout**: each rack's layout and dimensions saved to localStorage

### Wine Management
- **Add wine**: modal with autocomplete for producer and wine name (sourced from shared Firestore catalog)
- **Edit wine**: reuses add modal; reducing quantity removes excess bottle positions from racks
- **Drink bottle**: decrements quantity by 1, removes bottle from rack layouts; if last bottle, wine is deleted entirely

## Data Model

### Firestore: `users/{uid}`
```js
{
  wines: [
    {
      name: string,           // wine name
      producer: string,       // producer/winery
      vintage: number | null, // year, or null for NV
      varietal: string,       // grape variety / blend type
      country: string,        // country (e.g. "United States")
      state: string,          // region/state (e.g. "Walla Walla Valley")
      quantity: number,       // number of bottles
      estimatedPrice: number, // per-bottle price in USD
      drinkWindow: string,    // "YYYY-YYYY" format
    }
  ]
}
```

### Firestore: `ratings/{wineKey}`
Each document keyed by `getWineKey(wine)` (slashes escaped), with per-user rating fields and an aggregated average. Managed entirely by `useRatings.js`.

### Firestore: `catalog/wines`
Shared producer/wine name catalog for autocomplete. Entries stored as `"producer||wineName"` strings. Managed by `useCatalog.js`.

### localStorage: `cellar_racks`
Array of rack objects (not synced to Firestore):
```js
[
  {
    id: string,
    name: string,
    rows: number,
    cols: number,
    layout: { "row-col": { wineIdx: number, bottleNum: number } }
  }
]
```

## Design Language

- **Typography**: Heavy weight (`font-black`) for headings; clean tracking; all-caps labels
- **Colors**: Whites and grays for background/surface; the `COLORS` array for data visualization and bottle tokens
- **Rack aesthetic**: Dark amber/brown (`bg-amber-900`) with circular slots suggesting horizontal bottle ends
- **Special bottles** (>$70): highlighted in blue throughout the UI
- **Final year drinks**: highlighted in red throughout the UI

## Planned / Potential Features

- Bottle history / consumption log
- Purchase tracking and price history
- Cellar analytics over time (value trends, consumption rate)
- Mobile-friendly / responsive rack view
- Export to PDF or CSV
- Barcode / label scanning for adding wines
- Integration with wine databases (Vivino, CellarTracker) for ratings and market prices

## Development Notes

- **Auth**: `src/AuthContext.jsx` wraps the app in a Firebase auth provider. `src/LoginPage.jsx` handles the Google sign-in UI. Unauthenticated users see only the login page.
- **Firestore**: Wine data loaded via `onSnapshot` on `users/{uid}`, written back with `setDoc(..., { merge: true })`. Real-time and per-user.
- **Static data**: `src/data.js` contains `WINE_PAIRINGS`, `TASTING_NOTES`, and `getPairingsForWine`. UI-only lookups, not stored in Firestore.
- Firebase config lives in `src/firebase.js`, sourced from `.env` (`VITE_FIREBASE_*` — see `.env.example`).
- Deploy with `npm run build`; GitHub Actions publishes to Pages on push to `master`.
- AI feature API key: `VITE_ANTHROPIC_API_KEY` in `.env`.

## File Structure

```
src/
├── App.jsx
├── AuthContext.jsx
├── LoginPage.jsx
├── WineCellar.jsx        # main app / dashboard
├── RackView.jsx          # rack view
├── firebase.js
├── main.jsx
├── constants.js
├── utils.js
├── data.js
├── components/
│   ├── AddWineModal.jsx  # add/edit wine form
│   ├── AutocompleteInput.jsx
│   ├── DetailModal.jsx   # reusable modal wrapper
│   ├── RackTab.jsx       # rack tab with rename/delete
│   ├── SegmentedBar.jsx  # exports SegmentedBar, Legend, SegmentedBarWithLegend
│   ├── StarRating.jsx
│   ├── StatCard.jsx
│   ├── WineCard.jsx
│   └── WineList.jsx
└── hooks/
    ├── useCatalog.js       # Firestore catalog for autocomplete
    ├── useRatings.js       # Firestore per-wine ratings
    └── useWineFiltering.js # dashboard table filter/sort state
```

## Key Constants & Utilities

Constants live in `src/constants.js`; utility functions in `src/utils.js`. Import from there — do not redefine.

**`src/constants.js`**
- **`CONFIG`** — `SPECIAL_BOTTLE_THRESHOLD` ($70), `OTHER_THRESHOLD` (5%), `MIN_SEGMENT_DISPLAY` (3 bottles), `CURRENT_YEAR`
- **`DRINKABILITY_STATUS`** — enum: `'Final Year'`, `'Ready Now'`, `'Age 1-5 Years'`, `'Age 5+ Years'`
- **`COLORS`** — 18-color array for varietal/country visualization and rack bottle tokens
- **`VARIETALS`** — grouped varietal options for the Add/Edit Wine form
- **`WINE_REGIONS`** — country → region/state options for the Add/Edit Wine form

**`src/utils.js`**
- **`getColorByIndex(i)`** — cycles through `COLORS` by index
- **`getWineKey(wine)`** — canonical key: `"producer-name-vintage"`; use for React keys and lookup maps
- **`getDrinkabilityStatus(wine)`** — returns `DRINKABILITY_STATUS` value from `drinkWindow` vs `CURRENT_YEAR`
- **`isSpecialBottle(wine)`** — `true` if `estimatedPrice > $70`
- **`aggregateData(items, keyExtractor, threshold)`** — groups by key, collapses small groups into "Other"
- **`sortWines(wines)`** — canonical sort: producer → name → vintage desc
- **`getPeakYear(wine)`** — midpoint of drink window

## Known Tech Debt

1. **Consolidate `DetailModal` boilerplate** — multiple modal invocations with identical `isOpen/onClose/title` pattern; consider a factory/wrapper.
2. **Remove unused `DEFAULT_PAIRINGS` export** from `src/data.js` — only used internally by `getPairingsForWine`.
3. **Replace magic strings with named constants** — `'dashboard'`, `'rack'`, `'Other'`, `'NV'` appear multiple times; should be constants.

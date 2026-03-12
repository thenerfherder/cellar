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
- **Firebase** — backend: Auth (Google OAuth via `signInWithPopup`) + Firestore (wine data, per-user)
- **Anthropic Claude API** — AI-generated tasting notes (optional, requires `VITE_ANTHROPIC_API_KEY`)
- **localStorage** — rack layout and dimensions (client-side only, not synced to Firestore)
- **GitHub Pages** — deployment target (base path: `/cellar/`)

## Current Features

### Dashboard View
- **Stats cards**: total bottles, estimated value, average price, unique varietals and regions
- **Visualizations**: segmented bars by varietal and country/region; drinkability breakdown; vintage/peak year bar chart
- **Complete collection table**: grouped by producer/wine, sortable by vintage, quantity, price, drinkability; quick filters (ready now, at/past peak, not ready); food pairing search
- **Detail modals**: drill into country, varietal, drinkability status, vintage, or individual wine
- **AI tasting notes**: generate sommelier-quality notes for any wine via the Anthropic API

### Rack View
- **Visual rack grid**: drag-and-drop bottles into physical positions (configurable rows/cols, up to 20×24)
- **Unplaced palette**: bottles not yet assigned to a rack position; drag to rack or back to remove
- **Auto-fill**: instantly assign all unplaced bottles to empty slots
- **Varietal color coding**: each varietal gets a distinct color, shown in a legend
- **Hover tooltips**: producer, wine, vintage, region, price, drink window
- **Persistent layout**: rack positions saved to localStorage

## Data Model

Wine entries live in Firestore at `users/{uid}` as a `wines` array. Each entry:
```js
{
  name: string,           // wine name
  producer: string,       // producer/winery
  vintage: number | null, // year, or null for NV
  varietal: string,       // grape variety / blend type
  region: string,         // full region string (e.g. "Walla Walla Valley, Washington")
  quantity: number,       // number of bottles
  estimatedPrice: number, // per-bottle price in USD
  drinkWindow: string,    // "YYYY-YYYY" format
}
```

Rack layout stored in localStorage under `cellar_rack_layout` (not synced to Firestore):
```js
{
  "row-col": { wineIdx: number, bottleNum: number }
}
```

Rack dimensions stored in localStorage under `cellar_rack_dimensions`:
```js
{ rows: number, cols: number }
```

## Design Language

- **Typography**: Heavy weight (`font-black`) for headings; clean tracking; all-caps labels
- **Colors**: Whites and grays for background/surface; the `COLORS` array for data visualization and bottle tokens
- **Rack aesthetic**: Dark amber/brown (`bg-amber-900`) with circular slots suggesting horizontal bottle ends
- **Special bottles** (>$70): highlighted in blue throughout the UI
- **Final year drinks**: highlighted in red throughout the UI

## Planned / Potential Features

- Edit wine data in-app (add, remove, update quantities as bottles are consumed)
- Bottle history / consumption log
- Purchase tracking and price history
- Cellar analytics over time (value trends, consumption rate)
- Multiple rack support (e.g. a main rack + a fridge)
- Mobile-friendly / responsive rack view
- Export to PDF or CSV
- Barcode / label scanning for adding wines
- Integration with wine databases (Vivino, CellarTracker) for ratings and market prices

## Development Notes

- **Auth**: `src/AuthContext.jsx` wraps the app in a Firebase auth provider. `src/LoginPage.jsx` handles the Google sign-in UI. Unauthenticated users see only the login page.
- **Firestore**: Wine data is loaded via `onSnapshot` on `users/{uid}` and written back with `setDoc(..., { merge: true })`. This is real-time and per-user.
- **Static data**: `src/data.js` still contains `WINE_PAIRINGS`, `TASTING_NOTES`, and `getPairingsForWine`. These are UI-only lookups, not stored in Firestore.
- `COLORS` array is defined in `src/WineCellar.jsx` and passed as props to child components that need it (`RackView`).
- Firebase config lives in `src/firebase.js` and is sourced from `.env` (`VITE_FIREBASE_*` variables — see `.env.example`).
- Deploy with `npm run build`; GitHub Actions handles publishing to Pages on push to `master`.
- API key for AI features goes in `.env` as `VITE_ANTHROPIC_API_KEY` (see `.env.example`).

## Key Constants & Utilities (src/WineCellar.jsx)

These are module-level and should be reused rather than redefined:

- **`CONFIG`** — central thresholds: `SPECIAL_BOTTLE_THRESHOLD` ($70, blue highlight), `OTHER_THRESHOLD` (5% of total, for collapsing small segments into "Other"), `MIN_SEGMENT_DISPLAY` (3 bottles min to show label), `CURRENT_YEAR`
- **`DRINKABILITY_STATUS`** — enum: `'Final Year'`, `'Ready Now'`, `'Age 1-5 Years'`, `'Age 5+ Years'`
- **`COLORS`** — 18-color array for varietal/country visualization and rack bottle tokens; use `getColorByIndex(i)` to cycle through it
- **`getWineKey(wine)`** — canonical identity key: `"producer-name-vintage"`; use for React keys and any wine lookup maps
- **`getDrinkabilityStatus(wine)`** — returns a `DRINKABILITY_STATUS` value based on `drinkWindow` vs `CURRENT_YEAR`
- **`isSpecialBottle(wine)`** — returns `true` if `estimatedPrice > $70` (triggers blue highlight)
- **`extractCountry(region)`** — parses the last comma-separated token from a region string
- **`aggregateData(items, keyExtractor, threshold)`** — groups wines by a key, collapses small groups into "Other"

## Code Health & Known Tech Debt

### Completed cleanups
- `WINE_DATA`, `WINE_PAIRINGS`, `TASTING_NOTES`, `DEFAULT_PAIRINGS`, and `getPairingsForWine` extracted from `WineCellar.jsx` into `src/data.js`
- `CURRENT_YEAR` now uses `new Date().getFullYear()` (no manual updates needed)
- Unused imports (`DEFAULT_PAIRINGS`, `WINE_PAIRINGS`) removed from `WineCellar.jsx`
- React list keys fixed: `SegmentedBar` and `Legend` use `item.name`; table rows use `getWineKey(wine)`

### Remaining tech debt (prioritized)
1. **Extract nested components** — `StatCard`, `SegmentedBar`, `Legend`, `WineCard`, `DetailModal`, etc. are all defined inside `WineCellar.jsx` (~979 lines). Should move to `src/components/`.
2. **Consolidate `getXxxDetails()` functions** — four nearly-identical functions (country, varietal, drinkability, vintage) could become one generic function.
3. **Extract filtering/sorting logic** — the `filteredCellar` useMemo is ~68 lines; should move to a utility file.
4. **Consolidate `DetailModal` implementations** — four similar modal render blocks could use a generic factory.

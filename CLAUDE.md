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
- **Static data**: `src/data.js` contains `WINE_PAIRINGS`, `TASTING_NOTES`, and `getPairingsForWine`. UI-only lookups, not stored in Firestore. See **Pairing & Tasting Notes Logic** below for details.
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
│   ├── SommelierView.jsx # sommelier / food pairing view
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
- **`PAIRING_KEYS`** — 38-entry object of all dish/sub-category score keys (e.g. `PAIRING_KEYS.CAVIAR`, `PAIRING_KEYS.RED_MEAT`). Imported by both `data.js` and `SommelierView.jsx`. Always use these constants — never raw strings — in `VARIETAL_PAIRING_SCORES`, `REGION_SCORE_MODIFIERS`, `ROBUST/DELICATE_PAIRING_KEYS`, `PREPARATION_MODIFIERS`, and `DISH_CATEGORIES`.

**`src/utils.js`**
- **`getColorByIndex(i)`** — cycles through `COLORS` by index
- **`getWineKey(wine)`** — canonical key: `"producer-name-vintage"`; use for React keys and lookup maps
- **`getDrinkabilityStatus(wine)`** — returns `DRINKABILITY_STATUS` value from `drinkWindow` vs `CURRENT_YEAR`
- **`isSpecialBottle(wine)`** — `true` if `estimatedPrice > $70`
- **`aggregateData(items, keyExtractor, threshold)`** — groups by key, collapses small groups into "Other"
- **`sortWines(wines)`** — canonical sort: producer → name → vintage desc
- **`getPeakYear(wine)`** — midpoint of drink window

## Pairing & Tasting Notes Logic

All three pairing-related features share a single source of truth: `WINE_PAIRINGS` in `src/data.js`, keyed by varietal string. `TASTING_NOTES` uses the same keys. Every varietal listed in `VARIETALS` (`src/constants.js`) has a corresponding entry in both maps.

### Tasting Notes (wine detail modal)
- **Source**: `TASTING_NOTES[wine.varietal] || DEFAULT_TASTING_NOTES`
- Static per-varietal descriptions. Falls back to a generic note for unknown varietals.

### Perfect Pairings (wine detail modal)
- **Source**: `getPairingsForWine(wine)` → `WINE_PAIRINGS[wine.varietal] ?? DEFAULT_PAIRINGS`
- Returns 5 food strings for the varietal. Falls back to 5 generic pairings for unknown varietals.
- Always use `getPairingsForWine(wine)` — never access `WINE_PAIRINGS[wine.varietal]` directly in components.

### Dashboard Food Pairing Search
- **Source**: same `getPairingsForWine(wine)` call, in `useWineFiltering.js`
- Free-text substring match against the pairing strings (e.g. searching "lamb" surfaces all wines whose pairings include "lamb").

### Sommelier View (`src/components/SommelierView.jsx`)
Works the **reverse direction**: given a dish category (and optional sub-category), finds matching wines.

1. **Score each varietal** (`varietalScores`): primary source is `VARIETAL_PAIRING_SCORES` in `data.js`, keyed by dish/sub-category id (scores 1–5). For varietals not in the score table, falls back to text-matching against `WINE_PAIRINGS` keywords (capped at 2).
2. **Readiness filter**: only wines with status `Ready Now` or `Final Year` are recommended — wines not yet drinkable are excluded entirely. Wines with no drink window pass through.
3. **Composite score** per bottle: `(pairingScore × 2) + regionBonus + peakProximityBonus + tanninAdjust + prepBonus + ratingBonus + occasionBonus`
   - `regionBonus`: per-country varietal bonuses from `REGION_SCORE_MODIFIERS`
   - `peakProximityBonus`: continuous 0–4 bonus based on position within drink window (peaks at midpoint, decays gracefully 2 years past end)
   - `tanninAdjust`: not-yet-ready wines score +1 on robust dishes, −1 on delicate dishes
   - `prepBonus`: light/rich preparation style modifier from `PREPARATION_MODIFIERS`
   - `ratingBonus`: +1 if personally rated ≥4, −1 if rated ≤2
   - `occasionBonus`: casual surfaces everyday bottles; fancy/celebration surfaces special bottles
4. **Score breakdown**: each wine displays its composite score; hovering reveals a `ScoreTag` tooltip breaking down every contributing factor (pairing fit, peak proximity, region, tannin, prep, rating, occasion) with green/red color coding. Zero-value factors are omitted. `ScoreTag` is a module-level component (not defined inside render).
5. **Filter cellar** to wines whose varietal has score > 0 and are ready to drink, then sort by composite score descending.
6. **Top result** is labelled "Pick". Each wine shows `· good with X, Y` (matched sub-category labels) inline.
7. **Target Varietals** shows up to 5 varietals sorted by pairing score descending.

**Three-level filtering**: Casual/Fancy/Celebration → primary dish category → optional sub-category. Selecting a sub-category narrows `activeKeywords` and `activeKey`; deselecting returns to the full category.

**Dish categories, sub-categories, and their keywords** (keywords used for text-match fallback; `scoreKey` overrides the id for score table lookup where noted):

| Category | Sub-category | Keywords | scoreKey |
|---|---|---|---|
| Red Meat | Steak | steak, beef | |
| Red Meat | Lamb | lamb, chops | |
| Red Meat | Ribs & Brisket | ribs, short ribs, brisket | |
| Red Meat | Game | venison, wild game, game | |
| Red Meat | Chorizo | chorizo | |
| Poultry | Chicken | chicken | |
| Poultry | Duck | duck | |
| Poultry | Turkey | turkey | |
| Pork | Chops | pork, tenderloin, pork chop | pork-chops |
| Pork | Belly | belly, pork belly | pork-belly |
| Pork | Ham & Cured | ham, prosciutto, pancetta, cured | ham |
| Fish | Salmon | salmon | |
| Fish | Trout | trout | |
| Fish | White Fish | fish | white-fish |
| Seafood | Oysters | oyster | |
| Seafood | Lobster | lobster, seafood | |
| Seafood | Shrimp | shrimp | |
| Seafood | Sushi | sushi, ceviche | |
| Seafood | Caviar | caviar | |
| Pasta & Pizza | Pasta | pasta, bolognese, osso buco | pasta-sub |
| Pasta & Pizza | Pizza | pizza | |
| Pasta & Pizza | Risotto | risotto | |
| Cheese | Cheese | cheese | cheese-sub |
| Cheese | Charcuterie | charcuterie | |
| Vegetables | Salad | salad | |
| Vegetables | Mushrooms | mushroom | |
| Vegetables | Roasted Veg | roasted vegetables, vegetable, ratatouille | roasted |
| Vegetables | Mediterranean | mediterranean, herb | |

**Important**: when adding or editing pairing strings in `WINE_PAIRINGS`, ensure each entry contains at least one word from the keyword list above, so the wine will appear in the Sommelier text-match fallback. Primary scoring uses `VARIETAL_PAIRING_SCORES` — always update that table when adding new varietals. Dessert/fortified wines (Port, Sauternes, Late Harvest Riesling) intentionally only match Cheese — that is correct culinary behaviour.

## Known Tech Debt

Ordered by priority:

### Dead Code (easy wins)
2. ~~**Remove unused `prefill` param**~~ — `prefill` is actively used; `setAddWinePrefill({ producer, name })` is called in `WineCellar.jsx:446`. Entry was incorrect.
3. ~~**Remove unused `DEFAULT_PAIRINGS` export**~~ — fixed; now unexported.

### React Anti-patterns
4. **Fix array-index key in WineList.jsx:9** — `<WineCard key={idx} ...>` should use `getWineKey(wine)` for stable identity.
5. **Move `statusOrder` map out of render** in `useWineFiltering.js:54` — recreated on every sort call; hoist to module-level constant.
~~**`ScoreTag` defined inside render**~~ — fixed; hoisted to module-level component in `SommelierView.jsx`.

### Tech Debt (larger)
6. **Replace magic strings with named constants** — `'dashboard'`, `'rack'`, `'Other'`, `'NV'` appear 9+ times across files; should live in `constants.js`.
7. **Consolidate `DetailModal` boilerplate** in `WineCellar.jsx:635–836` — 5 near-identical invocations with `isOpen={!!selectedX}` / `onClose={() => setSelectedX(null)}`; consider a factory helper.
8. **Extract rowspan lookahead logic** from `WineCellar.jsx:514–535` into a utility function for readability.
~~9. **Enforce pairing score key strings**~~ — fixed; all 38 keys now defined in `PAIRING_KEYS` in `constants.js` and used via computed property syntax throughout `data.js` and `SommelierView.jsx`.

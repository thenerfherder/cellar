# Cellar — Personal Wine Cellar Management

## Vision

Cellar is a personal wine cellar management tool, aiming to be the best-in-class tool for serious wine collectors. It should feel like a beautifully designed companion app — part inventory system, part sommelier, part cellar organizer — built for someone who cares about both their wines and their software.

The goal is to make managing a personal cellar genuinely delightful: knowing what you have, when to drink it, where it lives, and how to best enjoy it.

## Core Principles

- **Personal first**: This is for one person's cellar, not a social platform. Opinionated, fast, and focused.
- **Beautiful UI**: Clean, minimal, high-contrast design. No clutter. Every element earns its place.
- **Data-rich but simple**: Show the right data at the right time. Avoid overwhelming the user.
- **Offline-capable**: All core functionality works without a network connection. AI features are optional enhancements.
- **Fast**: The app should feel instant. No unnecessary loading states or animations.

## Tech Stack

- **React 18** + **Vite** — frontend framework and build tool
- **Tailwind CSS** — styling (utility-first, no component libraries)
- **Recharts** — data visualization
- **Anthropic Claude API** — AI-generated tasting notes (optional, requires `VITE_ANTHROPIC_API_KEY`)
- **localStorage** — persistence for rack layout and user preferences
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

Each wine entry:
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

Rack layout stored in localStorage under `cellar_rack_layout`:
```js
{
  "row-col": { wineIdx: number, bottleNum: number }
}
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

- All wine data is currently hardcoded in `src/WineCellar.jsx` as `WINE_DATA`. Future work should move this to a persistent store (localStorage, IndexedDB, or a backend).
- `COLORS` array and `WINE_DATA` are module-level constants — passed as props to child components that need them (`RackView`).
- The app is fully static — no backend. Keep it that way unless there's a strong reason to add one.
- Deploy with `npm run build`; GitHub Actions handles publishing to Pages on push to `master`.
- API key for AI features goes in `.env` as `VITE_ANTHROPIC_API_KEY` (see `.env.example`).

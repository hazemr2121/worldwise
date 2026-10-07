# WorldWise

A React app for keeping track of the cities you've travelled to. Click anywhere
on the world map, WorldWise works out which city you landed on, and you save it
with a date and your notes. Cities collect into a list and a set of map markers,
grouped by country.

**[Live demo](https://worldwise-murex.vercel.app/)** — log in with the
pre-filled demo credentials on the login page.

## Demo credentials

```
demo@worldwise.app
demo1234
```

## Features

- Click the map to add a city; the location is reverse-geocoded into a city and
  country name automatically
- Browse your cities as a list, or grouped by country
- Open any city for its date, notes and a link out to Wikipedia
- Delete cities you didn't mean to add
- "My position" jumps the map to where you actually are
- Protected `/app` routes behind a demo login that survives a page refresh

## How data is stored

There is no backend. Cities are seeded from `src/data/cities.json` on first
load and then persisted to `localStorage`, so everything you add or delete
survives a reload and the deployed demo is fully interactive without a server to
run or pay for.

The storage layer lives in `src/services/citiesApi.js` and exposes the same
async shape a real API client would (`getCities`, `getCity`, `createCity`,
`deleteCity`), so swapping in a real backend means rewriting that one file.

To wipe any added cities and restore the originals mid-demo, call
`resetCities()` from that module, or clear the `worldwise:cities:v1` key in
your browser's local storage.

## Tech

- **React 18** — hooks, context, `useReducer` for cities and auth state
- **React Router 6** — nested and protected routes, lazy-loaded pages
- **Leaflet** / **react-leaflet** — the world map and markers
- **Vite** — dev server and build
- **CSS Modules** — component-scoped styles

## Running locally

Requires Node 18 or newer.

```shell
git clone https://github.com/hazemr2121/worldwise.git
cd worldwise
npm install
npm run dev
```

Vite prints the local URL when it starts (`http://localhost:5173` by default).
No separate API server is needed.

Other scripts:

```shell
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # eslint
```

## Deploying

The app is a static site — any static host works. `vercel.json` already
contains the SPA rewrite that sends every path to `index.html`, which is what
keeps deep links like `/app/cities/73930385` from 404ing on refresh.

On Vercel, importing the repository is enough; the framework preset is detected
and the defaults are correct:

- Build command: `npm run build`
- Output directory: `dist`

## External services

Two public APIs are called from the browser, both without a key:

- [BigDataCloud](https://www.bigdatacloud.com/) reverse-geocodes a map click
  into a city and country. If it's unreachable the form still opens and you can
  type the city name in by hand.
- OpenStreetMap serves the map tiles.

## Notes

Authentication is deliberately fake — credentials are checked against a
constant in `src/contexts/fakeAuthContext.jsx`. It exists to demonstrate
protected routing, not security.

Built following Jonas Schmedtmann's React course, then extended: the json-server
backend was replaced with the local persistence layer above, the pages were
written out properly, and the layout was made responsive.

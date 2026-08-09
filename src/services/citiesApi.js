import seedCities from "../data/cities.json";

// Demo persistence layer.
//
// The deployed build has no writable backend (my-json-server is read-only), so
// cities live in localStorage instead. The store is seeded from the bundled
// city list the first time it runs, and every create/delete is written back, so
// changes survive a page reload.
//
// If localStorage is unavailable (Safari private browsing, blocked cookies) we
// fall back to an in-memory copy: writes still work for the length of the
// session instead of throwing.

const STORAGE_KEY = "worldwise:cities:v1";
const LATENCY_MS = 250;

let memoryFallback = null;

function storageAvailable() {
  try {
    const probe = "__worldwise_probe__";
    window.localStorage.setItem(probe, probe);
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

const useStorage = typeof window !== "undefined" && storageAvailable();

function read() {
  if (!useStorage) {
    if (memoryFallback === null) memoryFallback = structuredClone(seedCities);
    return memoryFallback;
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = structuredClone(seedCities);
    write(seeded);
    return seeded;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error("Stored cities are not a list");
    return parsed;
  } catch {
    // Corrupted or hand-edited storage: start over from the seed rather than
    // leaving the app stuck on an error screen mid-demo.
    const seeded = structuredClone(seedCities);
    write(seeded);
    return seeded;
  }
}

function write(cities) {
  if (!useStorage) {
    memoryFallback = cities;
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}

// Keeps the existing loading spinners visible for a beat instead of flashing.
function delay(value) {
  return new Promise((resolve) => setTimeout(() => resolve(value), LATENCY_MS));
}

function makeId() {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

export async function getCities() {
  return delay(read());
}

export async function getCity(id) {
  const city = read().find((c) => String(c.id) === String(id));
  if (!city) throw new Error(`No city found with id ${id}`);
  return delay(city);
}

export async function createCity(newCity) {
  if (!newCity?.cityName) throw new Error("A city needs a name");

  const city = {
    ...newCity,
    // The form supplies lat/lng as strings straight from the URL; store them as
    // numbers so the map and the seeded cities agree on a shape.
    position: {
      lat: Number(newCity.position?.lat),
      lng: Number(newCity.position?.lng),
    },
    date:
      newCity.date instanceof Date
        ? newCity.date.toISOString()
        : new Date(newCity.date ?? Date.now()).toISOString(),
    id: makeId(),
  };

  write([...read(), city]);
  return delay(city);
}

export async function deleteCity(id) {
  write(read().filter((c) => String(c.id) !== String(id)));
  return delay(id);
}

// Escape hatch for the demo: wipes any added cities and restores the originals.
export function resetCities() {
  write(structuredClone(seedCities));
}

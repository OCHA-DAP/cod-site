import positron from "./basemap/positron.json";
import type { FilterSpecification, StyleSpecification } from "maplibre-gl";

// v6 requires bundlers to set the worker URL explicitly — import.meta.url
// auto-detection doesn't reliably resolve inside a bundler's module graph.
// See: https://maplibre.org/maplibre-gl-js/docs/guides/v5-to-v6-migration-guide/
let maplibreModulePromise: Promise<typeof import("maplibre-gl")> | undefined;

export function loadMaplibre(): Promise<typeof import("maplibre-gl")> {
  if (!maplibreModulePromise) {
    maplibreModulePromise = (async () => {
      const [maplibregl, { default: workerUrl }] = await Promise.all([
        import("maplibre-gl"),
        import("maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url"),
      ]);
      maplibregl.setWorkerUrl(workerUrl);
      return maplibregl;
    })();
  }
  return maplibreModulePromise;
}

// OpenFreeMap positron without its country boundaries or country and state labels.
export async function loadStyle(): Promise<StyleSpecification> {
  return { ...(structuredClone(positron) as StyleSpecification), projection: { type: "globe" } };
}

export const polyFilter: FilterSpecification = [
  "match",
  ["geometry-type"],
  ["Polygon", "MultiPolygon"],
  true,
  false,
];

export const lineWidth = [
  "interpolate",
  ["linear"],
  ["zoom"],
  4,
  0.2,
  10,
  0.6,
  14,
  1,
] as unknown as number;

// OCHA token values from src/styles/{brand,site-tokens}.css; MapLibre paint properties can't read CSS variables.
export const MAP_COLORS = {
  original: "#aea29a", // slate-600
  result: "#64bdea", // blue--bright
  outline: "#262626", // grey--900
  overlap: "#ed1847", // red-600
  gap: "#f58220", // orange-600
  micro: "#4d4d4d", // grey--800
  notch: "#004987", // blue--dark
  selected: "#0074b7", // blue--darker
  fallback: "#999999", // grey--600
  water: "#e3edf6", // blue--lightest
  land: "#f2f2f2", // grey--300
} as const;

export const MAP_FILL_OPACITY = 0.8;

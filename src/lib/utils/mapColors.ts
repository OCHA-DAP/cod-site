// OCHA token values from src/styles/{brand,site-tokens}.css; MapLibre paint properties can't read CSS variables.
// A faint UN Blue tint is no change, green is fixed, red is error; multi-status maps use the categorical ramp below.
export const MAP_COLORS = {
  original: "#009edb", // ocha-blue, drawn at MAP_TINT_OPACITY
  result: "#cee3a0", // green-400
  error: "#f9c0c5", // red-400
  outline: "#0077b8", // ocha-blue--aa
  overlap: "#ed1847", // red-600
  gap: "#f58220", // orange-600
  micro: "#6e6259", // slate-700
  notch: "#a05fb4", // purple
  selected: "#004987", // blue--dark
  fallback: "#bfbfbf", // grey--500
} as const;

// Rainbow order across the OCHA ramps, for categories with no fixed/error meaning.
export const MAP_CATEGORICAL = [
  "#ed1847", // red-600
  "#f58220", // orange-600
  "#ffc800", // yellow
  "#72bf44", // green-500
  "#009edb", // ocha-blue
  "#a05fb4", // purple
  "#f3859b", // red-500
  "#f9a870", // orange-500
  "#006747", // green-700
  "#004987", // blue--dark
] as const;

export const MAP_TINT_OPACITY = 0.15;
export const MAP_STATUS_OPACITY = 0.6;

export function fillOpacity(fill: unknown): number {
  return fill === MAP_COLORS.original ? MAP_TINT_OPACITY : MAP_STATUS_OPACITY;
}

/** Map scroll progress (0 → 1) to camera depth and zone lighting. */

export const CAMERA_START_Y = 0
export const CAMERA_END_Y = -40
export const CAMERA_Z = 8

/** Camera world Y for a given scroll progress. */
export function cameraYFromProgress(progress) {
  const t = clamp01(progress)
  return CAMERA_START_Y + (CAMERA_END_Y - CAMERA_START_Y) * t
}

/**
 * Approximate ocean depth in meters using zone breakpoints
 * (not a flat 0→11000 line — matches blueprint zone ranges).
 */
export function depthMetersFromProgress(progress) {
  const t = clamp01(progress)
  const stops = [
    { t: 0, m: 0 },
    { t: 0.2, m: 200 },
    { t: 0.4, m: 1000 },
    { t: 0.6, m: 4000 },
    { t: 0.8, m: 6000 },
    { t: 1, m: 11000 },
  ]

  let i = 0
  while (i < stops.length - 1 && t > stops[i + 1].t) i += 1

  const a = stops[i]
  const b = stops[Math.min(i + 1, stops.length - 1)]
  const span = b.t - a.t || 1
  const local = (t - a.t) / span
  return lerp(a.m, b.m, local)
}

/** Temperature °C: 25°C surface → 1°C abyss. */
export function temperatureFromProgress(progress) {
  return lerp(25, 1, clamp01(progress))
}

/** Pressure ATM: 1 → 1,100. */
export function pressureFromProgress(progress) {
  return lerp(1, 1100, clamp01(progress))
}

/** Zone-aware lighting + background for the current progress. */
export function lightingFromProgress(progress) {
  const t = clamp01(progress)
  const stops = LIGHT_STOPS

  let i = 0
  while (i < stops.length - 1 && t > stops[i + 1].t) i += 1

  const a = stops[i]
  const b = stops[Math.min(i + 1, stops.length - 1)]
  const span = b.t - a.t || 1
  const local = (t - a.t) / span

  return {
    background: lerpHex(a.background, b.background, local),
    ambientColor: lerpHex(a.ambientColor, b.ambientColor, local),
    ambientIntensity: lerp(a.ambientIntensity, b.ambientIntensity, local),
    directionalColor: lerpHex(a.directionalColor, b.directionalColor, local),
    directionalIntensity: lerp(a.directionalIntensity, b.directionalIntensity, local),
  }
}

/** Five ocean zones → color stops (aligned to scroll fifths). */
const LIGHT_STOPS = [
  {
    t: 0,
    background: '#22d3ee',
    ambientColor: '#a5f3fc',
    ambientIntensity: 0.9,
    directionalColor: '#ffffff',
    directionalIntensity: 1.2,
  },
  {
    t: 0.25,
    background: '#1e1b4b',
    ambientColor: '#1e3a8a',
    ambientIntensity: 0.35,
    directionalColor: '#818cf8',
    directionalIntensity: 0.45,
  },
  {
    t: 0.5,
    background: '#0a0a0a',
    ambientColor: '#171717',
    ambientIntensity: 0.06,
    directionalColor: '#262626',
    directionalIntensity: 0.08,
  },
  {
    t: 0.75,
    background: '#18181b',
    ambientColor: '#292524',
    ambientIntensity: 0.18,
    directionalColor: '#ea580c',
    directionalIntensity: 0.55,
  },
  {
    t: 1,
    background: '#020617',
    ambientColor: '#1e1b4b',
    ambientIntensity: 0.12,
    directionalColor: '#6d28d9',
    directionalIntensity: 0.35,
  },
]

function clamp01(value) {
  return Math.min(1, Math.max(0, value))
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function lerpHex(hexA, hexB, t) {
  const a = hexToRgb(hexA)
  const b = hexToRgb(hexB)
  const r = Math.round(lerp(a.r, b.r, t))
  const g = Math.round(lerp(a.g, b.g, t))
  const bl = Math.round(lerp(a.b, b.b, t))
  return rgbToHex(r, g, bl)
}

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  }
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

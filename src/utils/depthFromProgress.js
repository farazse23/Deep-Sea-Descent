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
 * Approximate ocean depth in meters (0 → 11,000).
 * Used later by the HUD; handy for lighting too.
 */
export function depthMetersFromProgress(progress) {
  return clamp01(progress) * 11000
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

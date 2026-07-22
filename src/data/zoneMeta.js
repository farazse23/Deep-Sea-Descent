/** Zone metadata for scroll sections, HUD, and navigation. */

export const HUD_METERS = {
  depthMin: 0,
  depthMax: 11000,
  tempSurface: 25,
  tempAbyss: 1,
  pressureMin: 1,
  pressureMax: 1100,
}

/**
 * Each zone owns one fifth of scroll (0 → 1).
 * depthStart/depthEnd match real ocean ranges from the blueprint.
 */
export const zones = [
  {
    id: 'zone-epipelagic',
    name: 'Epipelagic Zone',
    shortName: 'EPI',
    depthLabel: '0m – 200m',
    depthStart: 0,
    depthEnd: 200,
    scrollRange: '0vh → 100vh',
    progressStart: 0,
    progressEnd: 0.2,
    order: 1,
  },
  {
    id: 'zone-mesopelagic',
    name: 'Mesopelagic Zone',
    shortName: 'MESO',
    depthLabel: '200m – 1,000m',
    depthStart: 200,
    depthEnd: 1000,
    scrollRange: '100vh → 200vh',
    progressStart: 0.2,
    progressEnd: 0.4,
    order: 2,
  },
  {
    id: 'zone-bathypelagic',
    name: 'Bathypelagic Zone',
    shortName: 'BATHY',
    depthLabel: '1,000m – 4,000m',
    depthStart: 1000,
    depthEnd: 4000,
    scrollRange: '200vh → 300vh',
    progressStart: 0.4,
    progressEnd: 0.6,
    order: 3,
  },
  {
    id: 'zone-abyssopelagic',
    name: 'Abyssopelagic Zone',
    shortName: 'ABYSS',
    depthLabel: '4,000m – 6,000m',
    depthStart: 4000,
    depthEnd: 6000,
    scrollRange: '300vh → 400vh',
    progressStart: 0.6,
    progressEnd: 0.8,
    order: 4,
  },
  {
    id: 'zone-hadalpelagic',
    name: 'Hadalpelagic Zone',
    shortName: 'HADAL',
    depthLabel: '6,000m – 11,000m',
    depthStart: 6000,
    depthEnd: 11000,
    scrollRange: '400vh → 500vh',
    progressStart: 0.8,
    progressEnd: 1,
    order: 5,
    tagline: 'Challenger Deep — the deepest trench on Earth.',
    interactionHint: 'Click the glowing amphipod to explore life at the limit.',
    theme: 'hadal',
  },
]

/** Active zone for a given scroll progress (0 → 1). */
export function zoneFromProgress(progress) {
  const t = Math.min(1, Math.max(0, progress))
  return (
    zones.find((z) => t >= z.progressStart && t < z.progressEnd) ??
    zones[zones.length - 1]
  )
}

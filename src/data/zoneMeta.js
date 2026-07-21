/** Zone metadata for scroll sections, HUD, and navigation. */
export const zones = [
  {
    id: 'zone-epipelagic',
    name: 'Epipelagic Zone',
    depthLabel: '0m – 200m',
    scrollRange: '0vh → 100vh',
    order: 1,
  },
  {
    id: 'zone-mesopelagic',
    name: 'Mesopelagic Zone',
    depthLabel: '200m – 1,000m',
    scrollRange: '100vh → 200vh',
    order: 2,
  },
  {
    id: 'zone-bathypelagic',
    name: 'Bathypelagic Zone',
    depthLabel: '1,000m – 4,000m',
    scrollRange: '200vh → 300vh',
    order: 3,
  },
  {
    id: 'zone-abyssopelagic',
    name: 'Abyssopelagic Zone',
    depthLabel: '4,000m – 6,000m',
    scrollRange: '300vh → 400vh',
    order: 4,
  },
  {
    id: 'zone-hadalpelagic',
    name: 'Hadalpelagic Zone',
    depthLabel: '6,000m – 11,000m',
    scrollRange: '400vh → 500vh',
    order: 5,
  },
]

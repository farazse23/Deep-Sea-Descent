import coralWarmingImg from '../assets/images/coral-warming.jpg?url'

/** Section 1 — Epipelagic / turtle click */
export const turtleModal = {
  title: 'Warming Oceans',
  imageSrc: coralWarmingImg,
  body: [
    {
      heading: 'Sunlit nurseries',
      text: 'In the epipelagic zone, coral reefs are among the most productive ecosystems on Earth — sheltering turtles, fish, and countless species in the first 200 meters of the ocean.',
    },
    {
      heading: 'Coral bleaching',
      text: 'As oceans absorb excess heat, corals expel the symbiotic algae that feed them, turning white in a process called bleaching. Without those algae, reefs starve and collapse.',
    },
    {
      heading: 'Ripple effects',
      text: 'Warmer seas fuel stronger storms, shift marine food webs, and threaten coastal communities that depend on healthy reefs for food, tourism, and storm protection.',
    },
    {
      heading: 'Why it matters here',
      text: 'The surface ocean sets the stage for every zone below. Protect temperature at the top, and you protect the entire descent — from twilight jellyfish to trench-floor life.',
    },
  ],
}

/** Section 2 — Mesopelagic / jellyfish click */
export const jellyfishModal = {
  title: 'Diel Vertical Migration',
  chart: 'diel-migration',
  body: [
    {
      heading: 'The twilight zone',
      text: 'Between 200 and 1,000 meters, sunlight fades to near darkness. Bioluminescent animals — like the glowing jellyfish here — become moving light sources in a world without day or night as we know it.',
    },
    {
      heading: 'The largest migration on Earth',
      text: 'Each night, billions of fish, squid, and zooplankton rise toward the surface to feed under cover of darkness, then sink back down by day. This daily rhythm is called diel vertical migration.',
    },
    {
      heading: 'A hidden carbon pump',
      text: 'By eating at the surface and releasing waste deeper down, migrators shuttle carbon and nutrients through the water column — a quiet engine of the global ocean food web and climate system.',
    },
  ],
}

/** Section 3 — Bathypelagic / anglerfish click */
export const anglerfishModal = {
  title: 'Anglerfish',
  body: [
    {
      heading: 'Biological adaptations',
      text: 'Anglerfish survive crushing pressure and scarce food with soft, gelatinous bodies, huge mouths, and expandable stomachs that can swallow prey larger than themselves.',
    },
    {
      heading: 'Bioluminescence',
      text: 'A glowing lure (esca) on the forehead flickers in total darkness — bait for curious prey. The light comes from symbiotic bacteria living inside the lure, not from the fish alone.',
    },
    {
      heading: 'Survival in complete darkness',
      text: 'Below 1,000 m, sunlight never reaches. Sensory adaptations, ambush hunting, and extreme energy efficiency replace vision based on daylight.',
    },
    {
      heading: 'Flashlight mode',
      text: 'In this zone your cursor acts as a spotlight. Most of the scene stays black until you sweep light across it — the way deep-sea life experiences a world lit only by rare bioluminescence.',
    },
  ],
}

/** Section 4 — Abyssopelagic / vent click */
export const ventModal = {
  title: 'Hydrothermal Vents',
  chart: 'chemosynthesis',
  body: [
    {
      heading: 'Chemosynthesis',
      text: 'At hydrothermal vents, microbes turn chemicals from Earth’s crust — especially hydrogen sulfide — into energy. No sunlight required.',
    },
    {
      heading: 'Hydrothermal ecosystems',
      text: 'Heat and minerals fuel dense communities: microbes, tube worms, crabs, and fish clustered around black smokers and chimney structures on the seafloor.',
    },
    {
      heading: 'Life without sunlight',
      text: 'These oases prove that complex food webs can run on geothermal chemistry alone — a model for how life might persist in Earth’s darkest oceans and on other worlds.',
    },
    {
      heading: 'Tripod fish & the abyss',
      text: 'Nearby, tripod fish perch on the seafloor on elongated fins, facing into the current to sift drifting food. Vents and scavengers together show how life persists in the abyssal plain.',
    },
  ],
}

/** Section 5 — Hadalpelagic / amphipod click */
export const hadalModal = {
  title: 'Life At The Bottom',
  body: [
    {
      heading: 'The hadal zone',
      text: 'Below 6,000 meters, ocean trenches carve the deepest places on Earth. Challenger Deep in the Mariana Trench reaches nearly 11,000 m — more than Mount Everest inverted beneath the waves.',
    },
    {
      heading: 'Crushing pressure',
      text: 'At the trench floor, pressure exceeds 1,000 atmospheres. Animals here use gelatinous bodies, reduced skeletons, and special cell chemistry to survive forces that would crush most surface life instantly.',
    },
    {
      heading: 'Hadal amphipods',
      text: 'These ghost-like crustaceans scavenge along the seafloor, among the most abundant animals in the deepest trenches. They thrive on organic matter that rains down from above — marine snow — the last stop in the ocean food web.',
    },
    {
      heading: 'Exploring the abyss',
      text: 'Only a handful of humans have visited these depths — from the bathyscaphe Trieste in 1960 to modern robotic landers and crewed submersibles. Each dive reveals how little we still know about Earth’s final frontier.',
    },
  ],
}

/** Finale — conservation / stewardship (dev preview & optional CTA) */
export const conservationModal = {
  title: 'Guard the Deep Ocean',
  imageSrc: coralWarmingImg,
  body: [
    {
      heading: 'Earth’s last great wilderness',
      text: 'More than eighty percent of the ocean is still unmapped and unexplored. Deep ecosystems — from twilight migrants to trench scavengers — remain among the least understood habitats on the planet.',
    },
    {
      heading: 'Why the deep matters',
      text: 'The ocean regulates climate, stores carbon, and supports fisheries that feed billions. Damage to deep-sea habitats from trawling, mining, and pollution can take centuries to recover — if it recovers at all.',
    },
    {
      heading: 'What you can do',
      text: 'Support marine protected areas, choose sustainable seafood, reduce single-use plastics, and back science and policy that keeps the deep ocean wild. What happens in the abyss does not stay in the abyss.',
    },
  ],
}

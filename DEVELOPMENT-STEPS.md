# Deep Sea Descent — Development Steps

Use this file as the single checklist while building.  
Source of truth for features: `project.md`.  
Asset drop locations: `src/assets/` (see also `src/assets/ASSETS.md`).  
Mark items `[x]` as you finish them. Work **one step at a time**.

---

## How to use

1. Pick the next unchecked step.
2. Create only the **files listed for that step** (meaningful names below).
3. Drop any required assets into the listed `src/assets/...` paths **before** coding that zone.
4. Verify in the browser before moving on.
5. Do not skip ahead into zone polish before the core scroll + canvas sync works.

---

## Status legend

| Mark | Meaning |
|------|---------|
| `[x]` | Done |
| `[ ]` | Not started |
| `[~]` | In progress (optional; use while working) |

---

## Naming rules (keep these forever)

| Kind | Pattern | Example |
|------|---------|---------|
| React components | `PascalCase.jsx` | `DepthHud.jsx` |
| Hooks | `use` + `camelCase.js` | `useScrollProgress.js` |
| Context | `SomethingContext.jsx` | `ScrollProgressContext.jsx` |
| Zone folders | `zone-` + depth name | `zone-epipelagic/` |
| 3D model files | `kebab-case.glb` | `sea-turtle.glb` |
| Textures / images | `kebab-case.png` | `vent-schematic.png` |
| Constants / data | `camelCase.js` or `kebab-case.json` | `zoneMeta.js` |

**Do not use** vague names like `Scene2.jsx`, `stuff.glb`, `newfile.jsx`, `temp.js`.

---

## Target folder structure

```
src/
├── App.jsx                          # wires layers together
├── main.jsx
├── index.css
│
├── assets/                          # ALL drop-in media lives here
│   ├── ASSETS.md                    # checklist of what to place where
│   ├── models/
│   │   ├── zone-epipelagic/
│   │   ├── zone-mesopelagic/
│   │   ├── zone-bathypelagic/
│   │   ├── zone-abyssopelagic/
│   │   └── zone-hadalpelagic/
│   └── images/                      # modal diagrams, schematic art, CTA art
│
├── components/
│   ├── layout/
│   │   ├── ScrollScaffold.jsx       # 500vh + 5 sections
│   │   └── ExperienceCanvas.jsx     # fixed full-screen R3F canvas shell
│   ├── hud/
│   │   └── DepthHud.jsx             # glass sidebar + meters + zone nav
│   ├── modals/
│   │   ├── ModalRoot.jsx            # shared open/close + scroll lock
│   │   ├── LeftInfoCard.jsx         # Section 1
│   │   ├── FullscreenBlurModal.jsx  # Section 2
│   │   ├── SideInfoPanel.jsx        # Section 3
│   │   ├── SchematicPanel.jsx       # Section 4
│   │   └── ConservationModal.jsx    # Section 5
│   └── three/
│       ├── DescentScene.jsx         # root 3D scene
│       ├── DescentCamera.jsx        # camera driven by scroll
│       ├── DescentLighting.jsx      # lights driven by scroll
│       ├── effects/
│       │   ├── GodRays.jsx
│       │   ├── BubbleTrail.jsx
│       │   ├── CursorFlashlight.jsx
│       │   └── SmokePlume.jsx
│       └── zones/
│           ├── EpipelagicZone.jsx
│           ├── MesopelagicZone.jsx
│           ├── BathypelagicZone.jsx
│           ├── AbyssopelagicZone.jsx
│           └── HadalpelagicZone.jsx
│
├── context/
│   └── ScrollProgressContext.jsx
│
├── hooks/
│   ├── useScrollProgress.js
│   └── useScrollLock.js
│
├── data/
│   └── zoneMeta.js                  # depths, temps, pressures, labels, scroll targets
│
└── utils/
    ├── scrollToZone.js              # GSAP ScrollTo helpers
    └── depthFromProgress.js         # map 0→1 to meters / HUD values
```

---

## Master asset map (place files here before the matching step)

Prefer **`.glb` / `.gltf`** for models. Keep filenames exactly as listed when possible.

### Zone 1 — Epipelagic → `src/assets/models/zone-epipelagic/`

| File to place | Used for | Step |
|---------------|----------|------|
| `marine-buoy.glb` | Floating marine buoy | 6 |
| `coral-reef.glb` | Coral reef base | 6 |
| `sea-turtle.glb` | Clickable turtle (outline + modal) | 6 |
| `dolphin.glb` *(optional)* | Extra life if turtle alone feels empty | 6 |

### Zone 2 — Mesopelagic → `src/assets/models/zone-mesopelagic/`

| File to place | Used for | Step |
|---------------|----------|------|
| `blue-whale.glb` | Blue whale | 7 |
| `glowing-jellyfish.glb` | Emissive light source + click target | 7 |
| `glowing-fish.glb` | Second glowing creature — use both | 7 |

### Zone 3 — Bathypelagic → `src/assets/models/zone-bathypelagic/`

| File to place | Used for | Step |
|---------------|----------|------|
| `anglerfish.glb` | Flashlight find + side panel click | 8 |
| `giant-squid.glb` | Atmosphere creature | 8 |

### Zone 4 — Abyssopelagic → `src/assets/models/zone-abyssopelagic/`

| File to place | Used for | Step |
|---------------|----------|------|
| `hydrothermal-vent.glb` | Vent + schematic click target | 9 |
| `tripod-fish.glb` | Zone creature | 9 |

> Smoke is code/particles (`SmokePlume.jsx`) — no model required unless you want a baked smoke mesh.

### Zone 5 — Hadalpelagic → `src/assets/models/zone-hadalpelagic/`

| File to place | Used for | Step |
|---------------|----------|------|
| `amphipod.glb` | Transparent amphipods | 10 |
| `plastic-bag.glb` | Climax click + conservation modal | 10 |

### Images / diagrams → `src/assets/images/`

| File to place | Used for | Step |
|---------------|----------|------|
| `coral-warming.jpg` | Section 1 left card art | 6 |
| *(built in code)* | Section 2 Diel Vertical Migration graph | 7 |
| *(built in code)* | Section 4 chemosynthesis schematic | 9 |
| `microplastic-data.jpg` | Section 5 science visuals | 10 |
| `mariana-pollution.jpg` | Section 5 pollution visual | 10 |
| `conservation-cta.jpg` *(optional — skip OK)* | Final CTA art | 10 |

---

## STEP 0 — Project foundation

> Blueprint: Global Framework Setup + Key Action Steps 1–2

- [x] Scaffold Vite + React
- [x] Configure Tailwind CSS (`@tailwindcss/vite` + `@import "tailwindcss"`)
- [x] Install packages: `three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`, `gsap`, `framer-motion`
- [x] Fonts (project addition): Orbitron / Rajdhani / Share Tech Mono
- [x] Confirm Tailwind renders correctly
- [x] Create `src/assets/` folder map + `ASSETS.md`

**Files involved:** `package.json`, `vite.config.js`, `src/index.css`, `index.html`

**Exit criteria:** App runs; Tailwind + fonts visible; all packages installed; assets folders ready.

---

## STEP 1 — Two-layer architecture shell

> Blueprint: Core Architectural Strategy

Build the empty structure only — no fancy models yet.

### Files to create

- [x] `src/components/layout/ScrollScaffold.jsx`
- [x] `src/components/layout/ExperienceCanvas.jsx`
- [x] `src/data/zoneMeta.js` (zone names, depth ranges, section ids)
- [x] Update `src/App.jsx` to compose both layers

### Assets needed

- None yet (placeholders only)

### 1A — Foreground layer (HTML / Tailwind)

- [x] Transparent, very tall container: `h-[500vh]`
- [x] Split into **five** distinct sections
- [x] Each section: `h-screen` + `w-full` (scroll footprint)
- [x] Sections map to scroll ranges:
  - [x] Section 1: `0vh → 100vh` — Epipelagic
  - [x] Section 2: `100vh → 200vh` — Mesopelagic
  - [x] Section 3: `200vh → 300vh` — Bathypelagic
  - [x] Section 4: `300vh → 400vh` — Abyssopelagic
  - [x] Section 5: `400vh → 500vh` — Hadalpelagic
- [x] Placeholder text content per section (zone name + depth range) so scroll is testable
- [x] Each section gets a stable `id` (e.g. `zone-epipelagic`) for later ScrollTo

### 1B — Background layer (WebGL)

- [x] Single **fixed, full-screen** React Three Fiber `<Canvas>` in `ExperienceCanvas.jsx`
- [x] Canvas sits behind the HTML layer (`fixed inset-0`, lower z-index)
- [x] Foreground stays clickable / scrollable above it
- [x] Empty `DescentScene.jsx` stub is OK for now

**Exit criteria:** Scrolling through 5 full screens works; canvas is fixed behind; no scroll sync logic yet. ✅

---

## STEP 2 — Global scroll progress (GSAP ScrollTrigger)

> Blueprint: Key Action Steps 3–4

### Files to create

- [x] `src/context/ScrollProgressContext.jsx`
- [x] `src/hooks/useScrollProgress.js`

### Assets needed

- None

### Checklist

- [x] Register GSAP `ScrollTrigger`
- [x] Track global scroll progress `0 → 1`
- [x] Expose progress via React Context
- [x] Progress updates smoothly while scrolling the `500vh` page

**Exit criteria:** A debug readout (temporary) shows progress from `0.00` to `1.00` as you scroll. ✅

---

## STEP 3 — Sync Three.js to scroll progress

> Blueprint: Key Action Steps 5 + Background Layer camera/lighting

### Files to create

- [x] `src/components/three/DescentScene.jsx`
- [x] `src/components/three/DescentCamera.jsx`
- [x] `src/components/three/DescentLighting.jsx`
- [x] `src/utils/depthFromProgress.js`

### Assets needed

- None (primitives / lights only)

### Checklist

- [x] In R3F `useFrame()`, read global scroll progress
- [x] Animate camera smoothly down the **Y-axis** (vertical descent path)
- [x] Change **background lighting colors** based on scroll position
- [x] Synchronize scene transitions with scroll progress (zone-aware lighting baseline)

**Exit criteria:** Scrolling clearly moves the camera downward; light color shifts across the dive. ✅

---

## STEP 4 — Pinned HUD (Heads-Up Display)

> Blueprint: The Pinned HUD

### Files to create

- [x] `src/components/hud/DepthHud.jsx`
- [x] `src/utils/scrollToZone.js`
- [x] Extend `src/data/zoneMeta.js` with HUD meter ranges

### Assets needed

- None (HUD glass via CSS)

### Layout / style

- [x] Fixed futuristic transparent **glass** sidebar on the **right**
- [x] Position classes: `fixed right-6 top-1/2 -translate-y-1/2 z-40`
- [x] Uses project fonts (display / mono for readouts)

### Visual elements (driven by scroll progress)

- [x] Vertical progress line
- [x] Real-time **depth meter**: `0m → 11,000m`
- [x] **Temperature** indicator: `25°C` (surface) → `1°C` (abyss)
- [x] **Pressure** gauge: `1 ATM` → `1,100 ATM`
- [x] Zone labels for all 5 zones

### HUD interaction

- [x] Clicking any zone label smoothly scrolls to that depth
- [x] Use GSAP **ScrollTo** plugin

**Exit criteria:** HUD stays pinned; meters update with scroll; zone clicks jump to the correct section. ✅

---

## STEP 5 — Modal system (shared)

> Blueprint: Foreground handles Framer Motion modals (used by every zone)

### Files to create

- [x] `src/components/modals/ModalRoot.jsx`
- [x] `src/components/modals/LeftInfoCard.jsx`
- [x] `src/components/modals/FullscreenBlurModal.jsx`
- [x] `src/components/modals/SideInfoPanel.jsx`
- [x] `src/components/modals/SchematicPanel.jsx`
- [x] `src/components/modals/ConservationModal.jsx`
- [x] `src/hooks/useScrollLock.js`

### Assets needed

- None yet (wire empty shells; zone steps add real copy/images)

### Checklist

- [x] Shared modal / panel system with Framer Motion
- [x] Support variants:
  - [x] Card from the **left** (`LeftInfoCard.jsx`)
  - [x] **Fullscreen blurred** modal (`FullscreenBlurModal.jsx`)
  - [x] **Side panel** (`SideInfoPanel.jsx`)
  - [x] Informational **schematic** panel (`SchematicPanel.jsx`)
  - [x] Final story / CTA modal (`ConservationModal.jsx`)
- [x] Ability to **pause scrolling** while a modal is open
- [x] Ability to resume scrolling on close

**Exit criteria:** Opening/closing a test modal works; scroll lock works. ✅

---

## STEP 6 — Section 1: Epipelagic Zone (0m – 200m)

> Blueprint: Section 1 · Scroll marker: `0vh → 100vh`

### Files to create

- [x] `src/components/three/zones/EpipelagicZone.jsx`
- [x] `src/components/three/effects/GodRays.jsx`
- [x] `src/components/three/effects/BubbleTrail.jsx`
- [x] `src/components/three/models/OceanModel.jsx` *(shared GLB loader)*

### Assets to place BEFORE coding

Folder: `src/assets/models/zone-epipelagic/`

- [x] `marine-buoy-optimized.glb`
- [x] `coral-reef-optimized.glb`
- [x] `sea-turtle-optimized.glb`
- [x] `dolphin-optimized.glb`
- [x] `src/assets/images/coral-warming.jpg`

### Atmosphere

- [x] Bright turquoise gradient: `from-cyan-400` → `to-blue-600` *(via DescentLighting at progress ~0)*
- [x] Animated underwater **god rays**

### 3D models

- [x] Floating marine buoy ← `marine-buoy-optimized.glb`
- [x] Coral reef base ← `coral-reef-optimized.glb`
- [x] Dolphins **or** sea turtles ← `sea-turtle-optimized.glb` / `dolphin-optimized.glb`

### Interactions

- [x] Hover / mouse movement: trailing ripple of **glowing bubbles**
- [x] Click sea turtle:
  - [x] Highlight with **3D outline shader**
  - [x] Pause scrolling
  - [x] Open Framer Motion **card from the left** (`LeftInfoCard.jsx`)
  - [x] Content: how warming oceans threaten coral reefs

**Exit criteria:** Zone feels bright/surface; bubbles work; turtle click → outline + left modal + scroll pause. ✅

---

## STEP 7 — Section 2: Mesopelagic Zone (200m – 1,000m)

> Blueprint: Section 2 · Scroll marker: `100vh → 200vh`

### Files to create

- [ ] `src/components/three/zones/MesopelagicZone.jsx`

### Assets to place BEFORE coding

Folder: `src/assets/models/zone-mesopelagic/`

- [x] `blue-whale-optimized.glb`
- [x] `glowing-jellyfish-optimized.glb`
- [x] `glowing-fish-optimized.glb` — use both glowing models
- [ ] Graph built in code (no SVG file required)
- [ ] Static submarine (horizontal, center) ← `../zone-epipelagic/submarine.glb`

### Atmosphere

- [ ] Sun rays disappear (vs Section 1)
- [ ] Gradient: `from-blue-800` → `to-indigo-950`

### 3D models

- [ ] Blue Whale ← `blue-whale.glb`
- [ ] Glowing Jellyfish ← `glowing-jellyfish.glb`
- [ ] Glowing Fish ← `glowing-fish.glb` (use both)

### Scroll transition behavior

- [ ] Ambient lighting fades completely
- [ ] Jellyfish **emissive glow** becomes the **only** light source

### Click / modal

- [ ] Click jellyfish → fullscreen **blurred** modal (`FullscreenBlurModal.jsx`)
- [ ] Interactive graph: **Diel Vertical Migration**
- [ ] Explanation of nighttime migration behavior

**Exit criteria:** Light dies into jellyfish-only glow; jellyfish opens migration graph modal.

---

## STEP 8 — Section 3: Bathypelagic Zone (1,000m – 4,000m)

> Blueprint: Section 3 · Scroll marker: `200vh → 300vh`

### Files to create

- [ ] `src/components/three/zones/BathypelagicZone.jsx`
- [ ] `src/components/three/effects/CursorFlashlight.jsx`

### Assets to place BEFORE coding

Folder: `src/assets/models/zone-bathypelagic/`

- [ ] `anglerfish.glb`
- [ ] `giant-squid.glb`

### Atmosphere

- [ ] Total darkness (`bg-neutral-950` feel)

### 3D models

- [ ] Anglerfish ← `anglerfish.glb`
- [ ] Giant Squid ← `giant-squid.glb`

### Flashlight mode

- [ ] Cursor becomes a `THREE.SpotLight` (`CursorFlashlight.jsx`)
- [ ] Scene stays dark unless illuminated by the cursor light

### Click / modal

- [ ] Find + click Anglerfish → **side panel** (`SideInfoPanel.jsx`)
- [ ] Panel content covers:
  - [ ] Biological adaptations
  - [ ] Bioluminescence
  - [ ] Survival in complete darkness

**Exit criteria:** Flashlight reveal works; anglerfish opens the adaptations side panel.

---

## STEP 9 — Section 4: Abyssopelagic Zone (4,000m – 6,000m)

> Blueprint: Section 4 · Scroll marker: `300vh → 400vh`

### Files to create

- [ ] `src/components/three/zones/AbyssopelagicZone.jsx`
- [ ] `src/components/three/effects/SmokePlume.jsx`

### Assets to place BEFORE coding

Folder: `src/assets/models/zone-abyssopelagic/`

- [x] `hydrothermal-vent.glb`
- [x] `tripod-fish.glb`
- [ ] Schematic built in code (no SVG file required)

### Atmosphere

- [ ] Black void
- [ ] Orange glowing fractures
- [ ] Gradient: `from-neutral-950` → `via-zinc-900` → `to-neutral-950`

### 3D models / FX

- [ ] Hydrothermal vents ← `hydrothermal-vent.glb`
- [ ] Smoke **particle system** ← code in `SmokePlume.jsx` (no model required)
- [ ] Tripod Fish ← `tripod-fish.glb`

### Smoke interaction

- [ ] Hovering smoke causes particles to:
  - [ ] Disperse
  - [ ] Spin
  - [ ] React to mouse **velocity**

### Click / modal

- [ ] Click a vent → informational **schematic** (`SchematicPanel.jsx`)
- [ ] Schematic explains:
  - [ ] Chemosynthesis
  - [ ] Hydrothermal ecosystems
  - [ ] Life without sunlight

**Exit criteria:** Vents + reactive smoke feel alive; vent click opens chemosynthesis schematic.

---

## STEP 10 — Section 5: Hadalpelagic Zone (6,000m – 11,000m)

> Blueprint: Section 5 · Scroll marker: `400vh → 500vh`

### Files to create

- [ ] `src/components/three/zones/HadalpelagicZone.jsx`

### Assets to place BEFORE coding

Folder: `src/assets/models/zone-hadalpelagic/`

- [x] `amphipod.glb`
- [x] `plastic-bag.glb`
- [x] `src/assets/images/microplastic-data.jpg`
- [x] `src/assets/images/mariana-pollution.jpg`
- [ ] `conservation-cta` image *(optional — skip OK)*

### Atmosphere

- [ ] Deep trench look
- [ ] Dark violet tones
- [ ] Gradient: `from-neutral-950` → `to-slate-950`

### 3D models

- [ ] Transparent Amphipods ← `amphipod.glb`
- [ ] Plastic shopping bag ← `plastic-bag.glb`

### Climax twist

- [ ] Camera tilts downward dramatically (`DescentCamera.jsx` climax state)
- [ ] HUD alert turns **bright red** (`DepthHud.jsx` warning mode)
- [ ] Warning animation begins

### Final click / modal

- [ ] Click plastic bag → final modal (`ConservationModal.jsx`) with:
  - [ ] Scientific data about microplastics
  - [ ] Mariana Trench pollution
  - [ ] Final **call-to-action** for ocean conservation

**Exit criteria:** Climax (tilt + red HUD + warning) hits; bag reveals pollution story + CTA.

---

## STEP 11 — End-to-end polish & verification

> Ensure the full blueprint experience holds together

- [ ] Full scroll `0 → 1` feels continuous (no hard cuts unless intentional)
- [ ] Camera + lighting stay in sync with HUD meters across all zones
- [ ] All 5 zone click targets open the correct modal variant
- [ ] Scroll pause / resume works for every modal
- [ ] HUD ScrollTo lands on the correct section for every zone label
- [ ] Every required asset in `src/assets/ASSETS.md` is present (or intentionally replaced by a primitive placeholder)
- [ ] Performance check: single canvas remains smooth on target machine
- [ ] Mobile / smaller screens: page still loads and scrolls (basic sanity)

**Exit criteria:** One complete dive from surface → trench matches `project.md` intent.

---

## Coverage map (project.md → steps)

Everything below must appear in a step above. Use this to confirm nothing was dropped.

| `project.md` item | Covered in |
|-------------------|------------|
| Two-layer decoupled viewport | STEP 1 |
| Fixed full-screen R3F canvas | STEP 1B |
| ScrollTrigger moves camera down Y path | STEP 2 + STEP 3 |
| Lighting colors change with scroll | STEP 3 |
| Transparent `h-[500vh]` foreground | STEP 1A |
| Five distinct sections | STEP 1A |
| Text content | STEP 1A + zone steps |
| Pinned HUD | STEP 4 |
| Framer Motion modals | STEP 5 + zone steps |
| HUD position `fixed right-6 top-1/2 -translate-y-1/2 z-40` | STEP 4 |
| Glass sidebar | STEP 4 |
| Vertical progress line | STEP 4 |
| Depth `0m → 11,000m` | STEP 4 |
| Temp `25°C → 1°C` | STEP 4 |
| Pressure `1 → 1,100 ATM` | STEP 4 |
| Zone label ScrollTo | STEP 4 |
| S1 range `0–100vh`, 0–200m | STEP 1A + STEP 6 |
| S1 cyan→blue gradient | STEP 6 |
| S1 god rays | STEP 6 |
| S1 buoy, coral, dolphin/turtle | STEP 6 |
| S1 bubble trail | STEP 6 |
| S1 turtle outline + pause + left card + coral warming | STEP 6 |
| S2 range `100–200vh`, 200–1,000m | STEP 1A + STEP 7 |
| S2 sun rays disappear | STEP 7 |
| S2 blue-800 → indigo-950 | STEP 7 |
| S2 whale + jellyfish | STEP 7 |
| S2 ambient fade; jellyfish-only light | STEP 7 |
| S2 fullscreen blur modal + DVM graph + migration copy | STEP 7 |
| S3 range `200–300vh`, 1,000–4,000m | STEP 1A + STEP 8 |
| S3 total darkness / neutral-950 | STEP 8 |
| S3 anglerfish + giant squid | STEP 8 |
| S3 cursor SpotLight flashlight | STEP 8 |
| S3 anglerfish side panel (adaptations / bioluminescence / darkness) | STEP 8 |
| S4 range `300–400vh`, 4,000–6,000m | STEP 1A + STEP 9 |
| S4 black void + orange fractures | STEP 9 |
| S4 neutral-950 / zinc-900 gradient | STEP 9 |
| S4 vents + smoke particles + tripod fish | STEP 9 |
| S4 smoke disperse / spin / mouse velocity | STEP 9 |
| S4 vent schematic (chemosynthesis / ecosystems / no sunlight) | STEP 9 |
| S5 range `400–500vh`, 6,000–11,000m | STEP 1A + STEP 10 |
| S5 trench + violet / slate-950 | STEP 10 |
| S5 amphipods + plastic bag | STEP 10 |
| S5 camera tilt + red HUD alert + warning animation | STEP 10 |
| S5 bag modal (microplastics / Mariana / conservation CTA) | STEP 10 |
| Blueprint coding steps 1–5 | STEP 0–3 |

---

## Suggested focus order (short)

```
STEP 0 ✓  →  STEP 1  →  STEP 2  →  STEP 3  →  STEP 4  →  STEP 5
         →  STEP 6  →  STEP 7  →  STEP 8  →  STEP 9  →  STEP 10
         →  STEP 11
```

**Next up:** STEP 7 — Mesopelagic zone (whale + both glowing models + migration modal).

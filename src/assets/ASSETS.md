# Assets checklist

Drop files into these exact paths before building the matching zone step.  
Preferred 3D format: **`.glb`**. Images may be **`.jpg`** or **`.png`**.

When a file is ready, mark it `[x]`.

---

## Models

### `models/zone-epipelagic/` — STEP 6

- [x] `marine-buoy.glb` — floating marine buoy
- [x] `coral-reef.glb` — coral reef base
- [x] `sea-turtle.glb` — clickable turtle (outline + modal)
- [x] `dolphin.glb` — extra life

### `models/zone-mesopelagic/` — STEP 7

- [x] `blue-whale.glb` — blue whale
- [x] `glowing-jellyfish.glb` — emissive light + click target
- [x] `glowing-fish.glb` — second glowing creature (use both)

### `models/zone-bathypelagic/` — STEP 8

- [x] `anglerfish.glb` — flashlight find + side panel
- [x] `giant-squid.glb` — atmosphere creature

### `models/zone-abyssopelagic/` — STEP 9

- [x] `hydrothermal-vent.glb` — vent + schematic click
- [x] `tripod-fish.glb` — zone creature

> Smoke = particle code (`SmokePlume.jsx`), not a model.

### `models/zone-hadalpelagic/` — STEP 10

- [x] `amphipod.glb` — transparent amphipods
- [x] `plastic-bag.glb` — climax click + conservation modal

---

## Images — `images/`

- [x] `coral-warming.jpg` — STEP 6 modal art
- [x] `microplastic-data.jpg` — STEP 10
- [x] `mariana-pollution.jpg` — STEP 10
- [ ] `conservation-cta.png` / `.jpg` — STEP 10 (optional — skip OK)
- [ ] ~~`diel-vertical-migration.svg`~~ — **not required**; build graph in code (STEP 7)
- [ ] ~~`vent-chemosynthesis-schematic.svg`~~ — **not required**; build schematic in code (STEP 9)

---

## Notes

- Mesopelagic uses **both** `glowing-jellyfish.glb` and `glowing-fish.glb`.
- Full file/component naming lives in `/DEVELOPMENT-STEPS.md`.
- God rays, fractures, HUD glass, and smoke are done in **code/shaders**.

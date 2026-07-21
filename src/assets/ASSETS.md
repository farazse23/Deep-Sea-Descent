# Assets checklist

Drop files into these exact paths before building the matching zone step.  
Preferred 3D format: **`.glb`** (or `.gltf`).  
Keep filenames **kebab-case** as listed.

When a file is ready, mark it `[x]`.

---

## Models

### `models/zone-epipelagic/` — STEP 6

- [ ] `marine-buoy.glb` — floating marine buoy
- [ ] `coral-reef.glb` — coral reef base
- [ ] `sea-turtle.glb` — clickable turtle (outline + modal)
- [ ] `dolphin.glb` — optional extra life

### `models/zone-mesopelagic/` — STEP 7

- [ ] `blue-whale.glb` — blue whale
- [ ] `glowing-jellyfish.glb` — emissive light + click target

### `models/zone-bathypelagic/` — STEP 8

- [ ] `anglerfish.glb` — flashlight find + side panel
- [ ] `giant-squid.glb` — atmosphere creature

### `models/zone-abyssopelagic/` — STEP 9

- [ ] `hydrothermal-vent.glb` — vent + schematic click
- [ ] `tripod-fish.glb` — zone creature

> Smoke = particle code (`SmokePlume.jsx`), not a model.

### `models/zone-hadalpelagic/` — STEP 10

- [ ] `amphipod.glb` — transparent amphipods
- [ ] `plastic-bag.glb` — climax click + conservation modal

---

## Images — `images/`

- [ ] `coral-warming.jpg` — STEP 6 modal art (optional)
- [ ] `diel-vertical-migration.svg` — STEP 7 graph
- [ ] `vent-chemosynthesis-schematic.svg` — STEP 9 schematic
- [ ] `microplastics-data.png` — STEP 10
- [ ] `mariana-pollution.png` — STEP 10
- [ ] `conservation-cta.png` — STEP 10 (optional)

---

## Notes

- Until a real `.glb` is ready, we can use temporary primitives (box/sphere) with the **same component name**, then swap the path.
- Do not put models in random folders — always under the matching `zone-*` directory.
- Full file/component naming lives in `/DEVELOPMENT-STEPS.md`.
- God rays, fractures, HUD glass, and smoke are done in **code/shaders**, not texture files.

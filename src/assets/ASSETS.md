# Assets checklist

Drop files into these exact paths before building the matching zone step.  
Preferred 3D format: **`.glb`** (use `*-optimized.glb` files). Images may be **`.jpg`** or **`.png`**.

When a file is ready, mark it `[x]`.

---

## Models

### `models/zone-epipelagic/` — STEP 6

- [x] `marine-buoy-optimized.glb`
- [x] `coral-reef-optimized.glb`
- [x] `sea-turtle-optimized.glb`
- [x] `dolphin-optimized.glb`

### `models/zone-mesopelagic/` — STEP 7

- [x] `blue-whale-optimized.glb`
- [x] `glowing-jellyfish-optimized.glb`
- [x] `glowing-fish-optimized.glb` — use both glowing models

### `models/zone-bathypelagic/` — STEP 8

- [x] `anglerfish-optimized.glb`
- [x] `giant-squid-optimized.glb`

### `models/zone-abyssopelagic/` — STEP 9

- [x] `hydrothermal-vent-optimized.glb`
- [x] `tripod-fish-optimized.glb`

> Smoke = particle code (`SmokePlume.jsx`), not a model.

### `models/zone-hadalpelagic/` — STEP 10

- [x] `amphipod-optimized.glb`
- [x] `plastic-bag-optimized.glb`

---

## Images — `images/`

- [x] `coral-warming.jpg` — STEP 6 modal art
- [x] `microplastic-data.jpg` — STEP 10
- [x] `mariana-pollution.jpg` — STEP 10
- [ ] `conservation-cta` — STEP 10 (optional — skip OK)
- [ ] Graph / vent schematic — **built in code** (no SVG required)

---

## Notes

- Always load the `*-optimized.glb` filenames from these folders.
- Mesopelagic uses **both** jellyfish and glowing-fish models.
- Full file/component naming lives in `/DEVELOPMENT-STEPS.md`.

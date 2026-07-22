# Assets checklist

Drop files into these exact paths before building the matching zone step.  
Preferred 3D format: **`.glb`** (use `*-optimized.glb` files). Images may be **`.jpg`** or **`.png`**.

When a file is ready, mark it `[x]`.

---

## Models

### `models/zone-epipelagic/` — STEP 6

- [ ] `coral-reef-optimized.glb` — removed from scene (file can stay unused)
- [x] `sea-turtle-optimized.glb`
- [x] `dolphin-optimized.glb`
- [x] `submarine.glb` — static horizontal center in mesopelagic (STEP 7)
- [ ] ~~`marine-buoy-optimized.glb`~~ — replaced by `submarine.glb`

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

- [x] `amphipod-optimized.glb` — trench scavengers (clickable + patrol paths)
- [ ] `plastic-bag-optimized.glb` — **unused** (old pollution theme removed)

---

## Images — `images/`

- [x] `coral-warming.jpg` — STEP 6 modal art
- [ ] `microplastic-data.jpg` — **unused** (old Section 5 theme)
- [ ] `mariana-pollution.jpg` — **unused** (old Section 5 theme)
- [ ] `conservation-cta` — STEP 10 (optional — skip OK)
- [ ] Graph / vent schematic — **built in code** (no SVG required)

---

## Notes

- Always load the `*-optimized.glb` filenames from these folders.
- Mesopelagic uses **both** jellyfish and glowing-fish models.
- Full file/component naming lives in `/DEVELOPMENT-STEPS.md`.
- **Performance tip:** keep GLBs as small as practical. Heavy files (multi‑MB) can hide lighter models until they finish loading, and huge JPGs (e.g. 7MB) slow modals. Aim for reef/creature GLBs under ~1–2MB when possible; compress modal images under ~300KB.
- **Submarine:** `models/zone-epipelagic/submarine.glb` — removed from surface section; place **static, horizontal, center** in the next dark zone (Mesopelagic / STEP 7).

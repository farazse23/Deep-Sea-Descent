🌊 Deep Sea Descent: Master Production Blueprint
🌌 Core Architectural Strategy

To keep the site highly performant and easy to build, the website will use a Two-Layer Decoupled Viewport.

1. Background Layer (WebGL Canvas)
A single fixed, full-screen React Three Fiber canvas.
GSAP ScrollTrigger moves the 3D camera down a vertical path.
Background lighting colors change based on the page's scroll position.
2. Foreground Layer (HTML/Tailwind)
A transparent, very tall container (h-[500vh]).
Split into five distinct sections.
Handles:
Text content
Pinned Heads-Up Display (HUD)
Framer Motion modals
🛠️ Global Framework Setup
📊 The Pinned HUD (Heads-Up Display)
Position

A fixed, futuristic transparent glass sidebar on the right side of the screen.

fixed right-6 top-1/2 -translate-y-1/2 z-40
Visual Elements
Vertical progress line
Real-time depth meter counting from 0m → 11,000m
Temperature indicator:
25°C (Surface)
1°C (Abyss)
Pressure gauge:
1 ATM
1,100 ATM
Interaction

Clicking any zone label smoothly scrolls the page directly to that depth using GSAP ScrollTo Plugin.

🗺️ Deep Dive: The 5 Sections & Interactive Actions
☀️ Section 1: The Epipelagic Zone (0m – 200m)
Depth Marker

0vh → 100vh

Atmosphere
Bright turquoise gradient
from-cyan-400 → to-blue-600
Animated underwater god rays
3D Models
Floating marine buoy
Coral reef base
Dolphins or sea turtles
User Interaction
Hover
Mouse movement creates a trailing ripple of glowing bubbles.
Click Event (Modal)

Clicking a sea turtle:

Highlights it with a 3D outline shader.
Pauses scrolling.
Opens a Framer Motion card from the left.
Explains how warming oceans threaten coral reefs.
🌆 Section 2: The Mesopelagic Zone (200m – 1,000m)
Depth Marker

100vh → 200vh

Atmosphere
Sun rays disappear
Gradient changes:
from-blue-800
to-indigo-950
3D Models
Blue Whale
Glowing Jellyfish
User Interaction
Scroll Transition
Ambient lighting fades completely.
Jellyfish emissive glow becomes the only light source.
Click Event (Modal)

Clicking a jellyfish opens a fullscreen blurred modal featuring:

Interactive graph
Diel Vertical Migration
Explanation of nighttime migration behavior
🌌 Section 3: The Bathypelagic Zone (1,000m – 4,000m)
Depth Marker

200vh → 300vh

Atmosphere
Total darkness
bg-neutral-950
3D Models
Anglerfish
Giant Squid
User Interaction
Flashlight Mode
Cursor becomes a THREE.SpotLight
Everything stays dark unless illuminated by the cursor.
Click Event (Modal)

Finding and clicking the Anglerfish opens a side panel explaining:

Biological adaptations
Bioluminescence
Survival in complete darkness
🌋 Section 4: The Abyssopelagic Zone (4,000m – 6,000m)
Depth Marker

300vh → 400vh

Atmosphere
Black void
Orange glowing fractures

Gradient:

from-neutral-950
via-zinc-900
to-neutral-950
3D Models
Hydrothermal vents
Smoke particle system
Tripod Fish
User Interaction
Smoke Interaction

Hovering over smoke causes particles to:

Disperse
Spin
React to mouse velocity
Click Event (Modal)

Clicking a vent opens an informational schematic explaining:

Chemosynthesis
Hydrothermal ecosystems
Life without sunlight
🕳️ Section 5: The Hadalpelagic Zone (6,000m – 11,000m)
Depth Marker

400vh → 500vh

Atmosphere
Deep trench
Dark violet tones

Gradient:

from-neutral-950
to-slate-950
3D Models
Transparent Amphipods
Plastic shopping bag
User Interaction
Climax Twist
Camera tilts downward dramatically.
HUD alert turns bright red.
Warning animation begins.
Final Click Event (Modal)

Clicking the plastic bag reveals:

Scientific data about microplastics
Mariana Trench pollution
Final call-to-action for ocean conservation
🚀 Key Action Steps to Start Coding
1. Scaffold React
npm create vite@latest deep-sea-descent -- --template react

Configure Tailwind CSS.

2. Install Required Packages
npm install three @types/three @react-three/fiber @react-three/drei gsap framer-motion
3. Build the DOM Scroll Scaffold

Create a container with five fullscreen sections.

h-screen
w-full

These sections establish the scroll footprint.

4. Hook Up GSAP ScrollTrigger

Track global scroll progress (0 → 1) using React Context or global state.

5. Pass Progress into Three.js

Inside the React Three Fiber useFrame() loop:

Read the global scroll progress.
Animate the camera smoothly down the Y-axis.
Synchronize lighting and scene transitions with scroll progress.

npm install tailwindcss @tailwindcss/vite
npm install three @types/three @react-three/fiber @react-three/drei gsap framer-motion
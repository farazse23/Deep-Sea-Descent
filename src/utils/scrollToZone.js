import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

gsap.registerPlugin(ScrollToPlugin)

/**
 * Smoothly scroll the window to a zone section by id (e.g. "zone-epipelagic").
 */
export function scrollToZone(zoneId, { duration = 1.35 } = {}) {
  const target = document.getElementById(zoneId)
  if (!target) return

  gsap.to(window, {
    duration,
    ease: 'power2.inOut',
    scrollTo: {
      y: target,
      autoKill: true,
    },
  })
}

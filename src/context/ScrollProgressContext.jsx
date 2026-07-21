import { createContext, useContext, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ScrollProgressContext = createContext(0)

/**
 * Tracks page scroll as progress 0 → 1 and provides it via context.
 */
export function ScrollProgressProvider({ children }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setProgress(self.progress)
      },
    })

    ScrollTrigger.refresh()

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <ScrollProgressContext.Provider value={progress}>
      {children}
    </ScrollProgressContext.Provider>
  )
}

export function useScrollProgressContext() {
  return useContext(ScrollProgressContext)
}

import { useScrollProgressContext } from '../context/ScrollProgressContext'

/** Read global scroll progress (0 → 1). */
export function useScrollProgress() {
  return useScrollProgressContext()
}

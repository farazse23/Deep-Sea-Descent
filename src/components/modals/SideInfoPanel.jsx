import { motion } from 'framer-motion'
import ModalBody from './ModalBody'

/** Section 3 — side info panel. */
export default function SideInfoPanel({ title, body, onClose }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[60] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close overlay"
        className="pointer-events-auto absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <motion.aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="side-panel-title"
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 32 }}
        className="pointer-events-auto relative z-10 flex h-full w-full max-w-md flex-col border-l border-violet-300/25 bg-neutral-950 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-violet-400/20 px-5 py-4">
          <h2
            id="side-panel-title"
            className="font-display text-lg font-semibold uppercase tracking-widest text-violet-100"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs tracking-widest text-violet-200/80 hover:text-violet-100"
          >
            CLOSE
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4 text-base leading-relaxed text-white/85">
          <ModalBody body={body} />
        </div>
      </motion.aside>
    </motion.div>
  )
}

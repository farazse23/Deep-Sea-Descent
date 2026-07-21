import { motion } from 'framer-motion'
import ModalBody from './ModalBody'

/** Section 4 — informational schematic panel. */
export default function SchematicPanel({ title, body, onClose }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        type="button"
        aria-label="Close overlay"
        className="pointer-events-auto absolute inset-0 bg-black/55"
        onClick={onClose}
      />
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="schematic-title"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-auto relative z-10 flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden border border-orange-400/30 bg-zinc-950 shadow-[0_0_40px_rgba(234,88,12,0.15)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-orange-400/25 px-5 py-4">
          <h2
            id="schematic-title"
            className="font-display text-lg font-semibold uppercase tracking-widest text-orange-100"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs tracking-widest text-orange-200/80 hover:text-orange-100"
          >
            CLOSE
          </button>
        </div>
        <div className="border-b border-orange-400/15 bg-orange-500/5 px-5 py-3">
          <p className="font-mono text-[10px] tracking-[0.3em] text-orange-300/80">
            SCHEMATIC VIEW
          </p>
        </div>
        <div className="overflow-y-auto px-5 py-4 text-base leading-relaxed text-white/85">
          <ModalBody body={body} />
        </div>
      </motion.article>
    </motion.div>
  )
}

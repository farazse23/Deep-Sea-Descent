import { motion } from 'framer-motion'
import ModalBody from './ModalBody'

/** Section 2 — fullscreen blurred modal. */
export default function FullscreenBlurModal({ title, body, onClose }) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fullscreen-modal-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="pointer-events-auto fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-xl md:p-10"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.28 }}
        className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden border border-indigo-300/25 bg-slate-950 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-indigo-400/20 px-6 py-4">
          <h2
            id="fullscreen-modal-title"
            className="font-display text-xl font-semibold uppercase tracking-widest text-indigo-100"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs tracking-widest text-indigo-200/80 hover:text-indigo-100"
          >
            CLOSE
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-5 text-base leading-relaxed text-white/85">
          <ModalBody body={body} />
        </div>
      </motion.div>
    </motion.div>
  )
}

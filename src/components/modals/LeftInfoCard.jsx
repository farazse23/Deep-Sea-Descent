import { motion } from 'framer-motion'
import ModalBody from './ModalBody'

/** Section 1 — card slides in from the left. */
export default function LeftInfoCard({ title, body, imageSrc, onClose }) {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-start p-4 md:p-8"
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
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="left-info-title"
        initial={{ x: '-110%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-110%', opacity: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className="pointer-events-auto relative z-10 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden border border-cyan-300/30 bg-slate-950 shadow-2xl"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className="h-40 w-full shrink-0 object-cover bg-slate-900"
          />
        ) : null}
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-cyan-400/20 px-5 py-4">
          <h2
            id="left-info-title"
            className="font-display text-lg font-semibold uppercase tracking-widest text-cyan-100"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs tracking-widest text-cyan-300/80 transition hover:text-cyan-100"
          >
            CLOSE
          </button>
        </div>
        <div className="min-h-[8rem] flex-1 overflow-y-auto px-5 py-4 text-base leading-relaxed text-white/85">
          <ModalBody body={body} />
        </div>
      </motion.article>
    </motion.div>
  )
}

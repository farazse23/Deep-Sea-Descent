import { motion } from 'framer-motion'

/** Section 1 — card slides in from the left. */
export default function LeftInfoCard({ title, body, imageSrc, onClose }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-start p-4 md:p-8">
      <button
        type="button"
        aria-label="Close overlay"
        className="pointer-events-auto absolute inset-0 bg-black/45"
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
        className="pointer-events-auto relative z-10 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden border border-cyan-300/30 bg-slate-950/90 shadow-2xl backdrop-blur-md"
      >
        {imageSrc ? (
          <img src={imageSrc} alt="" className="h-40 w-full object-cover" />
        ) : null}
        <div className="flex items-start justify-between gap-3 border-b border-cyan-400/20 px-5 py-4">
          <h2 id="left-info-title" className="font-display text-lg font-semibold uppercase tracking-widest text-cyan-100">
            {title}
          </h2>
          <CloseButton onClick={onClose} />
        </div>
        <div className="overflow-y-auto px-5 py-4 text-base leading-relaxed text-white/80">
          {body}
        </div>
      </motion.article>
    </div>
  )
}

function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-mono text-xs tracking-widest text-cyan-300/80 transition hover:text-cyan-100"
    >
      CLOSE
    </button>
  )
}

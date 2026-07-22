import { motion } from 'framer-motion'
import ModalBody from './ModalBody'

/** Section 5 — final conservation / CTA modal. */
export default function ConservationModal({
  title,
  body,
  imageSrc,
  imageSrcAlt,
  onClose,
}) {
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
        className="pointer-events-auto absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="conservation-title"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="pointer-events-auto relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden border border-rose-400/35 bg-slate-950 shadow-[0_0_50px_rgba(244,63,94,0.2)]"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            className="h-40 w-full shrink-0 object-cover bg-slate-900"
          />
        ) : null}
        {imageSrcAlt ? (
          <img
            src={imageSrcAlt}
            alt=""
            className="h-36 w-full shrink-0 object-cover bg-slate-900"
          />
        ) : null}
        <div className="flex items-start justify-between gap-3 border-b border-rose-400/25 px-5 py-4">
          <h2
            id="conservation-title"
            className="font-display text-lg font-semibold uppercase tracking-widest text-rose-100"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="font-mono text-xs tracking-widest text-rose-200/80 hover:text-rose-100"
          >
            CLOSE
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-4 text-base leading-relaxed text-white/85">
          <ModalBody body={body} />
        </div>
        <div className="border-t border-rose-400/20 px-5 py-4">
          <p className="font-display text-center text-xs uppercase tracking-[0.25em] text-rose-200/90">
            The deep ocean needs defenders — act above the waves
          </p>
          <a
            href="https://oceanconservancy.org/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 block w-full border border-rose-400/40 bg-rose-500/15 py-2.5 text-center font-display text-xs uppercase tracking-[0.2em] text-rose-100 transition hover:bg-rose-500/30"
          >
            Take action for our oceans
          </a>
        </div>
      </motion.article>
    </motion.div>
  )
}

/**
 * Renders modal body from a string, list of paragraphs, or { heading, text } sections.
 * Never store JSX in modal state — only serializable content.
 */
export default function ModalBody({ body }) {
  if (body == null || body === '') {
    return <p className="text-white/50">No content yet for this panel.</p>
  }

  if (Array.isArray(body)) {
    return (
      <div className="space-y-4">
        {body.map((item, index) => {
          if (item && typeof item === 'object') {
            const key = item.heading || `section-${index}`
            return (
              <div key={key} className="space-y-1.5">
                {item.heading ? (
                  <h3 className="font-display text-xs font-semibold uppercase tracking-widest text-violet-200/90">
                    {item.heading}
                  </h3>
                ) : null}
                <p>{item.text}</p>
              </div>
            )
          }
          const text = String(item)
          return <p key={`${text.slice(0, 24)}-${index}`}>{text}</p>
        })}
      </div>
    )
  }

  return <p>{String(body)}</p>
}

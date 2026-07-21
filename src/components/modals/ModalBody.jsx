/**
 * Renders modal body from a string or list of paragraphs (never JSX-in-state).
 */
export default function ModalBody({ body }) {
  if (body == null || body === '') {
    return (
      <p className="text-white/50">No content yet for this panel.</p>
    )
  }

  if (Array.isArray(body)) {
    return (
      <div className="space-y-3">
        {body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    )
  }

  return <p>{String(body)}</p>
}

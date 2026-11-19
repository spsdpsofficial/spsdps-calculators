/** A titled article section with a stable anchor id (used by the "On this page" list). */
export default function ContentSection({ id, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mt-12">
      <h2 id={`${id}-title`} className="text-2xl font-bold text-ink">
        {title}
      </h2>
      <div className="prose-block mt-4 text-ink/90">{children}</div>
    </section>
  );
}

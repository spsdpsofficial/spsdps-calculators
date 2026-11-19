/** FAQ accordion built on <details>: answers stay in the HTML, so they are crawlable and keyboard-friendly. */
export default function FaqList({ faqs }) {
  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-card">
      {faqs.map((faq) => (
        <details key={faq.q} className="group p-4">
          <summary className="cursor-pointer list-none font-semibold text-ink marker:hidden [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {faq.q}
              <span aria-hidden="true" className="text-accent transition-transform group-open:rotate-45">
                +
              </span>
            </span>
          </summary>
          <p className="mt-3 text-muted">{faq.a}</p>
        </details>
      ))}
    </div>
  );
}

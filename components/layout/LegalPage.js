import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { formatDateLong } from "@/lib/formatters";

/** Shared layout for About / Contact / Privacy / Terms / Disclaimer. `page` comes from lib/content/legal.js. */
export default function LegalPage({ page, path, children }) {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: page.title, path },
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{page.title}</h1>
      <p className="mt-2 text-sm text-muted">
        Last updated: <time dateTime={page.updated}>{formatDateLong(page.updated)}</time>
      </p>
      <div className="prose-block mt-8 space-y-8 text-ink/90">
        {page.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-xl font-bold text-ink">{section.heading}</h2>
            <div className="mt-3">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets && (
                <ul className="mt-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        ))}
        {children}
      </div>
    </div>
  );
}

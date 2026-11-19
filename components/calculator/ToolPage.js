import Link from "next/link";
import AdSlot from "@/components/ads/AdSlot";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import ContentSection from "./ContentSection";
import FaqList from "./FaqList";
import { formatDateLong } from "@/lib/formatters";
import { faqJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import Icon from "@/components/ui/Icon";
import { categoryPath, getCategory, getToolById, getTool, isLive, toolPath } from "@/lib/tools";
import { getCategoryGroups, getToolIcon } from "@/lib/tools/menu";

const SECTIONS = [
  { id: "how-to-use", title: "How to use this calculator" },
  { id: "formula", title: "Formula and variables" },
  { id: "example", title: "Worked example" },
  { id: "factors", title: "What changes the result" },
  { id: "benefits", title: "Benefits and practical uses" },
  { id: "assumptions", title: "Assumptions and limitations" },
  { id: "faqs", title: "Frequently asked questions" },
  { id: "related", title: "Related calculators" },
  { id: "references", title: "References" },
];

function RelatedList({ ids }) {
  const tools = ids.map(getToolById).filter(Boolean);
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {tools.map((tool) => (
        <li key={`${tool.category}/${tool.slug}`} className="rounded-xl border border-line bg-card p-4">
          {isLive(tool) ? (
            <Link href={toolPath(tool)} prefetch={false} className="font-semibold text-accent hover:underline">
              {tool.name}
            </Link>
          ) : (
            <span className="font-semibold text-ink">
              {tool.name} <span className="text-xs font-normal text-muted">(coming soon)</span>
            </span>
          )}
          <p className="mt-1 text-sm text-muted">{tool.description}</p>
        </li>
      ))}
    </ul>
  );
}

function Sidebar({ category, currentSlug }) {
  // Only the tools in the same menu group as this one, so the list stays short and relevant.
  const group = getCategoryGroups(category.slug).find((g) => g.tools.some((tool) => tool.slug === currentSlug));
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <nav aria-label="On this page" className="rounded-2xl border border-line bg-card p-5">
        <h2 className="text-sm font-bold uppercase tracking-wider text-ink">On this page</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {SECTIONS.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`} className="text-muted hover:text-accent hover:underline">
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {group && (
        <nav aria-label={`More ${group.title} tools`} className="rounded-2xl border border-line bg-card p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink">More in {group.title}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {group.tools.map((tool) => (
              <li key={tool.slug}>
                {tool.slug === currentSlug ? (
                  <span aria-current="page" className="font-semibold text-ink">
                    {tool.name}
                  </span>
                ) : (
                  <Link href={toolPath(tool)} prefetch={false} className="text-muted hover:text-accent hover:underline">
                    {tool.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href={categoryPath(category)} prefetch={false} className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
            View all {category.navName} tools
          </Link>
        </nav>
      )}
    </aside>
  );
}

/**
 * Shared layout for every calculator page. Route files stay thin:
 *   <ToolPage categorySlug slug content={content}><MyCalculator /></ToolPage>
 * `content` comes from the tool's content.js (see docs/content-schema.md).
 */
export default function ToolPage({ categorySlug, toolSlug, content, children }) {
  const category = getCategory(categorySlug);
  const tool = getTool(categorySlug, toolSlug);
  if (!category || !tool) {
    // Fail the build loudly instead of publishing a broken page.
    throw new Error(`ToolPage: "${categorySlug}/${toolSlug}" is not in lib/tools/catalogue.js`);
  }

  const path = toolPath(tool);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: category.name, path: categoryPath(category) },
    { name: tool.name, path },
  ];
  const reviewed = tool.lastReviewed ? formatDateLong(tool.lastReviewed) : null;

  return (
    <div data-cat={categorySlug} className="mx-auto max-w-6xl px-4 py-6">
      <Breadcrumbs items={crumbs} />

      <header className="mt-4 flex items-start gap-4">
        <span className="cat-solid mt-1 hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl sm:flex">
          <Icon name={getToolIcon(tool)} className="h-7 w-7" />
        </span>
        <div>
          <Link href={categoryPath(category)} prefetch={false} className="cat-tint inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider hover:underline">
            {category.navName}
          </Link>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{content.h1}</h1>
          <p className="mt-3 max-w-3xl text-lg text-muted">{content.intro[0]}</p>
          {reviewed && (
            <p className="mt-2 text-sm text-muted">
              Last reviewed: <time dateTime={tool.lastReviewed}>{reviewed}</time>
            </p>
          )}
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <ErrorBoundary>{children}</ErrorBoundary>
          <AdSlot slotId="tool-below-calculator" className="mt-8" />

          {content.intro.length > 1 && (
            <section aria-label="About this calculator" className="prose-block mt-10 text-ink/90">
              {content.intro.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          )}

          <ContentSection id="how-to-use" title="How to use this calculator">
            <ol>
              {content.howTo.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </ContentSection>

          <ContentSection id="formula" title="Formula and variables">
            <p className="whitespace-pre-line rounded-lg border border-line bg-card-alt p-4 font-mono text-sm leading-7 text-ink">
              {content.formula.expression}
            </p>
            <ul className="mt-4">
              {content.formula.variables.map((variable) => (
                <li key={variable.symbol}>
                  <strong className="font-mono">{variable.symbol}</strong> - {variable.meaning}
                </li>
              ))}
            </ul>
            {content.formula.notes?.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </ContentSection>

          <ContentSection id="example" title="Worked example">
            <p>{content.example.scenario}</p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-card">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Inputs and results for the worked example</caption>
                <tbody className="divide-y divide-line">
                  {content.example.inputs.map((row) => (
                    <tr key={row.label}>
                      <th scope="row" className="px-4 py-3 font-medium text-muted">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-right font-semibold">{row.value}</td>
                    </tr>
                  ))}
                  {content.example.results.map((row) => (
                    <tr key={row.label} className="bg-accent-soft">
                      <th scope="row" className="px-4 py-3 font-medium text-ink">
                        {row.label}
                      </th>
                      <td className="px-4 py-3 text-right font-bold text-accent">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ol className="mt-4">
              {content.example.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </ContentSection>

          <ContentSection id="factors" title="What changes the result">
            <ul>
              {content.factors.map((factor) => (
                <li key={factor.title}>
                  <strong>{factor.title}.</strong> {factor.text}
                </li>
              ))}
            </ul>
          </ContentSection>

          <ContentSection id="benefits" title="Benefits and practical uses">
            <ul>
              {content.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </ContentSection>

          <ContentSection id="assumptions" title="Assumptions and limitations">
            <ul>
              {content.assumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
            </ul>
          </ContentSection>

          <ContentSection id="faqs" title="Frequently asked questions">
            <FaqList faqs={content.faqs} />
          </ContentSection>

          <AdSlot slotId="tool-after-faqs" className="mt-10" />

          <ContentSection id="related" title="Related calculators">
            <RelatedList ids={content.related} />
          </ContentSection>

          <ContentSection id="references" title="References">
            <ul>
              {content.references.map((reference) => (
                <li key={reference.url}>
                  <a href={reference.url} target="_blank" rel="noopener noreferrer">
                    {reference.label}
                  </a>
                </li>
              ))}
            </ul>
            {reviewed && (
              <p className="mt-4 text-sm text-muted">
                Page last reviewed on <time dateTime={tool.lastReviewed}>{reviewed}</time>. This calculator gives
                estimates for planning only; it is not financial advice and not an offer from any lender.
              </p>
            )}
          </ContentSection>
        </div>

        <Sidebar category={category} currentSlug={tool.slug} />
      </div>

      <JsonLd
        data={[
          webPageJsonLd({
            name: content.h1,
            description: content.seo.description,
            path,
            dateModified: tool.lastReviewed || undefined,
          }),
          faqJsonLd(content.faqs),
        ]}
      />
    </div>
  );
}

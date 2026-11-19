import Link from "next/link";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import { FAQS, GLOSSARY, GOALS, GUIDES, STEPS, TIPS } from "@/lib/content/guides";
import { faqJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { getToolById, toolPath } from "@/lib/tools";

export const metadata = buildMetadata({ title: GUIDES.title, description: GUIDES.description, path: GUIDES.path });

export default function Page() {
  const crumbs = [
    { name: "Home", path: "/" },
    { name: GUIDES.title, path: GUIDES.path },
  ];
  const h2 = "text-2xl font-bold tracking-tight text-ink";
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <JsonLd data={webPageJsonLd({ name: GUIDES.title, description: GUIDES.description, path: GUIDES.path, dateModified: GUIDES.updated })} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <Breadcrumbs items={crumbs} />
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">{GUIDES.title}</h1>
      <p className="mt-3 max-w-2xl text-muted">A short, plain-language guide to getting the most from the calculators.</p>

      <section className="mt-10">
        <h2 className={h2}>Getting started</h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-surface p-4 shadow-card">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-sm font-bold text-white">{i + 1}</span>
              <h3 className="mt-2 font-semibold text-ink">{s.title}</h3>
              <p className="mt-1 text-sm text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className={h2}>Which tool should I use?</h2>
        <div className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
          {GOALS.map((g) => (
            <div key={g.goal} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold text-ink">{g.goal}</p>
              <p className="flex flex-wrap gap-2">
                {g.tools.map(getToolById).filter(Boolean).map((t) => (
                  <Link key={t.slug} href={toolPath(t)} prefetch={false} className="rounded-full bg-page px-3 py-1 text-sm font-medium text-accent hover:underline">
                    {t.name}
                  </Link>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className={h2}>Getting accurate results</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-ink/90">
          {TIPS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className={h2}>Glossary</h2>
        <dl className="mt-4 grid gap-3 sm:grid-cols-2">
          {GLOSSARY.map(([term, def]) => (
            <div key={term} className="rounded-2xl border border-line bg-surface p-4">
              <dt className="font-semibold text-ink">{term}</dt>
              <dd className="mt-1 text-sm text-muted">{def}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-10">
        <h2 className={h2}>Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-line bg-surface p-4">
              <summary className="cursor-pointer font-semibold text-ink">{f.q}</summary>
              <p className="mt-2 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-muted">
        These guides are general information, not financial, tax, legal or medical advice. Read the <Link href="/disclaimer/" className="text-accent underline">Disclaimer</Link> or <Link href="/contact/" className="text-accent underline">contact us</Link>.
      </p>
    </div>
  );
}

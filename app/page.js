import Link from "next/link";
import ToolCard from "@/components/home/ToolCard";
import SearchLauncher from "@/components/layout/SearchLauncher";
import JsonLd from "@/components/seo/JsonLd";
import Icon from "@/components/ui/Icon";
import { siteConfig } from "@/lib/constants/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { buildMetadata } from "@/lib/seo/metadata";
import { CATEGORIES, categoryPath, getLiveTools, getLiveToolsByCategory, getToolById, toolPath } from "@/lib/tools";
import { POPULAR_TOOL_IDS, getCategoryGroups } from "@/lib/tools/menu";

const TITLE = `${siteConfig.name} - Free Calculators for India`;

export const metadata = {
  ...buildMetadata({
    title: TITLE,
    description:
      "Free online calculators for India: loan EMI, SIP, GST, income tax, salary, age, BMI and more, with clear formulas and worked examples in rupees.",
    path: "/",
  }),
  // The root layout title template would append the brand twice; use the full title as-is.
  title: { absolute: TITLE },
};

const QUICK_LINKS = ["finance/emi-calculator", "finance/sip-calculator", "salary-tax/income-tax", "finance/gst-calculator", "daily-life/age-calculator", "health/bmi-calculator"];

const TRUST_POINTS = [
  { icon: "lock", title: "Private by design", text: "Calculations run in your browser. The amounts you enter are not sent to a server." },
  { icon: "book", title: "Formulas explained", text: "Every calculator shows its formula, a worked example in rupees and the assumptions behind the result." },
  { icon: "shield", title: "Dated and sourced", text: "Pages that depend on changing rules name the financial year, link official sources and show a last-reviewed date." },
  { icon: "bolt", title: "Fast and installable", text: "Light pages that work on any phone. Install the site as an app and revisit pages offline." },
];

export default function HomePage() {
  const liveCount = getLiveTools().length;
  const popular = POPULAR_TOOL_IDS.map(getToolById).filter(Boolean);
  const quick = QUICK_LINKS.map(getToolById).filter(Boolean);

  return (
    <>
      <section className="hero-bg">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 text-center sm:pb-20 sm:pt-20">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-xs font-semibold text-muted shadow-card">
            <Icon name="check" className="h-3.5 w-3.5 text-accent" />
            {liveCount} free tools &middot; No sign-up &middot; Made for India
          </p>
          <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            Free calculators and everyday tools <span className="text-accent">for India</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
            Loans, investments, salary and tax, health and daily maths in rupees, with the formula and a worked example behind every result.
          </p>
          <div className="mx-auto mt-9 max-w-2xl">
            <SearchLauncher variant="bar" placeholder="Search tools, e.g. EMI, SIP, income tax" />
          </div>
          <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="Quick links">
            {quick.map((tool) => (
              <li key={tool.slug}>
                <Link href={toolPath(tool)} className="inline-block rounded-full border border-line bg-card px-3.5 py-1.5 text-sm font-medium text-ink hover:border-accent hover:text-accent">
                  {tool.name.replace(/ Calculator$/, "")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <section aria-labelledby="categories-heading" className="-mt-2">
          <h2 id="categories-heading" className="sr-only">
            Tool categories
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => {
              const tools = getLiveToolsByCategory(category.slug);
              return (
                <li key={category.slug} data-cat={category.slug}>
                  <Link href={categoryPath(category)} prefetch={false} className="cat-hero lift group flex h-full flex-col rounded-2xl p-6 shadow-card">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
                      <Icon name={category.icon} className="h-6 w-6" />
                    </span>
                    <span className="mt-5 text-2xl font-extrabold tracking-tight">{category.name}</span>
                    <span className="mt-1.5 text-sm text-white/90">{tools.slice(0, 4).map((t) => t.name.replace(/ Calculator$/, "")).join(" · ")} &amp; more</span>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                      {tools.length} free tools <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section aria-labelledby="popular-heading" className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <h2 id="popular-heading" className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Popular calculators
            </h2>
          </div>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((tool) => (
              <li key={`${tool.category}/${tool.slug}`}>
                <ToolCard tool={tool} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="all-heading" className="cv-auto mt-16">
          <h2 id="all-heading" className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Every calculator, by topic
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((category) => (
              <section key={category.slug} data-cat={category.slug} aria-labelledby={`all-${category.slug}`} className="rounded-2xl border border-line bg-card p-5">
                <h3 id={`all-${category.slug}`} className="flex items-center gap-2.5 text-lg font-bold text-ink">
                  <span className="cat-solid flex h-8 w-8 items-center justify-center rounded-lg">
                    <Icon name={category.icon} className="h-4 w-4" />
                  </span>
                  <Link href={categoryPath(category)} prefetch={false} className="hover:text-[var(--cat)]">
                    {category.name}
                  </Link>
                </h3>
                {getCategoryGroups(category.slug).map((group) => (
                  <div key={group.title} className="mt-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-muted">{group.title}</h4>
                    <ul className="mt-2 flex flex-wrap gap-x-1 gap-y-1.5">
                      {group.tools.map((tool) => (
                        <li key={tool.slug}>
                          <Link href={toolPath(tool)} prefetch={false} className="cat-tint inline-block rounded-lg px-2.5 py-1 text-[13px] font-medium hover:underline">
                            {tool.name.replace(/ Calculator$/, "")}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            ))}
          </div>
        </section>

        <section aria-labelledby="trust-heading" className="cv-auto mt-16">
          <h2 id="trust-heading" className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            Built to be trusted
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_POINTS.map((point) => (
              <li key={point.title} className="rounded-2xl border border-line bg-card p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon name={point.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-ink">{point.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{point.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-auto mx-auto mt-16 max-w-3xl text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Free online calculators that respect your privacy</h2>
          <p className="mt-4 leading-relaxed text-muted">
            {siteConfig.name} gives you everyday calculators for loans, savings, salary, tax, health and daily life, with the working shown so you can understand the number and not just copy it. Everything runs inside your browser, so what you type stays on your device.
          </p>
          <p className="mt-3 text-sm text-muted">
            Results are estimates for planning and learning. Read the <Link href="/disclaimer/" className="text-accent underline underline-offset-4">disclaimer</Link> and our <Link href="/guides/" className="text-accent underline underline-offset-4">guides</Link> to get the most from each tool.
          </p>
        </section>
      </div>

      <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
    </>
  );
}

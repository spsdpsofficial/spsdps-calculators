import Link from "next/link";
import ToolCard from "@/components/home/ToolCard";
import Breadcrumbs from "@/components/seo/Breadcrumbs";
import JsonLd from "@/components/seo/JsonLd";
import Icon from "@/components/ui/Icon";
import { webPageJsonLd } from "@/lib/seo/jsonld";
import { CATEGORIES, categoryPath, getCategory, getLiveToolsByCategory, getToolsByCategory, isLive } from "@/lib/tools";
import { getCategoryGroups } from "@/lib/tools/menu";

/** Category landing page: a coloured intro band, then the category's live tools in the same groups as the menu. */
export default function CategoryPage({ categorySlug }) {
  const category = getCategory(categorySlug);
  if (!category) throw new Error(`CategoryPage: unknown category "${categorySlug}"`);

  const groups = getCategoryGroups(categorySlug);
  const comingSoon = getToolsByCategory(categorySlug).filter((tool) => !isLive(tool));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: category.name, path: categoryPath(category) },
  ];

  return (
    <div data-cat={categorySlug} className="mx-auto max-w-6xl px-4 py-6">
      <Breadcrumbs items={crumbs} />
      <header className="cat-hero mt-4 rounded-3xl p-7 shadow-card sm:p-10">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20">
          <Icon name={category.icon} className="h-7 w-7" />
        </span>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">{category.title}</h1>
        <p className="mt-3 max-w-3xl text-base text-white/90 sm:text-lg">{category.intro}</p>
        <p className="mt-5 inline-block rounded-full bg-white/20 px-3.5 py-1 text-sm font-semibold">{getLiveToolsByCategory(categorySlug).length} free tools</p>
      </header>

      {groups.map((group) => (
        <section key={group.title} aria-labelledby={`g-${group.title}`} className="mt-10">
          <h2 id={`g-${group.title}`} className="flex items-center gap-3 text-xl font-bold text-ink">
            <span className="cat-solid flex h-9 w-9 items-center justify-center rounded-xl">
              <Icon name={group.icon} className="h-[18px] w-[18px]" />
            </span>
            {group.title}
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.tools.map((tool) => (
              <li key={tool.slug}>
                <ToolCard tool={tool} />
              </li>
            ))}
          </ul>
        </section>
      ))}

      {comingSoon.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-ink">Coming soon</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoon.map((tool) => (
              <li key={tool.slug} className="rounded-xl border border-dashed border-line p-4 text-sm text-muted">
                <span className="font-semibold text-ink">{tool.name}</span> &mdash; {tool.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      <nav aria-label="Other categories" className="mt-14 border-t border-line pt-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">More categories</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.slug !== categorySlug).map((c) => (
            <li key={c.slug} data-cat={c.slug}>
              <Link href={categoryPath(c)} prefetch={false} className="cat-tint inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold hover:underline">
                <Icon name={c.icon} className="h-4 w-4" />
                {c.navName}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <JsonLd data={webPageJsonLd({ name: category.title, description: category.description, path: categoryPath(category) })} />
    </div>
  );
}

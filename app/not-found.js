import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { CATEGORIES, categoryPath } from "@/lib/tools";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "The page you were looking for does not exist.",
  path: "/404/",
  noindex: true,
});

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">Error 404</p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">We could not find that page</h1>
      <p className="mt-4 text-muted">
        The link may be old or mistyped. Try the home page or pick a category below.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-accent px-5 py-3 font-semibold text-accent-ink hover:opacity-90"
      >
        Go to the home page
      </Link>
      <ul className="mt-10 flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link
              href={categoryPath(category)}
              className="rounded-full border border-line bg-card px-4 py-2 text-sm text-ink hover:border-accent"
            >
              {category.navName}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

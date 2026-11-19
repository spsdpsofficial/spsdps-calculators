import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { CATEGORIES, categoryPath } from "@/lib/tools";

// Shown by the service worker when a page is not available offline. Never indexed or listed in the sitemap.
export const metadata = buildMetadata({
  title: "You are offline",
  description: "You are offline. Pages you opened earlier still work without a connection.",
  path: "/offline/",
  noindex: true,
});

export default function OfflinePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">No connection</p>
      <h1 className="mt-2 text-3xl font-bold text-ink sm:text-4xl">You are offline</h1>
      <p className="mt-4 text-muted">
        This page has not been saved on your device yet. Calculators you opened before still work offline. Reconnect to open anything new.
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((category) => (
          <li key={category.slug}>
            <Link href={categoryPath(category)} className="inline-block rounded-lg border bg-card px-4 py-2 text-sm font-medium text-ink hover:bg-card-alt">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-8">
        <Link href="/" className="text-accent underline">Go to the home page</Link>
      </p>
    </div>
  );
}

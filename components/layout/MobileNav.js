"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Icon from "@/components/ui/Icon";
import SearchLauncher from "./SearchLauncher";

const EXTRA_LINKS = [
  { name: "Guides", href: "/guides/" },
  { name: "About", href: "/about/" },
  { name: "Contact", href: "/contact/" },
  { name: "Privacy Policy", href: "/privacy-policy/" },
  { name: "Disclaimer", href: "/disclaimer/" },
];

/** Phone and tablet menu: a full-height drawer with one expandable section per category. */
export default function MobileNav({ menu }) {
  const pathname = usePathname();
  const [state, setState] = useState({ open: false, path: pathname, section: null });
  const open = state.open && state.path === pathname; // navigating closes the drawer

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event) => event.key === "Escape" && setState({ open: false, path: pathname, section: null });
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, pathname]);

  const toggleSection = (slug) => setState({ open: true, path: pathname, section: state.section === slug ? null : slug });

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setState({ open: !open, path: pathname, section: null })}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-card text-ink hover:bg-card-alt"
      >
        <Icon name={open ? "close" : "menu"} />
      </button>

      {open && (
        <nav id="mobile-menu" aria-label="Main menu" className="fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto overscroll-contain bg-page px-4 pb-10 pt-4">
          <div className="mx-auto max-w-xl">
            <SearchLauncher variant="bar" placeholder="Search tools" />
            <ul className="mt-4 space-y-2">
              {menu.map((entry) => {
                const expanded = state.section === entry.slug;
                return (
                  <li key={entry.slug} data-cat={entry.slug} className="overflow-hidden rounded-2xl border border-line bg-card">
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`m-${entry.slug}`}
                      onClick={() => toggleSection(entry.slug)}
                      className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
                    >
                      <span className="cat-solid flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
                        <Icon name={entry.icon} className="h-[18px] w-[18px]" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold text-ink">{entry.name}</span>
                        <span className="block text-xs text-muted">{entry.count} tools</span>
                      </span>
                      <Icon name="chevron-down" className={`h-5 w-5 text-muted transition-transform ${expanded ? "rotate-180" : ""}`} />
                    </button>
                    {expanded && (
                      <div id={`m-${entry.slug}`} className="border-t border-line px-4 pb-4 pt-3">
                        {entry.groups.map((group) => (
                          <section key={group.title} aria-label={group.title} className="mb-3 last:mb-0">
                            <h2 className="text-xs font-bold uppercase tracking-wider text-muted">{group.title}</h2>
                            <ul className="mt-1">
                              {group.tools.map(([name, href]) => (
                                <li key={href}>
                                  <Link href={href} prefetch={false} className="block rounded-lg px-2 py-2.5 text-[15px] text-ink hover:bg-card-alt">
                                    {name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </section>
                        ))}
                        <Link href={entry.href} prefetch={false} className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--cat)]">
                          View all {entry.navName} tools <Icon name="arrow" className="h-4 w-4" />
                        </Link>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
              {EXTRA_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} prefetch={false} className="block rounded-xl border border-line bg-card px-4 py-3 font-medium text-ink hover:bg-card-alt">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}
    </div>
  );
}

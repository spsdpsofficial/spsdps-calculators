"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

/**
 * Desktop mega menu. `menu` comes from buildNavMenu(): one entry per category with grouped tool links.
 * Opens on click, tap, Enter/Space/ArrowDown, and on mouse hover. Closes on Escape, outside click, leaving
 * with the mouse, and after navigating.
 */
export default function DesktopNav({ menu }) {
  const pathname = usePathname();
  const [state, setState] = useState({ slug: null, path: pathname });
  const open = state.path === pathname ? state.slug : null; // a new page closes the menu
  const rootRef = useRef(null);
  const timer = useRef(null);

  const show = (slug) => setState({ slug, path: pathname });
  const hide = () => setState({ slug: null, path: pathname });
  const cancel = () => clearTimeout(timer.current);
  const later = (fn, ms) => {
    cancel();
    timer.current = setTimeout(fn, ms);
  };

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") {
        rootRef.current?.querySelector(`[data-trigger="${open}"]`)?.focus();
        hide();
      }
    };
    const onDown = (event) => {
      if (!rootRef.current?.contains(event.target)) hide();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
    // `hide` only needs the current pathname, which is stable between renders of the same page.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pathname]);

  useEffect(() => cancel, []);

  const focusFirst = (slug) => requestAnimationFrame(() => rootRef.current?.querySelector(`[data-panel="${slug}"] a`)?.focus());
  const isMouse = (event) => event.pointerType === "mouse";

  const current = menu.find((entry) => entry.slug === open);

  return (
    <div ref={rootRef} onPointerLeave={(e) => isMouse(e) && later(hide, 160)} onPointerEnter={(e) => isMouse(e) && cancel()}>
      <nav aria-label="Primary" className="hidden lg:block">
        <ul className="flex h-16 items-stretch">
          {menu.map((entry) => {
            const isOpen = open === entry.slug;
            return (
              <li key={entry.slug} className="flex">
                <button
                  type="button"
                  data-trigger={entry.slug}
                  data-cat={entry.slug}
                  aria-expanded={isOpen}
                  aria-controls={`menu-${entry.slug}`}
                  onClick={() => (isOpen ? hide() : show(entry.slug))}
                  onPointerEnter={(e) => isMouse(e) && (cancel(), later(() => show(entry.slug), 70))}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey && isOpen)) {
                      e.preventDefault();
                      show(entry.slug);
                      focusFirst(entry.slug);
                    }
                  }}
                  className={`group relative flex whitespace-nowrap items-center gap-1.5 px-2.5 text-sm font-semibold xl:px-3 ${isOpen ? "text-[var(--cat)]" : "text-ink hover:text-[var(--cat)]"}`}
                >
                  <Icon name={entry.icon} className="h-4 w-4 text-[var(--cat)]" />
                  {entry.navName}
                  <Icon name="chevron-down" className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  <span aria-hidden="true" className={`absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-[var(--cat)] transition-opacity ${isOpen ? "opacity-100" : "opacity-0"}`} />
                </button>
              </li>
            );
          })}
          <li className="flex">
            <Link href="/guides/" prefetch={false} className="flex items-center whitespace-nowrap px-2.5 text-sm font-semibold text-ink hover:text-accent xl:px-3">
              Guides
            </Link>
          </li>
        </ul>
      </nav>

      {current && (
        <div
          id={`menu-${current.slug}`}
          data-panel={current.slug}
          data-cat={current.slug}
          className="absolute inset-x-0 top-full z-50 hidden border-b border-line bg-card shadow-pop lg:block"
        >
          <div className="mx-auto max-w-6xl px-4 py-6">
            <div className="grid gap-x-8 gap-y-6" style={{ gridTemplateColumns: `repeat(${Math.min(current.groups.length, 4)}, minmax(0, 1fr))` }}>
              {current.groups.map((group) => (
                <section key={group.title} aria-label={group.title}>
                  <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted">
                    <span className="cat-solid flex h-6 w-6 items-center justify-center rounded-lg">
                      <Icon name={group.icon} className="h-3.5 w-3.5" />
                    </span>
                    {group.title}
                  </h2>
                  <ul className="mt-3 space-y-0.5">
                    {group.tools.map(([name, href]) => (
                      <li key={href}>
                        <Link href={href} prefetch={false} className="block rounded-lg px-2.5 py-1.5 text-sm text-ink hover:bg-card-alt hover:text-[var(--cat)]">
                          {name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4 text-sm">
              <span className="text-muted">{current.count} free tools in {current.name}</span>
              <Link href={current.href} prefetch={false} className="inline-flex items-center gap-1.5 font-semibold text-[var(--cat)] hover:underline">
                View all {current.navName} tools <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

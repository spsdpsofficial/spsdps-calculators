"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";
import { buildSearchIndex, popularEntries, searchTools } from "@/lib/tools/search";

/** Search overlay. Loaded only when opened, so its data never weighs on first page load. */
export default function SearchDialog({ onClose }) {
  const router = useRouter();
  const id = useId();
  const inputRef = useRef(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const index = useMemo(() => buildSearchIndex(), []);
  const trimmed = query.trim();
  const results = useMemo(() => (trimmed ? searchTools(index, trimmed) : popularEntries(index, 6)), [index, trimmed]);

  useEffect(() => {
    inputRef.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  function go(entry) {
    onClose();
    router.push(entry.href);
  }

  function onKeyDown(event) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter" && results[active]) {
      event.preventDefault();
      go(results[active]);
    }
  }

  const listId = `${id}-list`;
  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-navy/60 px-4 pt-[10vh]" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label="Search calculators and tools" className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-card shadow-pop" onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Icon name="search" className="h-5 w-5 shrink-0 text-muted" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={results[active] ? `${id}-opt-${active}` : undefined}
            aria-label="Search calculators and tools"
            placeholder="Search tools, e.g. EMI, SIP, income tax"
            autoComplete="off"
            className="h-14 w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
          />
          <button type="button" onClick={onClose} className="rounded-lg border border-line px-2 py-1 text-xs font-medium text-muted hover:bg-card-alt">
            Esc
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-2">
          <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted">{trimmed ? "Results" : "Popular tools"}</p>
          {results.length === 0 ? (
            <p className="px-3 py-6 text-sm text-muted">No tool matches &ldquo;{trimmed}&rdquo;. Try a shorter word, such as &ldquo;loan&rdquo; or &ldquo;tax&rdquo;.</p>
          ) : (
            <ul id={listId} role="listbox" aria-label="Matching tools">
              {results.map((entry, i) => (
                <li key={entry.id} id={`${id}-opt-${i}`} role="option" aria-selected={i === active}>
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => go(entry)}
                    onMouseEnter={() => setActive(i)}
                    className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left ${i === active ? "bg-accent-soft" : ""}`}
                  >
                    <span>
                      <span className="block font-semibold text-ink">{entry.name}</span>
                      <span className="block text-sm text-muted">{entry.description}</span>
                    </span>
                    <span className="shrink-0 rounded-full bg-card-alt px-2 py-0.5 text-xs font-medium text-muted">{entry.category}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

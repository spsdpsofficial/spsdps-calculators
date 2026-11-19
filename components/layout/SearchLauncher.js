"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/Icon";

// The dialog (and the tool index it uses) is downloaded only the first time someone searches.
const loadDialog = () => import("./SearchDialog");
const SearchDialog = dynamic(loadDialog, { ssr: false });

/**
 * Button that opens the search overlay.
 * variant "icon": compact header button. variant "bar": wide search field look-alike for the home page.
 * `shortcut` also opens it with "/" or Ctrl/Cmd+K (use on one instance per page).
 */
export default function SearchLauncher({ variant = "icon", shortcut = false, placeholder = "Search calculators and tools" }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!shortcut) return undefined;
    function onKey(event) {
      const tag = event.target?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || event.target?.isContentEditable;
      if ((event.key === "k" && (event.ctrlKey || event.metaKey)) || (event.key === "/" && !typing && !event.ctrlKey && !event.metaKey)) {
        event.preventDefault();
        setOpen(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shortcut]);

  function close() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  const warm = () => loadDialog();
  const common = { ref: buttonRef, type: "button", onClick: () => setOpen(true), onPointerEnter: warm, onFocus: warm, "aria-haspopup": "dialog" };

  return (
    <>
      {variant === "bar" ? (
        <button {...common} className="flex w-full items-center gap-3 rounded-2xl border border-line bg-card px-5 py-4 text-left text-base text-muted shadow-card hover:border-accent">
          <Icon name="search" className="h-5 w-5 shrink-0" />
          <span className="flex-1">{placeholder}</span>
          <kbd className="hidden rounded-md border border-line px-2 py-0.5 text-xs sm:inline">/</kbd>
        </button>
      ) : (
        <button {...common} aria-label="Search calculators and tools" className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-card px-3 text-sm font-medium text-muted hover:bg-card-alt hover:text-ink">
          <Icon name="search" className="h-[18px] w-[18px]" />
          <span className="hidden xl:inline">Search</span>
        </button>
      )}
      {open && <SearchDialog onClose={close} />}
    </>
  );
}

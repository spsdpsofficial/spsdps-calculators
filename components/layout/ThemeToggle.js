"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";

/**
 * Light is the theme every page load starts with, always. The choice is deliberately NOT saved anywhere
 * (no localStorage, no cookie): switching to dark lasts for the current visit, and a refresh returns to light.
 * Moving between pages keeps the choice because the layout stays mounted.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  function toggle() {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
  }

  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-line bg-card px-3 text-sm font-medium text-ink hover:bg-card-alt"
    >
      <Icon name={isDark ? "sun" : "moon"} className="h-[18px] w-[18px]" />
      <span className="hidden xl:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import SearchLauncher from "./SearchLauncher";
import ThemeToggle from "./ThemeToggle";
import { siteConfig } from "@/lib/constants/site";
import { buildNavMenu } from "@/lib/tools/menu";

export default function Header() {
  const menu = buildNavMenu();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-ink" aria-label={`${siteConfig.name} home`}>
          <LogoMark className="h-9 text-ink" />
          <span className="leading-none">
            <span className="block text-[17px] font-extrabold tracking-[0.14em]">{siteConfig.shortName}</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">Calculators</span>
          </span>
        </Link>

        <div className="flex-1">
          <DesktopNav menu={menu} />
        </div>

        <div className="flex items-center gap-2">
          <SearchLauncher shortcut />
          <ThemeToggle />
          <MobileNav menu={menu} />
        </div>
      </div>
    </header>
  );
}

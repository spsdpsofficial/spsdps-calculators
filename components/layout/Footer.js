import Link from "next/link";
import { LogoMark } from "@/components/brand/Logo";
import InstallButton from "@/components/pwa/InstallButton";
import Icon from "@/components/ui/Icon";
import { siteConfig } from "@/lib/constants/site";
import { CATEGORIES, categoryPath, getLiveToolsByCategory, getToolById, toolPath } from "@/lib/tools";
import { POPULAR_TOOL_IDS } from "@/lib/tools/menu";

const COMPANY_LINKS = [
  { name: "Guides", href: "/guides/" },
  { name: "About", href: "/about/" },
  { name: "Contact", href: "/contact/" },
  { name: "Privacy Policy", href: "/privacy-policy/" },
  { name: "Terms of Use", href: "/terms/" },
  { name: "Disclaimer", href: "/disclaimer/" },
];

const linkClass = "text-[#b9c1e4] hover:text-white hover:underline underline-offset-4";

function Column({ title, children }) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wider text-white">{title}</h2>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  const popular = POPULAR_TOOL_IDS.slice(0, 8).map(getToolById).filter(Boolean);

  return (
    <footer className="cv-auto mt-20 bg-navy text-[#b9c1e4]" style={{ containIntrinsicSize: "auto 520px" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3 text-white" aria-label={`${siteConfig.name} home`}>
            <LogoMark className="h-10 text-white" />
            <span className="leading-none">
              <span className="block text-lg font-extrabold tracking-[0.14em]">{siteConfig.shortName}</span>
              <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8f99c9]">{siteConfig.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{siteConfig.description} Your numbers stay in your browser.</p>
          <p className="mt-4 text-sm">
            Made by <span className="font-semibold text-white">{siteConfig.maker}</span>
          </p>
          <a href={`mailto:${siteConfig.contactEmail}`} className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-white hover:underline underline-offset-4">
            <Icon name="mail" className="h-4 w-4" />
            {siteConfig.contactEmail}
          </a>
        </div>

        <Column title="Calculators">
          {CATEGORIES.map((category) => (
            <li key={category.slug}>
              <Link href={categoryPath(category)} prefetch={false} className={linkClass}>
                {category.name} <span className="text-[#7f8ab8]">({getLiveToolsByCategory(category.slug).length})</span>
              </Link>
            </li>
          ))}
        </Column>

        <Column title="Popular tools">
          {popular.map((tool) => (
            <li key={`${tool.category}/${tool.slug}`}>
              <Link href={toolPath(tool)} prefetch={false} className={linkClass}>
                {tool.name}
              </Link>
            </li>
          ))}
        </Column>

        <Column title="Company">
          {COMPANY_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} prefetch={false} className={linkClass}>
                {link.name}
              </Link>
            </li>
          ))}
          {siteConfig.relatedSites.map((site) => (
            <li key={site.url}>
              <a href={site.url} className={`${linkClass} inline-flex items-center gap-1.5`} rel="noopener">
                {site.name} <Icon name="external" className="h-3.5 w-3.5" />
              </a>
            </li>
          ))}
        </Column>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-sm sm:flex-row sm:text-left">
          <p>
            © {year} {siteConfig.name}. All rights reserved. Results are estimates, not financial, tax, legal or medical advice.
          </p>
          <InstallButton />
        </div>
      </div>
    </footer>
  );
}

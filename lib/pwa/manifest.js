import { siteConfig } from "@/lib/constants/site";
import { getToolById, isLive, toolPath } from "@/lib/tools";
import { BACKGROUND_COLOR, ICONS, SHORTCUT_TOOL_IDS, THEME_COLOR } from "./config";

/** Web app manifest. Shortcuts point only at live tools. */
export function buildManifest() {
  const shortcuts = SHORTCUT_TOOL_IDS.map(getToolById)
    .filter((tool) => tool && isLive(tool))
    .map((tool) => ({ name: tool.name, short_name: tool.name.replace(/ Calculator$/, ""), url: `${toolPath(tool)}?source=pwa`, icons: [ICONS[0]] }));

  return {
    id: "/",
    name: `${siteConfig.name} - Free Calculators for India`,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "any",
    lang: siteConfig.defaultLocale,
    dir: "ltr",
    background_color: BACKGROUND_COLOR,
    theme_color: THEME_COLOR,
    categories: ["finance", "utilities", "productivity"],
    icons: ICONS,
    shortcuts,
  };
}

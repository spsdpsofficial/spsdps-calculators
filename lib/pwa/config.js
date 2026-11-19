// PWA constants shared by the manifest, the offline page and tests. `public/sw.js` is a plain file that
// cannot import this, so tests assert that its constants match these.
export const OFFLINE_PATH = "/offline/";
export const SW_PATH = "/sw.js";
export const THEME_COLOR = "#0b1230"; // brand navy, same as the icon background
export const BACKGROUND_COLOR = "#ffffff"; // the site always opens in the light theme

// Tool ids offered as long-press shortcuts on the installed app icon.
export const SHORTCUT_TOOL_IDS = ["finance/emi-calculator", "finance/sip-calculator", "salary-tax/income-tax", "daily-life/age-calculator"];

export const ICONS = [
  { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
  { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
  { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
];

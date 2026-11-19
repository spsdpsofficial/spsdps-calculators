import { CATEGORIES } from "./categories";
import { TOOLS } from "./catalogue";
import { categoryPath, isLive, toolId, toolPath } from "./index";

// How tools are grouped inside each category's menu and category page. This is the single place that decides
// menu structure. tests/menu.test.js makes sure every live tool appears in exactly one group, so a new tool
// is never missing from the navigation. Ids are "category/slug".
export const MENU_GROUPS = {
  finance: [
    { title: "Loans & EMI", icon: "bank", tools: ["emi-calculator", "home-loan", "home-loan-eligibility", "personal-loan", "loan-prepayment", "credit-card-interest", "stamp-duty-calculator"] },
    { title: "Invest & grow", icon: "trend", tools: ["sip-calculator", "lumpsum-calculator", "swp-calculator", "cagr-calculator", "roi-calculator", "compound-interest", "simple-interest", "present-future-value", "inflation-calculator"] },
    { title: "Savings schemes", icon: "piggy", tools: ["fd-calculator", "rd-calculator", "ppf-calculator", "nps-calculator", "sukanya-samriddhi", "nsc-calculator", "scss-calculator"] },
    { title: "GST & gold", icon: "percent", tools: ["gst-calculator", "gold-calculator"] },
  ],
  "salary-tax": [
    { title: "Salary & pay", icon: "wallet", tools: ["salary-calculator", "ctc-to-in-hand", "salary-hike", "overtime", "epf-calculator", "gratuity-calculator", "leave-encashment"] },
    { title: "Income tax", icon: "receipt", tools: ["income-tax", "hra-calculator", "professional-tax", "tds", "advance-tax", "capital-gains"] },
  ],
  "daily-life": [
    { title: "Dates & time", icon: "calendar", tools: ["age-calculator", "date-difference", "day-of-week", "time-duration", "time-zone"] },
    { title: "Bills & shopping", icon: "cart", tools: ["electricity-bill", "fuel-cost", "travel-budget", "discount-calculator", "tip-split"] },
    { title: "Everyday maths", icon: "calculator", tools: ["percentage-calculator", "unit-converter"] },
    { title: "Plan & learn", icon: "target", tools: ["retirement-calculator", "gpa-cgpa"] },
  ],
  health: [
    { title: "Body metrics", icon: "scale", tools: ["bmi-calculator", "ideal-weight", "body-fat"] },
    { title: "Nutrition", icon: "apple", tools: ["calorie-calculator", "macronutrient", "protein-intake", "water-intake"] },
    { title: "Fitness", icon: "bolt", tools: ["target-heart-rate", "pace-calculator"] },
    { title: "Women's health", icon: "heart", tools: ["due-date", "ovulation"] },
  ],
  business: [
    { title: "Pricing & profit", icon: "chart", tools: ["profit-margin", "markup-calculator", "break-even", "price-comparison"] },
    { title: "GST & funding", icon: "receipt", tools: ["reverse-gst", "business-loan"] },
  ],
  utilities: [
    { title: "Text & code", icon: "code", tools: ["word-counter", "case-converter", "json-formatter", "url-encoder-decoder", "base64"] },
    { title: "Random & security", icon: "key", tools: ["password-generator", "random-number-generator", "dice-roller"] },
    { title: "Files & media", icon: "file", tools: ["qr-code-generator", "pdf-merger", "pdf-compressor", "image-resizer"] },
  ],
};

// Shown on the home page, in this order.
export const POPULAR_TOOL_IDS = [
  "finance/emi-calculator",
  "finance/sip-calculator",
  "salary-tax/income-tax",
  "finance/gst-calculator",
  "finance/home-loan",
  "salary-tax/salary-calculator",
  "daily-life/age-calculator",
  "health/bmi-calculator",
  "finance/fd-calculator",
  "daily-life/percentage-calculator",
  "salary-tax/hra-calculator",
  "utilities/qr-code-generator",
];

const byId = new Map(TOOLS.map((tool) => [toolId(tool), tool]));

/** Groups for one category, each with its live tools resolved. Empty groups are dropped. */
export function getCategoryGroups(categorySlug) {
  return (MENU_GROUPS[categorySlug] ?? [])
    .map((group) => ({
      title: group.title,
      icon: group.icon,
      tools: group.tools.map((slug) => byId.get(`${categorySlug}/${slug}`)).filter((tool) => tool && isLive(tool)),
    }))
    .filter((group) => group.tools.length > 0);
}

/** The icon of the group a tool belongs to (used for its tile). */
export function getToolIcon(tool) {
  const category = CATEGORIES.find((c) => c.slug === tool.category);
  const group = (MENU_GROUPS[tool.category] ?? []).find((g) => g.tools.includes(tool.slug));
  return group?.icon ?? category?.icon ?? "calculator";
}

/**
 * Compact, serialisable menu for the client-side header: one entry per category with groups of [name, path] pairs.
 * Kept small on purpose because it is sent with every page.
 */
export function buildNavMenu() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
    name: category.name,
    navName: category.navName,
    icon: category.icon,
    href: categoryPath(category),
    count: TOOLS.filter((tool) => tool.category === category.slug && isLive(tool)).length,
    groups: getCategoryGroups(category.slug).map((group) => ({
      title: group.title,
      icon: group.icon,
      tools: group.tools.map((tool) => [tool.name, toolPath(tool)]),
    })),
  }));
}

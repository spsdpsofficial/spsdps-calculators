import { siteConfig } from "@/lib/constants/site";
import { absoluteUrl } from "./metadata";

// Structured data builders. Each one must describe only what is visible on the page.
// No ratings, reviews, awards or author credentials are ever generated here.

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    ...(siteConfig.logoPath ? { logo: absoluteUrl(siteConfig.logoPath) } : {}),
    ...(siteConfig.contactEmail ? { email: siteConfig.contactEmail } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: siteConfig.defaultLocale,
    description: siteConfig.description,
  };
}

/** items: [{ name, path }] in order, starting with Home. */
export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function webPageJsonLd({ name, description, path, dateModified }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    inLanguage: siteConfig.defaultLocale,
    ...(dateModified ? { dateModified } : {}),
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
  };
}

export function faqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

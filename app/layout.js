import localFont from "next/font/local";
import "./globals.css";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PwaRegister from "@/components/pwa/PwaRegister";
import { defaultOgImage, siteConfig } from "@/lib/constants/site";
import { THEME_COLOR } from "@/lib/pwa/config";
import { robotsFor } from "@/lib/seo/metadata";

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Free Calculators for India`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  appleWebApp: { capable: true, title: siteConfig.name, statusBarStyle: "default" },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  formatDetection: { telephone: false },
  robots: robotsFor(),
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.ogLocale,
    type: "website",
    images: [defaultOgImage],
  },
  ...(siteConfig.searchConsoleToken ? { verification: { google: siteConfig.searchConsoleToken } } : {}),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: THEME_COLOR,
};

// Inter, self-hosted (SIL Open Font License, see app/fonts/Inter-LICENSE.txt). One small file, preloaded, no third-party request.
const inter = localFont({
  src: "./fonts/Inter-latin.woff2",
  variable: "--font-inter",
  weight: "100 900",
  display: "swap",
});

// The site always opens in the light theme: nothing about the theme is stored or read on load (see ThemeToggle).

export default function RootLayout({ children }) {
  return (
    <html lang={siteConfig.defaultLocale} className={inter.variable} data-scroll-behavior="smooth">
      <body className="flex min-h-screen flex-col bg-page text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics />
        <PwaRegister />
      </body>
    </html>
  );
}

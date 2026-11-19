import Script from "next/script";
import { siteConfig } from "@/lib/constants/site";

const MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]{4,20}$/;

/**
 * Google Analytics 4. Loads nothing unless a valid measurement ID is configured, so it is
 * "ready" but inert by default. Never send calculator inputs (amounts, health data) as events.
 * Remember to allow Google's domains in the CSP (see docs/security.md) when enabling.
 */
export default function GoogleAnalytics() {
  const id = siteConfig.gaMeasurementId;
  if (process.env.NODE_ENV !== "production" || !MEASUREMENT_ID_PATTERN.test(id)) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`}
      </Script>
    </>
  );
}

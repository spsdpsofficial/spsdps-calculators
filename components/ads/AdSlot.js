import { siteConfig } from "@/lib/constants/site";

/**
 * Reusable ad placement. Renders NOTHING (no blank box) until ads are enabled with
 * NEXT_PUBLIC_ADS_ENABLED=true. After AdSense approval the integrator adds the provider
 * script + real ad-unit IDs here (and updates the CSP in public/_headers).
 *
 * `minHeight` reserves space once enabled so the ad can never cause layout shift.
 */
export default function AdSlot({ slotId, className = "", minHeight = 250 }) {
  if (!siteConfig.adsEnabled) return null;

  return (
    <aside aria-label="Advertisement" className={className} style={{ minHeight }}>
      <p className="mb-1 text-xs uppercase tracking-wide text-muted">Advertisement</p>
      <div data-ad-slot={slotId} />
    </aside>
  );
}

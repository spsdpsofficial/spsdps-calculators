// Indian-format display helpers. Formatting never changes the underlying numbers.

const LOCALE = "en-IN";

const inrFormatters = new Map();

function getInrFormatter(decimals) {
  if (!inrFormatters.has(decimals)) {
    inrFormatters.set(
      decimals,
      new Intl.NumberFormat(LOCALE, {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    );
  }
  return inrFormatters.get(decimals);
}

/** 1000000 -> "₹10,00,000" (lakh/crore digit grouping). */
export function formatINR(value, { decimals = 0 } = {}) {
  if (!Number.isFinite(value)) return "—";
  return getInrFormatter(decimals).format(value);
}

/** Plain number with Indian grouping, e.g. 1234567.5 -> "12,34,567.5". */
export function formatNumber(value, { maxDecimals = 2 } = {}) {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat(LOCALE, { maximumFractionDigits: maxDecimals }).format(value);
}

/** 6.5 -> "6.5%". */
export function formatPercent(value, { maxDecimals = 2 } = {}) {
  if (!Number.isFinite(value)) return "—";
  return `${formatNumber(value, { maxDecimals })}%`;
}

/** 1500000 -> "₹15 lakh", 25000000 -> "₹2.5 crore", 85000 -> "₹85,000". */
export function formatCompactINR(value) {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  if (abs >= 1e7) return `${sign}₹${formatNumber(abs / 1e7, { maxDecimals: 2 })} crore`;
  if (abs >= 1e5) return `${sign}₹${formatNumber(abs / 1e5, { maxDecimals: 2 })} lakh`;
  return formatINR(value);
}

/** "2026-11-11" -> "11 November 2026". Date-only strings are treated as UTC (no off-by-one). */
export function formatDateLong(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(LOCALE, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(date);
}

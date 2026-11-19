// Small inline SVG icon set (decorative by default: pair with visible text or an aria-label).

const PATHS = {
  sun: "M12 3v2m0 14v2m9-9h-2M5 12H3m14.95-6.95-1.41 1.41M7.46 16.54l-1.41 1.41m0-12.9 1.41 1.41m9.08 9.08 1.41 1.41M12 8a4 4 0 100 8 4 4 0 000-8z",
  moon: "M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  search: "M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z",
  chevron: "M9 6l6 6-6 6",
  "chevron-down": "M6 9l6 6 6-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  calculator: "M7 3h10a1 1 0 011 1v16a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM8 7h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 18h.01M12 18h4",
  bank: "M3 10l9-6 9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18",
  trend: "M3 17l5-5 4 4 8-8M14 8h6v6",
  piggy: "M12 6c4.4 0 8 1.1 8 2.5S16.4 11 12 11 4 9.9 4 8.5 7.6 6 12 6zM4 8.5v4C4 13.9 7.6 15 12 15s8-1.1 8-2.5v-4M4 12.5v4C4 17.9 7.6 19 12 19s8-1.1 8-2.5v-4",
  percent: "M19 5L5 19M7.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z",
  wallet: "M4 7a2 2 0 012-2h11v3M4 7v10a2 2 0 002 2h13a1 1 0 001-1V9a1 1 0 00-1-1H6a2 2 0 01-2-1zM16 13.5h.01",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  calendar: "M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z",
  cart: "M3 4h2l2.4 10.2a1 1 0 001 .8h8.7a1 1 0 001-.8L20 8H6M10 20h.01M17 20h.01",
  target: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 16a4 4 0 100-8 4 4 0 000 8zM12 12h.01",
  scale: "M5 4h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1zM8.5 9.5a5 5 0 017 0M12 13l2-2.5",
  apple: "M12 7c-1.5-2-5-2-6 1.5-1 3.5 1 9.5 4 9.5 1 0 1.2-.5 2-.5s1 .5 2 .5c3 0 5-6 4-9.5-1-3.5-4.5-3.5-6-1.5zM12 7c0-2 1-3 2.5-3.5",
  bolt: "M13 3L5 14h6l-1 7 8-11h-6z",
  heart: "M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z",
  chart: "M4 20V10M10 20V4M16 20v-8M22 20H2",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  key: "M15 7a4 4 0 11-3.9 4.9L4 19v2h3v-2h2v-2h2l1.6-1.6A4 4 0 0115 7zM16 10h.01",
  file: "M7 3h7l5 5v12a1 1 0 01-1 1H7a1 1 0 01-1-1V4a1 1 0 011-1zM14 3v5h5M9 13h6M9 17h6",
  mail: "M4 6h16a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7a1 1 0 011-1zM3 7l9 6 9-6",
  shield: "M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6zM9 12l2 2 4-4",
  check: "M5 12l5 5 9-10",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4 20c0-3.5 3.6-6 8-6s8 2.5 8 6",
  home: "M4 11l8-7 8 7M6 10v10h12V10",
  download: "M12 4v11M7 11l5 5 5-5M5 20h14",
  external: "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5",
  clock: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 7v5l3 2",
  lock: "M6 11h12v9H6zM8 11V8a4 4 0 118 0v3",
  info: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5M12 8h.01",
  book: "M5 4h9a4 4 0 014 4v12H9a4 4 0 01-4-4zM5 16a4 4 0 014-4h9",
  copy: "M9 9h10a1 1 0 011 1v10a1 1 0 01-1 1H9a1 1 0 01-1-1V10a1 1 0 011-1zM5 15V5a1 1 0 011-1h10",
  finance: "M3 17l5-5 4 4 8-8M14 8h6v6",
  salary: "M4 7h16v10H4zM12 10v4M9 12h6",
  daily: "M7 3v3m10-3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z",
  health: "M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z",
  business: "M4 8h16v11H4zM9 8V5h6v3M4 13h16",
  utilities: "M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.4 2.4-2.6-.6-.6-2.6z",
};

export default function Icon({ name, className = "h-5 w-5" }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d={d} />
    </svg>
  );
}

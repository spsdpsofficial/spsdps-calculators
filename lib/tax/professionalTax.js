// Professional tax slabs, by state. `upTo` is inclusive. Amounts are per month (or per half-year where noted).
//
// Only states whose slabs in a published state-wise HR guide (read on 2026-11-11) agreed with the maintainer's own
// knowledge of the state rules are included. These are NOT read from the official notifications: verify each
// state against its official notification before launch. Karnataka, Odisha and Madhya Pradesh were left out because
// the figures disagreed or the rules were recently revised. Professional tax is capped at ₹2,500 a year by the Constitution (Article 276).

export const PT_VERIFIED_ON = "2026-11-11";

export const PT_STATES = {
  maharashtra: {
    name: "Maharashtra",
    period: "month",
    slabs: [
      { upTo: 7_500, amount: 0 },
      { upTo: 10_000, amount: 175 },
      { upTo: Infinity, amount: 200 },
    ],
    // The top slab pays ₹300 in February so that the year totals ₹2,500.
    februaryTopSlabAmount: 300,
    note: "Women earning up to a higher monthly limit may be exempt. Check the Maharashtra rules.",
  },
  "west-bengal": {
    name: "West Bengal",
    period: "month",
    slabs: [
      { upTo: 10_000, amount: 0 },
      { upTo: 15_000, amount: 110 },
      { upTo: 25_000, amount: 130 },
      { upTo: 40_000, amount: 150 },
      { upTo: Infinity, amount: 200 },
    ],
  },
  telangana: {
    name: "Telangana",
    period: "month",
    slabs: [
      { upTo: 15_000, amount: 0 },
      { upTo: 20_000, amount: 150 },
      { upTo: Infinity, amount: 200 },
    ],
  },
  "andhra-pradesh": {
    name: "Andhra Pradesh",
    period: "month",
    slabs: [
      { upTo: 15_000, amount: 0 },
      { upTo: 20_000, amount: 150 },
      { upTo: Infinity, amount: 200 },
    ],
  },
  gujarat: {
    name: "Gujarat",
    period: "month",
    slabs: [
      { upTo: 5_999, amount: 0 },
      { upTo: 8_999, amount: 80 },
      { upTo: 11_999, amount: 150 },
      { upTo: Infinity, amount: 200 },
    ],
  },
  "tamil-nadu": {
    name: "Tamil Nadu",
    period: "half-year", // slabs are on half-yearly income; amounts are per half-year
    slabs: [
      { upTo: 21_000, amount: 0 },
      { upTo: 30_000, amount: 135 },
      { upTo: 45_000, amount: 315 },
      { upTo: 60_000, amount: 690 },
      { upTo: 75_000, amount: 1_025 },
      { upTo: Infinity, amount: 1_250 },
    ],
  },
  kerala: {
    name: "Kerala",
    period: "half-year",
    slabs: [
      { upTo: 11_999, amount: 0 },
      { upTo: 17_999, amount: 120 },
      { upTo: 29_999, amount: 180 },
      { upTo: 44_999, amount: 300 },
      { upTo: 59_999, amount: 450 },
      { upTo: 74_999, amount: 600 },
      { upTo: 99_999, amount: 750 },
      { upTo: 124_999, amount: 1_000 },
      { upTo: Infinity, amount: 1_250 },
    ],
  },
};

export const PT_STATE_OPTIONS = Object.entries(PT_STATES).map(([value, state]) => ({ value, label: state.name }));

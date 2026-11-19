export const KM_PER_MILE = 1.609344;
export const RACES = [
  { label: "5 km", km: 5 },
  { label: "10 km", km: 10 },
  { label: "Half marathon (21.0975 km)", km: 21.0975 },
  { label: "Marathon (42.195 km)", km: 42.195 },
];

/** "m:ss" for seconds-per-unit (e.g. 330 → "5:30"). Rounds to the nearest second. */
export function formatPace(secondsPerUnit) {
  const total = Math.round(secondsPerUnit);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
}

/** "h:mm:ss" for a duration in seconds. */
export function formatDuration(seconds) {
  const total = Math.round(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function calculatePace({ distanceKm, totalSeconds }) {
  const secondsPerKm = totalSeconds / distanceKm;
  return {
    secondsPerKm,
    secondsPerMile: secondsPerKm * KM_PER_MILE,
    speedKmh: 3600 / secondsPerKm,
    predictions: RACES.map((r) => ({ label: r.label, seconds: secondsPerKm * r.km })),
  };
}

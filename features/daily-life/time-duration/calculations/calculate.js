/** "HH:MM" → minutes since midnight. */
export function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Minutes → "Xh Ym". */
export function formatDuration(totalMinutes) {
  return `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`;
}

/**
 * Time between two clock times. If `end` is earlier than `start` the span crosses midnight.
 * Break minutes are subtracted; returns an error if they exceed the span.
 */
export function calculateTimeDuration({ start, end, breakMinutes = 0 }) {
  const s = toMinutes(start);
  const e = toMinutes(end);
  const overnight = e < s;
  const gross = (overnight ? e + 1440 : e) - s;
  if (breakMinutes > gross) return { error: "The break is longer than the time between start and end." };
  const net = gross - breakMinutes;
  return { overnight, grossMinutes: gross, netMinutes: net, netHours: net / 60 };
}

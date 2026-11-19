/**
 * mode "percent": new = current × (1 + hike% ÷ 100)
 * mode "amount":  hike% = (new − current) ÷ current × 100
 */
export function calculateHike({ current, mode, hikePercent, newSalary }) {
  const revised = mode === "percent" ? current * (1 + hikePercent / 100) : newSalary;
  const increase = revised - current;
  return { revised, increase, hikePercent: (increase / current) * 100 };
}

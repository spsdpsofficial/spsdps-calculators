// SIP maths. Instalments are assumed to be invested at the START of each month (annuity-due).

/** FV = P x [((1 + i)^n - 1) / i] x (1 + i), i = annual rate / 12 / 100, n = months. */
export function sipValueAfter({ monthly, annualRatePercent, months }) {
  const i = annualRatePercent / 1200;
  const invested = monthly * months;
  const futureValue = i === 0 ? invested : monthly * ((Math.expm1(months * Math.log1p(i))) / i) * (1 + i);
  return { invested, futureValue, returns: futureValue - invested };
}

/** Year-end snapshots: [{ year, invested, value }]. */
export function sipYearly({ monthly, annualRatePercent, years }) {
  const rows = [];
  for (let year = 1; year <= years; year += 1) {
    const { invested, futureValue } = sipValueAfter({ monthly, annualRatePercent, months: year * 12 });
    rows.push({ year, invested, value: futureValue });
  }
  return rows;
}

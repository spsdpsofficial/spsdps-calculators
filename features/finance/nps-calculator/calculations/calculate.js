/** Corpus from monthly contributions made at the start of each month and compounded monthly (annuity due). */
export function npsCorpus({ monthlyContribution, annualReturnPercent, years }) {
  const i = annualReturnPercent / 1200;
  const n = years * 12;
  if (i === 0) return monthlyContribution * n;
  return monthlyContribution * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

/**
 * NPS projection. At retirement, at least `annuityPercent` of the corpus must buy an annuity; the rest
 * can be taken as a lump sum. The pension is a simple corpus × annuity rate ÷ 12 estimate.
 */
export function calculateNps({ monthlyContribution, currentAge, retirementAge, annualReturnPercent, annuityPercent, annuityRatePercent }) {
  const years = retirementAge - currentAge;
  const corpus = npsCorpus({ monthlyContribution, annualReturnPercent, years });
  const invested = monthlyContribution * years * 12;
  const annuityCorpus = (corpus * annuityPercent) / 100;
  return {
    years,
    invested,
    corpus,
    returns: corpus - invested,
    annuityCorpus,
    lumpSum: corpus - annuityCorpus,
    monthlyPension: (annuityCorpus * annuityRatePercent) / 1200,
  };
}

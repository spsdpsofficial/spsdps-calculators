/** Four classic ideal-weight formulas. Height is converted to inches over 5 feet (60 in). */
const FORMULAS = {
  Devine: { male: [50, 2.3], female: [45.5, 2.3] },
  Robinson: { male: [52, 1.9], female: [49, 1.7] },
  Miller: { male: [56.2, 1.41], female: [53.1, 1.36] },
  Hamwi: { male: [48, 2.7], female: [45.5, 2.2] },
};

export function idealWeights({ sex, heightCm }) {
  const inchesOver5ft = heightCm / 2.54 - 60;
  return Object.entries(FORMULAS).map(([name, f]) => {
    const [base, perInch] = f[sex];
    return { name, kg: base + perInch * inchesOver5ft };
  });
}

export function calculateIdealWeight({ sex, heightCm }) {
  const formulas = idealWeights({ sex, heightCm });
  const values = formulas.map((f) => f.kg);
  const m = heightCm / 100;
  return {
    formulas,
    average: values.reduce((a, b) => a + b, 0) / values.length,
    bmiRange: { min: 18.5 * m * m, max: 24.9 * m * m },
    shortHeight: heightCm < 152.4,
  };
}

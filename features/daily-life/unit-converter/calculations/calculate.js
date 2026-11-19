/**
 * Unit conversion. Every non-temperature unit stores its size in the category's base unit
 * (metre, kilogram, square metre, litre, metre/second, byte). Constants are exact SI/legal definitions
 * except the tola, which uses the Indian standard of 11.6638038 g.
 */
export const CATEGORIES = {
  length: {
    label: "Length",
    units: {
      mm: ["Millimetre (mm)", 0.001], cm: ["Centimetre (cm)", 0.01], m: ["Metre (m)", 1], km: ["Kilometre (km)", 1000],
      in: ["Inch (in)", 0.0254], ft: ["Foot (ft)", 0.3048], yd: ["Yard (yd)", 0.9144], mi: ["Mile (mi)", 1609.344],
    },
  },
  weight: {
    label: "Weight",
    units: {
      mg: ["Milligram (mg)", 1e-6], g: ["Gram (g)", 0.001], kg: ["Kilogram (kg)", 1], quintal: ["Quintal (100 kg)", 100],
      tonne: ["Tonne (1,000 kg)", 1000], oz: ["Ounce (oz)", 0.028349523125], lb: ["Pound (lb)", 0.45359237], tola: ["Tola", 0.0116638038],
    },
  },
  area: {
    label: "Area",
    units: {
      sqm: ["Square metre (m²)", 1], sqft: ["Square foot (sq ft)", 0.09290304], sqyd: ["Square yard (sq yd)", 0.83612736],
      acre: ["Acre", 4046.8564224], hectare: ["Hectare", 10000], sqkm: ["Square kilometre (km²)", 1e6],
    },
  },
  volume: {
    label: "Volume",
    units: {
      ml: ["Millilitre (ml)", 0.001], l: ["Litre (l)", 1], m3: ["Cubic metre (m³)", 1000],
      usgal: ["US gallon", 3.785411784], impgal: ["Imperial gallon", 4.54609], cup: ["US cup", 0.2365882365],
    },
  },
  speed: {
    label: "Speed",
    units: { ms: ["Metre/second (m/s)", 1], kmh: ["Kilometre/hour (km/h)", 1 / 3.6], mph: ["Mile/hour (mph)", 0.44704], knot: ["Knot", 1852 / 3600] },
  },
  data: {
    label: "Data",
    units: { b: ["Byte (B)", 1], kb: ["Kilobyte (KB, 1,024 B)", 1024], mb: ["Megabyte (MB)", 1024 ** 2], gb: ["Gigabyte (GB)", 1024 ** 3], tb: ["Terabyte (TB)", 1024 ** 4] },
  },
  temperature: {
    label: "Temperature",
    units: { c: ["Celsius (°C)"], f: ["Fahrenheit (°F)"], k: ["Kelvin (K)"] },
  },
};

const toCelsius = { c: (x) => x, f: (x) => ((x - 32) * 5) / 9, k: (x) => x - 273.15 };
const fromCelsius = { c: (x) => x, f: (x) => (x * 9) / 5 + 32, k: (x) => x + 273.15 };

export function unitOptions(category) {
  return Object.entries(CATEGORIES[category].units).map(([value, [label]]) => ({ value, label }));
}

export function convert(category, from, to, value) {
  const cat = CATEGORIES[category];
  if (!cat || !cat.units[from] || !cat.units[to]) return { error: "Choose valid units." };
  if (category === "temperature") {
    const c = toCelsius[from](value);
    if (c < -273.15 - 1e-9) return { error: "Temperature cannot be below absolute zero." };
    return { value: fromCelsius[to](c) };
  }
  return { value: (value * cat.units[from][1]) / cat.units[to][1] };
}

/** Value expressed in every unit of the category. */
export function convertAll(category, from, value) {
  return Object.keys(CATEGORIES[category].units).map((unit) => ({ unit, ...convert(category, from, unit, value) }));
}

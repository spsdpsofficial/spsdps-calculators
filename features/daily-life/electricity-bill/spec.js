import { formatINR } from "@/lib/formatters";
import { calculateElectricityBill } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Electricity bill calculator",
  fields: [
    { id: "units", label: "Units consumed (kWh)", default: 250, min: 0, max: 100000, step: "any" },
    { id: "slab1Units", label: "Slab 1: number of units", default: 100, min: 0, max: 100000 },
    { id: "rate1", label: "Slab 1: rate per unit", default: 3.5, min: 0, max: 100, prefix: "₹", step: "any" },
    { id: "slab2Units", label: "Slab 2: number of units", default: 100, min: 0, max: 100000 },
    { id: "rate2", label: "Slab 2: rate per unit", default: 5, min: 0, max: 100, prefix: "₹", step: "any" },
    { id: "rate3", label: "Slab 3: rate per unit (all remaining units)", default: 7, min: 0, max: 100, prefix: "₹", step: "any" },
    { id: "fixed", label: "Fixed / meter charge", default: 100, min: 0, max: 100000, prefix: "₹" },
    { id: "duty", label: "Electricity duty / tax", default: 5, min: 0, max: 100, suffix: "%", step: "any" },
  ],
  run(v) {
    const r = calculateElectricityBill({
      units: v.units, slab1Units: v.slab1Units, rate1: v.rate1, slab2Units: v.slab2Units, rate2: v.rate2,
      rate3: v.rate3, fixedCharge: v.fixed, dutyPercent: v.duty,
    });
    const money = (x) => formatINR(x, { decimals: 2 });
    return {
      rows: [
        { label: "Estimated bill", value: money(r.total), emphasis: true },
        ...r.slabs.map((s, i) => ({ label: `Slab ${i + 1}: ${s.units} units × ₹${s.rate}`, value: money(s.amount) })),
        { label: "Energy charge", value: money(r.energyCharge) },
        { label: "Fixed charge", value: money(r.fixedCharge) },
        { label: "Duty / tax", value: money(r.duty) },
        { label: "Average cost per unit", value: money(r.averagePerUnit) },
      ],
      notes: ["The default slabs are only an example. Replace them with the tariff on your own bill. Fuel surcharges and arrears are not included."],
    };
  },
};

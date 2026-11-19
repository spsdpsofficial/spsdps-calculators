import { formatINR, formatNumber } from "@/lib/formatters";
import { calculateFuelCost } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Fuel cost calculator",
  fields: [
    { id: "distance", label: "Distance (one way)", default: 450, min: 0, max: 100000, suffix: "km", step: "any" },
    { id: "mileage", label: "Mileage", default: 18, min: 0.1, max: 200, suffix: "km/l", step: "any" },
    { id: "price", label: "Fuel price per litre", default: 100, min: 0, max: 1000, prefix: "₹", step: "any" },
    {
      id: "trip",
      label: "Trip type",
      type: "select",
      default: "one",
      options: [
        { value: "one", label: "One way" },
        { value: "round", label: "Round trip" },
      ],
    },
  ],
  run({ distance, mileage, price, trip }) {
    const r = calculateFuelCost({ distance, mileage, price, roundTrip: trip === "round" });
    return {
      rows: [
        { label: "Total fuel cost", value: formatINR(r.cost, { decimals: 2 }), emphasis: true },
        { label: "Fuel needed", value: `${formatNumber(r.litres)} litres` },
        { label: "Distance covered", value: `${formatNumber(r.totalDistance)} km` },
        { label: "Cost per km", value: formatINR(r.costPerKm, { decimals: 2 }) },
      ],
      notes: ["Real mileage varies with traffic, load, speed and air-conditioner use. Enter the figure you usually get."],
    };
  },
};

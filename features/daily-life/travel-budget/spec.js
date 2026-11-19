import { formatINR } from "@/lib/formatters";
import { calculateTravelBudget } from "./calculations/calculate";

export const spec = {
  ariaLabel: "Travel budget calculator",
  fields: [
    { id: "people", label: "Number of travellers", default: 2, min: 1, max: 100, integer: true },
    { id: "nights", label: "Number of nights", default: 3, min: 1, max: 365, integer: true },
    { id: "transport", label: "Transport per person (round trip)", default: 6000, min: 0, max: 1e7, prefix: "₹" },
    { id: "stay", label: "Stay per room per night", default: 3500, min: 0, max: 1e6, prefix: "₹" },
    { id: "rooms", label: "Number of rooms", default: 1, min: 1, max: 100, integer: true },
    { id: "food", label: "Food per person per day", default: 1200, min: 0, max: 1e5, prefix: "₹" },
    { id: "local", label: "Local travel per day (all travellers)", default: 1500, min: 0, max: 1e6, prefix: "₹" },
    { id: "activities", label: "Activities, tickets and shopping (total)", default: 3000, min: 0, max: 1e8, prefix: "₹" },
    { id: "buffer", label: "Safety buffer", default: 10, min: 0, max: 100, suffix: "%", step: "any" },
  ],
  run(v) {
    const r = calculateTravelBudget({
      people: v.people, nights: v.nights, transportPerPerson: v.transport, stayPerRoomNight: v.stay, rooms: v.rooms,
      foodPerPersonDay: v.food, localPerDay: v.local, activities: v.activities, bufferPercent: v.buffer,
    });
    return {
      rows: [
        { label: "Total trip budget", value: formatINR(r.total), emphasis: true },
        { label: "Per person", value: formatINR(r.perPerson) },
        { label: "Per day", value: formatINR(r.perDay) },
        ...r.lines.map((l) => ({ label: l.label, value: formatINR(l.amount) })),
        { label: "Safety buffer", value: formatINR(r.buffer) },
      ],
      notes: [`Trip length is ${r.days} days (${v.nights} nights + 1).`],
    };
  },
};

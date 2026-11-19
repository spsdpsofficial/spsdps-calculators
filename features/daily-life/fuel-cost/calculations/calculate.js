/** Fuel needed and cost for a trip. `roundTrip` doubles the distance. */
export function calculateFuelCost({ distance, mileage, price, roundTrip = false }) {
  const totalDistance = roundTrip ? distance * 2 : distance;
  const litres = totalDistance / mileage;
  const cost = litres * price;
  return { totalDistance, litres, cost, costPerKm: totalDistance === 0 ? 0 : cost / totalDistance };
}

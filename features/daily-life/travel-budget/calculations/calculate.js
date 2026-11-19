/** Trip budget. Days = nights + 1; food and local travel are charged per person (food) or per day (local). */
export function calculateTravelBudget({ people, nights, transportPerPerson, stayPerRoomNight, rooms, foodPerPersonDay, localPerDay, activities, bufferPercent }) {
  const days = nights + 1;
  const lines = [
    { label: "Transport (to and fro)", amount: transportPerPerson * people },
    { label: "Stay", amount: stayPerRoomNight * rooms * nights },
    { label: "Food", amount: foodPerPersonDay * people * days },
    { label: "Local travel", amount: localPerDay * days },
    { label: "Activities and shopping", amount: activities },
  ];
  const subtotal = lines.reduce((sum, l) => sum + l.amount, 0);
  const buffer = (subtotal * bufferPercent) / 100;
  const total = subtotal + buffer;
  return { days, lines, subtotal, buffer, total, perPerson: total / people, perDay: total / days };
}

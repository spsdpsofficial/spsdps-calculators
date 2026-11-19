/** Overtime pay: hourly rate from the monthly wage, multiplied for overtime hours. */
export function calculateOvertime({ monthlyWage, daysPerMonth, hoursPerDay, overtimeHours, multiplier }) {
  const dailyRate = monthlyWage / daysPerMonth;
  const hourlyRate = dailyRate / hoursPerDay;
  const overtimeRate = hourlyRate * multiplier;
  const overtimePay = overtimeRate * overtimeHours;
  return { dailyRate, hourlyRate, overtimeRate, overtimePay, totalPay: monthlyWage + overtimePay };
}

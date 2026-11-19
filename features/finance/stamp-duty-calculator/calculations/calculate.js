/** Stamp duty and registration are charged as a percentage of the property value; rates vary by state. */
export function calculateStampDuty({ propertyValue, stampDutyPercent, registrationPercent, otherCharges = 0 }) {
  const stampDuty = (propertyValue * stampDutyPercent) / 100;
  const registration = (propertyValue * registrationPercent) / 100;
  const total = stampDuty + registration + otherCharges;
  return { stampDuty, registration, otherCharges, total, totalPercentOfValue: (total / propertyValue) * 100, costWithCharges: propertyValue + total };
}

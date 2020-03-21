export const kmToMeter = (distance) => distance * 1000;
export const meterToKm = (distance) => distance / 1000;
export const format = (dist, units) => `${dist.toFixed(2)} ${units}`;

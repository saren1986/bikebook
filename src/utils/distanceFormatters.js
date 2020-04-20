export const kmToMeter = (distance) => +distance * 1000;
export const meterToKm = (distance) => +distance / 1000;
const meterToMile = (distance) => +distance / 1609.344;
const mileToMeter = (distance) => +distance * 1609.344;

export const distanceLargeToSmall = (distance, units) => {
  if (units === 'km') {
    return kmToMeter(distance);
  }
  if (units === 'mi') {
    return mileToMeter(distance);
  }
  return distance;
};

export const distanceSmallToLarge = (distance, units) => {
  if (units === 'km') {
    return meterToKm(distance);
  }
  if (units === 'mi') {
    return meterToMile(distance);
  }
  return distance;
};

export const formatDistance = (distance, units) => {
  if (units === 'km') {
    return `${meterToKm(distance).toFixed(2)} km`;
  }
  if (units === 'mi') {
    return `${meterToMile(distance).toFixed(2)} mi`;
  }
  return distance;
};

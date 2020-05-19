export const kgToG = (mass) => +mass * 1000;
export const gToKg = (mass) => +mass / 1000;
const lbToOz = (mass) => +mass / 16;
const ozToLb = (mass) => +mass * 16;

const gToLb = (mass) => +mass / 453.59;
const lbToG = (mass) => +mass * 453.59;


export const formatMassDisplay = (mass, units) => {
  if (units === 'kg') {
    return `${gToKg(mass).toFixed(2)} kg`;
  }
  if (units === 'lb') {
    return `${gToLb(mass).toFixed(2)} lb`;
  }
  return mass;
};

export const formatMassSmallToLarge = (mass, units) => {
  if (units === 'kg') {
    return gToKg(mass);
  }
  if (units === 'lb') {
    return gToLb(mass);
  }
  return mass;
};

export const formatMassLargeToSamll = (mass, units) => {
  if (units === 'kg') {
    return kgToG(mass);
  }
  if (units === 'lb') {
    return lbToG(mass);
  }
  return mass;
};

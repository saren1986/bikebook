import { distanceSmallToLarge } from './distanceFormatters';
import { formatMassSmallToLarge } from './massUnitsFormatter';

const prepareFormData = (formData, lengthUnit, massUnit, seed) => {
  let seedKeys = null;
  if (seed) {
    seedKeys = Object.keys(seed);
  }
  return formData.map((input) => {
    let { label } = input;
    if (input.id === 'frameWeight') {
      label += ` ${massUnit}`;
    } else if (input.id === 'distance') {
      label += ` ${lengthUnit}`;
    }
    if (seedKeys) {
      const seedKey = seedKeys.find((key) => key === input.id);
      let def = seed[seedKey];
      if (seedKey === 'distance') {
        def = distanceSmallToLarge(seed[seedKey], lengthUnit).toFixed(2);
      } else if (seedKey === 'frameWeight') {
        def = formatMassSmallToLarge(seed[seedKey], massUnit);
      }

      if (seedKey) {
        return {
          ...input,
          label,
          default: def,
        };
      }
    }
    return {
      ...input,
      label,
    };
  });
};

export default prepareFormData;

import { distanceSmallToLarge } from './distanceFormatters';
import { formatMassSmallToLarge } from './massUnitsFormatter';

export const prepareFormData = (formData, lengthUnit, massUnit, seed, editForm) => {
  let seedKeys = null;
  if (seed) {
    seedKeys = Object.keys(seed);
  }
  let formattedData = formData;
  if (editForm) {
    formattedData = formattedData.filter((input) => input.edit.editable && input.edit.visible);
  }
  formattedData = formattedData.map((input) => {
    let { label } = input;
    if (input.id === 'weight') {
      label += ` ${massUnit}`;
    } else if (input.id === 'distance') {
      label += ` ${lengthUnit}`;
    }
    if (seedKeys) {
      const seedKey = seedKeys.find((key) => key === input.id);
      let def = seed[seedKey];
      if (seedKey === 'distance') {
        def = distanceSmallToLarge(seed[seedKey], lengthUnit).toFixed(2);
      } else if (seedKey === 'weight' && seed[seedKey]) {
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
  return formattedData;
};

export const formSelectSeeder = (formData, seeder = {}) => {
  const seedKeys = Object.keys(seeder);
  const inputs = formData;
  seedKeys.forEach((seedKey) => {
    const inputsIndex = inputs.findIndex((input) => input.id === seedKey);
    if (inputsIndex !== -1) {
      const subKeys = Object.keys(seeder[seedKey]);
      subKeys.forEach((subKey) => {
        inputs[inputsIndex][subKey] = seeder[seedKey][subKey];
      });
    }
  });
  return inputs;
};

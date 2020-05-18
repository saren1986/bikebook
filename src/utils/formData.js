const prepareFormData = (formData, lengthUnit, massUnit, seed) => ({
  ...formData,
  inputs: formData.inputs
    .map((input) => {
      let { label } = input;
      if (input.id === 'frameWeight') {
        label += ` ${massUnit}`;
      } else if (input.id === 'distance') {
        label += ` ${lengthUnit}`;
      }
      return {
        ...input,
        label,
      };
    }),
});

export default prepareFormData;

import * as yup from 'yup';

const createYup = (obj, config) => {
  const schema = obj;
  const { id } = config;
  const validationType = config.validation.type;
  const validations = config.validation.rules;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach((validation) => {
    const { key, params } = validation;
    if (!validator[key]) {
      return;
    }
    validator = validator[key](...params);
  });
  schema[id] = validator;
  return schema;
};

export default createYup;

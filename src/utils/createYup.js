import * as yup from 'yup';

const createYup = (obj, config, editMode = false) => {
  const schema = obj;
  const { id } = config;
  const validationType = config.validation.type;
  const validations = config.validation.rules;
  if (!yup[validationType] || (editMode && (!config.edit.visible || !config.edit.editable))) {
    return schema;
  }
  let validator = yup[validationType]();
  const valRules = validations.map((rule) => {
    if (typeof rule.params[0] === 'function') {
      return {
        ...rule,
        params: [
          rule.params[0](),
          ...rule.params.slice(0, 1),
        ],
      };
    }
    return rule;
  });
  valRules.forEach((rule) => {
    const { key, params } = rule;
    if (!validator[key]) {
      return;
    }
    validator = validator[key](...params);
  });
  schema[id] = validator;
  return schema;
};

export default createYup;

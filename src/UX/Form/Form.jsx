/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import { MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as Styled from '../../styled/styled';
import createYup from '../../utils/createYup';


const Form = ({
  inputs, header, buttonName, onSubmitHandler, editMode
}) => {
  const initialValues = {};
  const yupSchema = inputs.reduce(createYup, {});
  const validateSchema = Yup.object().shape(yupSchema);
  for (const f of inputs) {
    initialValues[f.id] = f.default;
  }
  return (
    <>
      <Styled.Header>{header}</Styled.Header>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onSubmitHandler(values)}
        validationSchema={validateSchema}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (

            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                {inputs.map((input) => {
                  const { type } = input;
                  let select = false;
                  let selectList = null;
                  if (type === 'select') {
                    select = true;
                    selectList = input.selectOption.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ));
                  }
                  return (
                    <Grid
                      key={input.id}
                      item
                      {...input.uiStyle.width}
                    >
                      <Styled.Input
                        id={input.id}
                        name={input.id}
                        label={input.label}
                        value={values[input.id]}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        type={input.type}
                        error={errors[input.id] && touched[input.id]}
                        helperText={touched[input.id] ? errors[input.id] : ''}
                        {...input.uiStyle.inputDesign}
                        select={select}
                        disabled={editMode && !input.edit}
                      >
                        {selectList}
                      </Styled.Input>
                    </Grid>
                  );
                })}
                <Grid item xs={12}>
                  <Styled.BtnWrapper>
                    <Styled.Btn
                      variant="outlined"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {buttonName}
                    </Styled.Btn>
                  </Styled.BtnWrapper>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </>
  );
};
Form.defaultProps = {
  editMode: false,
};
Form.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  editMode: PropTypes.bool,
  buttonName: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  onSubmitHandler: PropTypes.func.isRequired,
};
export default Form;

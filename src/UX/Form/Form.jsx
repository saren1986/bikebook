/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-restricted-syntax */
import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Grid from '@material-ui/core/Grid';
import { MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import createYup from '../../utils/createYup';
import { Header, BtnWrapper, Btn } from '../../styled/styled';
import Input from './Input/Input';

const useStyles = makeStyles((theme) => ({
  formGroup: {
    height: '100%',
  },
}));

const Form = ({
  inputs, header, buttonName, onSubmitHandler, editMode,
}) => {

  const classes = useStyles();
  const initialValues = {};
  let validateSchema = null;

  const yupSchema = inputs.reduce((obj, config) => createYup(obj, config, editMode), {});
  validateSchema = Yup.object().shape(yupSchema);
  for (const f of inputs) {
    initialValues[f.id] = f.default;
  }
  return (
    <>
      {header ? (<Header>{header}</Header>) : null}
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => onSubmitHandler(values)}
          validationSchema={validateSchema}
          enableReinitialize
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
              setFieldValue,
            } = props;
            // console.log('formik render values', values);
            // console.log('formik render inputs', initialValues);
            const renderedInputs = inputs.map((input) => {
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
              let field = null;
              let off = false;
              if (input.controlledBy) {
                off = values[input.controlledBy.checkboxId];
                if (input.controlledBy.default === 'disabled') {
                  off = !off;
                }
              }
              if (editMode && !input.edit.visible) {
                return null;
              }

              if (input.type === 'date') {
                const minDate = input.validation.rules.find((date) => date.key === 'min').params;
                const maxDate = input.validation.rules.find((date) => date.key === 'max').params;
                const { disableFuture, disablePast } = input.validation;
                field = (
                  <KeyboardDatePicker
                    autoOk
                    inputVariant="outlined"
                    disableFuture={disableFuture}
                    disablePast={disablePast}
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label={input.label}
                    value={values[input.id]}
                    onChange={(value) => setFieldValue(input.id, value)}
                    minDate={minDate[0]}
                    maxDateMessage={maxDate[1]}
                    minDateMessage={minDate[1]}
                    error={!!errors[input.id] && !!touched[input.id]}
                    invalidLabel={touched[input.id] ? errors[input.id] : ''}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    style={{ width: '100%' }}
                    disabled={(editMode && !input.edit.editable) || off}
                  />
                );
              } else if (input.type === 'checkbox') {
                if (editMode && !input.edit.editable) {
                  field = null;
                } else {
                  field = (
                    <FormGroup
                      row
                      classes={{
                        root: classes.formGroup,
                      }}
                    >
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={values[input.id]}
                            onChange={handleChange}
                            name={input.id}
                            color="primary"
                          />
                    )}
                        label={input.label}
                        labelPlacement="start"
                        {...input.uiStyle.inputDesign}
                      />
                    </FormGroup>
                  );
                }
              } else if (type === 'autocomplete') {
                field = (
                  <Autocomplete
                    id={input.id}
                    options={input.selectOption}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => {
                      if (value) {
                        setFieldValue(input.id, value.id);
                      } else {
                        setFieldValue(input.id, '');
                      }
                    }}
                    value={
                      input.selectOption
                        .find((option) => option.id === values[input.id]) || null
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={input.label}
                        error={errors[input.id] && touched[input.id]}
                        helperText={touched[input.id] ? errors[input.id] : ''}
                        {...input.uiStyle.inputDesign}
                        disabled={(editMode && !input.edit.editable) || off}
                      />
                    )}
                  />
                );
              } else {
                field = (
                  <Input
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
                    disabled={(editMode && !input.edit.editable) || off}
                  >
                    {selectList}
                  </Input>
                );
              }
              return (
                <Grid
                  key={input.id}
                  item
                  {...input.uiStyle.width}
                >
                  {field}
                </Grid>
              );
            });
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  {renderedInputs}
                  <Grid item xs={12}>
                    <BtnWrapper>
                      <Btn
                        variant="outlined"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {buttonName}
                      </Btn>
                    </BtnWrapper>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </MuiPickersUtilsProvider>
    </>
  );
};
Form.defaultProps = {
  editMode: false,
  header: null,
};
Form.propTypes = {
  inputs: PropTypes.arrayOf(PropTypes.object).isRequired,
  editMode: PropTypes.bool,
  buttonName: PropTypes.string.isRequired,
  header: PropTypes.string,
  onSubmitHandler: PropTypes.func.isRequired,
};
export default Form;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import { addAlert } from '../../../../../store/actions/index';
import Form from '../../../../../UX/Form/Form';
import { distanceLargeToSmall } from '../../../../../utils/distanceFormatters';
import { prepareFormData } from '../../../../../utils/formData';
import {
  Header,
} from '../../../../../styled/styled';

const useStyles = makeStyles((theme) => ({
  radioSection: {
    marginBottom: 30,
  },
  label: {
    marginRight: 10,
    '&:not(:last-child)::after': {
      marginLeft: 10,
      content: '"|"',
    },
  },
  componentInfo: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 15,
  },
}));
const AlertForm = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [alertType, setAlertType] = useState('distance');
  const distanceAlertForm = useSelector((state) => state.forms.distanceAlert);
  const dateAlertForm = useSelector((state) => state.forms.dateAlert);
  const { lengthUnit, massUnit } = useSelector((state) => state.options.units);
  const { component } = history.location;
  const handleChange = (event) => {
    setAlertType(event.target.value);
  };
  const onSubmitHandler = (values) => {
    let distance = null;
    let repeatDistance = null;
    if (alertType === 'distance') {
      distance = distanceLargeToSmall(values.distance, lengthUnit);
      repeatDistance = distanceLargeToSmall(values.repeatDistance, lengthUnit);
    }
    dispatch(addAlert({
      type: alertType,
      componentId: component.id,
      componentDistance: component.distance,
      ...values,
      distance,
      repeatDistance,
    }));
    history.push({
      pathname: '/bike/components/detail',
      state: {
        id: component.id,
      },
    });
  };

  const headerLabel = 'Add new alert';
  const buttonLabel = 'Add';

  let alertInputs = null;
  if (alertType === 'date') {
    alertInputs = prepareFormData(dateAlertForm, lengthUnit, massUnit);
  } else {
    alertInputs = prepareFormData(distanceAlertForm, lengthUnit, massUnit);
  }

  return (
    component ? (
      <>
        <Header>{headerLabel}</Header>
        <div className={classes.componentInfo}>
          {component.bike ? (<span className={classes.label}>{component.bike}</span>) : null}
          {component.type ? (<strong className={classes.label}>{component.type}</strong>) : null}
          {component.brand ? (<span className={classes.label}>{component.brand}</span>) : null}
        </div>
        <div className={classes.radioSection}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Alert type</FormLabel>
            <RadioGroup row aria-label="position" name="position" value={alertType} onChange={handleChange}>
              <FormControlLabel
                value="distance"
                control={<Radio color="primary" />}
                label="Distance"
                labelPlacement="end"
              />
              <FormControlLabel
                value="date"
                control={<Radio color="primary" />}
                label="Date"
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <Form
          inputs={alertInputs}
          buttonName={buttonLabel}
          onSubmitHandler={onSubmitHandler}
        />
      </>
    ) : <Redirect to="/bike/components" />

  );
};

AlertForm.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(AlertForm);

/* eslint-disable react/prop-types */
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addBike, setActiveBike } from '../../../store/actions/index';
import { distanceLargeToSmall } from '../../../utils/distanceFormatters';
import prepareFormData from '../../../utils/formData';
import Form from '../../../UX/Form/Form';


const AddBike = ({ history }) => {
  const dispatch = useDispatch();
  const { lengthUnit, massUnit } = useSelector((state) => state.user.units);
  const formData = useSelector((state) => state.forms.addBike);
  console.log('formData', formData);

  const onSubmitHandler = (values) => {
    dispatch(
      addBike(
        {
          id: '12bb', // TODO id
          ...values,
          distance: distanceLargeToSmall(values.distance, lengthUnit),
        },
      ),
    );
    dispatch(setActiveBike(values.id));
    history.push('/bike');
    // TODO ustawianie aktywnego bike'a po zwrotce z serwera
  };
  return (
    <Form
      formData={prepareFormData(formData, lengthUnit, massUnit)}
      onSubmitHandler={onSubmitHandler}
    />
  );
};

AddBike.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(AddBike);

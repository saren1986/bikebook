/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { addBike, setActiveBike, editBike } from '../../../store/actions/index';
import { distanceLargeToSmall } from '../../../utils/distanceFormatters';
import { formatMassLargeToSmall } from '../../../utils/massUnitsFormatter';
import { prepareFormData } from '../../../utils/formData';
import Form from '../../../UX/Form/Form';
import Spinner from '../../../UX/Spinner/Spinner';

const BikeForm = ({ history, edit }) => {
  const dispatch = useDispatch();
  const { lengthUnit, massUnit } = useSelector((state) => state.user.units);
  const formData = useSelector((state) => state.forms.addBike);
  const [formattedData, setFormattedData] = useState(null);
  useEffect(() => {
    if (edit && history.location.bike) {
      const { bike } = history.location;
      setFormattedData(prepareFormData(formData, lengthUnit, massUnit, bike));
    } else {
      setFormattedData(prepareFormData(formData, lengthUnit, massUnit));
    }
  }, []);

  const onSubmitHandler = (values) => {
    if (!edit) {
      dispatch(
        addBike(
          {
            id: '12bb', // TODO id
            ...values,
            distance: distanceLargeToSmall(values.distance, lengthUnit),
            weight: formatMassLargeToSmall(values.weight, massUnit),
          },
        ),
      );
      dispatch(setActiveBike(values.id));
      history.push('/bike');
    } else if (history.location.bike) {
      const bikeId = history.location.bike.id;
      dispatch(
        editBike(
          {
            id: bikeId,
            ...values,
            distance: distanceLargeToSmall(values.distance, lengthUnit),
            weight: formatMassLargeToSmall(values.weight, massUnit),
          },
        ),
      );
      dispatch(setActiveBike(bikeId));
      history.push('/bike');
    }

    // TODO ustawianie aktywnego bike'a po zwrotce z serwera
  };

  const headerLabel = edit ? 'Edit bike' : 'Add new bike';
  const buttonLabel = edit ? 'Edit' : 'Add';

  const formToRender = formattedData
    ? (
      <Form
        inputs={formattedData}
        header={headerLabel}
        buttonName={buttonLabel}
        onSubmitHandler={onSubmitHandler}
        editMode={edit}
      />
    ) : <Spinner />;
  const redirect = (edit && typeof history.location.bike === 'undefined') ? <Redirect to="/bike-list" /> : null;
  return (
    <>
      {redirect}
      {formToRender}
    </>
  );
};
BikeForm.defaultProps = {
  edit: false,
};
BikeForm.propTypes = {
  history: PropTypes.object.isRequired,
  edit: PropTypes.bool,
};

export default withRouter(BikeForm);

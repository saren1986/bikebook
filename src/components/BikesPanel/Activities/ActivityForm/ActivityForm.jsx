import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { addActivity, updateActivity } from '../../../../store/actions/index';
import { prepareFormData, formSelectSeeder } from '../../../../utils/formData';
import { distanceLargeToSmall } from '../../../../utils/distanceFormatters';
import { secondsToTime } from '../../../../utils/timeFormatters';
import Form from '../../../../UX/Form/Form';

const ComponentForm = ({ history, edit }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.forms.activity);
  const bikes = useSelector((state) => state.bikes);
  const components = useSelector((state) => state.components);
  const { lengthUnit } = useSelector((state) => state.user.units);
  const { activity } = history.location;

  const onSubmitHandler = (values) => {
    const bikeComponents = components
      .filter((comp) => comp.bikeId === values.bikeId && !comp.retired
      && new Date(comp.startDate).getTime() < values.startDate)
      .map((comp) => comp.id);
    const newDistance = distanceLargeToSmall(values.distance, lengthUnit);
    if (!edit) {
      dispatch(addActivity(
        {
          ...values,
          distance: newDistance,
          id: 'a123456',
        },
        bikeComponents,
      ));
      history.push({
        pathname: '/activities',
      });
    } else {
      const distanceDiffrence = newDistance - activity.distance;
      dispatch(updateActivity(
        {
          ...values,
          distance: newDistance,
          id: activity.id,
        },
        activity.bikeId,
        bikeComponents,
        distanceDiffrence,
      ));
      history.push({
        pathname: '/activities',
      });
    }
  };

  const headerLabel = edit ? 'Edit activity' : 'Add new activity';
  const buttonLabel = edit ? 'Edit' : 'Add';
  const seeder = (edit && typeof activity !== 'undefined') ? {
    ...activity,
    movingTime: secondsToTime(activity.movingTime),
    startDate: new Date(activity.startDate),
  } : {};
  const bikeId = (typeof activity !== 'undefined') ? activity.bikeId : '';

  const formattedData = formSelectSeeder(prepareFormData(formData, lengthUnit, null, seeder),
    {
      bikeId: {
        selectOption: bikes
          .filter((bike) => !bike.strava)
          .map((bike) => ({
            id: bike.id,
            label: bike.name,
          })),
        default: bikeId,
      },
    });
  const redirect = (edit && typeof activity === 'undefined') ? <Redirect to="/activities" /> : null;
  return (
    <>
      {redirect}
      <Form
        inputs={formattedData}
        header={headerLabel}
        buttonName={buttonLabel}
        onSubmitHandler={onSubmitHandler}
        editMode={edit}
      />
    </>
  );
};

ComponentForm.defaultProps = {
  edit: false,
};

ComponentForm.propTypes = {
  history: PropTypes.object.isRequired,
  edit: PropTypes.bool,
};

export default withRouter(ComponentForm);

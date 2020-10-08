import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { addComponent, setActiveBike, editComponent } from '../../../../store/actions/index';
import { prepareFormData, formSelectSeeder } from '../../../../utils/formData';
import { distanceLargeToSmall } from '../../../../utils/distanceFormatters';
import { formatMassLargeToSmall } from '../../../../utils/massUnitsFormatter';
import Form from '../../../../UX/Form/Form';

const ComponentForm = ({ history, edit }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.forms.components);
  const bikes = useSelector((state) => state.bikes);
  const activities = useSelector((state) => state.activities);
  const { lengthUnit, massUnit } = useSelector((state) => state.options.units);
  const { bikeId, component } = history.location;

  const onSubmitHandler = (values) => {
    const formattedWeight = values.weight ? formatMassLargeToSmall(values.weight, massUnit) : '';

    if (!edit) {
      const selectedBike = bikes.find((bike) => bike.id === values.bikeId);
      const bikeActivities = activities.filter((activity) => activity.bikeId === values.bikeId);
      let formattedDistance = 0;
      let date = values.startDate.toJSON();
      if (values.fromBegining) {
        formattedDistance = selectedBike.distance
        + distanceLargeToSmall(values.distance, lengthUnit);
        if (bikeActivities.length) {
          bikeActivities.sort((a, b) => new Date(a.startDate) > new Date(b.startDate));
          date = bikeActivities[0].startDate;
        }
      } else {
        const compDistance = bikeActivities
          .filter((activity) => new Date(activity.startDate).getTime() < values.startDate.getTime())
          .reduce((sum, activity) => sum + activity.distance, 0);
        formattedDistance = distanceLargeToSmall(values.distance, lengthUnit) + compDistance;
      }
      dispatch(addComponent({
        component: {
          bikeId: values.bikeId,
          type: values.type,
          brand: values.brand,
          model: values.model,
          weight: formattedWeight,
          startDate: date,
          distance: formattedDistance,
          description: values.description,
        },
      }));
      dispatch(setActiveBike(values.bikeId));
      history.push({
        pathname: '/bike/components',
      });
    } else if (typeof component !== 'undefined') {
      dispatch(editComponent({
        component: {
          id: component.id,
          ...values,
          weight: formattedWeight,
        },
      }));
      dispatch(setActiveBike(values.bikeId));
      history.push({
        pathname: '/bike/components',
        // pathname: '/bike/components/detail',
        // state: {
        //   id: component.id,
        // },
      });
    }
  };

  const headerLabel = edit ? 'Edit component' : 'Add new component';
  const buttonLabel = edit ? 'Edit' : 'Add';
  const seeder = (edit && typeof component !== 'undefined') ? { ...component, startDate: new Date(component.startDate) } : {};

  const formattedData = formSelectSeeder(
    prepareFormData(formData, lengthUnit, massUnit, seeder, edit),
    {
      bikeId: {
        selectOption: bikes.map((bike) => ({
          id: bike.id,
          label: bike.name,
        })),
        default: bikeId || '',
      },
    },
  );
  const redirect = (edit && typeof component === 'undefined') ? <Redirect to="/bike-list" /> : null;
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

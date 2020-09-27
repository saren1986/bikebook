import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { addComponent, setActiveBike, editComponent } from '../../../../store/actions/index';
import { prepareFormData, formSelectSeeder } from '../../../../utils/formData';
import Form from '../../../../UX/Form/Form';

const ComponentForm = ({ history, edit }) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.forms.components);
  const bikes = useSelector((state) => state.bikes.list);
  const activities = useSelector((state) => state.activities);
  const { lengthUnit, massUnit } = useSelector((state) => state.user.units);
  const { bikeId, component } = history.location;

  const onSubmitHandler = (values) => {
    if (!edit) {
      dispatch(addComponent({
        id: 'c123',
        ...values, // TODO id
      },
      bikes.find((bike) => bike.id === values.bikeId), lengthUnit, massUnit, activities));
      dispatch(setActiveBike(values.bikeId));
      history.push({
        pathname: '/bike/components/detail',
        state: {
          id: 'c123',
        },
      });
    } else if (typeof component !== 'undefined') {
      dispatch(editComponent(component.id, values, massUnit));
      dispatch(setActiveBike(values.bikeId));
      history.push({
        pathname: '/bike/components/detail',
        state: {
          id: component.id,
        },
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

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  withRouter, Link,
} from 'react-router-dom';
import Form from '../../../UX/Form/Form';
import {
  register,
} from '../../../store/actions/index';
import StyledAuthForm from '../StyledAuthForm/StyledAuthForm';
import InfoBelowForm from '../InfoBelowForm/InfoBelowForm';

const Register = ({ history }) => {
  const formData = useSelector((state) => state.forms.register);

  const dispatch = useDispatch();
  const onSubmitHandler = (values, actions) => {
    const { setSubmitting } = actions;
    dispatch(register({
      userDetails: values,
      onSuccess: () => {
        setSubmitting(false);
        history.push({
          pathname: '/auth/confirm-code',
        });
      },
      onFailure: () => {
        setSubmitting(false);
      },
    }));
  };
  return (
    <>
      <StyledAuthForm>
        <Form
          inputs={formData}
          header="Sing up"
          buttonName="Submit"
          onSubmitHandler={onSubmitHandler}
          editMode={false}
        />

      </StyledAuthForm>
      <InfoBelowForm>
        <span>{'Already have an account? '}</span>
        <Link to="/auth">Sign in.</Link>
      </InfoBelowForm>
    </>
  );
};

export default withRouter(Register);

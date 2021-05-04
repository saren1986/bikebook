import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Form from '../../../UX/Form/Form';
import StyledAuthForm from '../StyledAuthForm/StyledAuthForm';
import {
  signIn,
} from '../../../store/actions/index';
import InfoBelowForm from '../InfoBelowForm/InfoBelowForm';

const SignIn = ({ history }) => {
  const formData = useSelector((state) => state.forms.login);

  const dispatch = useDispatch();
  const onSubmitHandler = (values, actions) => {

    const { setSubmitting } = actions;
    dispatch(signIn({
      userDetails: values,
      onSuccess: () => {
        setSubmitting(false);
        history.push({
          pathname: '/',
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
          header="Sing in"
          buttonName="Submit"
          onSubmitHandler={onSubmitHandler}
          editMode={false}
        />
      </StyledAuthForm>
      <InfoBelowForm>
        <span>{'Do you haven\'t account yet? '}</span>
        <Link to="/auth/register">Register.</Link>
      </InfoBelowForm>
    </>
  );
};

export default withRouter(SignIn);

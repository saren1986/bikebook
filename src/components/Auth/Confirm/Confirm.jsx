import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Form from '../../../UX/Form/Form';
import StyledAuthForm from '../StyledAuthForm/StyledAuthForm';
import {
  confirmRegister, resendConfirmationCode,
} from '../../../store/actions/index';
import InfoBelowForm from '../InfoBelowForm/InfoBelowForm';

const Confirm = ({ history }) => {
  const formData = useSelector((state) => state.forms.confirm);

  const dispatch = useDispatch();
  const onSubmitHandler = (values, actions) => {
    const { setSubmitting } = actions;
    dispatch(confirmRegister({
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
  const onClickHandler = () => {
    dispatch(resendConfirmationCode('name')); // TODO: get name and pass to the fn
  };
  return (
    <>
      <StyledAuthForm>
        <Form
          inputs={formData}
          header="Confirm"
          buttonName="Submit"
          onSubmitHandler={onSubmitHandler}
          editMode={false}
        />
      </StyledAuthForm>
      <InfoBelowForm>
        <span>Have you not received a code?</span>
        <Button color="primary" onClick={onClickHandler}>Resend the code</Button>
      </InfoBelowForm>
    </>
  );
};

export default withRouter(Confirm);

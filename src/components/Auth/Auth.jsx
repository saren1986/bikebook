import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../UX/Form/Form';
import Spinner from '../../UX/Spinner/Spinner';
import {
  signIn, register, confirmRegister, resendConfirmationCode,
} from '../../store/actions/index';

const Auth = () => {
  const formData = useSelector((state) => state.forms);
  const authError = useSelector((state) => state.auth.error);
  const authInfo = useSelector((state) => state.auth.info);
  const username = useSelector((state) => state.auth.username);

  const dispatch = useDispatch();
  const onSubmitHandler = (type, values, actions) => {
    const { setSubmitting } = actions;
    if (type === 'signin') {
      dispatch(signIn(values, () => setSubmitting(false)));
    } else if (type === 'register') {
      dispatch(register(values, () => {
        setSubmitting(false);
      }));
    } else if (type === 'confirm') {
      dispatch(confirmRegister(values, () => {
        setSubmitting(false);
      }));
    }
  };
  const resendCodeHandler = () => {
    const user = username || '';
    if (user) {
      dispatch(resendConfirmationCode(user, () => {}));
    }
  };
  // TODO: BELOW IS ONLY FOR TEST, BUILD CLIENT AUTH PAGES
  return (
    <>
      <div className="signin-form">
        <Form
          inputs={formData.login}
          header="Sing in"
          buttonName="Submit"
          onSubmitHandler={(values, actions) => onSubmitHandler('signin', values, actions)}
          editMode={false}
        />
      </div>
      <div className="signup-form">
        <Form
          inputs={formData.register}
          header="Sing up"
          buttonName="Submit"
          onSubmitHandler={(values, actions) => onSubmitHandler('register', values, actions)}
          editMode={false}
        />
      </div>
      <div className="register-confirm">
        <Form
          inputs={formData.confirm}
          header="Veryfication"
          buttonName="Submit"
          onSubmitHandler={(values, actions) => onSubmitHandler('confirm', values, actions)}
          editMode={false}
        />
      </div>
      <div className="resendCode">
        <button type="button" onClick={resendCodeHandler}>Resend code</button>
      </div>
      <div className="info">
        <span className="error">{authError}</span>
        <span className="info">{authInfo}</span>
      </div>
    </>
  );
};

export default Auth;

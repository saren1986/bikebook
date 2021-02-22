import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../../UX/Form/Form';
import Spinner from '../../UX/Spinner/Spinner';
import { signIn } from '../../store/actions/index';

const Auth = () => {
  const formData = useSelector((state) => state.forms.login);
  const authError = useSelector((state) => state.auth.error);

  const dispatch = useDispatch();
  const onSubmitHandler = (values, actions) => {
    const { setSubmitting } = actions;
    dispatch(signIn(values, () => setSubmitting(false)));
  };
  return (
    <div>
      <Form
        inputs={formData}
        header="Sing in"
        buttonName="sing in"
        onSubmitHandler={onSubmitHandler}
        editMode={false}
      />
      <div className="error">
        {authError}
      </div>
    </div>
  );
};

export default Auth;

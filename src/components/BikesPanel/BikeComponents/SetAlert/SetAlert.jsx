import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import * as Styled from '../../../../styled/styled';

const SetAlert = ({ setAlert, active }) => {
  const [inputValue, setInputValue] = useState('');
  const distanceChangeHandler = (e) => {
    setInputValue(e.target.value);
  };
  const clickHandler = () => {
    setAlert(inputValue);
  };
  const toRender = !active ? (
    <>
      <Styled.Input
        id="distanceAlert"
        label="Distance in KM"
        margin="normal"
        variant="outlined"
        value={inputValue}
        type="number"
        onChange={distanceChangeHandler}
        required
      />
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={clickHandler}
      >
        Add
      </Button>
    </>
  ) : (
    <h1>Active</h1>
  );

  return (
    <Styled.SmallForm>
      <Styled.Header>Set alert</Styled.Header>
      {toRender}
    </Styled.SmallForm>
  );
};

SetAlert.propTypes = {
  setAlert: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
};

export default SetAlert;

import React, { useState } from 'react';
import { Button, MenuItem } from '@material-ui/core';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { SmallForm, Header } from '../../../../styled/styled';
import { setActiveBike, switchToBike } from '../../../../store/actions/index';
import Input from '../../../../UX/Form/Input/Input';

const SwitchToBike = ({ compId, bikeId, clb }) => {
  const [selectValue, setSelectValue] = useState('');
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setSelectValue(e.target.value);
  };
  const clickHandler = () => {
    dispatch(switchToBike({
      componentId: compId,
      bikeId: selectValue,
    }));
    dispatch(setActiveBike(selectValue));
    setSelectValue('');
    clb();
  };
  const bikes = useSelector((state) => state.bikes);

  return (
    <SmallForm>
      <Header>Switch component to bike</Header>
      <Input
        id="distanceAlert"
        label="Select bike"
        select
        margin="normal"
        variant="outlined"
        value={selectValue}
        onChange={onChangeHandler}
        required
      >
        {bikes.filter((bike) => bike.id !== bikeId && !bike.retired).map((bike) => (
          <MenuItem key={bike.id} value={bike.id}>
            {bike.name}
          </MenuItem>
        ))}
      </Input>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AutorenewIcon />}
        onClick={clickHandler}
      >
        Switch
      </Button>
    </SmallForm>
  );
};
SwitchToBike.propTypes = {
  compId: PropTypes.string.isRequired,
  bikeId: PropTypes.string.isRequired,
  clb: PropTypes.func.isRequired,
};

export default SwitchToBike;

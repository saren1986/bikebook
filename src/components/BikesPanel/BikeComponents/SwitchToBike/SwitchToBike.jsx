import React, { useState } from 'react';
import { Button, MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { switchToBike } from '../../../../store/actions/bikeComponents';
import * as Styled from '../../../../styled/styled';
import { setActiveBike } from '../../../../store/actions';

const SwitchToBike = ({ compId, bikeId, clb }) => {
  const [selectValue, setSelectValue] = useState('');
  const dispatch = useDispatch();
  const onChangeHandler = (e) => {
    setSelectValue(e.target.value);
  };
  const clickHandler = () => {
    dispatch(switchToBike(compId, selectValue));
    dispatch(setActiveBike(selectValue));
    setSelectValue('');
    clb();
  };
  const bikes = useSelector((state) => state.bikes.list);

  return (
    <Styled.SmallForm>
      <Styled.Header>Switch component to bike</Styled.Header>
      <Styled.Input
        id="distanceAlert"
        label="Select bike"
        select
        margin="normal"
        variant="outlined"
        value={selectValue}
        onChange={onChangeHandler}
        required
      >
        {bikes.filter((bike) => bike.id !== bikeId).map((bike) => (
          <MenuItem key={bike.id} value={bike.id}>
            {bike.name}
          </MenuItem>
        ))}
      </Styled.Input>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={clickHandler}
      >
        Add
      </Button>
    </Styled.SmallForm>
  );
};
SwitchToBike.propTypes = {
  compId: PropTypes.string.isRequired,
  bikeId: PropTypes.string.isRequired,
  clb: PropTypes.func.isRequired,
};

export default SwitchToBike;

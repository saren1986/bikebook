import React, { useState } from 'react';
import { MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addBike, setActiveBike } from '../../../store/actions/index';
import * as Styled from '../../../styled/styled';
import { distanceLargeToSmall } from '../../../utils/distanceFormatters';


const AddBike = ({ bikeTypes, history }) => {
  const dispatch = useDispatch();
  const { lengthUnit, massUnit } = useSelector((state) => state.user.units);

  const [newBikeValues, setNewBikeValues] = useState({
    type: '',
    name: '',
    brand: '',
    model: '',
    distance: '',
    description: '',
    frameWeight: '',
  });

  const handleBikeFormChange = (name) => (event) => {
    setNewBikeValues({ ...newBikeValues, [name]: event.target.value });
  };

  const addNewBikeHandler = () => {
    dispatch(
      addBike(
        {
          ...newBikeValues,
          distance: distanceLargeToSmall(newBikeValues.distance, lengthUnit),
        },
      ),
    );
    dispatch(setActiveBike(newBikeValues.id));
    history.push('/bike');
    // TODO ustawianie aktywnego bike'a po zwrotce z serwera
  };

  return (
    <>
      <Styled.Header>Add new bike</Styled.Header>
      <form noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Styled.Input
              id="bike-name"
              label="Bike name"
              value={newBikeValues.name}
              onChange={handleBikeFormChange('name')}
              margin="normal"
              variant="outlined"
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Styled.Input
              id="bike-type"
              select
              label="Bike type"
              value={newBikeValues.type}
              onChange={handleBikeFormChange('type')}
              margin="normal"
              variant="outlined"
            >
              {bikeTypes.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.label.eng}
                </MenuItem>
              ))}
            </Styled.Input>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Styled.Input
              id="brand-name"
              label="Brand name"
              value={newBikeValues.brand}
              onChange={handleBikeFormChange('brand')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Styled.Input
              id="model"
              label="Brand name"
              value={newBikeValues.model}
              onChange={handleBikeFormChange('model')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Styled.Input
              id="bike-distance"
              label={`Distance / ${lengthUnit}`}
              margin="normal"
              variant="outlined"
              value={newBikeValues.distance}
              type="number"
              onChange={handleBikeFormChange('distance')}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Styled.Input
              id="frame-weight"
              label={`Frame mass / ${massUnit}`}
              margin="normal"
              variant="outlined"
              value={newBikeValues.frameWeight}
              type="number"
              onChange={handleBikeFormChange('frameWeight')}
            />
          </Grid>
          <Grid item xs={12}>
            <Styled.Input
              id="bike-description"
              label="Description"
              onChange={handleBikeFormChange('description')}
              margin="normal"
              variant="outlined"
              helperText="You can add description"
            />
          </Grid>
          <Grid item xs={12}>
            <Styled.BtnWrapper>
              <Styled.Btn
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addNewBikeHandler}
              >
                Add bike
              </Styled.Btn>
            </Styled.BtnWrapper>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

AddBike.propTypes = {
  bikeTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AddBike);

import React, { useState } from 'react';
import { MenuItem } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addBike, setActiveBike } from '../../../store/actions/index';
import * as Styled from '../../../styled/styled';


const AddBike = ({ bikeTypes, history }) => {
  const dispatch = useDispatch();

  const [newBikeValues, setNewBikeValues] = useState({
    id: '25', //TODO nadawanie id dla nowych rowerów
    type: '',
    name: '',
    brand: '',
    distance: '',
    description: '',
  });

  const handleBikeFormChange = (name) => (event) => {
    setNewBikeValues({ ...newBikeValues, [name]: event.target.value });
  };

  const addNewBikeHandler = (data) => {
    dispatch(addBike(data));
    dispatch(setActiveBike(newBikeValues.id));
    history.push('/bike');
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
              id="bike-distance"
              label="Distance"
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
                onClick={() => { addNewBikeHandler(newBikeValues); }}
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

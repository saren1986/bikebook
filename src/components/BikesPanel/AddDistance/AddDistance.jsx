import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import * as Styled from '../../../styled/styled';
import { addDistance } from '../../../store/actions/index';

const AddDistance = ({ history, bikeId }) => {
  const dispatch = useDispatch();
  const [newDistance, setNewDistance] = useState('');

  const handleDistanceFormChange = (event) => {
    setNewDistance(event.target.value);
  };
  const addDistanceHandler = (distance) => {
    dispatch(addDistance(bikeId, distance));
    history.push('/bike');
  };
  return (
    bikeId ? (
      <>
        <Styled.Header>Add distance</Styled.Header>
        <form noValidate autoComplete="off">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Styled.Input
                id="bike-distance"
                label="Distance / KM"
                margin="normal"
                variant="outlined"
                value={newDistance}
                type="number"
                onChange={handleDistanceFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Styled.BtnWrapper>
                <Styled.Btn
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={() => addDistanceHandler(newDistance)}
                >
                  Add distance
                </Styled.Btn>
              </Styled.BtnWrapper>
            </Grid>
          </Grid>
        </form>
      </>
    ) : <Redirect to="/" />
  );
};
AddDistance.propTypes = {
  history: PropTypes.object.isRequired,
  bikeId: PropTypes.string.isRequired,
};


export default withRouter(AddDistance);

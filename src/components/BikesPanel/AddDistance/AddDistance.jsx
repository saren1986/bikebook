import React from 'react';
import { TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import classes from '../../Modal/Form.module.css';


const AddDistance = ({ addDistance }) => {
  const [newDistance, setNewDistance] = React.useState('');

  const handleDistanceFormChange = (event) => {
    setNewDistance(event.target.value);
  };


  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            id="bike-distance"
            label="Distance / KM"
            className={classes.input}
            margin="normal"
            variant="outlined"
            value={newDistance}
            type="number"
            onChange={handleDistanceFormChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={() => addDistance(newDistance)}
            >
              Add distance
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddDistance;

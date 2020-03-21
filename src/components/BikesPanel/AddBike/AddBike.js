import React from 'react'
import { MenuItem, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';
import classes from './AddBike.module.css';

const AddBike = ( { addBike, bikeTypes } ) => {

  const [newBikeValues, setNewBikeValues] = React.useState({
    id: '25',
    type: 'Road',
    name: '',
    brand: '',
    distance: '',
    description: '', 
  });
  
  const handleBikeFormChange = name => event => {
    setNewBikeValues({ ...newBikeValues, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField 
            id="bike-name"
            label="Bike name"
            className={classes.input}
            value={newBikeValues.name}
            onChange={handleBikeFormChange('name')}
            margin="normal"
            variant="outlined"
            required
            autoFocus
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="brand-name"
            label="Brand name"
            className={classes.input}
            value={newBikeValues.brand}
            onChange={handleBikeFormChange('brand')}
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
        <TextField
          id="bike-distance"
          label="Distance"
          className={classes.input}
          margin="normal"
          variant="outlined"
          value={newBikeValues.distance}
          type="number"
          onChange={handleBikeFormChange('distance')}
          required
        />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="bike-type"
            select
            label="Bike type"
            value = {newBikeValues.type}
            onChange={handleBikeFormChange('type')}
            className={classes.input}
            margin="normal"
            variant="outlined"
            >
            {bikeTypes.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="bike-description"
            label="Description"
            onChange={handleBikeFormChange('description')}
            margin="normal"
            variant="outlined"
            helperText="You can add description"
            className={classes.input}
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon/>}
              onClick={()=>addBike(newBikeValues)}
            >
              Add bike
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

export default AddBike

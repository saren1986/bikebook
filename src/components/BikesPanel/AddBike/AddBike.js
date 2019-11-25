import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const AddBike = ( {addBike, bikeTypes } ) => {

  const classes = useStyles();
  const [newBikeValues, setNewBikeValues] = React.useState({
    id: '2',
    type: '',
    name: '',
    brand: '',
    distance: '0',
    description: '',
  });
  
  const handleBikeFormChange = name => event => {
    setNewBikeValues({ ...newBikeValues, [name]: event.target.value });
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="bike-name"
        label="Bike name"
        className={classes.textField}
        value={newBikeValues.name}
        onChange={handleBikeFormChange('name')}
        margin="normal"
        variant="outlined"
        required
        autoFocus
      />
      <TextField
        id="brand-name"
        label="Brand name"
        className={classes.textField}
        value={newBikeValues.brand}
        onChange={handleBikeFormChange('brand')}
        margin="normal"
        variant="outlined"

      />
      <TextField
        id="bike-distance"
        label="Distance"
        className={classes.textField}
        margin="normal"
        variant="outlined"
        defaultValue="0"
        value={newBikeValues.distance}
        type="number"
        onChange={handleBikeFormChange('distance')}
        required
      />
      <TextField
        id="bike-type"
        select
        label="Bike type"
        defaultValue="Road"
        value = {newBikeValues.type}
        onChange={handleBikeFormChange('type')}
        className={classes.textField}
        margin="normal"
        variant="outlined"
        SelectProps={{
          MenuProps: {
            className: classes.menu,
          },
        }}
        >
        {bikeTypes.map(type => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        id="bike-description"
        label="Description"
        onChange={handleBikeFormChange('description')}
        margin="normal"
        variant="outlined"
        helperText="You can add description"
        className={classes.fullTextField}
      />
      <div className={classes.buttonWrapper}>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<AddIcon/>}
        onClick={()=>addBike(newBikeValues)}
      >
        Add bike
      </Button>
      </div>
    </form>
  );
}

export default AddBike

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    paddingBottom: "20px",
  },
  textField: {
    marginLeft: '1%',
    marginRight: '1%',
    width: '48%'
  },
  fullTextField: {
    marginLeft: '1%',
    marginRight: '1%',
    width: '98%'
  },

  dense: {
    marginTop: theme.spacing(2),
  },

  buttonWrapper: {
    textAlign: 'right',
    width: '100%',
  }
}));
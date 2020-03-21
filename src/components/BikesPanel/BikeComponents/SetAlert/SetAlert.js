import React from 'react'
import { TextField, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classes from './SetAlert.module.css';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';

const SetAlert = ( { setDistanceAlert, id } ) => {
  
  const [checked, setChecked] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const checkboxHandle = () => {
    setChecked( checked => !checked);
  }
  const distanceChangeHandler = e => {
    setInputValue(e.target.value);
  }
  
  const setDistanceHandler = () => {
    setDistanceAlert( id, inputValue);
  }
  let alarmElement = null;
  if(checked){
    alarmElement = 
    <>
      <Grid item xs={5}>
        <TextField
          id="distanceAlert"
          label="Distance in KM"
          className={classes.input}
          margin="normal"
          variant="outlined"
          value={inputValue}
          type="number"
          onChange={distanceChangeHandler}
          required
        />
      </Grid>
      <Grid item xs={3} className={classes.buttonWrapper}>
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        startIcon={<AddIcon/>}
        onClick={setDistanceHandler}
        >
        Set
      </Button>
    </Grid>
    </>
  }
  return (
  <Grid container spacing={1}>
    <Grid item xs={12} className={classes.alertRow}>
    <FormControlLabel 
      control={
        <Checkbox
              checked={checked}
              onChange={checkboxHandle}
              value={checked}
              color="primary"  
        />  
      }
      label="Set alert for this component"  
      labelPlacement="end"
    /> 
    </Grid>
    {alarmElement}
  </Grid>
  )
}

export default SetAlert;


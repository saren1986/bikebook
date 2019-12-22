import React from 'react'
import { MenuItem, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import classes from './AddComponent.module.css'
import Grid from '@material-ui/core/Grid';


const AddComponent = ( { addComponent, componentsTypes, componentStartDate } ) => {

  const [newComponentValue, setNewComponentValue] = React.useState({
    id: 'c1',
    type: '',
    brand: '',
    model: '',
    weight: '',
    startDate: 'today',
    initialDistance: '0',
    description: '',
    distanceAlert: 0, 
  });
  const [alertSwitch, setAlertSwitch] = React.useState(false);

  const alertSwitchHandle = () => {
    setAlertSwitch( alertSwitch => !alertSwitch);
  }
  
  const handleComponentFormChange = name => event => {
    setNewComponentValue({ ...newComponentValue, [name]: event.target.value });
  };

  let alarmElement = null;

  if(alertSwitch){
    alarmElement = 
      <Grid item xs={6}>
        <TextField
          id="distanceAlert"
          label="Alarm on KM"
          className={classes.input}
          margin="normal"
          variant="outlined"
          value={newComponentValue.distanceAlert}
          type="number"
          onChange={handleComponentFormChange('distanceAlert')}
          required
        />
      </Grid>
    
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            id="component-type"
            select
            label="Component type"
            value = {newComponentValue.type}
            onChange={handleComponentFormChange('type')}
            className={classes.input}
            margin="normal"
            variant="outlined"
            >
            {componentsTypes.map(type => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="brand-name"
            label="Brand"
            className={classes.input}
            value={newComponentValue.brand}
            onChange={handleComponentFormChange('brand')}
            margin="normal"
            variant="outlined"
            />
        </Grid>
        <Grid item xs={6}>
          <TextField
          id="model"
          label="Model"
          className={classes.input}
          value={newComponentValue.model}
          onChange={handleComponentFormChange('model')}
          margin="normal"
          variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="weight"
            label="Weight / KG"
            className={classes.input}
            value={newComponentValue.weight}
            onChange={handleComponentFormChange('weight')}
            margin="normal"
            variant="outlined"
            type="number"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="startDate"
            label="On bike since"
            className={classes.input}
            value={newComponentValue.startDate}
            onChange={handleComponentFormChange('startDate')}
            margin="normal"
            variant="outlined"
            select       
          >
            {componentStartDate.map(type => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="initialDistance"
            label="Initial Distance"
            className={classes.input}
            margin="normal"
            variant="outlined"
            value={newComponentValue.initialDistance}
            type="number"
            onChange={handleComponentFormChange('initialDistance')}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="bike-description"
            label="Description"
            onChange={handleComponentFormChange('description')}
            margin="normal"
            variant="outlined"
            helperText="You can add description"
            className={classes.input}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={6} className={classes.alertRow}>
              <FormControlLabel control={
                <Switch
                color="primary"
                checked={alertSwitch}
                onChange={alertSwitchHandle}
                value={alertSwitch}
                //  inputProps={{ 'aria-label': 'secondary checkbox' }}
              />    
              }
              labelPlacement="start"
              label="Set distance alert"  
              /> 
            </Grid>
            {alarmElement}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.buttonWrapper}>
          <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon/>}
          onClick={()=>addComponent(newComponentValue)}
          >
          Add component
          </Button>
        </Grid>

      {/* <div className={classes.buttonWrapper}> */}
      
      {/* </div> */}
      </Grid>
    </form>
  );
}

export default AddComponent


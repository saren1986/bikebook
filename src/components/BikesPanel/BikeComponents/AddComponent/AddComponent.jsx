import React, { useState } from 'react';
import { MenuItem, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import useStyle from './addComponentStyle';
import { addComponent } from '../../../../store/actions/index';
import * as Styled from '../../../../styled/styled';

const AddComponent = ({ componentsTypes, componentStartDate, history }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [newComponentValue, setNewComponentValue] = useState({
    id: 'c1',
    type: '',
    brand: '',
    model: '',
    weight: '',
    startDate: componentStartDate.find((item) => item.default === true).id,
    initialDistance: '0',
    description: '',
    distanceAlert: 0,
  });

  const [alertSwitch, setAlertSwitch] = useState(false);

  const alertSwitchHandle = () => {
    setAlertSwitch((alert) => !alert);
  };
  const handleComponentFormChange = (name) => (event) => {
    setNewComponentValue({ ...newComponentValue, [name]: event.target.value });
  };
  const addComponentHandler = () => {
    dispatch(addComponent(newComponentValue));
    history.push('/bike/components');
  };

  const alarmElement = alertSwitch ? (
    <Grid item xs={12} sm={6} className={classes.alertRow}>
      <Styled.Input
        id="distanceAlert"
        label="Alarm on KM"
        margin="normal"
        variant="outlined"
        value={newComponentValue.distanceAlert}
        type="number"
        onChange={handleComponentFormChange('distanceAlert')}
        required
      />
    </Grid>
  ) : null;

  return (
    <>
      <Styled.Header>Add new component</Styled.Header>
      <form noValidate autoComplete="off">
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Styled.Input
              id="component-type"
              select
              label="Component type"
              value={newComponentValue.type}
              onChange={handleComponentFormChange('type')}
              margin="normal"
              variant="outlined"
            >
              {componentsTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Styled.Input>
          </Grid>
          <Grid item xs={6}>
            <Styled.Input
              id="brand-name"
              label="Brand"
              value={newComponentValue.brand}
              onChange={handleComponentFormChange('brand')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Styled.Input
              id="model"
              label="Model"
              value={newComponentValue.model}
              onChange={handleComponentFormChange('model')}
              margin="normal"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <Styled.Input
              id="weight"
              label="Weight / KG"
              value={newComponentValue.weight}
              onChange={handleComponentFormChange('weight')}
              margin="normal"
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={6}>
            <Styled.Input
              id="startDate"
              label="On bike since"
              value={newComponentValue.startDate}
              onChange={handleComponentFormChange('startDate')}
              margin="normal"
              variant="outlined"
              select
            >
              {componentStartDate.map((type) => (
                <MenuItem key={type.name} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Styled.Input>
          </Grid>
          <Grid item xs={6}>
            <Styled.Input
              id="initialDistance"
              label="Initial Distance"
              margin="normal"
              variant="outlined"
              value={newComponentValue.initialDistance}
              type="number"
              onChange={handleComponentFormChange('initialDistance')}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Styled.Input
              id="bike-description"
              label="Description"
              onChange={handleComponentFormChange('description')}
              margin="normal"
              variant="outlined"
              helperText="You can add description"
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              <Grid item sm={6} xs={12} className={classes.alertRow}>
                <FormControlLabel
                  control={(
                    <Switch
                      color="primary"
                      checked={alertSwitch}
                      onChange={alertSwitchHandle}
                      value={alertSwitch}
                    />
              )}
                  labelPlacement="start"
                  label="Set distance alert"
                />
              </Grid>
              {alarmElement}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Styled.BtnWrapper>
              <Styled.Btn
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                onClick={addComponentHandler}
              >
                Add component
              </Styled.Btn>
            </Styled.BtnWrapper>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

AddComponent.propTypes = {
  componentsTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  componentStartDate: PropTypes.arrayOf(PropTypes.object).isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(AddComponent);

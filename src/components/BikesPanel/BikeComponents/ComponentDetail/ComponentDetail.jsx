import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ProgressBar from './progressBar/ProgressBar';
import ComponentControls from './ComponentControls/ComponentControls';
import SetAlert from '../Alert/SetAlert/SetAlert';
import * as actions from '../../../../store/actions/index';
import useStyles from './componentDetailStyle';
import DrawerSmall from '../../../../UX/DrawerSmall/DrawerSmall';
import { formatDistance } from '../../../../utils/distanceFormatters';
import { formatMassDisplay } from '../../../../utils/massUnitsFormatter';
import { COMPONENT_TYPES } from '../../../../mock/constans';
import SwitchToBike from '../SwitchToBike/SwitchToBike';

const ComponentDetail = ({ components, history, location }) => {
  const [drawer, setDrawer] = useState(false);
  const [switchBikeMode, setSwitchBikeMode] = useState(false);
  const [alertMode, setAlerteMode] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { lengthUnit, massUnit } = useSelector((state) => state.user.units);
  const component = components.find((comp) => comp.id === location.state.id);
  console.log('====================================');
  console.log('component', component);
  console.log('====================================');
  const setAlertHandler = (distance) => {
    dispatch(actions.setDistanceAlert(component.id, distance, lengthUnit));
    setDrawer(false);
    setAlerteMode(false);
  };
  const disableAlertHandler = () => {
    dispatch(actions.disableServiceAlert(component.id));
  };
  const drawerOnHandler = (elem) => {
    if (elem === 'switch') {
      setSwitchBikeMode(true);
    } else if (elem === 'alert') {
      setAlerteMode(true);
    }
    setDrawer(true);
  };
  const drawerOffHandler = () => {
    setSwitchBikeMode(false);
    setAlerteMode(false);
    setDrawer(false);
  };
  const retireComponentHandler = () => {
    dispatch(actions.openConfirmDialog(
      'Retire component', 'The component will be retired. All service alerts will be deleted. Are you sure?', () => {
        dispatch(actions.retireComponent(component.id));
      },
    ));
  };
  const deleteComponentHandler = () => {
    dispatch(actions.openConfirmDialog(
      'Delete component', 'The component will be deleted permanently. Are you sure?', () => {
        dispatch(actions.deleteComponent(component.id));
        history.push('/bike/components');
      },
    ));
  };
  const editComponentHandler = () => {
    history.push({
      pathname: '/component/edit',
      bikeId: component.bikeId,
      component,
    });
  };
  const componentType = COMPONENT_TYPES.find((type) => type.id === component.type).label;
  const distanceAlert = component.alert.on ? (
    <ProgressBar
      startDistance={component.alert.startDistance}
      currentDistance={component.distance}
      endDistance={component.alert.endDistance}
      lengthUnit={lengthUnit}
    />
  ) : null;
  const switchBikeContent = switchBikeMode ? (
    <SwitchToBike
      bikeId={component.bikeId}
      compId={component.id}
      clb={() => setDrawer(false)}
    />
  ) : null;
  const alertContent = alertMode ? (
    <SetAlert
      active={component.alert.on}
      id={component.id}
      setAlert={(distance) => setAlertHandler(distance)}
      lengthUnit={lengthUnit}
    />
  ) : null;
  return (
    <>
      <div className={classes.wrapper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div className={classes.topBar}>
              <div className={classes.compTypeLabel}>
                <strong>{componentType}</strong>
              </div>
              <div className={classes.label}>
                <span><strong>{component.brand}</strong></span>
                {' '}
                <span>{component.model}</span>
                {' '}
              </div>
              <div className={classes.componentControls}>
                <ComponentControls
                  openDrawer={drawerOnHandler}
                  activeAlert={component.alert.on}
                  retired={component.retired}
                  retireComponent={retireComponentHandler}
                  alertOff={() => disableAlertHandler()}
                  deleteComponent={deleteComponentHandler}
                  editComponent={editComponentHandler}
                />
              </div>
            </div>
            <div className={classes.itemWrapper}>
              <div className={classes.compItem}>
                Distance:
                {' '}
                <strong>{formatDistance(component.distance, lengthUnit)}</strong>
              </div>
              <div className={classes.compItem}>
                Mass:
                {' '}
                <strong>{component.weight ? formatMassDisplay(component.weight, massUnit) : 'Unset'}</strong>
              </div>
              <div className={classes.compItem}>
                Installed:
                {' '}
                <strong>{component.startDate}</strong>
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            {distanceAlert}
          </Grid>
          <Grid item xs={12}>
            <hr />
            <p>
              <b>Notes: </b>
              {component.description}
            </p>
          </Grid>
        </Grid>
        <DrawerSmall
          open={drawer}
          closeHandle={drawerOffHandler}
        >

          {switchBikeContent}
          {alertContent}
        </DrawerSmall>
      </div>
    </>
  );
};
ComponentDetail.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ComponentDetail);

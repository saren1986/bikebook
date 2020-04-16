import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ProgressBar from './progressBar/ProgressBar';
import ComponentControls from './ComponentControls/ComponentControls';
import SetAlert from '../SetAlert/SetAlert';
import * as actions from '../../../../store/actions/index';
import useStyles from './componentDetailStyle';
import DrawerSmall from '../../../../UX/DrawerSmall/DrawerSmall';
import { meterToKm, format } from '../../../../utils/distanceFormatters';
import { COMPONENT_TYPES } from '../../../../mock/constans';
import SwitchToBike from '../SwitchToBike/SwitchToBike';

const ComponentDetail = ({ components, history, location }) => {
  const [drawer, setDrawer] = useState(false);
  const [switchBikeMode, setSwitchBikeMode] = useState(false);
  const [alertMode, setAlerteMode] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const component = components.find((comp) => comp.id === location.state.id);
  const setAlertHandler = (distance) => {
    dispatch(actions.setDistanceAlert(component.id, distance));
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
  const componentType = COMPONENT_TYPES.find((type) => type.id === component.type).label.eng;
  const distanceAlert = component.alert.on ? (
    <ProgressBar
      startDistance={component.alert.startDistance}
      currentDistance={component.distance}
      endDistance={component.alert.endDistance}
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
                />
              </div>
            </div>
            <div className={classes.itemWrapper}>
              <div className={classes.compItem}>
                Distance:
                {' '}
                <strong>{format(meterToKm(component.distance), 'KM')}</strong>
              </div>
              <div className={classes.compItem}>
                Weight:
                {' '}
                <strong>{component.weight}</strong>
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
        {/* <AlertDialog
          open
          title="test test test test test"
          description="test2"
          confirm={() => { alert('confirmed'); }}
        /> */}
      </div>
    </>
  );
};
ComponentDetail.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
// ComponentDetail.defaultProps = {
//   bike: null,
// };

export default withRouter(ComponentDetail);

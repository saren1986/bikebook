import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ProgressBar from './progressBar/ProgressBar';
import ComponentControls from './ComponentControls/ComponentControls';
import SetAlert from '../SetAlert/SetAlert';
import { setDistanceAlert, disableServiceAlert } from '../../../../store/actions/index';
import useStyles from './componentDetailStyle';
import DrawerSmall from '../../../../UX/DrawerSmall/DrawerSmall';
import { meterToKm, format } from '../../../../utils/distanceFormatters';
import { COMPONENT_TYPES } from '../../../../mock/constans';

const ComponentDetail = ({ components, location }) => {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const component = components.find((comp) => comp.id === location.state.id);
  const setAlertHandler = (distance) => {
    dispatch(setDistanceAlert(component.id, distance));
    setDrawer(false);
  };
  const disableAlertHandler = () => {
    dispatch(disableServiceAlert(component.id));
  }
  const componentType = COMPONENT_TYPES.find((type)=> type.id === component.type).label.eng;
  const distanceAlert = component.alert.on ? (
    <ProgressBar
      startDistance={component.alert.startDistance}
      currentDistance={component.distance}
      endDistance={component.alert.endDistance}
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
                  openAlertDrawer={setDrawer}
                  activeAlert={component.alert.on}
                  retired={component.retired}
                  alertOff={() => disableAlertHandler()}
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
          closeHandle={() => setDrawer(false)}
        >
          <SetAlert
            active={component.alert.on}
            id={component.id}
            setAlert={(distance) => setAlertHandler(distance)}
          />
        </DrawerSmall>
      </div>
    </>
  );
};
ComponentDetail.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object.isRequired,
  // bike: PropTypes.object,
};
// ComponentDetail.defaultProps = {
//   bike: null,
// };

export default withRouter(ComponentDetail);

import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ProgressBar from './progressBar/ProgressBar';
import ComponentControls from './ComponentControls/ComponentControls';
import SetAlert from '../SetAlert/SetAlert';
import { setDistanceAlert } from '../../../../store/actions/index';
import useStyles from './componentDetailStyle';
import DrawerSmall from '../../../../UX/DrawerSmall/DrawerSmall';
import { meterToKm, format } from '../../../../utils/distanceFormatters';

const ComponentDetail = ({ components, location }) => {
  const [drawer, setDrawer] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const component = components.find((comp) => comp.id === location.state.id);
  const setDistanceAlertHandler = (distance) => {
    dispatch(setDistanceAlert(component.id, distance));
    setDrawer(false);
  };

  const distanceAlert = component.distanceAlert ? (
    <ProgressBar
      startDistance={component.initialDistance} // TODO po zmianie struktury danych wstawić prawdziwy dystans
      currentDistance={component.distance}
      alertDistance={component.distanceAlert}
    />
  ) : null;
  return (
    <>
      {/* <Styled.Header></Styled.Header> */}
      <div className={classes.wrapper}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div className={classes.topBar}>
              <div className={classes.compTypeLabel}>
                <strong>{component.type}</strong>
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
                  activeAlert={!!component.distanceAlert}
                  retired={component.retired}
                  alertOff={() => (alert('off?'))}
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
            active={!!component.distanceAlert}
            id={component.id}
            setAlert={(distance) => setDistanceAlertHandler(distance)}
          />
        </DrawerSmall>
      </div>
    </>
  );
};
ComponentDetail.propTypes = {
  components: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(ComponentDetail);

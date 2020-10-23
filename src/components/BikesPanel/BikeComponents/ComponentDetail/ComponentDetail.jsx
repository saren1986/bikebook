import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ProgressBar from './progressBar/ProgressBar';
import SetAlert from '../Alert/SetAlert/SetAlert';
import {
  setDistanceAlert, disableAlert, retireComponent, deleteComponent, openConfirmDialog,
} from '../../../../store/actions/index';
import DrawerSmall from '../../../../UX/DrawerSmall/DrawerSmall';
import { formatDistance, distanceLargeToSmall } from '../../../../utils/distanceFormatters';
import { timeFormatter } from '../../../../utils/timeFormatters';
import { formatMassDisplay } from '../../../../utils/massUnitsFormatter';
import { COMPONENT_TYPES } from '../../../../mock/constans';
import SwitchToBike from '../SwitchToBike/SwitchToBike';
import InfoHeader from '../../../../UX/InfoHeader/InfoHeader';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: '10px',
    background: theme.backgroundColor.box,
    display: 'flex',
    flexWrap: 'wrap',
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      padding: '20px',
    },
  },
  topBar: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '15px',
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'space-between',
      marginBottom: '0',
    },
    '& > div': {
      [theme.breakpoints.up('sm')]: {
        width: '33%',
      },
    },
  },
  compTypeLabel: {
    order: '2',
    display: 'inline-flex',
    marginRight: '15px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      marginRight: '0',
    },
  },
  label: {
    order: '2',
    textAlign: 'center',
    display: 'inline-flex',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '& span': {
      margin: '0 5px',
    },
  },
  compItem: {
    margin: '10px 0',
  },

  componentControls: {
    order: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    flexBasis: '100%',
    marginBottom: '15px',
    [theme.breakpoints.up('sm')]: {
      order: '2',
      flexBasis: '33%',
      marginBottom: '0',
    },
  },

}));

const ComponentDetail = ({ components, history, location }) => {
  const [drawer, setDrawer] = useState(false);
  const [switchBikeMode, setSwitchBikeMode] = useState(false);
  const [alertMode, setAlerteMode] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { lengthUnit, massUnit } = useSelector((state) => state.options.units);
  const component = components.find((comp) => comp.id === location.state.id);

  const setAlertHandler = (distance) => {
    dispatch(setDistanceAlert({
      componentId: component.id,
      alertDistance: distanceLargeToSmall(distance, lengthUnit),
    }));
    setDrawer(false);
    setAlerteMode(false);
  };

  const SwitchBikeHandler = (elem) => {
    setSwitchBikeMode(true);
    setDrawer(true);
  };
  const drawerOffHandler = () => {
    setSwitchBikeMode(false);
    setDrawer(false);
  };
  const retireComponentHandler = () => {
    dispatch(openConfirmDialog({
      title: 'Retire component',
      description: 'The component will be retired. All service alerts will be deleted. Are you sure?',
      confirm: () => {
        dispatch(retireComponent({ componentId: component.id }));
      },
    }));
  };
  const deleteComponentHandler = () => {
    dispatch(openConfirmDialog({
      title: 'Delete component',
      description: 'The component will be deleted permanently. Are you sure?',
      confirm: () => {
        dispatch(deleteComponent({ componentId: component.id }));
        history.push('/bike/components');
      },
    }));
  };
  const editComponentHandler = () => {
    history.push({
      pathname: '/component/edit',
      bikeId: component.bikeId,
      component,
    });
  };
  const menuItems = [];
  if (component.retired) {
    menuItems.push({
      name: 'Delete',
      func: deleteComponentHandler,
    });
  } else {
    menuItems.push(
      {
        name: 'Manage Alerts',
        func: () => {},
      },
      {
        name: 'Edit',
        func: editComponentHandler,
      },
      {
        name: 'Switch bike',
        func: SwitchBikeHandler,
      },
      {
        name: 'Retire',
        func: retireComponentHandler,
      },
    );
  }
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
            <InfoHeader
              title={`${componentType}`}
              menuItems={menuItems}
              rightPlaceholder={`Bike name`}
            />
            <div className={classes.itemWrapper}>
              <div className={classes.compItem}>
                Model:
                {' '}
                <strong>{component.model}</strong>
              </div>
              <div className={classes.compItem}>
                Brand:
                {' '}
                <strong>{component.brand}</strong>
              </div>
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
                <strong>{timeFormatter(component.startDate, false)}</strong>
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

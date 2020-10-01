import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import StravaLong from '../../../icons/Strava/StravaLong';
import { formatDistance } from '../../../utils/distanceFormatters';
import MiniMenu from '../../../UX/MiniMenu/MiniMenu';
import {
  retireBike, deleteBike, setActiveBike, openConfirmDialog,
} from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
  topHeader: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  },
  bikeName: {
    width: '60%',
    textAlign: 'center',
  },
  retiredWrapper: {
    textAlign: 'center',
  },
  retired: {
    color: '#f00',
  },
  syncInfo: {
    width: '20%',
    textAlign: 'left',
  },
  actionsMenu: {
    width: '20%',
    textAlign: 'right',
  },
  content: {
    padding: '10px 0',
  },
  infoItem: {
    margin: '5px 0',
  },
}));

const BikeInfo = ({ bike, history }) => {
  const { lengthUnit } = useSelector((state) => state.user.units);
  const dispatch = useDispatch();
  const {
    id, retired, distance, model, type, description,
  } = bike;
  const classes = useStyles();

  const onEditClickHandler = () => {
    history.push({
      pathname: '/bike/edit',
      bike,
    });
  };
  const menuItems = [];

  if (!retired) {
    menuItems.push({
      name: 'Retire',
      func: () => {
        dispatch(openConfirmDialog(
          'Retire bike', 'Bike will be retired. All components refered to bike will be retired too. Are you sure?',
          () => {
            dispatch(retireBike(id));
          },
        ));
      },
    },
    {
      name: 'Edit',
      func: onEditClickHandler,
    });
  } else if (!bike.strava) {
    menuItems.push({
      name: 'Delete',
      func: () => {
        dispatch(openConfirmDialog(
          'Delete bike', 'Bike will be deleted permanently. All components and activities refered to bike will be deleted too. Are you sure?',
          () => {
            dispatch(deleteBike(id));
            dispatch(setActiveBike(null));
            history.push({
              pathname: '/bike-list',
            });
          },
        ));
      },
    });
  }
  return (
    <>
      <div className={classes.topHeader}>
        <div className={classes.syncInfo}>
          {bike.strava ? <StravaLong /> : null}
        </div>
        <Typography
          variant="h2"
          component="h2"
          classes={{
            root: classes.bikeName,
          }}
        >
          {' '}
          {bike.name}
          {' '}

        </Typography>

        <div className={classes.actionsMenu}>
          <MiniMenu items={menuItems} />
        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.retiredWrapper}>
          {!retired ? null
            : (<strong className={classes.retired}>RETIRED</strong>)}
        </div>
        <div className={classes.infoItem}>
          <span className={classes.infolabel}>Distance: </span>
          <strong className={classes.infoData}>{formatDistance(distance, lengthUnit)}</strong>
        </div>
        <div className={classes.infoItem}>
          <span className={classes.infolabel}>Model: </span>
          <strong className={classes.infoData}>{model}</strong>
        </div>
        <div className={classes.infoItem}>
          <span className={classes.infolabel}>Type: </span>
          <strong className={classes.infoData}>{type}</strong>
        </div>
        <div className={classes.infoItem}>
          <span className={classes.infolabel}>Description: </span>
          <span className={classes.infoData}>{description}</span>
        </div>
      </div>

    </>
  );
};

BikeInfo.propTypes = {
  bike: PropTypes.object.isRequired,
};
export default withRouter(BikeInfo);

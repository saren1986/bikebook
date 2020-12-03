import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import StravaLong from '../../../icons/Strava/StravaLong';
import { formatDistance } from '../../../utils/distanceFormatters';
import {
  retireBike, deleteBike, setActiveBike, openConfirmDialog,
} from '../../../store/actions/index';
import InfoHeader from '../../../UX/InfoHeader/InfoHeader';
import Retired from '../../../UX/Info/Retired';

const useStyles = makeStyles((theme) => ({
  retiredWrapper: {
    textAlign: 'center',
  },
  retired: {
    color: '#f00',
  },
  content: {
    padding: '10px 0',
  },
  infoItem: {
    margin: '5px 0',
  },
}));

const BikeInfo = ({ bike, history }) => {
  const { lengthUnit } = useSelector((state) => state.options.units);
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
  let rightInfo = null;

  if (!retired) {
    rightInfo = bike.strava ? <StravaLong /> : null;
    menuItems.push({
      name: 'Retire',
      func: () => {
        dispatch(openConfirmDialog({
          title: 'Retire bike',
          description: 'Bike will be retired. All components refered to bike will be retired too. Are you sure?',
          confirm: () => { dispatch(retireBike(id)); },
        }));
      },
    },
    {
      name: 'Edit',
      func: onEditClickHandler,
    });
  } else {
    rightInfo = <Retired />;
    menuItems.push({
      name: 'Delete',
      func: () => {
        dispatch(openConfirmDialog({
          title: 'Delete bike',
          description: 'Bike will be deleted permanently. All components and activities refered to bike will be deleted too. Are you sure?',
          confirm: () => {
            dispatch(deleteBike(id));
            dispatch(setActiveBike(null));
            history.push({
              pathname: '/bike-list',
            });
          },
        }));
      },
    });
  }

  return (
    <>
      <InfoHeader
        title={bike.name}
        rightPlaceholder={rightInfo}
        menuItems={menuItems}
      />
      <div className={classes.content}>
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

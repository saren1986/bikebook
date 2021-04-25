import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useSelector, useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import { formatDistance } from '../../../../utils/distanceFormatters';
import { BtnWrapper, Btn } from '../../../../styled/styled';
import { fetchBikes } from '../../../../store/actions/index';
import InfoBox from '../../../../UX/InfoBox/InfoBox';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  validateText: {
    color: theme.palette.error.main,
    minHeight: '20px',
    textAlign: 'center',
  },
}));

const BikesSync = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lengthUnit = useSelector((state) => state.options.units.lengthUnit);
  const bikes = useSelector((state) => state.strava.bikes);
  const [checked, setChecked] = useState([]);
  const [isValidate, setIsValidate] = useState(true);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setIsValidate(true);
    setChecked(newChecked);
  };

  const submitHandler = () => {
    if (!checked.length) {
      setIsValidate(false);
      return false;
    }
    setBtnDisabled(true);
    return dispatch(fetchBikes({
      bikes: checked,
      clb: () => { setBtnDisabled(false); },
    }));
  };
  const unsync = bikes.filter((b) => !b.stravaSync && b.stravaId).length > 0;
  const stravaBikeList = bikes.map((bike) => {
    const labelId = `checkbox-list-label-${bike.name}`;
    if (bike.stravaSync) {
      return (
        <ListItem key={bike.id} role={undefined}>
          <ListItemIcon>
            <CheckIcon color="primary" />
          </ListItemIcon>
          <ListItemText id={labelId} primary={`${bike.name}, Distance: ${formatDistance(bike.distance, lengthUnit)}`} />
          <ListItemSecondaryAction />
        </ListItem>
      );
    }
    return (
      <ListItem key={bike.id} role={undefined} dense button onClick={handleToggle(bike.stravaId)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(bike.stravaId) !== -1}
            tabIndex={-1}
            disableRipple
            inputProps={{ 'aria-labelledby': labelId }}
            color="primary"
          />
        </ListItemIcon>
        <ListItemText id={labelId} primary={`${bike.name}, Distance: ${formatDistance(bike.distance, lengthUnit)}`} />
        <ListItemSecondaryAction />
      </ListItem>
    );
  });

  return (
    <>
      <List
        className={classes.root}
        subheader={(
          <ListSubheader component="div" id="nested-list-subheader">
            {unsync ? 'Select bikes you want to sync:' : 'Bikes already sync with Strava:'}
          </ListSubheader>
    )}
      >
        {stravaBikeList}
      </List>
      <InfoBox
        type={isValidate ? 'normal' : 'error'}
        title={isValidate ? null : 'You have to select at least one bike!'}
      />
      {unsync ? (
        <BtnWrapper>
          <Btn variant="outlined" color="primary" onClick={submitHandler} disabled={btnDisabled}>
            Sync selected bikes
          </Btn>
        </BtnWrapper>
      ) : null}

    </>
  );
};

export default withRouter(BikesSync);

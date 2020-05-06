import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import CheckIcon from '@material-ui/icons/Check';
import { formatDistance } from '../../../../utils/distanceFormatters';
import { BtnWrapper, Btn } from '../../../../styled/styled';
import { stravaGetBike, stravaSyncStart } from '../../../../store/actions/index';
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

const BikesSync = ({ bikes, history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lengthUnit = useSelector((state) => state.user.units.lengthUnit);
  const token = useSelector((state) => state.strava.auth.accessToken);
  const bikesList = useSelector((state) => state.bikes.list);
  const [checked, setChecked] = React.useState([]);
  const [isValidate, setIsValidate] = React.useState(true);

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

  const clickHandler = () => {
    if (!checked.length) {
      setIsValidate(false);
      return false;
    }
    dispatch(stravaSyncStart());
    dispatch(stravaGetBike(checked, token, history));
  };
  const stravaBikeList = bikes.map((bike) => {
    const labelId = `checkbox-list-label-${bike.name}`;
    const isBike = bikesList.findIndex((appBike) => appBike.stravaId === bike.id);
    if (isBike !== -1) {
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
      <ListItem key={bike.id} role={undefined} dense button onClick={handleToggle(bike.id)}>
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={checked.indexOf(bike.id) !== -1}
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
            Select the bikes you want to sync:
          </ListSubheader>
    )}
      >
        {stravaBikeList}
      </List>
      <InfoBox type={isValidate ? 'normal' : 'error'}>
        {isValidate ? null : 'You have to select at least one bike!'}
      </InfoBox>
      <BtnWrapper>
        <Btn variant="outlined" color="primary" onClick={clickHandler}>
          Import
        </Btn>
      </BtnWrapper>
    </>
  );
};
BikesSync.propTypes = {
  bikes: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default withRouter(BikesSync);

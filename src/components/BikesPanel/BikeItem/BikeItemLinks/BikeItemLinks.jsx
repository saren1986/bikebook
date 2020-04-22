import React from 'react';
import {
  ListItem, ListItemIcon, ListItemText, List,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import { Link, withRouter } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import { useSelector } from 'react-redux';
import ListSubheader from '@material-ui/core/ListSubheader';
import useStyles from './bikeItemLinks.style';
import { formatDistance } from '../../../../utils/distanceFormatters';


const BikeItemLinks = ({ history }) => {
  const activeBike = useSelector((state) => state.bikes.activeBike);
  const bike = useSelector((state) => state.bikes.list.find((bike) => bike.id === activeBike));
  const { lengthUnit } = useSelector((state) => state.user.units);
  const classes = useStyles();
  const addDistanceClickHandler = () => {
    history.push('/bike/add-distance');
  };
  const addNewComponentHandle = () => {
    history.push('/bike/components/add');
  };
  return (
    activeBike ? (
      <>
        <Divider />
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={(
            <ListSubheader
              component="div"
              id="nested-list-subheader"
              classes={{
                root: classes.subheader,
              }}
            >
              <span>{bike.name}</span>

              <span>
                Distance:
                {formatDistance(bike.distance, lengthUnit)}
              </span>

            </ListSubheader>
      )}
        >
          <Link to="/bike/info">
            <ListItem button>
              <ListItemIcon>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Info" />
            </ListItem>
          </Link>
          <Link to="/bike/components">
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Components" />
            </ListItem>
          </Link>
          <List component="div" disablePadding>

            <ListItem button className={classes.nested} onClick={addNewComponentHandle}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add" />

            </ListItem>
          </List>
          <ListItem button onClick={addDistanceClickHandler}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add distance" />
          </ListItem>
        </List>
      </>
    ) : null
  );
};

export default withRouter(BikeItemLinks);

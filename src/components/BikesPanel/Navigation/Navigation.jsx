import React from 'react';
import {
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';

import TimelineIcon from '@material-ui/icons/Timeline';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link, withRouter } from 'react-router-dom';

import { useSelector } from 'react-redux';
import classes from './BikesNav.module.css';

const BikeNavigation = ({
  addDistance, handleOpenAddBikeModal, location, history, match,
}) => {
  const activeBike = useSelector((state) => state.bikes.activeBike);
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  let menuBikeControls = null;
  if (activeBike) {
    menuBikeControls = (
      <>
        <hr />
        <ListItem button onClick={addDistance}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add distance" />
        </ListItem>
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
        <ListItem button>
          <ListItemIcon>
            <TimelineIcon />
          </ListItemIcon>
          <ListItemText primary="History" />
        </ListItem>
      </>
    );
  }
  return (

    <List component="nav" aria-labelledby="nested-list-subheader" className={classes.root}>
      <Link to="/bike-list">
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <DirectionsBikeIcon />
          </ListItemIcon>
          <ListItemText primary="Your bikes" />
        </ListItem>
      </Link>
      <ListItem button onClick={handleOpenAddBikeModal}>
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="Add new bike" />
      </ListItem>
      {menuBikeControls}
    </List>
  );
};

export default withRouter(BikeNavigation);

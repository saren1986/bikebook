import React from 'react';
import {
  ListItem, ListItemIcon, ListItemText, List,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AddIcon from '@material-ui/icons/Add';
import StravaIcon from '../../../icons/Strava/StravaIcon';
import useStyles from '../BikeItem/BikeItemLinks/bikeItemLinks.style';

const BikePanelLinks = ({ history }) => {
  const addNewActivityHandle = () => {
    history.push('/activity/add');
  };
  const classes = useStyles();
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      <Link to="/bike-list">
        <ListItem button>
          <ListItemIcon>
            <DirectionsBikeIcon />
          </ListItemIcon>
          <ListItemText primary="Your bikes" />
        </ListItem>
      </Link>
      <Link to="/activities">
        <ListItem button>
          <ListItemIcon>
            <DoubleArrowIcon />
          </ListItemIcon>
          <ListItemText primary="Activites" />
        </ListItem>
      </Link>
      <List component="div" disablePadding>

        <ListItem button className={classes.nested} onClick={addNewActivityHandle}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add" />

        </ListItem>
      </List>
      <Link to="/strava">
        <ListItem button>
          <ListItemIcon>
            <StravaIcon />
          </ListItemIcon>
          <ListItemText primary="Strava" />
        </ListItem>
      </Link>
    </List>
  );
};
export default withRouter(BikePanelLinks);

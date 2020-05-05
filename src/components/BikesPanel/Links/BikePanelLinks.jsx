import React from 'react';
import {
  ListItem, ListItemIcon, ListItemText, List,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import SvgIcon from '@material-ui/core/SvgIcon';

const BikePanelLinks = () => (
  <List component="nav" aria-labelledby="nested-list-subheader">
    <Link to="/bike-list">
      <ListItem button>
        <ListItemIcon>
          <DirectionsBikeIcon />
        </ListItemIcon>
        <ListItemText primary="Your bikes" />
      </ListItem>
    </Link>
    <Link to="/strava">
      <ListItem button>
        <ListItemIcon>
          <SvgIcon>
            <path d="M 14.179688 2 L 5.9003906 18 L 10.779297 18 L 14.179688 11.619141 L 17.560547 18 L 22.400391 18 L 14.179688 2 z M 22.400391 18 L 20 22.789062 L 17.560547 18 L 13.859375 18 L 20 30 L 26.099609 18 L 22.400391 18 z" />
          </SvgIcon>
        </ListItemIcon>
        <ListItemText primary="Strava" />
      </ListItem>
    </Link>
  </List>
);

export default BikePanelLinks;

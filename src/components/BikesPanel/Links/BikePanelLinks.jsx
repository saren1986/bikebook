import React from 'react';
import {
  ListItem, ListItemIcon, ListItemText, List,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';


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
  </List>
);

export default BikePanelLinks;

import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';


const BikePanelLinks = () => (
  <>
    <Link to="/bike-list">
      <ListItem button>
        <ListItemIcon>
          <DirectionsBikeIcon />
        </ListItemIcon>
        <ListItemText primary="Your bikes" />
      </ListItem>
    </Link>
  </>
);

export default BikePanelLinks;

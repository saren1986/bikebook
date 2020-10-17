import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import PermDataSettingIcon from '@material-ui/icons/PermDataSetting';

const BikeItemLinks = () => (
  <>
    <Link to="/bike/info">
      <ListItem button>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Bike info" />
      </ListItem>
    </Link>
    <Link to="/bike/components">
      <ListItem button>
        <ListItemIcon>
          <PermDataSettingIcon />
        </ListItemIcon>
        <ListItemText primary="Components" />
      </ListItem>
    </Link>
  </>
);

export default BikeItemLinks;

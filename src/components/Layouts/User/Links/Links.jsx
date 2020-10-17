import React from 'react';
import {
  ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const Links = () => (
  <>
    <Link to="/settings">
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </Link>
    <Link to="/logout">
      <ListItem button>
        <ListItemIcon>
          <PowerSettingsNewIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </Link>
  </>
);

export default Links;

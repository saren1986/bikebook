import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import useStyles from './mobileDrawer.style';
import BikesPanelNavigation from '../../BikesPanel/Navigation/Navigation';
import UserLinks from '../User/Links/Links';

const MobileDrawer = ({ open, closeHandler }) => {
  const classes = useStyles();
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={closeHandler}
      classes={{ paper: classes.paper }}
    >
      <div
        role="presentation"
        onClick={closeHandler}
        onKeyDown={closeHandler}
      >
        <List component="nav" aria-label="main mailbox folders">
          <BikesPanelNavigation />
          <Divider />
          <UserLinks />
        </List>
      </div>
    </Drawer>

  );
};

export default MobileDrawer;

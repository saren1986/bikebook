import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import useStyles from './mobileDrawer.style';
import BikeItemLinks from '../../BikesPanel/BikeItem/BikeItemLinks/BikeItemLinks';
import BikePanelLinks from '../../BikesPanel/Links/BikePanelLinks';

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
        <List component="nav" aria-labelledby="nested-list-subheader">
          <BikePanelLinks />
          <Divider />
          <BikeItemLinks />
        </List>
      </div>

    </Drawer>

  );
};

export default MobileDrawer;

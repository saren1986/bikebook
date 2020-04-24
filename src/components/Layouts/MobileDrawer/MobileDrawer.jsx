import React from 'react';
import Drawer from '@material-ui/core/Drawer';
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
        <BikePanelLinks />
        <BikeItemLinks />
      </div>
    </Drawer>

  );
};

export default MobileDrawer;

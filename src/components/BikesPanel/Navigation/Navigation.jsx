import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import BikeItemLinks from '../BikeItem/BikeItemLinks/BikeItemLinks';
import BikePanelLinks from '../Links/BikePanelLinks';

const Navigation = () => (
  <List component="nav" aria-labelledby="nested-list-subheader">
    <BikePanelLinks />
    <Divider />
    <BikeItemLinks />
  </List>
);

export default Navigation;

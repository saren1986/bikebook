import React from 'react';
import Divider from '@material-ui/core/Divider';
import { useSelector } from 'react-redux';
import BikeItemLinks from '../BikeItem/BikeItemLinks/BikeItemLinks';
import BikePanelLinks from '../Links/BikePanelLinks';

const Navigation = () => {
  const activeBike = useSelector((state) => state.options.activeBike);
  return (
    <>
      <BikePanelLinks />
      {activeBike ? (
        <>
          <Divider />
          <BikeItemLinks />
        </>
      )
        : null}
    </>
  );
};

export default Navigation;

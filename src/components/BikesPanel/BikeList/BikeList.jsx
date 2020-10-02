import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import BikeTile from './BikeTile/BikeTile';
import BikeListControls from './BikeListControls/BikeListControls';
import Spinner from '../../../UX/Spinner/Spinner';
import { Header } from '../../../styled/styled';
import InfoBox from '../../../UX/InfoBox/InfoBox';
import { setActiveBike } from '../../../store/actions/index';

const BikeList = ({ history }) => {
  const dispatch = useDispatch();
  const bikeList = useSelector((state) => state.bikes);
  console.log('====================================');
  console.log('bikeList', bikeList);
  console.log('====================================');

  const bikeClickHandler = (bikeId) => () => {
    dispatch(setActiveBike(bikeId));
    history.push('/bike');
  };

  const renderedBikeList = bikeList
    ? bikeList.slice()
      .sort((a, b) => {
        if (a.retired === b.retired) return 0;
        if (b.retired) return -1;
        return 1;
      })
      .map((bike) => (
        <BikeTile
          key={bike.id}
          bike={bike}
          click={bikeClickHandler(bike.id)}
        />
      ))
    : <Spinner />;

  return (
    <>
      <Header>Your Bikes</Header>
      <div>
        {renderedBikeList.length
          ? (<Grid container spacing={2}>{renderedBikeList}</Grid>)
          : (
            <InfoBox type="warning">
              You have not any bikes yet.
            </InfoBox>
          )}
      </div>
      <BikeListControls />
    </>
  );
};

BikeList.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(BikeList);

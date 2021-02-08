import { gql } from '@apollo/client';
import { retireAllWithBike, deleteAllWithBike } from '../reducers/bikeComponents';
import { retire, remove, init } from '../reducers/bikes';
import { removeActivities } from '../reducers/activities';

const GET_BIKES = gql`
  query GetBikes {
  bikes{
    id
    name
    distance
    brand
    model
    description
    weight
    strava
    retired
    user{
      id
    }
    type {
      id
      type
      label
    }
  }
}
`;

export const initState = () => (dispatch, getState, client) => {
  console.log('init state');
  client
    .query({
      query: GET_BIKES,
    })
    .then((res) => {
      console.log('dupa', res);
      dispatch(init(res.data.bikes));
    })
    .catch((err) => {
      console.log('err', err);
    });

  
};

export const deleteBike = (bikeId) => (dispatch) => {
  dispatch(remove({ bikeId }));
  dispatch(deleteAllWithBike({ bikeId }));
  dispatch(removeActivities({ bikeId }));
};
export const retireBike = (bikeId) => (dispatch) => {
  dispatch(retire({ bikeId }));
  dispatch(retireAllWithBike({ bikeId }));
};

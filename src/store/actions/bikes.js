import { gql } from '@apollo/client';
import { retireAllWithBike, deleteAllWithBike } from '../reducers/bikeComponents';
import {
  retire, remove, init, addBikes,
} from '../reducers/bikes';
import { stravaUpdateBikes } from '../reducers/strava';
import { removeActivities } from '../reducers/activities';

const GET_BIKES = gql`
  query GetBikes {
  bikes(strava: 2){
    id
    name
    distance
    brand
    model
    description
    weight
    stravaId
    stravaSync
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
// const GET_UNSYNC_BIKES = gql`
//   query GetUnsyncBikes {
//   bikes(strava: 1){
//     id
//     name
//     distance
//     brand
//     model
//     description
//     weight
//     stravaId
//     stravaSync
//     retired
//     user{
//       id
//     }
//     type {
//       id
//       type
//       label
//     }
//   }
// }
// `;

export const initState = () => (dispatch, getState, client) => {
  console.log('init state');
  client
    .query({
      query: GET_BIKES,
    })
    .then((res) => {
      const notUnsyncBikes = res.data.bikes
        .filter((bike) => (bike.stravaId && bike.stravaSync)
        || (!bike.stravaId && !bike.stravaSync));
      const stravaBikes = res.data.bikes.filter((bike) => !!bike.stravaId);
      dispatch(init(notUnsyncBikes));
      dispatch(stravaUpdateBikes(stravaBikes));
    })
    .catch((err) => {
      console.log('err', err);
    });
};
// export const getUnsyncBikes = () => (dispatch, getState, client) => {
//   console.log('getUnsyncBikes');
//   client
//     .query({
//       query: GET_UNSYNC_BIKES,
//     })
//     .then((res) => {
//       dispatch(addBikes(res.data.bikes));
//     })
//     .catch((err) => {
//       console.log('err', err);
//     });
// };

export const deleteBike = (bikeId) => (dispatch) => {
  dispatch(remove({ bikeId }));
  dispatch(deleteAllWithBike({ bikeId }));
  dispatch(removeActivities({ bikeId }));
};
export const retireBike = (bikeId) => (dispatch) => {
  dispatch(retire({ bikeId }));
  dispatch(retireAllWithBike({ bikeId }));
};

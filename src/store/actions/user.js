import { gql } from '@apollo/client';
import { setUser } from '../reducers/user';
import { stravaUpdateAuth } from '../reducers/strava';

const GET_USER = gql`
  query getUser {
  user{
    id,
    email, 
    username,
    stravaId,
    stravaAccessToken,
    stravaRefresToken,
    stravaExpiresAt,
    stravaExpiresIn,
  }
}
`;

export const getUser = () => (dispatch, getState, client) => {
  client
    .query({
      query: GET_USER,
    })
    .then((res) => {
      dispatch(setUser(res.data.user));
      dispatch(stravaUpdateAuth(res.data.user));
    })
    .catch((err) => {
      console.log('err', err);
    });
};

export const xxx = () => () => {};

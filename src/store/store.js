import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import bikes from './reducers/bikes';
import components from './reducers/bikeComponents';
import ux from './reducers/ux';
import strava from './reducers/strava';
import activities from './reducers/activities';
import forms from './reducers/forms';
import options from './reducers/options';
import auth from './reducers/auth';
import { resetReducer } from './reducers/root';
import cognito from '../services/cognito';

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_ENDPOINT_URL}/graphql`,
});

const authLink = setContext(async (_, { headers }) => {
  try {
    const session = await cognito.getSession();
    const token = session.accessToken;
    return {
      headers: {
        ...headers,
        authorization: token ? `${token}` : '',
      },
    };
  } catch (error) {
    console.log('Set context error: ', error);
    return null;
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk.withExtraArgument(client)),
  // other store enhancers if any
);

const appReducer = combineReducers({
  options,
  bikes,
  components,
  ux,
  strava,
  activities,
  forms,
  auth,
});

const store = createStore(resetReducer(appReducer), enhancer);

export default store;

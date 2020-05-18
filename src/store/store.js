import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import thunk from 'redux-thunk';
import bikes from './reducers/bikes';
import components from './reducers/bikeComponents';
import ux from './reducers/ux';
import user from './reducers/user';
import strava from './reducers/strava';
import activities from './reducers/activities';
import forms from './reducers/forms';

const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk),
  // other store enhancers if any
);

const reducer = combineReducers({
  bikes,
  components,
  ux,
  user,
  strava,
  activities,
  forms,
});

const store = createStore(reducer, enhancer);

export default store;

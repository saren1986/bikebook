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

const httpLink = createHttpLink({
  uri: 'http://localhost:8080/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  const token = 'eyJraWQiOiJwUXhMN3ozTHI3blRmRm0yRHJyM3JteDVuakRHQmRDVmF6aitLb0JoaWs4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI4OWZjOWE0NS1lNTM4LTRjM2ItOThhMS1kYWExZjZlYTE0Y2MiLCJldmVudF9pZCI6ImYwYzMzN2VhLTVkNTgtNDBjNS04NWJlLWRhMmYzZGM4NGM4MyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2MTI3MjM1NzAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5ldS13ZXN0LTIuYW1hem9uYXdzLmNvbVwvZXUtd2VzdC0yX2VhcHpRNkRadyIsImV4cCI6MTYxMjcyNzE3MCwiaWF0IjoxNjEyNzIzNTcwLCJqdGkiOiIwMTRhZDlkMS0wZmI4LTRkNGEtOTY3MC0wNmM1MDY2M2IzYzQiLCJjbGllbnRfaWQiOiJsNzg5Zzl0MzlzOGhxMHJtMm5lMWRidDk4IiwidXNlcm5hbWUiOiJzYXJtYXQ4NiJ9.TTH5Pijos-A952T9cu8DjOpOELbBy96U-YK0WZr7FULjA7FtIFLvLJa9xNgn7rZGV07KiStiUcu1KYJCViAJls_oGWBnExWD86K07lVGTIBD7TzfhXroW2_YqshWl8mnSuQCvEY51D-2nl0Mqy-XzGQseZ7r48onwnUJeVpyMCJ1PwhClGWCIi4Yy_gB57BkGJZPBt16AqRJhEu_UL6TLLCyjUAkPZH-jWna189S8B9texPOZ_GNRmmvwY1mcb2jmkhsqgdmJ5oRZYcTarWFLxG18__htaI9TejtzrZwpDD9lP--xfkGR65lDiAVnVcfYYrAgLR5EqOp_KkvEVG7bA';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  };
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

const reducer = combineReducers({
  options,
  bikes,
  components,
  ux,
  strava,
  activities,
  forms,
});

const store = createStore(reducer, enhancer);

export default store;

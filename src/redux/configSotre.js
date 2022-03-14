import { createStore, compose, applyMiddleware } from 'redux';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
// import thunk from 'redux-thunk';
import axios from 'axios';
import logger from 'redux-logger';
import axiosMiddleware from 'redux-axios-middleware';
import rootReducer from '../redux/reducers/index';


const client = axios.create({ // all axios can be used, shown in axios documentation
  options: {
    responseType: 'json',
  }
});

const middlewares = [
  // Add other middleware on this line...

  // thunk middleware can also accept an extra argument to be passed to each thunk action
  // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
  // thunk,
  axiosMiddleware(client),
];
function configureStoreProd(initialState) {
  return createStore(rootReducer, initialState, compose(applyMiddleware(...middlewares)));
}

function configureStoreDev(initialState) {
  const devMiddlewares = [
    // Redux middleware spits an error on you when you try to mutate ur state either inside a dispatch or between dispatches
    // reduxImmutableStateInvariant(),
    ...middlewares
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...devMiddlewares, logger)));

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;

import reduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';

import rootReducer from './reducers';

const getMiddleware = () => {
  const middleware = [reduxThunk];
  return applyMiddleware(...middleware);
};

export default () => {
  let store = createStore(rootReducer, getMiddleware());
  return store;
};

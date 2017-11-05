import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppNavigator from './components/Navigator';
import rootReducer from './reducers/root';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default () => (
  <Provider store={store}>
    <AppNavigator />
  </Provider>
);

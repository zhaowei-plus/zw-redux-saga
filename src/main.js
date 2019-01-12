import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Router from './router';
import sagaConfig from './redux';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  sagaConfig.reducers,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(sagaConfig.watcher)

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.querySelector('#app')
);
import { takeEvery } from 'redux-saga/effects'

import { reducers } from './reducers';
import { watcher } from "./effects";

export default {
  reducers,
  watcher,
}
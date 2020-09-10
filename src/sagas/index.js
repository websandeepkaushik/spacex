import { all, fork } from 'redux-saga/effects';
import {watchFetchSpaceXdata} from './FetchSpaceXdata';

export default function* rootSaga(api) {
  yield all([fork(watchFetchSpaceXdata)])
}
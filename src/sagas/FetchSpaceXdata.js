import { put, takeLatest } from 'redux-saga/effects';
import ApiCall from '../api';
import { saveResponseData, saveResponseError } from '../state/SpaceXdata';

/**
 * saga generator function used in fetching SpaceXdata
 * @param {Object} action - contain type and payload
 */
export function* fetchSpaceXdata(action) {
    const response = yield ApiCall(action);
    if (response.data) {
      yield put(saveResponseData(response.data))
    } else {
      yield put(saveResponseError([]))
    }
  }
  
  export function* watchFetchSpaceXdata() {
    yield takeLatest('FETCH_SPACEXDATA', fetchSpaceXdata);
  }
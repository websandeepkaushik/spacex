import { takeLatest, put } from 'redux-saga/effects';
import * as SpaceXdata from '../../state/SpaceXdata';
import ApiCall from '../../api';
import { watchFetchSpaceXdata, fetchSpaceXdata } from '../FetchSpaceXdata';

describe('FetchSpaceXdata', () => {
  it('Wait for latest FETCH_SPACEXDATA action and call fetchSpaceXdata', () => {
    const gen = watchFetchSpaceXdata();
    expect(gen.next().value).toEqual(takeLatest('FETCH_SPACEXDATA', fetchSpaceXdata));
    expect(gen.next().done).toBeTruthy();
  });

  it('Dispatch action with success result from API', () => {
    const spaceXAction = { type: '', payload: '' };
    const generator = fetchSpaceXdata(spaceXAction);
    const spaceXSuccess = {
      response_type: 'success',
      response: [{data: ''}] ,
    };
    expect(generator.next(spaceXSuccess).value).toEqual(
      ApiCall('FETCH_SPACEXDATA', spaceXAction.payload)
    );
    expect(generator.next(spaceXSuccess).value).toEqual(
      put(
        SpaceXdata.saveResponseData({
          data: spaceXSuccess.response.data,
        })
      )
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Dispatch action with errors result from API', () => {
    const spaceXAction = {};
    const generator = fetchSpaceXdata(spaceXAction);
    const apiResponse = {
      response_type: 'success',
      response: { errors: [{ message: '' }] },
    };
    expect(generator.next(apiResponse).value).toEqual(
      ApiCall('FETCH_SPACEXDATA', spaceXAction.payload)
    );
    expect(generator.next(apiResponse).value).toEqual(
      put(SpaceXdata.saveResponseError({errors: apiResponse.response.Errors,}))
    );
    expect(generator.next().done).toBeTruthy();
  });

  it('Dispatch action with fail result from fetch API', () => {
    const spaceXAction = { type: '', payload: '' };
    const generator = fetchSpaceXdata(spaceXAction);
    const apiResponse = {
      response_type: 'fail',
      response: { Errors: [{ message: '' }] },
    };
    expect(generator.next(apiResponse).value).toEqual(
      ApiCall('FETCH_SPACEXDATA', spaceXAction.payload)
    );
    expect(generator.next(apiResponse).value).toEqual(
      put(
        SpaceXdata.saveResponseError({
          errors: apiResponse.response.Errors,
        })
      )
    );
    expect(generator.next().done).toBeTruthy();
  });
});

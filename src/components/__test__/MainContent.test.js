import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import MainContent from '../MainContent';
import * as redux from 'react-redux';
import store from '../../store';
import spaceXdata from '../../__fixtures__/spaceXdata';

describe('<MainContent />', () => {
  it('Renders the main view', () => {
    const {container} = render(<redux.Provider store={store}><MainContent /></redux.Provider>);
    expect(container).toMatchSnapshot();
  });

  it('Selectors test by mock store', () => {
    const sagaMiddleware = createSagaMiddleware();
    const mockStore = configureStore([sagaMiddleware]);
    const storeMock = mockStore({
        spaceXdata
    });
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation((selector) => selector({spaceXReducer: storeMock.getState()}));
    const {container} = render(<redux.Provider store={store}><MainContent /></redux.Provider>);
    expect(container).toMatchSnapshot();
  });
});

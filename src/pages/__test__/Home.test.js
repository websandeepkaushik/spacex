import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../Home';
import * as redux from 'react-redux';
import store from '../../store';

describe('<Home />', () => {
  it('Renders the main view', () => {
    const location = {
        search: ''
    };
    const {container} = render(<redux.Provider store={store}><Router><Home {...{location}} /></Router></redux.Provider>);
    expect(container).toMatchSnapshot();
  });
});

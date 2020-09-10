import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LeftSidebar from '../LeftSidebar';
import * as redux from 'react-redux';
import store from '../../store';

describe('<LeftSidebar />', () => {
  it('Renders the main view', () => {
    const location = {
        search: ''
    };
    const {container} = render(<redux.Provider store={store}><Router><LeftSidebar location={location} /></Router></redux.Provider>);
    expect(container).toMatchSnapshot();
  });

  it('Check effects if any params data matched', () => {
    const location = {
        search: '?launch_year=2006'
    };
    const {getByText} = render(<redux.Provider store={store}><Router><LeftSidebar location={location} /></Router></redux.Provider>);
    const linkElement = getByText(/2006/i);
    expect(linkElement.className).toBe('active');
  });
});

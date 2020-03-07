import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import LandingPage from '../Components/landing-page';

it(`renders landing page component without crashing`, () => {
    const div = document.createElement('div')
    ReactDOM.render(<LandingPage/>, div);
    ReactDOM.unmountComponentAtNode(div)
  })
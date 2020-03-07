import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import CapsulesPage from '../Components/capsules-page';

it(`renders capsules page component without crashing`, () => {
    const div = document.createElement('div')
    ReactDOM.render(<CapsulesPage/>, div);
    ReactDOM.unmountComponentAtNode(div)
  })
  
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import IndividualCapsule from '../Components/individualCapsule';

it(`renders individual capsule component without crashing`, () => {
    const div = document.createElement('div')
    ReactDOM.render(<IndividualCapsule/>, div);
    ReactDOM.unmountComponentAtNode(div)
  })
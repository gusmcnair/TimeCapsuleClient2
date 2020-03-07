import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import AddCapsulePage from '../Components/add-capsule';

it(`renders add capsule page component without crashing`, () => {
    const div = document.createElement('div')
    ReactDOM.render(<AddCapsulePage/>, div);
    ReactDOM.unmountComponentAtNode(div)
  })
import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import HeaderComponent from '../Components/header-component';

it(`renders header component without crashing`, () => {
    const div = document.createElement('div')
    ReactDOM.render(<HeaderComponent/>, div);
    ReactDOM.unmountComponentAtNode(div)
  })
  
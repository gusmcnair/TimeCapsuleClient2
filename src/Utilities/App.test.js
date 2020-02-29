import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import App from '../Components/App';
import CapsulesPage from '../Components/capsules-page';
import HeaderComponent from '../Components/header-component';
import IndividualCapsule from '../Components/individualCapsule';
import LandingPage from '../Components/landing-page';
import AddCapsulePage from '../Components/add-capsule';


it(`renders App component without crashing`, () => {
  const div = document.createElement('div')
  ReactDOM.render(<App/>, div);
  ReactDOM.unmountComponentAtNode(div)
})

it(`renders capsules page component without crashing`, () => {
  const div = document.createElement('div')
  ReactDOM.render(<CapsulesPage/>, div);
  ReactDOM.unmountComponentAtNode(div)
})

it(`renders header component without crashing`, () => {
  const div = document.createElement('div')
  ReactDOM.render(<HeaderComponent/>, div);
  ReactDOM.unmountComponentAtNode(div)
})

it(`renders individual capsule component without crashing`, () => {
  const div = document.createElement('div')
  ReactDOM.render(<IndividualCapsule/>, div);
  ReactDOM.unmountComponentAtNode(div)
})

it(`renders landing page component without crashing`, () => {
  const div = document.createElement('div')
  ReactDOM.render(<LandingPage/>, div);
  ReactDOM.unmountComponentAtNode(div)
})

it(`renders add capsule page component without crashing`, () => {
  const div = document.createElement('div')
  ReactDOM.render(<AddCapsulePage/>, div);
  ReactDOM.unmountComponentAtNode(div)
})
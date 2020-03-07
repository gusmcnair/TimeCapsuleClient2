import React from 'react';
import '../Utilities/style.css'
import ApiService from '../services/api-service'
import { Route, Switch } from 'react-router-dom'
import HeaderComponent from './header-component.js'
import LandingPage from './landing-page.js'
import CapsulesPage from './capsules-page.js'
import AddCapsulePage from './add-capsule.js'
import moment from 'moment'


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      capsules: [],
      loaded: false,
      error: false
    }
  }

  //Organize data to insert in table via API, make API call, and handle response.
  handleNewData = (event, data) => {
    event.preventDefault()
    let currDate = (moment())
    let unlockDate = this.getTime(data.time)
    let imageLink = !data.imagelink ? '' : data.imagelink
    let newCapsule = {
      title: data.title,
      contents: data.content,
      imageurl: imageLink,
      burydate: currDate,
      opendates: unlockDate,
    }
    ApiService.postCapsules(newCapsule)
      .then(response => this.handleResponse(response))
      .catch(err => this.handleError())
  }

  //Based on time input, get Moment.js-readable data.
  getTime = (time) => {
    let unlock
    switch (time) {
      case 'oneminute': unlock = moment().add(1, 'minute');
        break;
      case 'onehour': unlock = moment().add(1, 'hour');
        break;
      case 'oneday': unlock = moment().add(1, 'day');
        break;
      case 'threedays': unlock = moment().add(3, 'days');
        break;
      case 'oneweek': unlock = moment().add(1, 'week');
        break;
      case 'fourweeks': unlock = moment().add(4, 'weeks');
        break;
      case 'halfayear': unlock = moment().add(6, 'months');
        break;
      case 'oneyear': unlock = moment().add(1, 'year');
        break;
      case 'twoyears': unlock = moment().add(2, 'years');
        break;
      case 'fiveyears': unlock = moment().add(5, 'years');
        break;
      default: unlock = moment().add(1, 'minute')
    }
    return unlock
  }

  //Upon receiving response from POST, put this data in this component's state so it can be accessed elsewhere.
  handleResponse = (response) => {
    let updatedCapsules = this.state.capsules.concat(response)
    this.setState({
      capsules: updatedCapsules
    })
  }

  //Upon receiving data from initial GET request, put this data in the component's state so it can be accessed elsewhere.
  handleCapsules = (newCapsules) => {
    this.setState({
      loaded: true,
      capsules: newCapsules
    })
  }

  //Handle errors with API calls, displaying an alert message.
  handleError = () => {
    alert('There was an error with your request. Please check your internet connection and try again.')
  }

  //Make a DELETE API call, thus removing the relevant capsule. Filter capsules to remove the relevant one from the state
  //(and, consequently, the DOM).
  handleDelete = (id) => {
    let newCapsules = this.state.capsules.filter(capsule => capsule.id !== id)
    this.setState({
      capsules: newCapsules
    })
    ApiService.deleteCapsules(id)
      .catch(err => this.handleError())
  }

  //Make initial API call to get all existing capsules.


  //Call getcapsules function on component mount to get capsules.
  componentDidMount() {
    ApiService.getCapsules()
      .then(capsules => this.handleCapsules(capsules))
      .catch(err => (this.setState({
        error: true
      })))
  }

  render() {
    return (
      <main>
        <HeaderComponent />
        <Switch>
          <Route exact path='/'>
            <LandingPage loaded={this.state.loaded} error={this.state.error} />
          </Route>
          <Route exact path='/capsules'>
            <CapsulesPage capsules={this.state.capsules} handleDelete={this.handleDelete} />
          </Route>
          <Route exact path='/addcapsule'>
            <AddCapsulePage handleNewData={this.handleNewData} />
          </Route>
        </Switch>
      </main>
    );
  }
}

export default App;

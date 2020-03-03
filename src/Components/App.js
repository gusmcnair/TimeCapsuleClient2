import React from 'react';
import '../Utilities/style.css'
import {Route, Switch} from 'react-router-dom'
import HeaderComponent from './header-component.js'
import LandingPage from './landing-page.js'
import CapsulesPage from './capsules-page.js'
import AddCapsulePage from './add-capsule.js'
import moment from 'moment'

let apiCall = 'https://timecapsule0220.herokuapp.com/api/capsules'
let AUTH_TOKEN = 'bd990ba4-228b-11ea-978f-2e728ce88125'


class App extends React.Component {
  

  constructor(){
    super()
    this.state = {
      capsules: [],
    }
  }



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
    fetch(`${apiCall}?auth=${AUTH_TOKEN}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json' },
      body: JSON.stringify(newCapsule)})
      .then(res => {
        if(res.ok){
          return res.json()
        }
      })
      .then(response => this.handleResponse(response))
      .catch(err => console.log(err))
    }

    getTime = (time) => {

      let unlock

      switch(time){
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

    handleResponse = (response) => {
      let updatedCapsules = this.state.capsules.concat(response)
      this.setState({
        capsules: updatedCapsules
      })
    }

  handleCapsules = (newCapsules) => {
    this.setState({
      capsules: newCapsules
    })
  }

  handleDelete = (id) => {
    let newCapsules = this.state.capsules.filter(capsule => capsule.id !== id)
    this.setState({
      capsules: newCapsules
    })
    fetch(`${apiCall}/${id}?auth=${AUTH_TOKEN}`, {
        method: 'DELETE'})
        .then(res => {
            if(res.ok){
                return res
            }
        })
        .catch(err => console.log(err))
      }

  getCapsules(){
    fetch(`${apiCall}?auth=${AUTH_TOKEN}`)
    .then(capsules => {
      if(capsules.ok){
        return capsules.json()
      }
    })
    .then(capsules => this.handleCapsules(capsules))
    .catch(err => (console.log(err)))
  }

  componentDidMount(){
    this.getCapsules()
  }

  render(){
  return (
    <main>
        <HeaderComponent/>
        <Switch>
          <Route exact path='/'>
            <LandingPage capsules={this.state.capsules}/>
          </Route>
          <Route exact path='/capsules'>
            <CapsulesPage capsules={this.state.capsules} handleDelete={this.handleDelete}/>
          </Route>
          <Route exact path='/addcapsule'>
            <AddCapsulePage handleNewData={this.handleNewData}/>
          </Route>
        </Switch>
    </main>
  );
}}

export default App;

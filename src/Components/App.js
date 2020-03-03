import React from 'react';
import '../Utilities/style.css'
import {Route, Switch} from 'react-router-dom'
import HeaderComponent from './header-component.js'
import LandingPage from './landing-page.js'
import CapsulesPage from './capsules-page.js'
import AddCapsulePage from './add-capsule.js'
import moment from 'moment'

let apiCall = 'https://timecapsule0220.herokuapp.com/api/capsules'
let AUTH_TOKEN ='bd990ba4-228b-11ea-978f-2e728ce88125'

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
    let unlockDate = (moment())
    if(data.time === 'oneminute'){unlockDate.add(1, 'minute')}
    else if(data.time === 'onehour'){unlockDate.add(1, 'hour')}
    else if(data.time === 'oneday'){unlockDate.add(1, 'day')}
    else if(data.time === 'threedays'){unlockDate.add(3, 'days')}
    else if(data.time === 'oneweek'){unlockDate.add(1, 'week')}
    else if(data.time === 'fourweeks'){unlockDate.add(4, 'weeks')}
    else if(data.time === 'halfayear'){unlockDate.add(6, 'months')}
    else if(data.time === 'oneyear'){unlockDate.add(1, 'years')}
    else if(data.time === 'twoyears'){unlockDate.add(2, 'years')}
    else if(data.time === 'fiveyears'){unlockDate.add(5, 'years')}
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

    handleResponse = (response) => {
      let updatedCapsules = this.state.capsules.concat(response)
      console.log(updatedCapsules)
      this.setState({
        capsules: updatedCapsules
      })
    }

  handleCapsules = (newCapsules) => {
    console.log(newCapsules)
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

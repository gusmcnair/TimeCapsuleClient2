import React from 'react';
import '../Utilities/style.css'
import {Route, Switch} from 'react-router-dom'
import HeaderComponent from './header-component.js'
import LandingPage from './landing-page.js'
import CapsulesPage from './capsules-page.js'
import AddCapsulePage from './add-capsule.js'

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
    let lockTime = 0
    if(data.time === 'oneminute'){lockTime = 60000}
    else if(data.time === 'onehour'){lockTime = 3600000}
    else if(data.time === 'oneday'){lockTime = 86400000}
    else if(data.time === 'threedays'){lockTime = 259200000}
    else if(data.time === 'oneweek'){lockTime = 604800000}
    else if(data.time === 'fourweeks'){lockTime = 2419200000}
    else if(data.time === 'halfayear'){lockTime = 15768000000}
    else if(data.time === 'oneyear'){lockTime = 31536000000}
    else if(data.time === 'twoyears'){lockTime = 63072000000}
    else if(data.time === 'fiveyears'){lockTime = 157680000000}
    let currDate = new Date
    let universalDate = currDate.getTime() + lockTime
    let expDate = new Date(universalDate)
    let buryDate = this.formatDate(currDate.toString())
    let openDate = this.formatDate(expDate.toString())
    let imageLink = !data.imagelink ? '' : data.imagelink
    console.log(data.title, data.content, imageLink, buryDate, openDate, universalDate)
    let newCapsule = {
      title: data.title,
      contents: data.content,
      imageurl: imageLink,
      burydate: buryDate,
      opendate: openDate,
      opennumber: universalDate,
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
      this.setState({
        capsules: updatedCapsules
      })
    }

    formatDate = (inputDate) => {
      console.log(inputDate)
      let dateArray = inputDate.split(' ')
      dateArray.shift();
      if(dateArray[0] === 'Jan'){dateArray[0] += 'uary'}
      if(dateArray[0] === 'Feb'){dateArray[0] += 'ruary'}
      if(dateArray[0] === 'Mar'){dateArray[0] += 'ch'}
      if(dateArray[0] === 'Apr'){dateArray[0] += 'il'}
      if(dateArray[0] === 'Jun'){dateArray[0] += 'e'}
      if(dateArray[0] === 'Jul'){dateArray[0] += 'y'}
      if(dateArray[0] === 'Aug'){dateArray[0] += 'ust'}
      if(dateArray[0] === 'Sep'){dateArray[0] += 'tember'}
      if(dateArray[0] === 'Oct'){dateArray[0] += 'ober'}
      if(dateArray[0] === 'Nov'){dateArray[0] += 'ember'}
      if(dateArray[0] === 'Dec'){dateArray[0] += 'ember'}
      dateArray[1] += ','
      dateArray[2] += ','
      let time = dateArray[3].split(':')
      time.pop()
      if(Number(time[0]) > 12){
          let hours = Number(time[0])
          time.shift()
          time.unshift(hours - 12)
          time.push('pm')
      } else {(time.push('am'))}
      let newArray = [dateArray[0], dateArray[1], dateArray[2], `${time[0]}:${time[1]}`, time[2]]
      return newArray.join(' ')
      }

  handleCapsules = (newCapsules) => {
    this.setState({
      capsules: newCapsules
    })
    console.log(this.state)
  }

  handleDelete = (id) => {
    let newCapsules = this.state.capsules.filter(capsule => capsule.id != id)
    this.setState({
      capsules: newCapsules
    })
    console.log(id)
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
    console.log(`${apiCall}?auth=${AUTH_TOKEN}`)
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
    console.log(this.state.capsules)
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

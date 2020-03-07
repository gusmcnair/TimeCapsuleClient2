import React from 'react'
import '../Utilities/style.css'
import ApiService from '../services/api-service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'

let clockFirst = <FontAwesomeIcon icon={faClock} />
let envelopeSecond = <FontAwesomeIcon icon={faEnvelopeOpenText} />

export default class IndividualCapsule extends React.Component {
    constructor() {
        super()
        this.state = {
            disabled: true,
            clock: clockFirst,
            status: ''
        }
    }

    //On mount, check if capsule is already open. If so, start with it open. If not, trigger a check every ten seconds.
    componentDidMount() {
        let currDate = moment.utc().format()
        let thisDate = moment.utc(this.props.dateExpires).format()
        if (currDate > thisDate) {
            this.setState({
                disabled: false,
                clock: envelopeSecond,
                status: 'OPEN'
            })
            document.getElementById(this.props.title + '_button').classList.add('makeorange')

            clearInterval(this.interval)
        } else {
            this.interval = setInterval(() =>
                this.checkDate(),
                10000
            )
        }
    }

    //Clear this interval when component unmounts.
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    //Check date/time every ten seconds. If the date is after the unlock date, unlock the capsule; otherwise keep checking.
    checkDate() {
        let currDate = moment.utc().format()
        let thisDate = moment.utc(this.props.dateExpires).format()
        if (currDate > thisDate) {
            this.setState({
                disabled: false,
                clock: envelopeSecond
            })
            document.getElementById(this.props.title + '_button').classList.add('makeorange')
            alert(`Your time capsule '${this.props.title}' just unlocked!`)
            this.setState({ status: 'OPEN' })
            clearInterval(this.interval)
        }
    }

    //When user opens a capsule, set message to LOADING. If this is the first open, make an API call.
    //Otherwise, just call the function that handles displaying the text.

    handleOpen = (id) => {
        if (document.getElementById(`${this.props.title}_contents`).innerHTML === '') {
            this.setState({
                status: 'LOADING...'
            })
            ApiService.getCapsulesById(id)
                .then(capsule => this.handleNewCapsule(capsule))
                .catch(err => this.handleCapsuleError())
        } else { this.handleAppearance() }
    }

    //If there's an error, put an ALERT in the user's browser.
    handleCapsuleError = () => {
        alert('There was an error with your request. Please check your internet connection and try again.')
        this.setState({ status: 'OPEN' })
        document.getElementById(this.props.title + '_button').classList.remove('makenavy')
    }

    //Change the UI to indicate the capsule has loaded, and alter the (currently hidden) capsule contents depending on
    //whether it includes an image.
    handleNewCapsule = (newCapsule) => {
        document.getElementById(this.props.title + '_button').classList.remove('makenavy')
        let image = document.createElement('img')
        if (newCapsule.imageurl !== '') {
            image.src = newCapsule.imageurl
            image.alt = this.props.title
        }
        document.getElementById(this.props.title + '_button').classList.add('makeorange')
        if (image.src) {
            document.getElementById(`${this.props.title}_image`).classList.add('imagecontainer')
            document.getElementById(`${this.props.title}_image`).append(image)
        }
        document.getElementById(`${this.props.title}_contents`).append(newCapsule.contents)
        this.handleAppearance()
    }

    //Handle slide-open of the capsule to display its contents, or slide-close.
    handleAppearance = () => {
        let element = document.getElementById(this.props.title)
        let thisButton = document.getElementById(this.props.title + '_button')
        if (!element.classList.contains('show')) {
            this.setState({ status: 'CLOSE' })
            thisButton.classList.add('makenavy')
            thisButton.classList.remove('makeorange')
            element.classList.add('show')
            element.style.height = 'auto';
            let height = element.clientHeight + 'px';
            element.style.height = '0px';
            setTimeout(function () {
                element.style.height = height;
            }, 0)
        } else {
            this.setState({ status: 'OPEN' })
            thisButton.classList.add('makeorange')
            thisButton.classList.remove('makenavy')
            element.style.height = '0px';
            element.addEventListener('transitionend', function () {
                element.classList.remove('show')
            }, {
                once: true
            })
        }
    }

    render() {

        //Get dates in correct format to display on capsule.
        let dateCreated = `${moment.utc(this.props.dateCreated).local().format('MMMM D, YYYY, h:mm a').toString()}`
        let dateExpires = `${moment.utc(this.props.dateExpires).local().format('MMMM D, YYYY, h:mm a').toString()}`

        return (
            <article>
                <div className='capsule'>

                    <div className='textcontainer'>
                        <div className='insidecontainer'>
                            <h3>{this.props.title}</h3>
                            <p className='burieddata'>Buried on {dateCreated}</p><p className='burieddata'>Don't open until {dateExpires}</p>
                        </div>
                    </div>

                    <div className='textcontainer'>
                        <button disabled={this.state.disabled} onClick={e => this.handleOpen(this.props.id)} className='opencapsule' id={this.props.title + '_button'}>{this.state.clock}
                        </button>
                        <p className='opentext '>{this.state.status}</p>
                    </div>

                </div>
                <div id={this.props.title} className='capsule-contents'>
                    <div className='contents-container'>
                        <div id={this.props.title + '_image'}></div>
                        <p id={this.props.title + '_contents'}></p>
                        <button name='delete' id='delete' onClick={e => this.props.handleDelete(this.props.id)}>Delete</button>
                    </div>
                </div>
            </article>
        )
    }
}
import React from 'react'
import '../Utilities/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'

let clockFirst = <FontAwesomeIcon icon={faClock} />
let envelopeSecond = <FontAwesomeIcon icon={faEnvelopeOpenText} />

let apiCall = 'https://timecapsule0220.herokuapp.com/api/capsules'
let AUTH_TOKEN = 'bd990ba4-228b-11ea-978f-2e728ce88125'

export default class IndividualCapsule extends React.Component {
    constructor() {
        super()
        this.state = {
            disabled: true,
            dateexpires: 0,
            currentdate: 0,
            clock: clockFirst,
            status: ''
        }
    }

    componentDidMount() {
        let currDate = Date.now()
        this.setState({
            dateexpires: this.props.dateexpires
        })
        if (currDate > this.props.dateexpires) {
            this.setState({
                disabled: false,
                clock: envelopeSecond,
                status: 'OPEN'
            })
            document.getElementById(this.props.title + '_button').classList.add('makeblue')

            clearInterval(this.interval)
        } else {
            this.interval = setInterval(() =>
                this.checkDate(),
                10000
            )
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    checkDate() {
        let currDate = Date.now()
        if (currDate > this.props.dateexpires) {
            this.setState({
                disabled: false,
                clock: envelopeSecond
            })
            document.getElementById(this.props.title + '_button').classList.add('makered')
            alert(`Your time capsule '${this.props.title}' just unlocked!`)
            this.setState({status: 'OPEN'})
            clearInterval(this.interval)
        }
    }

    handleOpen = (id) => {
        fetch(`${apiCall}/${id}?auth=${AUTH_TOKEN}`)
            .then(capsule => {
                if (capsule.ok) {
                    return capsule.json()
                }
            })
            .then(capsule => this.handleNewCapsule(capsule))
            .catch(err => console.log(err))
    }

    handleNewCapsule = (newCapsule) => {
        document.getElementById(this.props.title + '_button').classList.remove('makered')
        let image = document.createElement('img')
        if (newCapsule.imageurl !== '') {
            image.src = newCapsule.imageurl
            image.alt = this.props.title
        }
        if (document.getElementById(`${this.props.title}_contents`).innerHTML == '') {
            document.getElementById(this.props.title + '_button').classList.add('makeblue')
            if (image.src) {
                document.getElementById(`${this.props.title}_image`).classList.add('imagecontainer')
                document.getElementById(`${this.props.title}_image`).append(image)
            }
            document.getElementById(`${this.props.title}_contents`).append(newCapsule.contents)
        }
        this.handleAppearance()
    }

    handleAppearance = () => {
        let element = document.getElementById(this.props.title)
        let thisButton = document.getElementById(this.props.title + '_button')
        if (!element.classList.contains('show')) {
            this.setState({status: 'CLOSE'})
            thisButton.classList.add('makered')
            thisButton.classList.remove('makeblue')
            element.classList.add('show')
            element.style.height = 'auto';
            let height = element.clientHeight + 'px';
            console.log(document.getElementById(`${this.props.title}_image`).clientHeight)
            element.style.height = '0px';
            setTimeout(function () {
                element.style.height = height;
            }, 0)
        } else {
            this.setState({status: 'OPEN'})
            thisButton.classList.add('makeblue')
            thisButton.classList.remove('makered')
            element.style.height = '0px';
            element.addEventListener('transitionend', function () {
                element.classList.remove('show')
            }, {
                once: true
            })
        }
    }

    render() {

        return (
            <article>
                <div className='capsule'>
                <div className='textcontainer'>
                    <button disabled={this.state.disabled} onClick={e => this.handleOpen(this.props.id)} className='opencapsule' id={this.props.title + '_button'}>{this.state.clock}<span className='opentext'>{this.state.status}</span></button>
                    </div>
                    <div className='textcontainer'>
                        <div className='insidecontainer'>
                            <h3>{this.props.title}</h3>
                            <p>Buried on {this.props.datecreated}</p><p>Don't open until {this.props.datexpireshuman}</p>
                        </div>
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
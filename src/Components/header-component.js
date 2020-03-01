import React from 'react'
import '../Utilities/style.css'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


export default class HeaderComponent extends React.Component {
    render(){
        return(
            <header>
                <Link to='/capsules'>
                <h1 className='starheader'>
                    <FontAwesomeIcon icon={faStar} /></h1>
                    <h1>Time Capsule</h1>
                </Link>
            </header>
        )
    }
}
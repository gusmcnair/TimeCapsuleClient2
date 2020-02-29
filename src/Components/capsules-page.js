import React from 'react'
import '../Utilities/style.css'
import { Link } from 'react-router-dom'
import IndividualCapsule from './IndividualCapsule.js'


export default class CapsulesPage extends React.Component {
    render() {
        return (
            <section className='animated fadeIn'>
                {this.props.capsules.map((capsule) =>
                    <IndividualCapsule
                        key={capsule.id}
                        id={capsule.id}
                        title={capsule.title}
                        datecreated={capsule.burydate}
                        dateexpires={capsule.opennumber}
                        datexpireshuman={capsule.opendate}
                        contents={this.props.contents}
                        handleDelete={this.props.handleDelete}
                    />
                )}
                <div class='addnewcontainer'>
                    <Link to='/addcapsule'>
                        <button id='addnew'>Add new capsule</button>
                    </Link>
                </div>
            </section>
        )
    }
}
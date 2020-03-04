import React from 'react'
import '../Utilities/style.css'
import {Link} from 'react-router-dom';

export default class LandingPage extends React.Component {


    render(){
        const renderLoadingButton = () => {
            if(this.props.capsules.length !== 0){
                return(
                    <Link to='/capsules'>
                        <button className='enter-button' >
                            Enter            
                        </button>
                    </Link>
                )
            } else if(this.props.error === true){
                return(
                    <div className='errordiv'>
                        Unfortunately, there was an error loading your capsules. Please check your internet connection and try refreshing the page.
                    </div>
                )
            } else {
                return(<div className='loader'></div>)
            }
        }

        return(
            <section className='animated fadeIn'>
              <p className='explainer'>Time Capsule is an app for sending messages that can be accessed only by your future self, whether tomorrow, a month from now, or in five years. Use it to send reminders, pass encouragement to a future version of you, or just document what your life is like right now.</p>
                <div className='button-container'>
                    {renderLoadingButton()}
                </div>
            </section>
        )
    }
}
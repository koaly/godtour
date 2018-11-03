import React, { Component } from 'react';
class TourIntroduce extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user: this.props.user
         }
    }
    render() { 
        const user = this.state;
        return (
            <div className="container">
                <div className="profile-container bglight mgtb">
                    <center>
                        <h2 className="mt-5 mgbii">Why Tour With To-ur world ?</h2>
                        <div className="Introduce">
                            <h3>Can Create Your Own Tour</h3>
                            <p>We will make your dream trip come true, just tell me your wish.</p>
                        </div>
                        <div className="Introduce">
                            <h3>Can Create Your Own Tour</h3>
                            <p>We will make your dream trip come true, just tell me your wish.</p>
                        </div>
                        <div className="Introduce">
                            <h3>Can Create Your Own Tour</h3>
                            <p>We will make your dream trip come true, just tell me your wish.</p>
                        </div>
                        <div className="Introduce">
                            <h3>Can Create Your Own Tour</h3>
                            <p>We will make your dream trip come true, just tell me your wish.</p>
                        </div>
                        <div className="Introduce">
                            <h3>Can Create Your Own Tour</h3>
                            <p>We will make your dream trip come true, just tell me your wish.</p>
                        </div>
                        <a href="/tour">
                            <button className="but" >
                                 Book Tour Now
                            </button>
                        </a>
                        
                        
                        {/*{user.info.status===0 && <a href="/tour">
                            <button className="but" >
                                Book Tour Now
                            </button>
                        </a>}

                        {user.info.status!==0 && <a href="/edittour">
                            <button className="but" >
                                Edit Tour Now
                            </button>
                        </a>}*/}

                        
                    </center>
                </div>
            </div> 
         );
    }
}
 
export default TourIntroduce;
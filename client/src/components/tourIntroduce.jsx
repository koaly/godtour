import React, { Component } from 'react';
import {Link} from 'react-router-dom';
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
                            <p>We will make your dream trip come true, just tell me us wish.</p>
                            <img src="https://cdn4.iconfinder.com/data/icons/world-travel-guide/512/travel-13-512.png" alt="" height="200px" width="200px"/>
                        </div>
                        <div className="Introduce">
                            <h3>Save Money</h3>
                            <p>Wonderful trip with low price and no booking fee.</p>
                            <img src="https://cdn0.iconfinder.com/data/icons/finance-65/100/HAND_MONEY-512.png" alt="" height="200px" width="200px"/>
                        </div>
                        <div className="Introduce">
                            <h3>Guarantee</h3>
                            <p>If you have a problem during the trip, you will get your money back.</p>
                            <img src="https://png.icons8.com/ios/1600/guarantee-filled.png" alt="" height="200px" width="200px"/>
                        </div>
                        <div className="Introduce">
                            <h3>Special Discount</h3>
                            <p>Special price for VIP user.</p>
                            <img src="http://cdn.onlinewebfonts.com/svg/img_456356.png" alt="" height="200px" width="200px"/>
                        </div>
                        
                        <Link to="/tours">
                            <button className="but">Book Tour Now</button>
                        </Link>
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
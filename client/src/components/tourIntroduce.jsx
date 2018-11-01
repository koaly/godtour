import React, { Component } from 'react';
class TourIntroduce extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div className="container">
                <center>
                    <h2 className="mt-5 mgbi">Why Tour With To-ur world ?</h2>
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
                    
                </center>
            </div> 
         );
    }
}
 
export default TourIntroduce;
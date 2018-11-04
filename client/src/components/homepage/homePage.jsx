import React, { Component } from "react";
import "./hompage.css";
import Form from "../common/form";
import { NotificationsIcon } from "mdi-react";
import Spinner from "../common/spinner";

const URL = "https://jsonplaceholder.typicode.com/users";
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoaded: false
    };
  }
  //do when this componnet is load
  componentDidMount() {
    this.getUser();
  }
  //fetch user from localhost:5000/
  getUser() {
    //don't need to config proxy
    fetch(URL)
      .then(res => {
        res.json();
      })
      .then(json => {
        return this.setState({
          users: json,
          isLoaded: true
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderUser() {
    return this.state.users.map(user => <li>{user.message}</li>);
  }
  render() {
    const { isLoaded, users } = this.state;
    if (!isLoaded) {
      return <Spinner />
    } else {
      return (
        <div className="HomePage">
          {/*<div classNameName="homepage-image">
            <h1>Let's go to your world</h1>
            <p>
              Find the best place to fulfill your wonderful vacay on TO.UR WORLD!
            </p>
            </div>
          
             */}
          <div
            id="carouselExampleIndicators"
            className="carousel slide mb-5"
            data-ride="carousel"
          >
            <ol className="carousel-indicators">
              <li
                data-target="#carouselExampleIndicators"
                data-slide-to="0"
                className="active"
              />
              <li data-target="#carouselExampleIndicators" data-slide-to="1" />
              <li data-target="#carouselExampleIndicators" data-slide-to="2" />
            </ol>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  width="640"
                  height="360"
                  src="https://i.ytimg.com/vi/ThL503sFZmw/maxresdefault.jpg"
                  alt="First slide"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>TO-UR WORLD</h5>
                  <p>Nuttapon Wachakitwanit</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100 "
                  width="640"
                  height="360"
                  src="https://www.japan-guide.com/thumb/XYZeXYZe2172_1680.jpg"
                  alt="Second slide"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>TO-UR WORLD</h5>
                  <p>Nuttapon Wachakitwanit</p>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  width="640"
                  height="360"
                  src="https://www.japan-guide.com/thumb/XYZeXYZe2172_1680.jpg"
                  alt="Third slide"
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>TO-UR WORLD</h5>
                  <p>Nuttapon Wachakitwanit</p>
                </div>
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true" />
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleIndicators"
              role="button"
              data-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true" />
              <span className="sr-only">Next</span>
            </a>
          </div>

          <div className="newsletterr">
            <div className="a b">
              <div className="c">
                <p className="ab">
                  "Subscribe now FREE! to get our update information for the best deals and discount on your wonderful trip"
                </p>
              </div>
              <div className="ac">
                <div className="ad">
                  {/* insert email from plz */}
                </div>
              </div>
              <div className="ae">
                <button className="ba" >
                  <NotificationsIcon className="ayy" />Subscribe
                </button>
              </div>
            </div>
          </div>

          <ul>
            {users &&
              users.map(user => (
                <li key={user.id}>
                  {user.name}|{user.email}
                </li>
              ))}
            ;
          </ul>
        </div>
      );
    }
  }
}

export default HomePage;

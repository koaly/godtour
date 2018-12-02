import React, { Component } from "react";
import NavBar from "./components/common/navBar";
import Footer from "./components/common/footer";
import ShowTour from "./components/tour/showTour";
import TourIntroduce from "./components/tour/tourIntroduce";
import ShowUser from "./components/user/showUser";
import ShowRequest from "./components/requestStatus/showRequest";
import HomePage from "./components/homepage/homePage";
import NotFound from "./components/common/notFound";
import Profile from "./components/profile/profile";
import AddTourForm from "./components/tour/addTourForm";
import EditTourForm from "./components/tour/editTourForm";
import RegisterForm from "./components/user/registerForm";
import LoginForm from "./components/user/loginForm";
import Logout from "./components/user/logout";
import MyBook from "./components/profile/myBooking";
import CancelBook from "./components/cancelBook";
import MyCard from "./components/profile/myCard";
import OneTour from "./components/tour/oneTour";
import OneUser from "./components/user/oneUser";
import PurchaseList from "./components/profile/purchaseList";
import TestFetch from "./components/fetch/example/FetchTest";
import TestPost from "./components/fetch/example/PostTest";
import auth from "./services/authService";
import CreateTourForm from "./components/tour/createTourForm";
import SumDataCreateTour from "./components/tour/sumDataCreateTour";
import MyTour from "./components/profile/myTour";
import RequestStatusForm from "./components/requestStatus/requestStatusForm";
import MyTiy from "./components/profile/myTiy";
import AllTiys from "./components/tour/allTiys";
import CreateOffer from "./components/tour/createOffer";
import TiyOffered from "./components/profile/tiyOffered";

import { Route, Switch, Router, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MyOffer from "./components/profile/myOffer";
import { ScrollToTop } from "./components/common/scrollToTop";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: [],
      jwt: null,
      isLoaded: false
    };
  }

  // getJWT() {
  //   const jwt = localStorage.getItem("token");
  //   if (jwt) {
  //     const user = jwtDecode(jwt);
  //     this.setState({ user, jwt });
  //   }
  // }

  componentDidMount() {
    const user = auth.getCurrentUser();
    const jwt = auth.getJwt();
    this.setState({ user, jwt, isLoaded: true });
    // this.getJWT();
    // this.setState({ isLoaded: true });
  }

  render() {
    const { jwt, user, isLoaded } = this.state;
    console.log(jwt);
    if (!isLoaded) {
      return <h1>isLoading</h1>;
    }
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <div>
          <Route component={ScrollToTop} />
          {
            <Switch>
              <Route path="/" exact to component={HomePage} />
              <Route path="/tours?page=1" component={ShowTour} />
              <Route path="/not-found" component={NotFound} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/request" component={RequestStatusForm} />
              <Route
                path="/tourIntroduce"
                render={() => <TourIntroduce user={user} />}
              />
              <Route path="/login" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route
                path="/tours/:id"
                render={props => <OneTour {...props} token={jwt} user={user} />}
              />
              <Route
                path="/allTiys"
                render={props => <AllTiys {...props} token={jwt} user={user} />}
              />
              <Route
                path="/:id/createOffer"
                render={props => (
                  <CreateOffer {...props} token={jwt} user={user} />
                )}
              />
              <Route
                path="/users/:username"
                render={props => (
                  <OneUser {...props} token={jwt} currentUser={user} />
                )}
              />
              <Route
                path="/tours"
                render={props => <ShowTour {...props} token={jwt} />}
              />
              <Route
                path="/users"
                render={props => (
                  <ShowUser {...props} token={jwt} userr={user} />
                )}
              />
              <Route
                path="/admin/request"
                render={props => (
                  <ShowRequest {...props} token={jwt} userr={user} />
                )}
              />
              <Route
                path="/createTour"
                render={props => (
                  <CreateTourForm {...props} token={jwt} user={user} />
                )}
              />
              <Route
                path="/sumDataCreateTour"
                render={props => (
                  <SumDataCreateTour {...props} token={jwt} user={user} />
                )}
              />
              <Route path="/addTour" component={AddTourForm} />
              <Route
                path="/editTour/:id"
                render={props => (
                  <EditTourForm {...props} token={jwt} user={user} />
                )}
              />
              <Route path="/cancelBook" component={CancelBook} />
              <Route
                path="/profile/myBooking"
                render={props => <MyBook {...props} user={user} token={jwt} />}
              />
              <Route
                path="/profile/myTour"
                render={props => <MyTour {...props} user={user} />}
              />
              <Route
                path="/profile/offered"
                render={props => <TiyOffered {...props} user={user} />}
              />

              <Route
                path="/profile/myOffer"
                render={props => <MyOffer {...props} user={user} />}
              />
              <Route
                path="/profile/myCard"
                render={() => <MyCard user={user} />}
              />
              <Route
                path="/profile/purchaseList"
                render={() => <PurchaseList user={user} />}
              />
              <Route
                path="/profile/myTiy"
                render={() => <MyTiy user={user} />}
              />
              <Route path="/profile" render={() => <Profile user={user} />} />
              <Route path="/testfetch" component={TestFetch} />
              <Route path="/testpost" component={TestPost} />
              <Redirect to="/not-found" />
            </Switch>
          }
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;

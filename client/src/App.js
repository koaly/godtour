import React, { Component } from "react";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import ShowTour from "./components/showTour";
import TourIntroduce from "./components/common/tour/tourIntroduce";
import ShowUser from "./components/showUser";
import ShowRequest from "./components/showRequest";
import HomePage from "./components/homepage/homePage";
import NotFound from "./components/notFound";
import Profile from "./components/profile";
import AddTourForm from "./components/addTourForm";
import EditTourForm from "./components/editTourForm";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import MyBook from "./components/myBooking";
import CancelBook from "./components/cancelBook";
import MyCard from "./components/myCard";
import OneTour from "./components/oneTour";
import OneUser from "./components/oneUser";
import PurchaseList from "./components/purchaseList";
import TestFetch from "./components/fetch/example/FetchTest";
import TestPost from "./components/fetch/example/PostTest";
import auth from "./services/authService";
import CreateTourForm from "./components/createTourForm";
import SumDataCreateTour from "./components/sumDataCreateTour";
import MyTour from "./components/myTour";
import RequestStatusForm from "./components/requestStatusForm";
import MyTiy from "./components/myTiy";

import { Route, Switch, Router, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import MyOffer from "./components/myOffer";

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
          <Switch>
            <Route path="/" exact to component={HomePage} />
            <Route path="/tour" component={ShowTour} />
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
              path="/tours/id=:id"
              render={props => <OneTour {...props} token={jwt} user={user} />}
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
              render={props => <ShowUser {...props} token={jwt} userr={user} />}
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
            <Route path="/editTour" component={EditTourForm} />
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
            <Route path="/profile/myTiy" render={() => <MyTiy user={user} />} />
            <Route path="/profile" render={() => <Profile user={user} />} />
            <Route path="/testfetch" component={TestFetch} />
            <Route path="/testpost" component={TestPost} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;

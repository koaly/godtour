import React, { Component } from "react";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import ShowTour from "./components/showTour";
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
import PurchaseList from "./components/purchaseList";
import TestFetch from "./components/fetch/example/FetchTest";
import TestPost from "./components/fetch/example/PostTest";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {

  constructor() {
    super();
    this.state = {
      user: [],
      jwt: null,
      isLoaded: false
    }
  }

  getJWT() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      const user = jwtDecode(jwt);
      this.setState({ user, jwt });
    }
  }

  componentDidMount() {
    this.getJWT()
    this.setState({ isLoaded: true })
  }

  render() {
    const { user, isLoaded } = this.state

    if (!isLoaded) {
      return <h1>isLoading</h1>
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
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/addTour" component={AddTourForm} />
            <Route path="/editTour" component={EditTourForm} />
            <Route path="/cancelBook" component={CancelBook} />
            <Route path="/profile/myBooking" render={() => <MyBook user={user} />}
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
              path="/profile"
              render={() => <Profile user={user} />}
            />
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

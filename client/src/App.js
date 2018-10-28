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
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
      console.log(user);
    } catch (ex) {}
  }
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <div>
          <Switch>
            <Route path="/tour" component={ShowTour} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact to component={HomePage} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/addTour" component={AddTourForm} />
            <Route path="/editTour" component={EditTourForm} />
            <Route path="/cancelBook" component={CancelBook} />
            <Route path="/profile/myBooking" component={MyBook} />
            <Route path="/profile/myCard" component={MyCard} />
            <Route path="/profile/purchaseList" component={PurchaseList} />
            <Route path="/profile" component={Profile} />
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

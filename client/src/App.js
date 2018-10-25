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
import MyBook from "./components/myBooking";
import CancelBook from "./components/cancelBook";
import MyCard from "./components/myCard";
import PurchaseList from "./components/purchaseList";
import TestFetch from "./components/fetch/FetchTest";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div>
          <Switch>
            <Route path="/tour" component={ShowTour} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact to component={HomePage} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/addTour" component={AddTourForm} />
            <Route path="/editTour" component={EditTourForm} />
            <Route path="/cancelBook" component={CancelBook} />
            <Route path="/profile/myBooking" component={MyBook} />
            <Route path="/profile/myCard" component={MyCard} />
            <Route path="/profile/purchaseList" component={PurchaseList} />
            <Route path="/profile" component={Profile} />
			<Route path="/test_fetch" component={TestFetch} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;

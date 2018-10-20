import React, { Component } from "react";
import NavBar from "./components/navBar";
import Footer from "./components/footer";
import ShowTour from "./components/showTour";
import HomePage from "./components/homePage";
import NotFound from "./components/notFound";
import Profile from "./components/profile";
import AddTour from "./components/addTour";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import MyBook from "./components/myBooking";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="container">
          <Switch>
            <Route path="/tour" component={ShowTour} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact to component={HomePage} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/profile/myBooking" component={MyBook} />
            <Redirect to="/not-found" />
          </Switch>
          <Footer/>
        </div>
        
      </React.Fragment>
    
    );
  }
}

export default App;

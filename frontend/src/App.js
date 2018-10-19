import React, { Component } from "react";
import NavBar from "./components/navBar";
import ShowTour from "./components/showTour";
import HomePage from "./components/homePage";
import NotFound from "./components/notFound";
import Profile from "./components/profile";
import AddTour from "./components/addTour";
import Register from "./components/register";
import MyBook from "./components/myBooking";
import { Route, Switch, Redirect} from "react-router-dom";
import "./App.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container-fluid">
          <Switch>
            <Route path="/tour" component={ShowTour} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact to component={HomePage} />
            <Route path="/register" component={Register} />
            <Route path="/profile/myBooking" component={MyBook} />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;

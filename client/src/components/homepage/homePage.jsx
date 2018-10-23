import React, { Component } from "react";
import axios from 'axios';
import './hompage.css'


//GET URL
const API = "http://localhost:5000/";
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: false,
      error: null,
    }
  }
  //when load this componet do
  async componentDidMount() {
    try {
      this.setState({ isLoading: true })
      //axios like fetch
      const response = await axios.get(API);
      this.setState(
        {
          data: response.data,
          isLoading: false,
        }
      );
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      })
    }
  }

  getMessage() {
    return this.state.data.message;
  }
  render() {
    const { data, isLoading, error } = this.state;
    //if not fetch
    if (error) {
      return <div><h1>Run cd test-app && npm start first{error.message}</h1></div>
    }
    //if fetching
    if (isLoading) {
      return <div><h1>Loading </h1></div>
    }
    console.log(JSON.stringify(data));
    //some one plz print json 
    //i can't
    /*
    if (data) {
      const nameList = data.users.map(function (user) {
        console.log(JSON.stringify(user));
        return <p>hi</p>
      })
    }
    */
    return (

      <div>
        <div className="homepage-image">
          <h1>Let's go to your world</h1>
          <p>
            Find the best place to fulfill your wonderful vacay on TO.UR WORLD!
          </p>
        </div>
        <div>
        </div>
        <h1>
          {this.getMessage()}
        </h1>
        <div>
        </div>
      </div>
    );
  }
}

export default HomePage;

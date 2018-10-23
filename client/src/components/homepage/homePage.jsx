import React, { Component } from "react";
import './hompage.css'

const URL = 'https://jsonplaceholder.typicode.com/users'
class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      isLoaded: false,
    }
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
        res.json()
      })
      .then(json => {
        return this.setState({
          users: json,
          isLoaded: true
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  renderUser() {
    return this.state.users.map(user => (
      <li>{user.message}</li>
    ))
  }
  render() {
    const { isLoaded, users } = this.state;
    if (!isLoaded) {
      return <h1>Loading</h1>
    } else {

      return (
        <div className="HomePage">
          <div className="homepage-image">
          <h1>Let's go to your world</h1>
          <p>
            Find the best place to fulfill your wonderful vacay on TO.UR WORLD!
          </p>
        </div>
          <ul>
            {users && users.map(user => (
              <li key={user.id}>
                {user.name}|{user.email}
              </li>
            ))};
        </ul>
        </div>
      )
    }
  }
}

export default HomePage;

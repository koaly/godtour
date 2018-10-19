import React, { Component } from "react";

class Register extends Component {
  render() {
    return (
        <div>
            <main className="container mt-4">
                <h1 className="mb-5">Register</h1>
                <form action="/user/signup" method="post">
                    <form-group>
                         <label className="mb-2">First Name: </label>
                         <input type="text" className="form-control mb-3" name="firstname"/>
                    </form-group>
                    <form-group>
                         <label>Last Name: </label>
                         <input type="text" className="form-control mb-3" name="lastname"/>
                    </form-group>
                    <form-group>
                         <label>Gender: </label>
                            <select className="form-control mb-3" name="gender">
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                    </form-group>
                    <form-group>
                         <label>Email: </label>
                         <input type="email" className="form-control mb-3" name="email"/>
                    </form-group>
                    <form-group>
                         <label>Username: </label>
                         <input type="text" className="form-control mb-3" name="username"/>
                    </form-group>
                    <form-group>
                         <label>Password: </label>
                         <input type="password" className="form-control mb-3" name="password"/>
                    </form-group>
                    <form-group>
                         <label>Confirm: </label>
                         <input type="password" className="form-control mb-5" name="password2"/>
                    </form-group>
                    <input type="submit" value="Submit" className="btn btn-primary mb-3"/>
                </form>
            </main>
        </div>

    );

  }
}

export default Register;
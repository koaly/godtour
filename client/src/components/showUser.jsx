import React, { Component } from "react";
import Axios from "axios";
import { getAllUsers } from "../services/allUserService";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default class ShowUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoaded: false,
            userr: this.props.userr
        };
    }
    async getUser() {
        try {
            const result = await getAllUsers();
            const { user } = result.data.users;

            toast.info("Update UserList")
            this.setState({ users: user });
        } catch (e) {
            console.log(e);
        }

    }
    async componentDidMount() {
        await this.getUser();
        this.setState({ isLoaded: true });
    }
    render() {
        const { users, isLoaded, userr } = this.state;
        const userzero = users.filter(u => u.status === 1);
        const operator = users.filter(u => u.status !== 2);
        if (!isLoaded) {
            return (
                <div className="container text-align">

                </div>
            )
        }
        console.log(users);
        if (!users || users.length == 0) {
            return <h1>notFoundUser</h1>;
        }
        return (
            <div className="container mgtb">
                <div className="profile-container bgdark">
                    <h1 className="user-head">User List</h1>
                    {userr.info.status === 0 &&
                        <ul>
                            {userzero.map((user, i) => (
                                <li key={i}>
                                    <div className="user-content">
                                        <p>
                                            Display Name : {user.displayName}
                                        </p>
                                        <p>
                                            Email Address : {user.email}
                                        </p>
                                        <p>
                                            <Link to={`/users/${user.username}`}>See more</Link>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>}
                    {userr.info.status === 1 &&
                        <ul>
                            {operator.map((user, i) => (
                                <li key={i}>

                                    <div className="user-content">
                                        <p>
                                            Display Name : {user.displayName}
                                        </p>
                                        <p>
                                            Email Address : {user.email}
                                        </p>
                                        <p>
                                            <Link to={`/users/${user.username}`}>See more</Link>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>}
                    {userr.info.status === 2 &&
                        <ul>
                            {users.map((user, i) => (
                                <li key={i}>
                                    <div className="user-content">
                                        <p>
                                            Display Name : {user.displayName}
                                        </p>
                                        <p>
                                            Email Address : {user.email}
                                        </p>
                                        <p>
                                            <Link to={`/users/${user.username}`}>See more</Link>
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>}
                </div>
            </div>
        );
    }
}
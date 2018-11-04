import React, { Component } from "react"
import { getAllUsers } from "../../services/userService";
import { toast } from "react-toastify";
import Spinner from "./spinner";
import Link from "react-router-dom/Link";


export default class UserBoxList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoaded: false,

            pageSize: 4,
            currentPage: 1,
        }
    }

    async getUser() {
        try {
            const result = await getAllUsers()
            const { user } = result.data.users;

            toast.info("Update UserList")
            this.setState({ users: user });
        } catch (e) {
            const { message } = e.response.data.error
            toast.error(`${message}`)
        }
    }

    async componentDidMount() {
        await this.getUser();
        this.setState({ isLoaded: true });
    }

    render() {
        const { users, isLoaded } = this.state
        if (!isLoaded) {
            return (
                <div className="container text-align">
                    <div className="user-content">
                        <Spinner />
                    </div>
                </div>
            )
        }

        return (
            <div className="profile-continer bgdark">
                <h1 className="user-head">User List</h1>
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
                </ul>
            </div>
        )
    }
}
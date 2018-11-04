import React, { Component } from "react"
import { getAllUsers } from "../../services/userService";
import { toast } from "react-toastify";
import Spinner from "./spinner";
import Link from "react-router-dom/Link";
import { paginate } from "../../utility/paginate";


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

    handlePageChange = (page) => {
        this.setState({ currentPage: page })
    }

    render() {
        const { users, isLoaded, currentPage, pageSize } = this.state
        const { length: count } = this.state.users
        const selectUsers = paginate(users, currentPage, pageSize)

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
                    {selectUsers.map((user, i) => (
                        <li key={i}>
                            <div className="user-content mx-3 my-3">
                                <div className="profile-infor mx-3 my-3">
                                    <h5>
                                        Display Name : {user.displayName}
                                    </h5>
                                    <h5>
                                        Email Address : {user.email}
                                    </h5>
                                    <h5>
                                        <Link to={`/users/${user.username}`}>See more</Link>
                                    </h5>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div >
        )
    }
}
import React, { Component } from "react"
import { NavLink } from "react-router-dom"
export default class LinkProfileBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.user
        }
    }

    render() {
        const { user } = this.state
        const { status } = user.info

        if (status === 0) {
            return (
                <ul className="nav flex-column nav-pills pdb pdl">
                    <img
                        className="profileimg mgt img-thumbnail rounded"
                        src={user.info.imgsrc}
                        alt="profile"
                    />
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/profile">
                            <span className="black">Profile</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/myCard">
                            <span className="black">My Cards</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/purchaseList">
                            <span className="black">Purchase List</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/myBooking">
                            <span className="black">My Booking</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/myCard">
                            <span className="black">Offers</span>
                        </NavLink>
                    </li>
                </ul>
            )
        } else if (status === 1) {
            return (
                <ul className="nav flex-column nav-pills pdb pdl">
                    <img
                        className="profileimg mgt img-thumbnail rounded"
                        src={user.info.imgsrc}
                        alt="profile"
                    />
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/profile">
                            <span className="black">Profile</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/myCard">
                            <span className="black">My Cards</span>
                        </NavLink>
                    </li>
                    < li className="nav-item">
                        <NavLink className="nav-link" to="/profile/myTour">
                            <span className="black">My Tour</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/myCard">
                            <span className="black">My Offers</span>
                        </NavLink>
                    </li>
                </ul>
            )
        } else {
            return (
                <ul className="nav flex-column nav-pills pdb pdl">
                    <img
                        className="profileimg mgt img-thumbnail rounded"
                        src={user.info.imgsrc}
                        alt="profile"
                    />
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/profile">
                            <span className="black">Profile</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/myCard">
                            <span className="black">My Cards</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/purchaseList">
                            <span className="black">Purchase List</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/myBooking">
                            <span className="black">My Booking</span>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/profile/myCard">
                            <span className="black">My Offers</span>
                        </NavLink>
                    </li>
                    < li className="nav-item">
                        <NavLink className="nav-link" to="/profile/myTour">
                            <span className="black">My Tour</span>
                        </NavLink>
                    </li>
                </ul>
            )
        }
    }
}
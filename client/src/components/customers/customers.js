import React, { Component } from 'react';
import './customers.css';


//form tutorlia
class Customers extends Component {
    constructor() {
        super()
        this.state = {
            customers: []
        }
    }
    componentDidMount() {
        //see in chrome console
        //see in chrome console
        //see in chrome console
        fetch('/api/customers')
            .then(res => res.json())
            .then(customers => this.setState({ customers }, () => console.log(`Customers fetched..`, customers)))
            .catch(err => console.log("Can't FIND "))
    }
    render() {
        return (
            <div>
                <h2>Customers</h2>
                <ul>
                    {this.state.customers.map(customers =>
                        <li key={customers.id}>{customers.firstName} {customers.lastName}</li>
                    )}
                </ul>
            </div>
        );
    }
}

export default Customers;

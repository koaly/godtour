import React, { Component } from 'react';
import './example.css';

class Example extends Component {
    constructor() {
        super()
        this.state = {
            count: 0,
            items: []
        }
    }
    componentDidMount() {
        //see in chrome console
        fetch('/api/example')
            .then(res => res.json())
            .then(items => this.setState({ items }, () => console.log(`Customers fetched..`, items)))
            .catch(err => console.log("Can't FIND "))
    }
    render() {
        console.log(this.state.items);
        return (
            <div>
                <h2>Items</h2>
                <ul>
                </ul>
            </div>
        );
    }
}

export default Example;
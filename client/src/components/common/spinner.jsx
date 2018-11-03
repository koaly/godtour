import React from 'react';
import { css } from 'react-emotion';
// First way to import
import { HashLoader } from 'react-spinners';

const override = css`
    display: block;
    margin: auto auto;
`;

export default class Spinner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }
    render() {
        return (
            <div className="container text-center">
                <HashLoader
                    className={override}
                    sizeUnit={"px"}
                    size={100}
                    color={'#123abc'}
                    loading={this.state.loading}
                />
            </div>
        )
    }
}
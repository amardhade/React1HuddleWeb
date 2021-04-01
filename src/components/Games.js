import React from 'react';
import { isAuthenticated } from '../utils/utilities';


export default class Games extends React.Component {
    constructor(props) {
        super(props);
        if (!isAuthenticated()) {
            this.navigateToAuthPage();
        }
    }

    navigateToAuthPage() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <p>Games Component</p>
            </div>
        )
    }
}
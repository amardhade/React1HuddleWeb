import React from 'react';
import { connect } from 'react-redux';
import './GameProfile.scss';
class GameProfile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('Props: ', this.props);
        const profile = this.props.profile
        return (
            <div className="gameProfileWrapper">
                <p>Scenario: {profile.scenario}</p>
                <p>{profile.profile_name}</p>
            </div>
        )
    }
}

export default connect()(GameProfile);
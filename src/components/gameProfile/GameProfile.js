import React from 'react';
import { connect } from 'react-redux';
class GameProfile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log('Props: ', this.props);
        const profile = this.props.profile
        return (
            <div>
                <p>Scenario: {profile.scenario}</p>
                <p>{profile.profile_name}</p>
            </div>
        )
    }
}

export default connect()(GameProfile);
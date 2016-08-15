import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';

// GET '/profile'
class ProfilePage extends React.Component {
    // Shows the name, last name, birthday, and country of the current user
    render() {
        return this.props.subReady?
            <div className='col-md-6 col-md-offset-3'>
                <h1>{this.props.currentUser.username}</h1>
                <ul className='list-group'>
                    <li className='list-group-item'>
                        <b>Name      : </b>
                        {this.props.currentUser.profile.name}
                    </li>
                    <li className='list-group-item'>
                        <b>Last Name : </b>
                        {this.props.currentUser.profile.lastName}
                    </li>
                    <li className='list-group-item'>
                        <b>Birthday  : </b>
                        {this.props.currentUser.profile.birthday}
                    </li>
                    <li className='list-group-item'>
                        <b>Country   : </b>
                        {this.props.currentUser.profile.country}
                    </li>
                </ul>
            </div>
        :
            <div>
                Loading...
            </div>
        ;
    }
}

export default createContainer(() => {
    let sub = Meteor.subscribe('userData');
    let subReady = sub.ready();
    let currentUser;
    if(subReady) {
        currentUser = Meteor.user();
    }

    return {
        subReady: subReady,
        currentUser: currentUser,
    };
}, ProfilePage);

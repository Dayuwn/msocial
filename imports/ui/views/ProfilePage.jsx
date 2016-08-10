import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';

class ProfilePage extends React.Component {
    render() {
        return this.props.subReady?
            <div className='container'>
                <h1>{this.props.currentUser.username}</h1>
                <ul>
                    <li><b>Name      : </b>{this.props.currentUser.profile.name}</li>
                    <li><b>Last Name : </b>{this.props.currentUser.profile.lastName}</li>
                    <li><b>Birthday  : </b>{this.props.currentUser.profile.birthday}</li>
                    <li><b>Country   : </b>{this.props.currentUser.profile.country}</li>
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

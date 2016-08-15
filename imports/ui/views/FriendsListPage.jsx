import React from 'react';
import {createContainer} from 'meteor/react-meteor-data';

// GET '/friends'
class FriendsListPage extends React.Component {
    // Render each friend with its pseudo and date of friendship creation
    getFriends() {
        return this.props.userFriends.map((item, index) => {
            return (
                <li className='list-group-item' key={index}>
                    {item.username}
                    <div className='pull-right' style={{display: 'inline-block'}}>
                        <small className='text-muted'>
                            {item.friendedAt.toUTCString()}
                        </small>
                    </div>
                </li>
            );
        });
    }

    render() {
        return this.props.userFriends ?
            <div className='col-md-6 col-md-offset-3'>
                <h1>Friends</h1>
                <ul className='list-group'>
                    {this.getFriends()}
                </ul>
            </div>
        :
            <div>Loading friends list...</div>
        ;
    }
}

export default createContainer(() => {
    let userSub = Meteor.subscribe('userData');
    let userSubReady = userSub.ready();

    let userFriends = null;
    if(userSubReady) {
        userFriends = Meteor.user().friends;
    }

    return {
        userFriends: userFriends,
    };
}, FriendsListPage)

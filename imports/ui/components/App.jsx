import React, {PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AppHeader from './AppHeader.jsx';

class App extends React.Component {

    showUserNav() {
        return !this.props.signedIn?
        <ul className="nav navbar-nav navbar-right">
            <li><a href="/login">Login</a></li>
            <li><a href="/register">Register</a></li>
        </ul>
    :
        <ul className='nav navbar navbar-nav navbar-right'>
            {/* Friends dropdown.
                Contains a friends list button and a add friend form */}
            <li className='dropdown'>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown'
                   role='button' aria-haspopup='true' aria-expanded='false'>
                   Friends
                   <span className='caret'></span>
                </a>

                <ul className='dropdown-menu'>
                    <li>
                        <a href='/friends'>My Friends</a>
                    </li>
                    <li className='divider'></li>
                    <li style={{padding: '0px 10px 15px 15px'}}>
                        <span className='nav-header'><b>Add Friend</b></span>
                        <form onSubmit={this.addFriend}>
                            <div className="input-group">
                                <input type="text" id='addFriend'
                                    className="form-control"
                                    placeholder="Name"
                                    aria-label="..."
                                />
                                <span className="input-group-btn">
                                    <button className='btn btn-primary'
                                            type='submit'>
                                        Add
                                    </button>
                                </span>
                            </div>
                        </form>
                    </li>
                </ul>
            </li>
            {/* User dropdown.
                Contains a profile and a logout button */}
            <li className='dropdown'>
                <a href='#' className='dropdown-toggle' data-toggle='dropdown'
                    role='button' aria-haspopup='true' aria-expanded='false'>
                    {this.props.currentUser.username}
                    <span className='caret'></span>
                </a>

                <ul className='dropdown-menu'>
                    <li>
                        <a href='/logout'>Sign Out</a>
                    </li>
                    <li>
                        <a href='/profile'>Profile</a>
                    </li>
                </ul>
            </li>
        </ul>
    ;
  }

    addFriend(e) {
        e.preventDefault();
        let friendUsername = e.target.addFriend.value;
        Meteor.call('currentUser.addFriend', friendUsername, (error) => {
            if(error) {
                sAlert.error(error.reason, {
                    effect: 'stackslide', position: 'top-left'
                });
            }
        });
    }

    render() {
        return this.props.subReady?
            <div>
                <AppHeader navTitle="MSocial" pageTitle="MSocial"
                           userNav={this.showUserNav()} />

                {this.props.content}
            </div>
        :
            <div>Loading...</div>
        ;
    }

    // Used to prevent dropdown's form from overflowing
    componentDidMount() {
        $('.dropdown-toggle').dropdown();
        $('.dropdown input, .dropdown label').click(function(e) {
            e.stopPropagation();
        });
    }
}

export default createContainer(() => {
    let subscription = Meteor.subscribe('userData');
    let subReady = subscription.ready();

    let currentUser;
    if(subReady)
        currentUser = Meteor.user();

    return {
        subReady: subReady,
        currentUser: currentUser,
        signedIn: Meteor.user() != null,
    };
}, App);

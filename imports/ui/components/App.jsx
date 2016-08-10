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

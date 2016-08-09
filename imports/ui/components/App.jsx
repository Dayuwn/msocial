import React, {PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import AppHeader from './AppHeader.jsx';

class App extends React.Component {

  showUserNav() {
    return (
      <ul className="nav navbar-nav navbar-right">
        <li><a href="/login">Login</a></li>
        <li><a href="/register">Register</a></li>
      </ul>
    );
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
    let subscription = Meteor.subscribe('userData')
    let subReady = subscription.ready()

    return {
        subscription: subscription,
        subReady: subReady,
    };
}, App);

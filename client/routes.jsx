import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import App from '../imports/ui/components/App.jsx';

import MainPage from '../imports/ui/views/MainPage.jsx';
import LoginPage from '../imports/ui/views/LoginPage.jsx';
import RegisterPage from '../imports/ui/views/RegisterPage.jsx';

function redirectIfNotSignedIn(context, redirect) {
    AppLibRedirectPath = context.path;
    var notSignedIn = !Meteor.userId();
    if(notSignedIn) {
        FlowRouter.go('login');
    }
}

FlowRouter.route('/', {
    name: 'home',
    action: function() {
        mount(App, {
          content: <MainPage />,
        });
    },
    triggersEnter: [redirectIfNotSignedIn],
});

FlowRouter.route('/login', {
  name: 'login',
  action: function() {
    mount(App, {
      content: <LoginPage />
    });
  }
});

FlowRouter.route('/register', {
  name: 'register',
  action: function() {
    mount(App, {
      content: <RegisterPage />
  })
  }
})

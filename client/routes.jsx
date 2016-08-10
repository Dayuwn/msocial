import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

import App from '../imports/ui/components/App.jsx';

import MainPage from '../imports/ui/views/MainPage.jsx';
import LoginPage from '../imports/ui/views/LoginPage.jsx';
import RegisterPage from '../imports/ui/views/RegisterPage.jsx';
import ProfilePage from '../imports/ui/views/ProfilePage.jsx';

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
        mount(App, {content: <MainPage />});
    },
    triggersEnter: [redirectIfNotSignedIn],
});

FlowRouter.route('/login', {
    name: 'login',
    action: function() {
        if(Meteor.user() === null) {
            mount(App, {content: <LoginPage />});
        }
    }
});

FlowRouter.route('/register', {
    name: 'register',
    action: function() {
        if(Meteor.user() === null) {
            mount(App, {content: <RegisterPage />});
        }
    }
});

FlowRouter.route('/profile', {
    name: 'profile',
    action: function() {
        if(Meteor.user() !== null) {
            mount(App, {content: <ProfilePage />});
        }
    }
});

FlowRouter.route('/logout', {
    name: 'logout',
    action: function() {
        Meteor.logout(() => {
            FlowRouter.go('home');
            sAlert.success("You've been signed out.", {effect: 'stackslide',
                            position: 'top-left', timeout: 2000});
        })
    }
})

import { Meteor } from 'meteor/meteor';
import '../imports/api/posts.js';

Meteor.startup(() => {

});

// Sets up all non-default fields for users in database
Accounts.onCreateUser(function(options, user) {
    let username = options.profile.username;
    let usernameTaken = Meteor.users.find({username: username},
                                            {limit: 1}).count() > 0;
    if(usernameTaken) { // Check if username is taken.
        throw new Meteor.Error(403, 'This username is already taken.');
    }
    else {
        user.profile = options.profile;
        user.username = options.username;
        user.friends = [];
        return user;
    }
});

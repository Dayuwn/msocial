import { Meteor } from 'meteor/meteor';
import '../imports/api/posts.js';

Meteor.startup(() => {

});

Accounts.onCreateUser(function(options, user) {
    let username = options.profile.username;
    let usernameTaken = Meteor.users.find({username: username},
                                            {limit: 1}).count() > 0;
    if(usernameTaken) {
        throw new Meteor.Error(403, 'This username is already taken.');
    }
    else {
        user.profile = options.profile;
        user.username = options.username;
        // HACK To make it work temporary without friend system.
        user.friends = ['R6s9shJbR7HGmuFbq'];
        return user;
    }
});

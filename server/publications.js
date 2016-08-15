import { Meteor } from 'meteor/meteor';

// Publish the current user data
Meteor.publish('userData', function() {
    if(this.userId) {
        return Meteor.users.find({_id: this.userId})
    } else {
        return this.ready()
    }
})

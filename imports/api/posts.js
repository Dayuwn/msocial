import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export const Posts = new Mongo.Collection('posts');

Posts.schema = new SimpleSchema({
    userId: {type: String},
    username: {type: String},
    text: {type: String},
    likes: {type: Number, defaultValue: 0},
    comments: {type: [Object], defaultValue: []},
    createdAt: {type: Date},
});

Meteor.methods({
    'posts.insert': function(text, username) {
        let options = {
            userId: this.userId,
            username: username,
            text: text,
            createdAt: new Date(),
        };
        Posts.insert(options);
    },
})

if(Meteor.isServer) {
    // Publish all friends' posts data
    Meteor.publish('postsData', function() {
        let friendsPosts = [];
        let allPosts = Posts.find();
        let currentUser = Meteor.users.findOne({_id: this.userId});
        if(currentUser) {
            for(let i = 0; i < currentUser.friends.length; i++) {
                var userId = currentUser.friends[i];
                return Posts.find({'userId': currentUser.friends[i]});
            }
        }
        else {
            return null;
        }
    });
}

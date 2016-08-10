import {Mongo} from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');

Posts.schema = new SimpleSchema({
    userId: {type: Number},
    text: {type: String},
    likes: {type: Number, defaultValue: 0},
    comments: {type: [Object], defaultValue: []},
    createdAt: {type: Date},
});

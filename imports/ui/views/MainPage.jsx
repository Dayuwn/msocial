import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../../api/posts.js';

// GET '/'
class MainPage extends React.Component {
    // Returns all friends posts
    getPosts() {
        if(!this.props.subReady) {
            return (
                <li className='list-group-item'>
                    Loading feed data...
                </li>
            );
        }
        else {
            return (
                this.props.feedPosts.map((item, index) => {
                    return (
                        <li key={index} className='list-group-item'>
                            <b>{item.username}:</b><br />
                            <pre>{item.text}</pre>
                        </li>
                    );
                })
            );
        }
    }

    postNewPost(e) {
        e.preventDefault();
        let currenUsername;
        if(this.props.userSubReady && $('#new-post').val() !== '') {
            currentUsername = Meteor.user().username;
            Meteor.call('posts.insert', $('#new-post').val(),
                        this.props.currentUsername);
            $('#new-post').val('');
        }
    }

    // The form used to make a new post
    renderForm() {
        return (
            <li className='list-group-item'>
                <form onSubmit={this.postNewPost.bind(this)}>
                    <div className='form-group'>
                        <textarea className='form-control'
                            type='text' placeholder='New post...'
                            id='new-post' />
                    </div>
                    <div className='form-actions'>
                        <button type='submit' className='btn btn-primary'
                            style={{width: '100%'}}>
                            Post
                        </button>
                    </div>
                </form>
            </li>
        );
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-6 col-md-offset-3'>
                    <h1>My Feed</h1>
                        {this.renderForm()}
                    <ul className='list-group'>
                        {this.getPosts()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default createContainer(() => {
    let subscription = Meteor.subscribe('postsData');
    let subReady = subscription.ready();

    let userSub = Meteor.subscribe('userData');
    let userSubReady = userSub.ready();

    let feedPosts;
    if(subReady) {
        feedPosts = Posts.find({}, {sort: {createdAt: -1}}).fetch();
    }

    let currentUsername;
    if(userSubReady && Meteor.user()) {
        currentUsername = Meteor.user().username;
    }

    return {
        subReady: subReady,
        feedPosts: feedPosts,
        userSubReady: userSubReady,
        currentUsername: currentUsername,
    }
}, MainPage);

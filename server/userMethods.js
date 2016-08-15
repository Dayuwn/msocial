Meteor.methods({
    // Add a friend server side
    'currentUser.addFriend': function(username) {
        let currentUser = Meteor.users.findOne({_id: this.userId});
        let targetUser = Meteor.users.findOne({username: username});
        if(targetUser) {
            if(!usernameExistsInArray(currentUser.friends, username)) {
                if(!(username === currentUser.username)) {
                    let currentUserFriends = currentUser.friends;
                    currentUserFriends.push(
                        {username: targetUser.username,  friendedAt: new Date()}
                    );
                    Meteor.users.update(currentUser._id,
                                        {$set: {friends: currentUserFriends},});
                }
                else {
                    throw new Meteor.Error(403,
                        'I think you and ' +
                            username + ' already know each other...');
                }
            }
            else {
                throw new Meteor.Error(403,
                    'You and ' + username + ' are already friends !');
            }
        }
        else {
            throw new Meteor.Error(403,
                'You are not logged in !');
        }
    },
});

// Loops through an array to find a username that fits the given one
function usernameExistsInArray(arr, username) {
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].username === username) return true;
    }
    return false;
}

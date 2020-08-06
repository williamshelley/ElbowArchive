import { faTableTennis } from "@fortawesome/free-solid-svg-icons";

export const selectSessionErrors = state => {
    return state.errors.session;
};

export const selectCurrentUser = state => {
    return state.entities.users[state.session.id];
};

export const selectUsers = state => {
    return state.entities.users;
};

export const selectAllPosts = state => {
    return state.entities.posts;
};

export const selectUser = (userId, state) => {
    return state.entities.users[userId];
};

export const selectUserTimelinePosts = (userId, state) => {
    return state.entities.users[userId].timeline_posts;
};

export const selectModals = state => {
    return state.ui.modals;
};

export const selectTopModal = state => {
    return state.ui.modals[state.ui.modals.length - 1];
};

export const selectFriendRequests = state => {
    return state.entities.friendRequests;
};

export const selectFriendRequest = (currentUserId, friendId, state) => {
    let requests = selectFriendRequests(state);

    const isRecipient = (userId, request) => userId === request.recipient_id;
    const isSender = (userId, request) => userId === request.sender_id;

    Object.values(requests).forEach(request => {


        if (isSender(currentUserId, request) 
            || isRecipient(currentUserId, request)) {

            if (isSender(friendId, request) 
                || isRecipient(friendId, request)) {

                    return request;
            }
        }

    });

    return undefined;
};

export const selectAccpetedFriendRequests = state => {
    return state.entities.friendRequests.accepted;
};

export const selectPendingFriendRequests = state => {
    return state.entities.friendRequests.pending;
};

const friendIdsFromRequests = (userId, requests) => {
    // let currentUser = selectCurrentUser(state);
    // let friend_ids = [];
    // if (requests) {
    //     Object.values(requests).forEach(request => {
    //         if (userId === request.sender_id) {
    //             friend_ids.push(request.recipient_id);
    //         } else if (userId === request.recipient_id) {
    //             friend_ids.push(request.sender_id);
    //         }
    //     });
    // }
    // return friend_ids;

    return Object.values(requests).map(req => (
        parseInt(userId) !== req.sender_id ? req.sender_id : req.recipient_id
    ));
}

const senderIdsOfRecipient = (recipientId, requests) => {
    // return Object.values(requests).map(req => (
    //     parseInt(userId) === req.sender_id ? req.sender_id : 
    // ));

    let senderIds = [];
    Object.values(requests).map(req => {
        if (parseInt(recipientId) === req.recipient_id) {
            senderIds.push(req.sender_id)
        }
    })
    return senderIds;
}

const recipientIdsOfSender = (senderId, requests) => {
    let recipientIds = [];
    Object.values(requests).map(req => {
        if (parseInt(senderId) === req.senderId) {
            recipientIds.push(req.recipient_id)
        }
    })
    return recipientIds;
}

export const selectAcceptedFriendIds = (userId, state) => {
    let requests = selectAccpetedFriendRequests(state);
    return friendIdsFromRequests(userId, requests);
    // return Object.values(requests).map(req => (
    //     parseInt(userId) !== req.sender_id ? req.sender_id : req.recipient_id
    // ));
}


export const selectPendingFriendIds = (userId, state) => {
    let requests = selectPendingFriendRequests(state);
    return friendIdsFromRequests(userId, requests);
    // return Object.values(requests).map(req => (
    //     parseInt(userId) !== req.sender_id ? req.sender_id : req.recipient_id
    // ));
}

export const selectAcceptedIdsWithSender = (senderId, state) => {
    let requests = selectAccpetedFriendRequests(state);
    return recipientIdsOfSender(senderId, requests);
}

export const selectAcceptedIdsWithRecipient = (recipientId, state) => {
    let requests = selectAccpetedFriendRequests(state);
    return senderIdsOfRecipient(recipientId, requests);
}

export const selectPendingIdsWithSender = (senderId, state) => {
    let requests = selectPendingFriendRequests(state);
    return recipientIdsOfSender(senderId, requests);
}


export const selectPendingIdsWithRecipient = (recipientId, state) => {
    let requests = selectPendingFriendRequests(state);
    return senderIdsOfRecipient(recipientId, requests);
}

export const selectFriends = (state) => {
    return state.entities.friends;
}

export const selectNonFriends = state => {
    let currentUser = selectCurrentUser(state);
    let pendingArr = selectPendingFriendIds(currentUser.id, state);
    let acceptedArr = selectAcceptedFriendIds(currentUser.id, state);
    let pending = {};
    let accepted = {};
    pendingArr.forEach(id => pending[id] = true);
    acceptedArr.forEach(id => accepted[id] = true);


    // console.log(pendingArr.length);
    // console.log(acceptedArr.length);

    // console.log(pendingArr);
    // console.log(acceptedArr);

    let users = Object.values(selectUsers(state));
    // console.log(users);

    // console.log(pending);
    // console.log(accepted);
    // console.log(state.entities.friendRequests.pending);

    let nonFriends = {};
    users.forEach(user => {
        if (!pending[user.id] && !accepted[user.id] && user.id !== currentUser.id) {
            nonFriends[user.id] = user;
        }
    });

    // console.log(nonFriends);
    return nonFriends;
}

export const selectUsersFromIds = (userIds, state) => {
    let users = {};
    userIds.forEach(id => {
        users[id] = selectUser(id, state);
    });

    return users;
}

export const selectPostLikes = (postId, state) => {
    return state.entities.posts[postId].likes;
}

export const selectAllFriends = (state) => {
    return state.entities.friends;
}
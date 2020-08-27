
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

export const selectAcceptedFriendRequests = state => {
    return state.entities.friendRequests.accepted;
};

export const selectPendingFriendRequests = state => {
    return state.entities.friendRequests.pending;
};

const friendIdsFromRequests = (userId, requests) => {
    let ids = [];
    Object.values(requests).forEach(req => {
        if (req.sender_id === userId || req.recipient_id === userId) {
            if (req.sender_id === userId) { ids.push(req.recipient_id); }
            else { ids.push(req.sender_id); }
        }
    });

    return ids;
}

const senderIdsOfRecipient = (recipientId, requests) => {
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
    let requests = selectAcceptedFriendRequests(state);
    return friendIdsFromRequests(userId, requests);
}


export const selectPendingFriendIds = (userId, state) => {
    let requests = selectPendingFriendRequests(state);
    return friendIdsFromRequests(userId, requests);
}

export const selectAcceptedIdsWithSender = (senderId, state) => {
    let requests = selectAcceptedFriendRequests(state);
    return recipientIdsOfSender(senderId, requests);
}

export const selectAcceptedIdsWithRecipient = (recipientId, state) => {
    let requests = selectAcceptedFriendRequests(state);
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

    let users = Object.values(selectUsers(state));

    let nonFriends = {};
    users.forEach(user => {
        if (!pending[user.id] && !accepted[user.id] && user.id !== currentUser.id) {
            nonFriends[user.id] = user;
        }
    });

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

const selectSingleRequest = (requests, idA, idB) => {
    let foundRequest = undefined;
    Object.values(requests).forEach(req => {
        if ((req.sender_id === idA) || (req.recipient_id === idA)) {
            if ((req.sender_id === idB) || (req.recipient_id === idB)) {
                foundRequest = req;
                return foundRequest;
            }
        }
    });
    return foundRequest;
}

export const selectAcceptedFriendRequest = (idA, idB, state) => {
    let requests = selectAcceptedFriendRequests(state);
    return selectSingleRequest(requests, idA, idB);
}

export const selectPendingFriendRequest = (idA, idB, state) => {
    let requests = selectPendingFriendRequests(state);
    return selectSingleRequest(requests, idA, idB);
};

export const selectSearchedUsers = (state) => {
    return state.entities.searchedUsers;
};
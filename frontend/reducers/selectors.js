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
    return state.entities.friendRequests.accpeted;
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
        if (!pending[user.id] && !accepted[user.id]) {
            nonFriends[user.id] = user;
        }
    });

    return nonFriends;
}
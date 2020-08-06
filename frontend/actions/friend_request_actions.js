import * as FRAPIUtil from "../util/friend_request_api_util";
import { retrieveUser } from "./user_actions";

export const RECEIVE_FRIEND_REQUEST = "RECEIVE_FRIEND_REQUEST";
export const ACCEPT_FRIEND_REQUEST = "ACCEPT_FRIEND_REQUEST";
export const RECEIVE_FRIEND = "RECEIVE_FRIEND";
export const RECEIVE_FRIEND_REQUESTS = "RECEIVE_FRIEND_REQUESTS";
export const RECEIVE_FRIEND_REQUEST_ERRORS = "RECEIVE_FRIEND_REQUEST_ERRORS";
export const REMOVE_FRIEND_REQUEST = "REMOVE_FRIEND_REQUEST";

export const receiveFriendRequest = friendRequest => ({
    type: RECEIVE_FRIEND_REQUEST,
    friendRequest
});

export const receiveFriendRequests = friendRequests => ({
    type: RECEIVE_FRIEND_REQUESTS,
    friendRequests
});

export const receiveErrors = errors => ({
    type: RECEIVE_FRIEND_REQUEST_ERRORS,
    errors
});

export const receiveFriend = user => ({
    type: RECEIVE_FRIEND,
    user
});

export const removeFriendRequest = userId => ({
    type: REMOVE_FRIEND_REQUEST,
    userId
});

export const acceptFriendRequest = friendRequest => ({
    type: ACCEPT_FRIEND_REQUEST,
    friendRequest
});

export const fetchFriendRequests = userId => dispatch => (
    FRAPIUtil.fetchFriendRequests(userId)
        .then(
            payload => dispatch(receiveFriendRequests(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const sendFriendRequest = friendRequest => dispatch => (
    FRAPIUtil.sendFriendRequest(friendRequest)
        .then(
            payload => dispatch(receiveFriendRequest(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const updateFriendRequest = friendRequest => dispatch => (
    FRAPIUtil.updateFriendRequest(friendRequest)
        .then(
            payload => dispatch(receiveFriendRequest(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const fetchFriend = friendId => dispatch => (
    FRAPIUtil.fetchFriend(friendId)
        .then(
            payload => dispatch(receiveFriend(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const deleteFriendRequest = requestId => dispatch => (
    FRAPIUtil.deleteFriendRequest(requestId)
        .then(
            payload => dispatch(removeFriendRequest(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

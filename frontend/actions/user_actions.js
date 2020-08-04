import { receiveErrors } from "./session_actions";
import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_FRIEND_REQUEST = "RECEIVE_FRIEND_REQUEST";
export const RECEIVE_FRIEND_REQUESTS = "RECEIVE_FRIEND_REQUESTS";

export const retrieveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const receiveFriendRequest = friendRequest => ({
    type: RECEIVE_FRIEND_REQUEST,
    friendRequest
});

export const receiveFriendRequests = friendRequests => ({
    type: RECEIVE_FRIEND_REQUESTS,
    friendRequests
});

export const updateUser = user => dispatch => (
    UserAPIUtil.updateUser(user)
        .then(
            payload => dispatch(retrieveUser(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const fetchUser = userId => dispatch => (
    UserAPIUtil.fetchUser(userId)
        .then(
            payload => dispatch(retrieveUser(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const sendFriendRequest = friendRequest => dispatch => (
    UserAPIUtil.sendFriendRequest(friendRequest)
        .then(
            payload => dispatch(receiveFriendRequest(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload)))
);

export const updateFriendRequest = friendRequest => dispatch => (
    UserAPIUtil.sendFriendRequest(friendRequest)
        .then(
            payload => dispatch(receiveFriendRequest(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload)))
);
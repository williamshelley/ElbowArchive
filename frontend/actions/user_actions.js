import { receiveErrors } from "./session_actions";
import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const MERGE_USERS = "MERGE_USERS";
export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";
export const RECEIVE_SEARCHED_USERS = "RECEIVE_SEARCHED_USERS";
export const MERGE_SEARCHED_USERS = "MERGE_SEARCHED_USERS";
export const CLEAR_SEARCHED_USERS = "CLEAR_SEARCHED_USERS";

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const receiveFriends = users => ({
    type: RECEIVE_FRIENDS,
    users
});

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const mergeUsers = users => ({
    type: MERGE_USERS,
    users
})

export const receiveSearchedUsers = users => ({
    type: RECEIVE_SEARCHED_USERS,
    users
});

export const mergeSearchedUsers = users => ({
    type: MERGE_SEARCHED_USERS,
    users
});

export const clearSearchedUsers = () => ({
    type: CLEAR_SEARCHED_USERS
});

export const updateUser = user => dispatch => (
    UserAPIUtil.updateUser(user)
        .then(
            payload => dispatch(receiveUsers(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const updateUserFromFormData = (userId, formData) => dispatch => (
    UserAPIUtil.updateUserFromFormData(userId, formData)
        .then(
            payload => dispatch(receiveUser(payload),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
        )
);

export const fetchUser = userId => dispatch => (
    UserAPIUtil.fetchUser(userId)
        .then(
            payload => dispatch(receiveUser(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const searchUsers = filters => dispatch => (
    UserAPIUtil.fetchUsers(filters)
        .then(
            payload => dispatch(receiveSearchedUsers(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const fetchMergeSearchUsers = filters => dispatch => (
    UserAPIUtil.fetchUsers(filters)
    .then(
        payload => dispatch(mergeSearchedUsers(payload)),
        errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const fetchUsers = filters => dispatch => (
    UserAPIUtil.fetchUsers(filters)
        .then(
            payload => dispatch(receiveUsers(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const fetchMergeUsers = filters => dispatch => (
    UserAPIUtil.fetchUsers(filters)
    .then(
        payload => dispatch(mergeUsers(payload)),
        errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);


export const fetchFriends = filters => dispatch => (
    UserAPIUtil.fetchUsers(filters)
        .then(
            payload => dispatch(receiveFriends(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);
import { receiveErrors } from "./session_actions";
import * as UserAPIUtil from "../util/user_api_util";

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_FRIENDS = "RECEIVE_FRIENDS";

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

export const fetchUsers = filters => dispatch => (
    UserAPIUtil.fetchUsers(filters)
        .then(
            payload => dispatch(receiveUsers(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const fetchFriends = filters => dispatch => (
    UserAPIUtil.fetchUsers(filters)
        .then(
            payload => dispatch(receiveFriends(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);
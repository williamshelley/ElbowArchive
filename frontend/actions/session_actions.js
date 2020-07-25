import * as SessionAPIUtil from "../util/session_api_util";

// action types

export const RECEIVE_USER = "RECEIVE_USER";
export const LOGOUT_USER = "LOGOUT_CURRENT_USER"
export const RECEIVE_ERRORS = "RECEIVE_ERRORS"

// regular action creators

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});

export const receiveErrors = errors => ({
    type: RECEIVE_ERRORS,
    errors
});


// thunk action creators

export const login = user => dispatch => (
    SessionAPIUtil.login(user)
        .then(
            payload => dispatch(receiveUser(payload)), 
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const logout = () => dispatch => (
    SessionAPIUtil.logout()
        .then(
            () => dispatch(logoutUser()),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);

export const signup = user => dispatch => (
    SessionAPIUtil.signup(user)
        .then(
            payload => dispatch(receiveUser(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);
import * as SessionAPIUtil from "../util/session_api_util";

// action types

export const RECEIVE_SESSION_USER = "RECEIVE_SESSION_USER";
export const LOGOUT_USER = "LOGOUT_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRORS = "CLEAR_SESSION_ERRORS";
export const RECEIVE_SESSION_ERROR = "RECEIVE_SESSION_ERROR";
export const REMOVE_SESSION_ERROR = "REMOVE_SESSION_ERROR";

// regular action creators

export const receiveSessionUser = user => ({
    type: RECEIVE_SESSION_USER,
    user
});

export const logoutUser = () => ({
    type: LOGOUT_USER
});

export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const clearErrors = () => ({
    type: CLEAR_SESSION_ERRORS
});

export const receiveError = (field, error) => ({
    type: RECEIVE_SESSION_ERROR,
    field,
    error
});

export const removeError = (field) => ({
    type: REMOVE_SESSION_ERROR,
    field
});


// thunk action creators

export const login = user => dispatch => (
    SessionAPIUtil.login(user)
        .then(
            payload => dispatch(receiveSessionUser(payload)), 
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
            payload => dispatch(receiveSessionUser(payload)),
            errorPayload => dispatch(receiveErrors(errorPayload.responseJSON)))
);
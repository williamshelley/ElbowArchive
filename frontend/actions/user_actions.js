import { receiveErrors } from "./session_actions";
import * as UserAPIUtil from "../util/user_api_util";

export const RETRIEVE_USER = "RETRIEVE_USER";

export const retrieveUser = user => ({
    type: RETRIEVE_USER,
    user
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
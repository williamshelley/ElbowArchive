import { merge } from "lodash";
import { RECEIVE_FRIEND_REQUEST_ERRORS } from "../actions/friend_request_actions";
import { RECEIVE_SESSION_USER } from "../actions/session_actions";
import { RECEIVE_USER } from "../actions/user_actions";

const friendRequestErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_FRIEND_REQUEST_ERRORS:
            return action.errors;
        case RECEIVE_SESSION_USER:
            return {};
        case RECEIVE_USER:
            return {};
        default:
            return state;
    }
};

export default friendRequestErrorsReducer;
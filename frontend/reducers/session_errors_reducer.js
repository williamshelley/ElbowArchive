import { RECEIVE_SESSION_ERRORS, RECEIVE_SESSION_USER, CLEAR_SESSION_ERRORS, RECEIVE_SESSION_ERROR, REMOVE_SESSION_ERROR } from "../actions/session_actions";
import { merge } from "lodash";

const sessionErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case RECEIVE_SESSION_USER:
            return {};
        case CLEAR_SESSION_ERRORS:
            return {};
        case RECEIVE_SESSION_ERROR:
            return merge({}, state, { [action.field]: [action.error] });
        case REMOVE_SESSION_ERROR:
            let newState = Object.assign({}, state);
            delete newState[action.field];
            return newState;
        default:
            return state;
    }
};

export default sessionErrorsReducer;
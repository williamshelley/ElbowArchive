import { RECEIVE_ERRORS, RECEIVE_SESSION_USER, CLEAR_ERRORS, RECEIVE_ERROR, REMOVE_ERROR } from "../actions/session_actions";
import { merge } from "lodash";

const sessionErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_ERRORS:
            return action.errors;
        case RECEIVE_SESSION_USER:
            return {};
        case CLEAR_ERRORS:
            return {};
        case RECEIVE_ERROR:
            return merge({}, state, { [action.field]: [action.error] });
        case REMOVE_ERROR:
            let newState = Object.assign({}, state);
            delete newState[action.field];
            return newState;
        default:
            return state;
    }
};

export default sessionErrorsReducer;
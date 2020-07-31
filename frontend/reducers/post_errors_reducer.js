import { merge } from "lodash";
import { RECEIVE_POST_ERRORS, RECEIVE_POST, CLEAR_POST_ERRORS, RECEIVE_POST_ERROR, REMOVE_POST_ERROR } from "../actions/post_actions";

const postErrorsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_POST_ERRORS:
            return action.errors;
        case RECEIVE_POST:
            return {};
        case CLEAR_POST_ERRORS:
            return {};
        case RECEIVE_POST_ERROR:
            return merge({}, state, { [action.field]: [action.error] });
        case REMOVE_POST_ERROR:
            let newState = Object.assign({}, state);
            delete newState[action.field];
            return newState;
        default:
            return state;
    }
};

export default postErrorsReducer;
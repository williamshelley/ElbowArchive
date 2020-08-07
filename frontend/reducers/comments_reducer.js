import { merge } from "lodash";
import { RECEIVE_COMMENT, DELETE_COMMENT, RECEIVE_COMMENT_ERRORS } from "../actions/comment_actions";

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {};
    switch(action.type) {
        case RECEIVE_COMMENT:
            return merge({}, state, { [action.comment.id]: action.comment });
        case DELETE_COMMENT:
            newState = merge({}, state);
            delete newState[action.comment.id];
            return newState;
        default:
            return state;
    }
}

export default commentsReducer;
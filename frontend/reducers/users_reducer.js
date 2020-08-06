import { RECEIVE_SESSION_USER } from "../actions/session_actions";
import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_PROFILE_PHOTO } from "../actions/user_actions";
import { merge } from "lodash";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_SESSION_USER:
            return merge({}, state, { [action.user.id]: action.user });
        case RECEIVE_USER:
            return merge({}, state, { [action.user.id]: action.user });
        case RECEIVE_USERS:
            return action.users;
        default:
            return state;
    }
};

export default usersReducer;
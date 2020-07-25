import { LOGOUT_USER, RECEIVE_USER } from "../actions/session_actions";
import { merge } from "lodash";

const _nullSession = { id: null };

const sessionReducer = (state = _nullSession, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_USER:
            return merge({}, { id: action.user.id });
        case LOGOUT_USER:
            return _nullSession;
        default:
            return state;
    }
};

export default sessionReducer;
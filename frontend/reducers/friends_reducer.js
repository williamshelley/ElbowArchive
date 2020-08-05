import { merge } from "lodash";
import { RECEIVE_FRIENDS } from "../actions/user_actions";

const friendsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_FRIENDS:
            return action.users;
        default:
            return state;
    }
};

export default friendsReducer;
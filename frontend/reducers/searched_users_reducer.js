import { merge } from "lodash";
import { RECEIVE_SEARCHED_USERS, CLEAR_SEARCHED_USERS, MERGE_SEARCHED_USERS } from "../actions/user_actions";

const searchedUsersReducer = (state = {}, action) => {
    Object.freeze(state);

    switch(action.type) {
        case RECEIVE_SEARCHED_USERS:
            return action.users;
        case MERGE_SEARCHED_USERS:
            return merge({}, state, action.users);
        case CLEAR_SEARCHED_USERS:
            return {};
        default:
            return {};
    }
}

export default searchedUsersReducer;
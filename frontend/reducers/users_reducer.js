import { RECEIVE_SESSION_USER } from "../actions/session_actions";
import { RECEIVE_USER, RECEIVE_USERS, RECEIVE_PROFILE_PHOTO, MERGE_USERS } from "../actions/user_actions";
import { merge } from "lodash";
import { RECEIVE_POST } from "../actions/post_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_SESSION_USER:
            return merge({}, state, { [action.user.id]: action.user });
        case RECEIVE_USER:
            return merge({}, state, { [action.user.id]: action.user });
        case RECEIVE_USERS:
            return action.users;
        case MERGE_USERS:
            return merge({}, state, action.users);
        case RECEIVE_POST:
            const oldUser = state[action.post.author_id];
            const oldPhotos = oldUser.photos ? oldUser.photos : [];
            const newPhotos = action.post.photos;
            const newUser = merge({}, oldUser, { photos: oldPhotos.concat(newPhotos) });
            return merge({}, state, { [newUser.id]: newUser });
        default:
            return state;
    }
};

export default usersReducer;
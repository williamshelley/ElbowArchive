import { RECEIVE_POST, RECEIVE_POSTS } from "../actions/post_actions";
import { merge } from "lodash";

const postsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_POST:
            return merge({}, state, { [action.post.id]: action.post });
        case RECEIVE_POSTS:
            return action.posts;
        default:
            return state;
    }
};

export default postsReducer;
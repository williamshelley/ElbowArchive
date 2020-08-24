import { RECEIVE_POST, RECEIVE_POSTS, MERGE_POSTS } from "../actions/post_actions";
import { merge } from "lodash";
import { RECEIVE_LIKE, DELETE_LIKE } from "../actions/like_actions";
import likeableMerger from "./likeable_merger";
import { RECEIVE_COMMENT } from "../actions/comment_actions";
import commentableMerger from "./commentable_merger";

const postsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = merge({}, state);
    switch(action.type) {
        case RECEIVE_POST:
            return merge({}, state, { [action.post.id]: action.post });

        case RECEIVE_POSTS:
            return action.posts;

        case MERGE_POSTS:
            return merge({}, state, action.posts);

        case RECEIVE_LIKE:
            if (action.like.likeable_type === "Post") {
                return likeableMerger(state, action.like);
            }
            return state;

        case DELETE_LIKE:
            delete newState[action.like.likeable_id].likes[action.like.user_id]
            return newState;

        case RECEIVE_COMMENT:
            if (action.comment.commentable_type === "Post") {
                return commentableMerger(state, action.comment);
            }
            return state;
            
        default:
            return state;
    }
};

export default postsReducer;
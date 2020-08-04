import { RECEIVE_POST, RECEIVE_POSTS } from "../actions/post_actions";
import { merge } from "lodash";
import { RETRIEVE_USER } from "../actions/user_actions";

const friendReqeustsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        default:
            return state;
    }
};

export default friendReqeustsReducer;
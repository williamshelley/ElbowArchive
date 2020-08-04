import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import postsReducer from "./posts_reducer";
import friendReqeustsReducer from "./friend_requests_reducer";
import acceptedFriendRequestReducer from "./accepted_friend_requests_reducer";
import pendingFriendRequestsReducer from "./pending_friend_requests_reducer";

const entitiesReducer =  combineReducers({
    users: usersReducer,
    posts: postsReducer,
    friendRequests: friendReqeustsReducer,
});

export default entitiesReducer;
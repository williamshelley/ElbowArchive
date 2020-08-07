import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import postsReducer from "./posts_reducer";
import friendReqeustsReducer from "./friend_requests_reducer";
import acceptedFriendRequestReducer from "./accepted_friend_requests_reducer";
import pendingFriendRequestsReducer from "./pending_friend_requests_reducer";
import friendsReducer from "./friends_reducer";
import searchedUsersReducer from "./searched_users_reducer";

const entitiesReducer =  combineReducers({
    users: usersReducer,
    posts: postsReducer,
    friendRequests: friendReqeustsReducer,
    friends: friendsReducer,
    searchedUsers: searchedUsersReducer,
});

export default entitiesReducer;
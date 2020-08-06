import { combineReducers } from "redux";
import acceptedFriendRequestReducer from "./accepted_friend_requests_reducer";
import pendingFriendRequestsReducer from "./pending_friend_requests_reducer";

const friendRequestsReducer =  combineReducers({
    accepted: acceptedFriendRequestReducer,
    pending: pendingFriendRequestsReducer
});

export default friendRequestsReducer;

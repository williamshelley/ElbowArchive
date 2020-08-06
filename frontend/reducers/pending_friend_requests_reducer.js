import { merge } from "lodash";
import { RECEIVE_FRIEND_REQUESTS, RECEIVE_FRIEND_REQUEST, ACCEPT_FRIEND_REQUEST, REMOVE_FRIEND_REQUEST, RECEIVE_MERGE_FRIEND_REQUESTS, SEND_A_FRIEND_REQUEST } from "../actions/friend_request_actions";

const pendingFriendRequestsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {};
    switch(action.type) {

        case REMOVE_FRIEND_REQUEST:
            newState = merge({}, state);
            delete newState[action.friendRequest.id];
            return newState;

        case ACCEPT_FRIEND_REQUEST:
            newState = merge({}, state);
            delete newState[action.friendRequest.id];
            return newState;

        case SEND_A_FRIEND_REQUEST:
            return merge({}, state, { [action.friendRequest.id]: action.friendRequest });
            

        case RECEIVE_FRIEND_REQUESTS:
            if (action.friendRequests.pending) {
                Object.values(action.friendRequests.pending).map(request => {
                    newState[request.id] = request;
                });
            }
            return newState;

        case RECEIVE_MERGE_FRIEND_REQUESTS:
            let oldState = merge({}, state);
            if (action.friendRequests.pending) {
                Object.values(action.friendRequests.pending).map(request => {
                    newState[request.id] = request;
                });
            }
            return merge({}, oldState, newState);
            
        case RECEIVE_FRIEND_REQUEST:
            if (!action.friendRequest.accepted) { 
                return merge({}, state, { [action.friendRequest.id]: action.friendRequest });
            }
            return state; 

        default:
            return state;
    }
};

export default pendingFriendRequestsReducer;
import { merge } from "lodash";
import { RECEIVE_FRIEND_REQUESTS, RECEIVE_FRIEND_REQUEST, ACCEPT_FRIEND_REQUEST, REMOVE_FRIEND_REQUEST, RECEIVE_MERGE_FRIEND_REQUESTS } from "../actions/friend_request_actions";

const acceptedFriendRequestsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = {};
    switch(action.type) {
        case ACCEPT_FRIEND_REQUEST:
            return merge({}, state, { [action.friendRequest.id]: action.friendRequest});

        case RECEIVE_FRIEND_REQUESTS:
            if (action.friendRequests.accepted) {
                Object.values(action.friendRequests.accepted).map(request => {
                    newState[request.id] = request;
                });
            }
            return newState;

        case RECEIVE_MERGE_FRIEND_REQUESTS:
            if (action.friendRequests.accepted) {
                Object.values(action.friendRequests.accepted).map(request => {
                    newState[request.id] = request;
                    if (!action.friendRequests.pending[request.id]) {
                        // console.log(state);
                    }
                });
            }
            return merge({}, state, newState);

        case RECEIVE_FRIEND_REQUEST:
            if (action.friendRequest.accepted) {
                return merge({}, state, { [action.friendRequest.id]: action.friendRequest });
            }
            return state;

        case REMOVE_FRIEND_REQUEST:
                newState = merge({}, state);
                delete newState[action.userId];
                return newState;
                
        default:
            return state;
    }
};

export default acceptedFriendRequestsReducer;
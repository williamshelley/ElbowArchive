import { merge } from "lodash";
import { RECEIVE_FRIEND_REQUESTS, RECEIVE_FRIEND_REQUEST } from "../actions/friend_request_actions";

const pendingFriendRequestsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_FRIEND_REQUESTS:
            let newState = {};
            if (action.friendRequests.pending) {
                Object.values(action.friendRequests.pending).map(request => {
                    newState[request.id] = request;
                });
            }
            return newState;
        case RECEIVE_FRIEND_REQUEST:
            if (action.friendRequest.accepted) {
                return state;
            } else {
                return merge({}, state, { [action.friendRequest.id]: action.friendRequest });
            }
        default:
            return state;
    }
};

export default pendingFriendRequestsReducer;
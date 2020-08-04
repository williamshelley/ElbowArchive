import { merge } from "lodash";
import { RECEIVE_FRIEND_REQUESTS, RECEIVE_FRIEND_REQUEST } from "../actions/friend_request_actions";

const acceptedFriendRequestsReducer = (state = {}, action) => {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_FRIEND_REQUESTS:
            let newState = {};
            if (action.friendRequests.accepted) {
                Object.values(action.friendRequests.accepted).map(request => {
                    newState[request.id] = request;
                });
            }
            return newState;
        case RECEIVE_FRIEND_REQUEST:
            if (action.friendRequest.accepted) {
                return merge({}, state, { [action.friendRequest.id]: action.friendRequest });
            } else {
                return state;
            }
        default:
            return state;
    }
};

export default acceptedFriendRequestsReducer;
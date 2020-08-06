import { connect } from "react-redux";
import FriendRequestIndex from "./friend_request_index";
import { selectPendingFriendRequests, selectPendingFriendIds, selectCurrentUser, selectUsers, selectAcceptedFriendIds, selectNonFriends, selectUsersFromIds, selectPendingRecipientIds, selectPendingIdsWithRecipient } from "../../reducers/selectors";
import { fetchFriendRequests, sendFriendRequest, updateFriendRequest, receiveFriendRequests, acceptFriendRequest } from "../../actions/friend_request_actions";
import { fetchUsers, fetchFriends } from "../../actions/user_actions";
import { merge} from "lodash";

const msp = state => {
    let currentUser = selectCurrentUser(state);
    let pendingIds = selectPendingIdsWithRecipient(currentUser.id, state);
    let pendingFriends = Object.values(selectUsersFromIds(pendingIds, state));

    // let pendingFriends = [];

    // let requests = merge({}, state.entities.friendRequests);
    // let pendingRequests = requests ? requests.pending : undefined;
    // if (pendingRequests) {
    //     Object.values(pendingRequests).forEach(req => {
    //         if (req.recipient_id === currentUser.id && !req.accepted) {
    //             pendingFriends.push(state.entities.friends[req.sender_id]);
    //         }
    //     });
    // }
    
    let nonFriends = Object.values(selectNonFriends(state))
    // console.log(nonFriends.length)

    // console.log(pendingIds)
    return {
        currentUser,
        nonFriends,
        // nonFriends: Object.values(state.entities.friends),
        pendingFriends,
    };
};

const mdp = dispatch => {
    return {
        fetchFriends: () => dispatch(fetchFriends({ all_users: true })),
        fetchUsers: () => dispatch(fetchUsers({ all_users: true })),
        fetchFriendRequests: userId => dispatch(fetchFriendRequests(userId)),
        sendFriendRequest: recipient_id => dispatch(sendFriendRequest({ recipient_id })),
        updateFriendRequest: sender_id => dispatch(updateFriendRequest(
            { sender_id })),
        acceptFriendRequest: request => dispatch(acceptFriendRequest(request)),
    };
};

const FriendRequestIndexContainer = connect(msp, mdp)(FriendRequestIndex);

export default FriendRequestIndexContainer;
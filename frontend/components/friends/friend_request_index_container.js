import { connect } from "react-redux";
import FriendRequestIndex from "./friend_request_index";
import { selectCurrentUser, selectNonFriends, selectUsersFromIds, selectPendingIdsWithRecipient } from "../../reducers/selectors";
import { fetchFriendRequests, sendFriendRequest, updateFriendRequest, acceptFriendRequest } from "../../actions/friend_request_actions";
import { fetchUsers, fetchFriends, fetchMergeUsers } from "../../actions/user_actions";

const msp = state => {
    let currentUser = selectCurrentUser(state);
    let pendingIds = selectPendingIdsWithRecipient(currentUser.id, state);
    let pendingFriends = Object.values(selectUsersFromIds(pendingIds, state));
    
    let nonFriends = Object.values(selectNonFriends(state));
    return {
        currentUser,
        nonFriends,
        pendingFriends,
    };
};

const mdp = dispatch => {
    return {
        fetchFriends: () => dispatch(fetchFriends({ all_users: true })),
        // fetchUsers: (page) => dispatch(fetchUsers({ all_users: true, page })),
        fetchUsers: () => dispatch(fetchUsers({ all_users: true })),
        fetchMergeUsers: page => dispatch(fetchMergeUsers({ all_users: true, page })),
        fetchFriendRequests: userId => dispatch(fetchFriendRequests(userId)),
        sendFriendRequest: recipient_id => dispatch(sendFriendRequest({ recipient_id })),
        updateFriendRequest: sender_id => dispatch(updateFriendRequest(
            { sender_id })),
        acceptFriendRequest: request => dispatch(acceptFriendRequest(request)),
        fetchUsersSendingRequests: user_ids => dispatch(fetchMergeUsers({ user_ids }))
    };
};

const FriendRequestIndexContainer = connect(msp, mdp)(FriendRequestIndex);

export default FriendRequestIndexContainer;
import { connect } from "react-redux";
import FriendRequestIndex from "./friend_request_index";
import { selectPendingFriendRequests, selectPendingFriendIds, selectCurrentUser, selectUsers, selectAcceptedFriendIds, selectNonFriends, selectUsersFromIds, selectPendingRecipientIds, selectPendingIdsWithRecipient } from "../../reducers/selectors";
import { fetchFriendRequests, sendFriendRequest, updateFriendRequest, receiveFriendRequests, acceptFriendRequest } from "../../actions/friend_request_actions";
import { fetchUsers } from "../../actions/user_actions";

const msp = state => {
    let currentUser = selectCurrentUser(state);
    let pendingIds = selectPendingIdsWithRecipient(currentUser.id, state);
    let pendingFriends = Object.values(selectUsersFromIds(pendingIds, state));
    return {
        currentUser,
        nonFriends: Object.values(selectNonFriends(state)),
        pendingFriends,
    };
};

const mdp = dispatch => {
    return {
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
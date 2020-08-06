import { connect } from "react-redux";
import FriendsIndex from "./friends_index";
import { selectAcceptedFriendIds, selectUsers, selectCurrentUser, selectPendingFriendIds, selectUsersFromIds, selectAcceptedIdsWithRecipient, selectAcceptedIdsWithSender } from "../../reducers/selectors";
import { fetchUsers, fetchFriends } from "../../actions/user_actions";
import { fetchFriendRequests } from "../../actions/friend_request_actions";
import { withRouter } from "react-router-dom";
import { merge } from "lodash";

const msp = (state, ownProps) => {
    let currentUser = selectCurrentUser(state);
    let pageOwnerId = ownProps.user ? ownProps.user.id : ownProps.match.params.userId;
    let acceptedFriendIds = selectAcceptedFriendIds(pageOwnerId, state);
    let pendingFriendIds = currentUser.id === parseInt(pageOwnerId) ? selectPendingFriendIds(pageOwnerId, state) : [];
    let userIds = merge([], pendingFriendIds, acceptedFriendIds);
    let acceptedFriends = selectUsersFromIds(acceptedFriendIds, state);
    let pendingFriends = selectUsersFromIds(pendingFriendIds, state);
    
    return {
        pageOwnerId,
        acceptedFriends,
        pendingFriends,
        userIds,
        currentUser
    };
}

const mdp = dispatch => {
    return {
        fetchFriendRequests: userId => dispatch(fetchFriendRequests(userId)),
        fetchUsers: (user_ids, page_owner_id) => (
            dispatch(fetchUsers({ user_ids, page_owner_id }))),
        fetchFriends: (user_ids, page_owner_id) => (
            dispatch(fetchFriends({ user_ids, page_owner_id }))),
    };
}

const FriendsIndexContainer = withRouter(connect(msp, mdp)(FriendsIndex));

export default FriendsIndexContainer;
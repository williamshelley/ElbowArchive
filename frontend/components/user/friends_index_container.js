import { connect } from "react-redux";
import FriendsIndex from "./friends_index";
import { selectAcceptedFriendIds, selectCurrentUser, selectPendingFriendIds, selectUsersFromIds } from "../../reducers/selectors";
import { fetchUsers } from "../../actions/user_actions";
import { fetchFriendRequests, fetchMergeFriendRequests } from "../../actions/friend_request_actions";
import { withRouter } from "react-router-dom";
import { merge } from "lodash";

const msp = (state, ownProps) => {
    let currentUser = selectCurrentUser(state);
    let pageOwnerId = ownProps.user ? ownProps.user.id : parseInt(ownProps.match.params.userId);
    
    let acceptedFriendIds = selectAcceptedFriendIds(pageOwnerId, state);
    let acceptedFriends = selectUsersFromIds(acceptedFriendIds, state);

    let pendingIds = (currentUser.id === pageOwnerId) ? selectPendingFriendIds(pageOwnerId, state) : [];
    let pendingFriends = selectUsersFromIds(pendingIds, state);

    let userIds = merge([], pendingIds, acceptedFriendIds);
    
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
        fetchMergeFriendRequests: userId => dispatch(fetchMergeFriendRequests(userId)),
        fetchFriendRequests: userId => dispatch(fetchFriendRequests(userId)),
        fetchUsers: (user_ids, page_owner_id) => (dispatch(fetchUsers({ user_ids, page_owner_id }))),
    };
}

const FriendsIndexContainer = withRouter(connect(msp, mdp)(FriendsIndex));

export default FriendsIndexContainer;
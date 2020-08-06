import { connect } from "react-redux";
import FriendsIndex from "./friends_index";
import { selectAcceptedFriendIds, selectUsers, selectCurrentUser, selectPendingFriendIds, selectUsersFromIds, selectAcceptedIdsWithRecipient, selectAcceptedIdsWithSender } from "../../reducers/selectors";
import { fetchUsers, fetchFriends, receiveUsers } from "../../actions/user_actions";
import { fetchFriendRequests, fetchMergeFriendRequests, receiveMergeFriendRequests } from "../../actions/friend_request_actions";
import { withRouter } from "react-router-dom";
import { merge } from "lodash";

const msp = (state, ownProps) => {
    let currentUser = selectCurrentUser(state);
    let pageOwnerId = ownProps.user ? ownProps.user.id : parseInt(ownProps.match.params.userId);
    // let acceptedFriendIds = selectAcceptedFriendIds(pageOwnerId, state);
    // let acceptedIdsAsRecipient = selectAcceptedIdsWithRecipient(pageOwnerId, state);
    // console.log(acceptedIdsAsRecipient);
    // let acceptedIdsAsSender = selectAcceptedIdsWithSender(pageOwnerId, state);
    // let acceptedFriendIds = acceptedIdsAsRecipient.concat(acceptedIdsAsSender);
    let acceptedFriendIds = selectAcceptedFriendIds(pageOwnerId, state);
    // console.log(acceptedIdsAsSender);
    // console.log(state.entities.friendRequests.accepted);
    // console.log(acceptedFriendIds);

    let acceptedFriends = selectUsersFromIds(acceptedFriendIds, state);
    // debugger; 

    let pendingIds = currentUser.id === parseInt(pageOwnerId) ? selectPendingFriendIds(pageOwnerId, state) : [];
    let userIds = merge([], pendingIds, acceptedFriendIds);
    let pendingFriends = selectUsersFromIds(pendingIds, state);
    
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
        receiveMergeFriendRequests: requests => dispatch(receiveMergeFriendRequests(requests)),
        fetchUsers: (user_ids, page_owner_id) => (
            dispatch(fetchUsers({ user_ids, page_owner_id }))),
        receiveUsers: users => dispatch(receiveUsers(users)),
        // fetchFriends: (user_ids, page_owner_id) => (
        //     dispatch(fetchFriends({ user_ids, page_owner_id }))),
    };
}

const FriendsIndexContainer = withRouter(connect(msp, mdp)(FriendsIndex));

export default FriendsIndexContainer;
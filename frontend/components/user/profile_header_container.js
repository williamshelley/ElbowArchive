import { connect } from "react-redux";
import { selectCurrentUser, selectUser, selectFriendRequest, selectAcceptedFriendIds, selectPendingFriendIds, selectAcceptedIdsWithRecipient, selectAcceptedIdsWithSender, selectAcceptedFriendRequest, selectPendingFriendRequest } from "../../reducers/selectors";
import { pushModal } from "../../actions/ui_actions";
import { fetchUser } from "../../actions/user_actions";
import ProfileHeader from "./profile_header";
import { withRouter } from "react-router-dom";
import { sendFriendRequest, deleteFriendRequest, fetchFriend, fetchFriendRequests, acceptFriendRequest, updateFriendRequest } from "../../actions/friend_request_actions";

const mapStateToProps = (state, ownProps) => {
    let userId = parseInt(ownProps.match.params.userId);
    userId = userId ? userId : ownProps.user.id;

    const PATH = (next) => `/profile/${userId}/${next ? next : ""}`;

    const currentUser = selectCurrentUser(state);

    const friendIds = selectAcceptedFriendIds(userId, state);
    const isFriended = friendIds.includes(currentUser.id);

    let pendingFriendIds = selectPendingFriendIds(userId, state);
    const isPendingFriend = pendingFriendIds.includes(currentUser.id);


    let friendRequest = selectAcceptedFriendRequest(userId, currentUser.id, state);

    
    friendRequest = friendRequest ? friendRequest : selectPendingFriendRequest(userId, currentUser.id, state);
    
    let isSenderOfRequest = friendRequest && currentUser.id === friendRequest.sender_id;
    
    
    return {
        user: ownProps.user,
        friendRequest,
        loggedInUser: currentUser,
        isFriended,
        isPendingFriend,
        isSenderOfRequest,
        PATH
    };
};

const mapDispatchToProps = dispatch => ({ 
    fetchFriend: userId => dispatch(fetchFriend(userId)),
    fetchFriends: (userId) => dispatch(fetchFriendRequests(userId)),
    pushModal: modal => dispatch(pushModal(modal)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    sendFriendRequest: request => dispatch(sendFriendRequest(request)),
    deleteFriendRequest: requestId => dispatch(deleteFriendRequest(requestId)),
    acceptFriendRequest: sender_id => dispatch(updateFriendRequest({sender_id}))
    // fetchFriend: friendId => dispatch(fetchFriend(friendId))
});
const ProfileHeaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileHeader));

export default ProfileHeaderContainer;
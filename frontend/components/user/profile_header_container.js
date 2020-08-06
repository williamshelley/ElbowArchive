import { connect } from "react-redux";
import { selectCurrentUser, selectUser, selectFriendRequest, selectAcceptedFriendIds, selectPendingFriendIds, selectAcceptedIdsWithRecipient, selectAcceptedIdsWithSender } from "../../reducers/selectors";
import { pushModal } from "../../actions/ui_actions";
import { fetchUser } from "../../actions/user_actions";
import ProfileHeader from "./profile_header";
import { withRouter } from "react-router-dom";
import { sendFriendRequest, deleteFriendRequest, fetchFriend, fetchFriendRequests } from "../../actions/friend_request_actions";

const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match.params.userId;

    const PATH = (next) => `/profile/${userId}/${next ? next : ""}`;

    const currentUser = selectCurrentUser(state);
    let friendIds = selectAcceptedFriendIds(userId, state);
    const isFriended = friendIds.includes(parseInt(userId));
    // console.log(friendIds);
    // console.log(userId)

    let pendingFriendIds = selectPendingFriendIds(userId, state);
    const isPendingFriend = pendingFriendIds.includes(parseInt(userId));


    return {
        user: ownProps.user,
        loggedInUser: currentUser,
        isFriended,
        isPendingFriend,
        PATH
    };
};

const mapDispatchToProps = dispatch => ({ 
    // fetchFriend: userId => dispatch(fetchFriend(userId)),
    fetchFriends: (userId) => dispatch(fetchFriendRequests(userId)),
    pushModal: modal => dispatch(pushModal(modal)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    sendFriendRequest: request => dispatch(sendFriendRequest(request)),
    deleteFriendRequest: requestId => dispatch(deleteFriendRequest(requestId)),
    // fetchFriend: friendId => dispatch(fetchFriend(friendId))
});
const ProfileHeaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileHeader));

export default ProfileHeaderContainer;
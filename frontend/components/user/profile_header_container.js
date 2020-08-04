import { connect } from "react-redux";
import { selectCurrentUser, selectUser, selectFriendRequest, selectAcceptedFriendIds } from "../../reducers/selectors";
import { pushModal } from "../../actions/ui_actions";
import { fetchUser } from "../../actions/user_actions";
import ProfileHeader from "./profile_header";
import { withRouter } from "react-router-dom";
import { sendFriendRequest, fetchFriend } from "../../actions/friend_request_actions";

const mapStateToProps = (state, ownProps) => {
    const userId = ownProps.match.params.userId;

    const PATH = (next) => `/profile/${userId}/${next ? next : ""}`;

    const currentUser = selectCurrentUser(state);
    // const friendRequest = selectFriendRequest(currentUserId, userId, state);
    let friendIds = selectAcceptedFriendIds(userId, state);
    const isFriended = friendIds.includes(parseInt(userId));
    return {
        // user: selectUser(userId, state),
        // user: ownProps.user,
        loggedInUser: currentUser,
        isFriended,
        PATH
    };
};

const mapDispatchToProps = dispatch => ({ 
    pushModal: modal => dispatch(pushModal(modal)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    sendFriendRequest: request => dispatch(sendFriendRequest(request)),
    // fetchFriend: friendId => dispatch(fetchFriend(friendId))
});
const ProfileHeaderContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileHeader));

export default ProfileHeaderContainer;
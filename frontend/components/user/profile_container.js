import { connect } from "react-redux";
import Profile from "./profile";
import { selectCurrentUser, selectTopModal, selectUser, selectModals, selectUsers } from "../../reducers/selectors";
import { pushModal } from "../../actions/ui_actions";
import { fetchUser } from "../../actions/user_actions";
import { fetchFriendRequests, fetchFriend } from "../../actions/friend_request_actions";

const mapStateToProps = (state, ownProps) => {
    return {
        user: selectUser(ownProps.match.params.userId, state),
        loggedInUser: selectCurrentUser(state),
        topModal: selectTopModal(state),
        users: selectUsers(state)
    };
};

const mapDispatchToProps = dispatch => ({ 
    pushModal: modal => dispatch(pushModal(modal)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchFriendRequests: () => dispatch(fetchFriendRequests()),
    fetchFriend: userId => dispatch(fetchFriend(userId))
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
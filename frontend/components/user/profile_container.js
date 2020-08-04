import { connect } from "react-redux";
import Profile from "./profile";
import { selectCurrentUser, selectTopModal, selectUser, selectModals } from "../../reducers/selectors";
import { pushModal } from "../../actions/ui_actions";
import { fetchUser } from "../../actions/user_actions";
import { fetchFriendRequests } from "../../actions/friend_request_actions";

const mapStateToProps = (state, ownProps) => {
    return {
        user: selectUser(ownProps.match.params.userId, state),
        loggedInUser: selectCurrentUser(state),
        topModal: selectTopModal(state),
    };
};

const mapDispatchToProps = dispatch => ({ 
    pushModal: modal => dispatch(pushModal(modal)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchFriendRequests: () => dispatch(fetchFriendRequests())
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
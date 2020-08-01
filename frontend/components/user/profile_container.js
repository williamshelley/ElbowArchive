import { connect } from "react-redux";
import Profile from "./profile";
import { selectCurrentUser, selectTopModal, selectUser } from "../../reducers/selectors";
import { pushModal } from "../../actions/ui_actions";
import { fetchUser } from "../../actions/user_actions";

const mapStateToProps = (state, ownProps) => {
    return {
        user: selectUser(ownProps.match.params.userId, state),
        topModal: selectTopModal(state),
    };
};

const mapDispatchToProps = dispatch => ({ 
    pushModal: modal => dispatch(pushModal(modal)),
    fetchUser: userId => dispatch(fetchUser(userId))
});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
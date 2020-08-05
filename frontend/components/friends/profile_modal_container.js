import { connect } from "react-redux";
import { fetchUser } from "../../actions/user_actions";
import { fetchFriendRequests } from "../../actions/friend_request_actions";
import { withRouter } from "react-router-dom";
import ProfileModal from "./profile_modal";

const mapStateToProps = (state, ownProps) => {
    return {
        user: ownProps.user,
    };
};

const mapDispatchToProps = dispatch => ({ 
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchFriendRequests: () => dispatch(fetchFriendRequests())
});


const ProfileModalContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileModal));

export default ProfileModalContainer;
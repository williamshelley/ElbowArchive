import { connect } from "react-redux";
import NavBar from "./nav_bar";
import { logout } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";
import { fetchFriendRequests } from "../../actions/friend_request_actions";
import { selectCurrentUser, selectPendingIdsWithRecipient } from "../../reducers/selectors";

const mapStateToProps = state => { 
    const currentUser = selectCurrentUser(state);
    const pendingRequests = selectPendingIdsWithRecipient(currentUser.id, state);
    let receivedPendingRequests = Object.values(pendingRequests);
    return {
        currentUser,
        receivedPendingRequests,
    }
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchFriendRequests: userId => dispatch(fetchFriendRequests(userId))
});

const NavBarContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

export default NavBarContainer;
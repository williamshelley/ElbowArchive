import { connect } from "react-redux";
import FriendsIndex from "./friends_index";
import { selectAcceptedFriendIds, selectUsers, selectCurrentUser } from "../../reducers/selectors";
import { fetchUsers } from "../../actions/user_actions";
import { fetchFriendRequests } from "../../actions/friend_request_actions";
import { withRouter } from "react-router-dom";

const msp = (state, ownProps) => {
    let pageOwnerId = ownProps.match.params.userId
    
    return {
        pageOwnerId,
        friendIds: selectAcceptedFriendIds(pageOwnerId, state),
        friends: selectUsers(state),
        loggedInUser: selectCurrentUser(state)
    };
}

const mdp = dispatch => {
    return {
        fetchFriendRequests: userId => dispatch(fetchFriendRequests(userId)),
        fetchUsers: (user_ids, page_owner_id) => (
            dispatch(fetchUsers({ user_ids, page_owner_id }))),
    };
}

const FriendsIndexContainer = withRouter(connect(msp, mdp)(FriendsIndex));

export default FriendsIndexContainer;
import { connect } from "react-redux";
import FriendRequestIndex from "./friend_request_index";
import { selectPendingFriendRequests, selectPendingFriendIds, selectCurrentUser, selectUsers, selectAcceptedFriendIds, selectNonFriends } from "../../reducers/selectors";
import { fetchFriendRequests } from "../../actions/friend_request_actions";
import { fetchUsers } from "../../actions/user_actions";

const msp = state => {
    let currentUser = selectCurrentUser(state);
    
    return {
        currentUser,
        nonFriends: Object.values(selectNonFriends(state))
    };
};

const mdp = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers({ all_users: true }))
    };
};

const FriendRequestIndexContainer = connect(msp, mdp)(FriendRequestIndex);

export default FriendRequestIndexContainer;
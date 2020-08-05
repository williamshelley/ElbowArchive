import { connect } from "react-redux";
import Timeline from "./timeline";
import { selectCurrentUser, selectUserTimelinePosts, selectAllPosts } from "../../reducers/selectors";
import { pushModal } from "../../actions/ui_actions";
import { fetchUser } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";
import { receivePosts, fetchPosts } from "../../actions/post_actions";

const mapStateToProps = (state, ownProps) => {
    const ownerId = ownProps.user ? ownProps.user.id : ownProps.match.params.userId;
    return {
        ownerId,
        // need to sort by date instead of just reversing
        posts: Object.values(selectAllPosts(state)).reverse(),
        user: ownProps.user ? ownProps.user : selectCurrentUser(state),
        currentUser: selectCurrentUser(state)
    };
};

const mapDispatchToProps = dispatch => ({ 
    fetchPosts: userId => dispatch(fetchPosts(userId)),
    pushModal: modal => dispatch(pushModal(modal)),
    fetchUser: userId => dispatch(fetchUser(userId))
});

const TimelineContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Timeline));

export default TimelineContainer;
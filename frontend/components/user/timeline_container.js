import { connect } from "react-redux";
import Timeline from "./timeline";
import { selectCurrentUser, selectAllPosts } from "../../reducers/selectors";
import { fetchPosts } from "../../actions/post_actions";
import { pushModal } from "../../actions/ui_actions";
import { fetchUser } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => {
    return {
        ownerId: ownProps.match.params.userId,
        posts: Object.values(selectAllPosts(state)),
        user: selectCurrentUser(state)
    };
};

const mapDispatchToProps = dispatch => ({ 
    fetchPosts: userId => dispatch(fetchPosts(userId)),
    pushModal: modal => dispatch(pushModal(modal)),
    fetchUser: userId => dispatch(fetchUser(userId))
});

const TimelineContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Timeline));

export default TimelineContainer;
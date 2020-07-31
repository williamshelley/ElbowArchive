import { connect } from "react-redux";
import Timeline from "./timeline";
import { selectCurrentUser, selectPosts } from "../../reducers/selectors";
import { fetchPosts } from "../../actions/post_actions";

const mapStateToProps = state => ({
    user: selectCurrentUser(state),
    posts: Object.values(selectCurrentUser(state).posts),
    // posts: Object.values(selectPosts(state)),
});

const mapDispatchToProps = dispatch => ({ 
    fetchPosts: () => dispatch(fetchPosts())
});

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer;
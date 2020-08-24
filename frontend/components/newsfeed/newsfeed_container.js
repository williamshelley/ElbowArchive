import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NewsFeed from "./newsfeed";
import { selectAllPosts, selectCurrentUser } from "../../reducers/selectors";
import { fetchPosts, fetchNewsfeedPosts, fetchAndMergeNewsfeedPosts } from "../../actions/post_actions";

const msp = (state) => {
    return {
        posts: Object.values(selectAllPosts(state)),
        currentUser: selectCurrentUser(state),
    };
};

const mdp = dispatch => {
    return {
        fetchPosts: userId => dispatch(fetchNewsfeedPosts({ userId, page: 1 })),
        mergePosts: (userId, page) => dispatch(fetchAndMergeNewsfeedPosts({ userId, page }))
    };
};

const NewsfeedContainer = connect(msp, mdp)(NewsFeed);

export default NewsfeedContainer;
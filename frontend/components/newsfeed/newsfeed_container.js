import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NewsFeed from "./newsfeed";
import { selectAllPosts, selectCurrentUser } from "../../reducers/selectors";
import { fetchPosts, fetchAndMergePosts, fetchPagePosts } from "../../actions/post_actions";

const msp = (state) => {
    return {
        posts: Object.values(selectAllPosts(state)),
        currentUser: selectCurrentUser(state),
    };
};

const mdp = dispatch => {
    return {
        fetchPosts: userId => dispatch(fetchPagePosts({ userId, page: 1, newsfeed: true })),
        mergePosts: (userId, page) => dispatch(fetchAndMergePosts({ userId, page, newsfeed: true }))
    };
};

const NewsfeedContainer = connect(msp, mdp)(NewsFeed);

export default NewsfeedContainer;
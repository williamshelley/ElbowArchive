import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NewsFeed from "./newsfeed";
import { selectAllPosts, selectCurrentUser } from "../../reducers/selectors";
import { fetchPosts, fetchNewsfeedPosts } from "../../actions/post_actions";

const msp = (state) => {
    return {
        posts: Object.values(selectAllPosts(state)),
        currentUser: selectCurrentUser(state),
    };
};

const mdp = dispatch => {
    return {
        fetchPosts: userId => fetchNewsfeedPosts(userId),
    };
};

const NewsfeedContainer = connect(msp, mdp)(NewsFeed);

export default NewsfeedContainer;
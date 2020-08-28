import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import NewsFeed from "./newsfeed";
import { selectAllPosts, selectCurrentUser, selectUsers } from "../../reducers/selectors";
import { fetchPosts, fetchAndMergePosts, fetchPagePosts } from "../../actions/post_actions";
import { fetchUsers } from "../../actions/user_actions";

const msp = (state) => {
    return {
        posts: Object.values(selectAllPosts(state)),
        currentUser: selectCurrentUser(state),
        suggested: Object.values(selectUsers(state))
    };
};

const mdp = dispatch => {
    return {
        fetchPosts: userId => dispatch(fetchPagePosts({ userId, page: 1, newsfeed: true })),
        mergePosts: (userId, page) => dispatch(fetchAndMergePosts({ userId, page, newsfeed: true })),
        fetchSuggestedFriends: () => dispatch(fetchUsers({ suggested: true }))
    };
};

const NewsfeedContainer = connect(msp, mdp)(NewsFeed);

export default NewsfeedContainer;
import { connect } from "react-redux";
import Timeline from "./timeline";
import { selectCurrentUser, selectUserTimelinePosts, selectAllPosts, selectUser } from "../../reducers/selectors";
import { pushModal } from "../../actions/ui_actions";
import { fetchUser } from "../../actions/user_actions";
import { withRouter } from "react-router-dom";
import { receivePosts, fetchPosts, fetchAndMergePosts, fetchPagePosts } from "../../actions/post_actions";

const mapStateToProps = (state, ownProps) => {
    const ownerId = ownProps.user ? ownProps.user.id : ownProps.match.params.userId;
    const posts = Object.values(selectAllPosts(state));
    const sortedByDate = posts ? (posts.sort((postA, postB) => {
        const dateA = new Date(postA.date_posted);
        const dateB = new Date(postB.date_posted);
        return dateB - dateA;
    })) : [];
    const user = ownProps.user ? ownProps.user : selectCurrentUser(state);
    const owner = selectUser(ownerId, state);

    return {
        ownerId,
        posts: sortedByDate,
        user,
        currentUser: selectCurrentUser(state),
        owner,
        photos: owner.photos ? owner.photos : [],
        // friends: owner.friends ? owner.friends : []
    };
};

const mapDispatchToProps = dispatch => ({ 
    fetchPosts: userId => dispatch(fetchPagePosts({ userId, page: 1 })),
    pushModal: modal => dispatch(pushModal(modal)),
    fetchUser: userId => dispatch(fetchUser(userId)),
    mergePosts: (userId, page) => dispatch(fetchAndMergePosts({ userId, page }))
});

const TimelineContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Timeline));

export default TimelineContainer;
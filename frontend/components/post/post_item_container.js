import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PostItem from "./post_item";
import { like, unlike } from "../../actions/like_actions";
import { selectCurrentUser, selectPostLikes } from "../../reducers/selectors";

const mapStateToProps = (state, ownProps) => {
    const currentUser = selectCurrentUser(state);
    const likes = selectPostLikes(ownProps.post.id, state);
    const like = likes ? likes[currentUser.id] : undefined;
    const likeId = like ? like.id : undefined;
    
    return {
        post: ownProps.post,
        currentUser,
        likes,
        likeId,
        isLikedByCurrentUser: likes ? likes[currentUser.id] : undefined,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        likePost: postId => dispatch(like({
            likeable_type: "Post",
            likeable_id: postId
        })),
        unlikePost: likeId => dispatch(unlike(likeId)),
    };
};

const PostItemContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PostItem));

export default PostItemContainer;
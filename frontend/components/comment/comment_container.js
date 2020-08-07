import { connect } from "react-redux";
import Comment from "./comment";
import { fetchUser } from "../../actions/user_actions";
import { selectUser } from "../../reducers/selectors";

const msp = (state, ownProps) => {
    return {
        user: selectUser(ownProps.comment.author.id, state),
        authorId: ownProps.comment.author.id,
        comment: ownProps.comment
    };
};

const mdp = dispatch => {
    return {
        fetchUser: userId => dispatch(fetchUser(userId))
    };
};

const CommentContainer = connect(msp, mdp)(Comment);

export default CommentContainer;
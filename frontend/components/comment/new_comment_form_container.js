import { connect } from "react-redux";
import NewCommentForm from "./new_comment_form";
import { createComment } from "../../actions/comment_actions";

const msp = (state, ownProps) => {
    return {
        comment: {
            commentable_id: ownProps.parentId,
            commentable_type: ownProps.parentType,
            body: ""
        }
    };
};

const mdp = dispatch => {
    return {
        createComment: comment => dispatch(createComment(comment))
    };
};

const NewCommentFormContainer = connect(msp, mdp)(NewCommentForm);

export default NewCommentFormContainer;
import { connect } from "react-redux";
import PostFormModal from "./post_form_modal";
import { selectTopModal } from "../../reducers/selectors";
import { popModal } from "../../actions/ui_actions";
import { createPost, createPostFromFormData, receivePost, fetchPosts, fetchPost } from "../../actions/post_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state, ownProps) => ({
    post: { 
        wall_id: ownProps.match.params,
        body: "",
        photos: [],
    },
    title: "Create Post",
    submitBtnName: "Post",
    className: "post-modal-new",
    topModal: selectTopModal(state),
});

const mapDispatchToProps = dispatch => ({
    // submitPost: post => dispatch(createPost(post)),
    submitPost: formData => dispatch(createPostFromFormData(formData)),
    popModal: () => dispatch(popModal()),
    receivePost: post => dispatch(receivePost(post)),
    fetchPosts: (userId) => dispatch(fetchPosts(userId)),
});

const NewPostFormContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(PostFormModal));

export default NewPostFormContainer;
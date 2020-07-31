import { connect } from "react-redux";
import PostFormModal from "./post_form_modal";

const mapStateToProps = state => ({
    post: { body: "" },
    title: "Create Post",
    submitBtnName: "Post",
    className: "post-modal-new"
});

const mapDispatchToProps = dispatch => ({
    // submitPost: 
});

const NewPostFormContainer = connect(mapStateToProps, mapDispatchToProps)(PostFormModal);

export default NewPostFormContainer;
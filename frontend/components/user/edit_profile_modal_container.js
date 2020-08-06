import { connect } from "react-redux";
import { selectCurrentUser, selectTopModal } from "../../reducers/selectors";
import { updateUser, receiveUser, updateUserFromFormData, fetchUser } from "../../actions/user_actions";
import EditProfileModal from "./edit_profile_modal";
import { popModal, pushModal } from "../../actions/ui_actions";

const mapStateToProps = state => ({
    user: selectCurrentUser(state),
    topModal: selectTopModal(state)
});

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId)),
    updateUserFromFormData: (userId, formData) => dispatch(updateUserFromFormData(userId, formData)),
    popModal: () => dispatch(popModal()),
    pushModal: modal => dispatch(pushModal(modal)),
    receiveUser: user => dispatch(receiveUser(user)),
});

const EditProfileModalContainer = connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);

export default EditProfileModalContainer;
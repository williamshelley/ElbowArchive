import { connect } from "react-redux";
import { selectCurrentUser, selectTopModal } from "../../reducers/selectors";
import { updateUser } from "../../actions/user_actions";
import EditProfileModal from "./edit_profile_modal";
import { popModal } from "../../actions/ui_actions";

const mapStateToProps = state => ({
    user: selectCurrentUser(state),
    topModal: selectTopModal(state)
});

const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch(updateUser(user)),
    popModal: () => dispatch(popModal())
});

const EditProfileModalContainer = connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);

export default EditProfileModalContainer;
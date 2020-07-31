import { connect } from "react-redux";
import { selectCurrentUser } from "../../reducers/selectors";
import { updateUser } from "../../actions/session_actions";
import EditProfileModal from "./edit_profile_modal";

const mapStateToProps = state => ({
    user: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch(updateUser(user))
});

const EditProfileModalContainer = connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);

export default EditProfileModalContainer;
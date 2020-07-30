import { connect } from "react-redux";
import Profile from "./profile";
import { selectCurrentUser } from "../../reducers/selectors";

const mapStateToProps = state => ({
    user: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({ 

});

const ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default ProfileContainer;
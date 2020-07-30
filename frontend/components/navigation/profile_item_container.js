import { connect } from "react-redux";
import ProfileItem from "./profile_item";
import { selectCurrentUser } from "../../reducers/selectors";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({ 
    user: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({ });

const ProfileItemContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileItem));

export default ProfileItemContainer;
import { connect } from "react-redux";
import ProfileNavItem from "./profile_nav_item";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({ 

});

const ProfileNavItemContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileNavItem));

export default ProfileNavItemContainer;
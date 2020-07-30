import { connect } from "react-redux";
import NavBar from "./nav_bar";
import { logout } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => ({ });

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const NavBarContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));

export default NavBarContainer;
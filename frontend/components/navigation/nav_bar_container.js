import { connect } from "react-redux";
import NavBar from "./nav_bar";
import { logout } from "../../actions/session_actions";

const mapStateToProps = () => ({ });

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const NavBarContainer = connect(mapStateToProps, mapDispatchToProps)(NavBar);

export default NavBarContainer;
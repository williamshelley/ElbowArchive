import { connect } from "react-redux";
import LoggedOut from "./logged_out";
import { selectUsers } from "../../reducers/selectors";
import { login } from "../../actions/session_actions";

const mapStateToProps = state => ({
    recentUsers: Object.values(selectUsers(state))
});

const mapDispatchToProps = dispatch => ({
    loginDemoUser: () => dispatch(login({ demo_user: true }))
});

const LoggedOutContainer = connect(mapStateToProps, mapDispatchToProps)(LoggedOut);

export default LoggedOutContainer;
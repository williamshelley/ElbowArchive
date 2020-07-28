import { connect } from "react-redux";
import Login from "./login";
import { selectUsers } from "../../reducers/selectors";

const mapStateToProps = state => ({
    recentUsers: Object.values(selectUsers(state))
});

const mapDispatchToProps = dispatch => ({});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
import { connect } from "react-redux";
import LoginForm from "./login_form";
import { login } from "../../actions/session_actions";
import { selectUsers } from "../../reducers/selectors";

const mapStateToProps = state => ({
    recentUsers: Object.values(selectUsers(state)),
    nullState: { email: "", phone_number: "", password: "" }
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user))
});

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginFormContainer;
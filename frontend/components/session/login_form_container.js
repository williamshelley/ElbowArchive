import { connect } from "react-redux";
import LoginForm from "./login_form";
import { login, clearErrors } from "../../actions/session_actions";
import { selectUsers, selectSessionErrors } from "../../reducers/selectors";

const mapStateToProps = state => ({
    recentUsers: Object.values(selectUsers(state)),
    nullState: { email: "", phone_number: "", password: "" },
    errors: selectSessionErrors(state),
});

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearErrors()),
});

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(LoginForm);

export default LoginFormContainer;
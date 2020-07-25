import { connect } from "react-redux";
import SessionForm from "./session_form";
import { login } from "../../actions/session_actions";

const mapStateToProps = () => ({
    formType: "Log In",
    nullState: { username: "", password: "" },
    className: "form-container-login"
});

const mapDispatchToProps = dispatch => ({
    action: user => dispatch(login(user))
});

const LoginFormContainer = connect(mapStateToProps, mapDispatchToProps)(SessionForm);

export default LoginFormContainer;
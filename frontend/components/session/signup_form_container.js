import { connect } from "react-redux";
import SessionForm from "./session_form";
import { signup } from "../../actions/session_actions";

const mapStateToProps = () => ({
    formType: "Sign Up",
    nullState: { 
        first_name: "", 
        last_name: "",
        birth_date: "",
        gender: "",
        username: "", 
        password: "", 
        email: ""
    },
    className: "form-container-signup"
});

const mapDispatchToProps = dispatch => ({
    action: user => dispatch(signup(user))
});

const SignupFormContainer = connect(mapStateToProps, mapDispatchToProps)(SessionForm);

export default SignupFormContainer;
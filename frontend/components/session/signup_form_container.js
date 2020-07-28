import { connect } from "react-redux";
import SignupForm from "./signup_form";
import { signup } from "../../actions/session_actions";

const mapStateToProps = () => ({
    nullState: { 
        first_name: "", 
        last_name: "",
        birth_date: "",
        month: "",
        day: "",
        year: "",
        gender: "",
        username: "", 
        password: "", 
        email: ""
    },
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user))
});

const SignupFormContainer = connect(mapStateToProps, mapDispatchToProps)(SignupForm);

export default SignupFormContainer;
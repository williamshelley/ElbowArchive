import { connect } from "react-redux";
import SignupForm from "./signup_form";
import { signup, clearErrors, receiveError, removeError } from "../../actions/session_actions";
import Moment from "moment";
import { selectSessionErrors } from "../../reducers/selectors";

const now = new Moment();

const mapStateToProps = state => ({
    nullState: { 
        first_name: "", 
        last_name: "",
        birth_date: "",
        month: now.month(),
        day: now.toDate().getDate(),
        year: now.year(),
        gender: "",
        customGender: "",
        username: "", 
        password: "", 
        email: ""
    },
    errors: selectSessionErrors(state),
});

const mapDispatchToProps = dispatch => ({
    signup: user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearErrors()),
    receiveError: (field, error) => dispatch(receiveError(field, error)),
    removeError: field => dispatch(removeError(field))
});

const SignupFormContainer = connect(mapStateToProps, mapDispatchToProps)(SignupForm);

export default SignupFormContainer;
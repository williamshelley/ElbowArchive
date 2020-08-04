import { connect } from "react-redux";
import SignupForm from "./signup_form";
import { signup, clearErrors, receiveError, removeError } from "../../actions/session_actions";
import Moment from "moment";
import { selectSessionErrors } from "../../reducers/selectors";

const now = new Moment();

const mapStateToProps = state => ({
    nullState: { 
        phone_number: "",
        email: "",
        username: "", 

        password: "", 

        first_name: "", 
        last_name: "",

        birth_date: "",
        month: now.month(),
        day: now.toDate().getDate(),
        year: now.year(),

        gender: "",
        customGender: "",

        profile_photo: null,
        cover_photo: null,
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
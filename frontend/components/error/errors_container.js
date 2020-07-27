import { connect } from "react-redux";
import Errors from "./errors";
import { selectSessionErrors } from "../../reducers/selectors";

const mapStateToProps = (state) => ({
    sessionErrors: selectSessionErrors(state)
});

const mapDispatchToProps = dispatch => ({ });

const ErrorsContainer = connect(mapStateToProps, mapDispatchToProps)(Errors);

export default ErrorsContainer;
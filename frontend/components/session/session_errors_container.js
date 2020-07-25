import { connect } from "react-redux";
import SessionErrors from "./session_errors";
import { selectSessionErrors } from "../../reducers/selectors";

const mapStateToProps = state => ({
    errors: selectSessionErrors(state)
});

const mapDispatchToProps = () => ({});

const SessionErrorsContainer = connect(mapStateToProps, mapDispatchToProps)(SessionErrors);

export default SessionErrorsContainer;
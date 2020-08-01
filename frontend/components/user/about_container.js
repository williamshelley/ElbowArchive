import { connect } from "react-redux";
import About from "./about";
import { selectCurrentUser, selectUser } from "../../reducers/selectors";

const mapStateToProps = (state, ownProps) => ({
    user: selectUser(ownProps.match.params.userId, state)
});

const mapDispatchToProps = dispatch => ({ 

});

const AboutContainer = connect(mapStateToProps, mapDispatchToProps)(About);

export default AboutContainer;
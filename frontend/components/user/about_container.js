import { connect } from "react-redux";
import About from "./about";
import { selectCurrentUser } from "../../reducers/selectors";

const mapStateToProps = state => ({
    user: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({ 

});

const AboutContainer = connect(mapStateToProps, mapDispatchToProps)(About);

export default AboutContainer;
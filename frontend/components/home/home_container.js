import { connect } from "react-redux";
import Home from "./home";
import { selectCurrentUser } from "../../reducers/selectors";
import { logout } from "../../actions/session_actions";

const mapStateToProps = state => ({
    currentUser: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

const HomeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default HomeContainer;
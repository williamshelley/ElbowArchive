import { connect } from "react-redux";
import MainContent from "./main_content";
import { selectCurrentUser } from "../../reducers/selectors";

const mapStateToProps = state => ({
    user: selectCurrentUser(state),
});

const mapDispatchToProps = dispatch => ({ });

const MainContentContainer = connect(mapStateToProps, mapDispatchToProps)(MainContent);

export default MainContentContainer;
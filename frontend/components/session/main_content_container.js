import { connect } from "react-redux";
import MainContent from "./main_content";
import { selectCurrentUser, selectSessionErrors } from "../../reducers/selectors";

const mapStateToProps = state => ({
    user: selectCurrentUser(state),
    notFound: selectSessionErrors(state),
});

const mapDispatchToProps = dispatch => ({ });

const MainContentContainer = connect(mapStateToProps, mapDispatchToProps)(MainContent);

export default MainContentContainer;
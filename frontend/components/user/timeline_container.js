import { connect } from "react-redux";
import Timeline from "./timeline";
import { selectCurrentUser } from "../../reducers/selectors";

const mapStateToProps = state => ({
    user: selectCurrentUser(state)
});

const mapDispatchToProps = dispatch => ({ 

});

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer;
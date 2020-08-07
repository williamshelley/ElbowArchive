import { connect } from "react-redux";
import SearchItem from "./search_item";
import { clearSearchedUsers, searchUsers } from "../../actions/user_actions";
import { selectSearchedUsers } from "../../reducers/selectors";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        searchedUsers: Object.values(selectSearchedUsers(state))
    }
};

const mapDispatchToProps = dispatch => { 
    return {
        searchUsers: name => dispatch(searchUsers({ name })),
        clearSearchedUsers: () => dispatch(clearSearchedUsers()),
    }
};

const SearchItemContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchItem));

export default SearchItemContainer;
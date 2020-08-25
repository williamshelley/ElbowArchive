import { connect } from "react-redux";
import SearchItem from "./search_item";
import { clearSearchedUsers, searchUsers, fetchMergeSearchUsers } from "../../actions/user_actions";
import { selectSearchedUsers } from "../../reducers/selectors";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state) => {
    return {
        searchedUsers: Object.values(selectSearchedUsers(state))
    }
};

const mapDispatchToProps = dispatch => { 
    return {
        searchUsers: name => dispatch(searchUsers({ name, page: 1 })),
        clearSearchedUsers: () => dispatch(clearSearchedUsers()),
        mergeSearchUsers: (name, page) => dispatch(fetchMergeSearchUsers({ name, page })),
    }
};

const SearchItemContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchItem));

export default SearchItemContainer;
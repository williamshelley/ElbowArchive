import React from "react";
import NavBarIcon from "./nav_bar_icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ProfileImage } from "../../util/resources_util";
import { safePush } from "../../util/navigation_util";
import { Waypoint } from "react-waypoint";

const WAIT_TIME = 300;
const DISAPPEAR_WAIT_TIME = 500;

class SearchItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            typing: false,
            name: "",
            page: 1,
        }

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    componentDidMount() {
        this.timer = null;
        this.disappearTimer = null;
    }

    handleInput(e) {
        clearTimeout(this.timer);
        e.preventDefault();
        let _timeout = () => { 
            this.props.searchUsers(this.state.name); 
        };
        this.timer = setTimeout(_timeout, WAIT_TIME);
        this.setState({ name: e.target.value, page: 1 });
    }

    handleFocus(e) {
        e.preventDefault();
        this.setState({ typing: true, page: 1 });
        $(e.target).addClass("focused");
    }

    handleBlur(e) {
        clearTimeout(this.disappearTimer);
        e.preventDefault();
        let target = e.target;
        
        let _timeout = () => {
            this.setState({ typing: false, name: "", page: 1 }, () => {
                $(target).removeClass("focused");
                this.props.clearSearchedUsers();
            });
        }

        this.disappearTimer = setTimeout(_timeout, DISAPPEAR_WAIT_TIME);
    }

    handleScroll() {
        this.setState({ page: this.state.page + 1 }, () => {
            this.props.mergeSearchUsers(this.state.name, this.state.page);
        });
    }

    navigate(user) {
        return () => {
            safePush(this.props.history, `/profile/${user.id}`);
        }
    }

    render() {
        let { typing, name } = this.state;
        let { searchedUsers } = this.props;
        return(
            <div className="search-item">
                {!typing ? <NavBarIcon icon={faSearch} /> : null }
                <input type="search"
                    value={name}
                    onChange={this.handleInput}
                    
                    placeholder="Search Elbow Archive"
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                />

                { typing && searchedUsers.length > 0 ? 
                ( <div className="dropdown">
                    { searchedUsers.map(user => {
                        return (
                            <div 
                                key={user.id} 
                                className="item" 
                                onClick={this.navigate(user)}>
                                <ProfileImage user={user}/>
                                <div className="info">
                                    <h3>
                                        {`${user.first_name} ${user.last_name}`}
                                    </h3>
                                </div>
                            </div>
                        );
                    })}
                    { searchedUsers && searchedUsers.length > 1 && <Waypoint onEnter={() => this.handleScroll()}/>}
                </div> )
                : null
                }
            </div>
        );
    }
}

export default SearchItem;
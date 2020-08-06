import React from "react";
import NavBarIcon from "./nav_bar_icon";
import { faHome, faTv, faShoppingBag, faUsers, faPuzzlePiece, faComment, faBell, faSortDown, faPlus, faSignOutAlt, faBalanceScale } from "@fortawesome/free-solid-svg-icons";
import ProfileItemContainer from "./profile_item_container";
import DropdownItem from "./dropdown_item";
import SearchItemContainer from "./search_item_container";
import { safePush } from "../../util/navigation_util";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false,
        }

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    toggleDropdown(e) {
        e.preventDefault();
        this.setState({ showDropdown: !this.state.showDropdown });
    }

    navigate(destination) {
        let { history } = this.props;
        return e => {
            e.preventDefault();
            safePush(history, destination);
        };
    }

    render() {
        return (
            <div className="nav-bar">

                <div className="left">
                    <NavBarIcon icon={faBalanceScale} 
                        onClick={this.navigate("/")}/>
                    <SearchItemContainer />
                </div>

                <div className="middle">
                    <NavBarIcon icon={faHome} onClick={this.navigate("/")}/>
                    <NavBarIcon icon={faTv} />
                    <NavBarIcon icon={faShoppingBag} />
                    <NavBarIcon icon={faUsers} />
                    <NavBarIcon icon={faPuzzlePiece} />
                </div>

                <div className="right">
                    <ProfileItemContainer />
                    <NavBarIcon icon={faPlus} />
                    <NavBarIcon icon={faComment} />
                    <NavBarIcon icon={faBell} />
                    <NavBarIcon icon={faSortDown}
                        onClick={this.toggleDropdown} />
                </div>

                {this.state.showDropdown ?
                    <div className="dropdown">
                        <DropdownItem label="Log Out" 
                            icon={faSignOutAlt}
                            onClick={() => this.props.logout() } />
                    </div> : null
                }

            </div>
        );
    }
}
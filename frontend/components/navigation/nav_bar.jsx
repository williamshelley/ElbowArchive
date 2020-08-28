import React from "react";
import NavBarIcon from "./nav_bar_icon";
import { faHome, faTv, faShoppingBag, faUsers, faPuzzlePiece, faComment, faBell, faSortDown, faPlus, faSignOutAlt, faBalanceScale, faLink, faPersonBooth } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faAngellist } from "@fortawesome/free-brands-svg-icons";
import ProfileItemContainer from "./profile_item_container";
import DropdownItem from "./dropdown_item";
import SearchItemContainer from "./search_item_container";
import { safePush } from "../../util/navigation_util";
import { GITHUB, LINKEDIN, PERSONAL, ANGELLIST } from "../../util/sites";

const NOTIFICATIONS = "navbar_notifications";
const OPTIONS = "navbar_options";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            navbar_options: false,
            navbar_notifications: false
        }

        this.navigate = this.navigate.bind(this);
        
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
        
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.handleDropdownBlur = this.handleDropdownBlur.bind(this);
        
        this.chooseWrapper = this.chooseWrapper.bind(this);

        this.optionsWrapper = React.createRef();
        this.notificationsWrapper = React.createRef();
    }

    toggleDropdown(dropdownName) {
        return e => {
            e.preventDefault();
            if (this.state[dropdownName] === true) {
                this.hideDropdown(dropdownName);
            } else {
                this.showDropdown(dropdownName);
            }
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', 
            this.handleDropdownBlur(NOTIFICATIONS));

        document.addEventListener('mousedown', 
            this.handleDropdownBlur(OPTIONS));
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', 
            this.handleDropdownBlur(NOTIFICATIONS));

        document.removeEventListener('mousedown', 
            this.handleDropdownBlur(OPTIONS));
    }

    navigate(destination) {
        let { history } = this.props;
        return e => {
            e.preventDefault();
            safePush(history, destination);
        };
    }

    redirect(destination) {
        return e => {
            window.location = destination;
        }
    }

    hideDropdown(dropdownName) {
        this.setState({ [dropdownName]: false });
    }

    showDropdown(dropdownName) {
        this.setState({ [dropdownName]: true });
    }

    chooseWrapper(dropdownName) {
        switch(dropdownName) {
            case NOTIFICATIONS:
                return this.notificationsWrapper;
            case OPTIONS:
                return this.optionsWrapper;
            default:
                return null;
        }
    }

    handleDropdownBlur(dropdownName) {
        return e => {
            const toggle = $(`#${dropdownName}`)[0];
            let wrapper = this.chooseWrapper(dropdownName);

            if (wrapper && wrapper.current && !toggle.contains(e.target)
                && !wrapper.current.contains(e.target)) {
                this.hideDropdown(dropdownName);
            }
        }
    }

    optionsDropdown() {
        return this.state.navbar_options ? (
                <div className="dropdown" ref={this.chooseWrapper(OPTIONS)}>
                    <DropdownItem label="Log Out" 
                        icon={faSignOutAlt}
                        onClick={() => this.props.logout() } />
                </div>
        ) : null;
    }

    notificationsDropdown() {
        return this.state.navbar_notifications ? (
            <div className="dropdown" ref={this.chooseWrapper(NOTIFICATIONS)}>
                <DropdownItem label="Received Friend Requests" 
                    icon={faUsers}
                    onClick={this.navigate("/friend_requests")} />
            </div>
        ) : null;
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
                    <NavBarIcon icon={faHome} 
                        onClick={this.navigate("/")}/>

                    <NavBarIcon icon={faGithub} 
                        onClick={this.redirect(GITHUB)}/>

                    <NavBarIcon icon={faPersonBooth}
                        hoverText={"Personal Site"}
                        onClick={this.redirect(PERSONAL)}/>

                    <NavBarIcon icon={faLinkedin} 
                        onClick={this.redirect(LINKEDIN)}/>

                    <NavBarIcon icon={faAngellist} 
                        onClick={this.redirect(ANGELLIST)}/>


                    {/* <NavBarIcon icon={faTv} /> */}
                    {/* <NavBarIcon icon={faShoppingBag} /> */}
                    {/* <NavBarIcon icon={faUsers} /> */}
                    {/* <NavBarIcon icon={faPuzzlePiece} /> */}
                </div>

                <div className="right">
                    <ProfileItemContainer />
                    {/* <NavBarIcon icon={faPlus} /> */}
                    {/* <NavBarIcon icon={faComment} /> */}
                    <NavBarIcon icon={faBell} 
                        id={NOTIFICATIONS}
                        onClick={this.toggleDropdown(NOTIFICATIONS)}>
                        {this.notificationsDropdown()}
                        </NavBarIcon>

                    <NavBarIcon icon={faSortDown}
                        id={OPTIONS}
                        onClick={this.toggleDropdown(OPTIONS)}>

                        {this.optionsDropdown()}
                    </NavBarIcon>
                </div>


            </div>
        );
    }
}
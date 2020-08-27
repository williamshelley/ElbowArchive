import React from "react";
import NavBarIcon from "./nav_bar_icon";
import { faHome, faTv, faShoppingBag, faUsers, faPuzzlePiece, faComment, faBell, faSortDown, faPlus, faSignOutAlt, faBalanceScale, faLink, faPersonBooth } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import ProfileItemContainer from "./profile_item_container";
import DropdownItem from "./dropdown_item";
import SearchItemContainer from "./search_item_container";
import { safePush } from "../../util/navigation_util";

const GITHUB = "https://github.com/williamshelley";
const LINKEDIN = "https://www.linkedin.com/in/william-shelley-280293177/";
const PERSONAL = "https://willshelley.com/";

export default class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showDropdown: false,
        }

        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.navigate = this.navigate.bind(this);
        this.dropdownWrapper = React.createRef();
        this.handleDropdownBlur = this.handleDropdownBlur.bind(this);
        this.showDropdown = this.showDropdown.bind(this);
        this.hideDropdown = this.hideDropdown.bind(this);
    }

    toggleDropdown(e) {
        e.preventDefault();
        if (this.state.showDropdown === true) {
            this.hideDropdown();
        } else {
            this.showDropdown();
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleDropdownBlur);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleDropdownBlur);
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

    hideDropdown() {
        this.setState({ showDropdown: false });
    }

    showDropdown() {
        this.setState({ showDropdown: true });
    }

    handleDropdownBlur(e) {
        const toggle = $("#dropdown-toggle")[0];
        if (this.dropdownWrapper && this.dropdownWrapper.current
            && !toggle.contains(e.target)
            && !this.dropdownWrapper.current.contains(e.target)) {
            this.hideDropdown();
        }
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

                    <NavBarIcon icon={faLinkedin} 
                        onClick={this.redirect(LINKEDIN)}/>

                    <NavBarIcon icon={faPersonBooth}
                        hoverText={"Personal Site"}
                        onClick={this.redirect(PERSONAL)}/>

                    {/* <NavBarIcon icon={faTv} /> */}
                    {/* <NavBarIcon icon={faShoppingBag} /> */}
                    {/* <NavBarIcon icon={faUsers} /> */}
                    {/* <NavBarIcon icon={faPuzzlePiece} /> */}
                </div>

                <div className="right">
                    <ProfileItemContainer />
                    {/* <NavBarIcon icon={faPlus} /> */}
                    {/* <NavBarIcon icon={faComment} /> */}
                    {/* <NavBarIcon icon={faBell} /> */}
                    <NavBarIcon icon={faSortDown}
                        id={"dropdown-toggle"}
                        onClick={this.toggleDropdown} />
                </div>

                {this.state.showDropdown ?
                    <div className="dropdown" ref={this.dropdownWrapper}>
                        <DropdownItem label="Log Out" 
                            icon={faSignOutAlt}
                            onClick={() => this.props.logout() } />
                    </div> : null
                }

            </div>
        );
    }
}
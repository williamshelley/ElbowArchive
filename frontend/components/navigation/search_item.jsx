import React from "react";
import NavBarIcon from "./nav_bar_icon";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            typing: false
        }

        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlue = this.handleBlue.bind(this);
    }

    handleFocus(e) {
        e.preventDefault();
        this.setState({ typing: true });
        $(e.target).addClass("focused");
    }

    handleBlue(e) {
        e.preventDefault();
        this.setState({ typing: false });
        $(e.target).removeClass("focused");
    }

    render() {
        let { typing } = this.state;
        return(
            <div className="search-item">
                {!typing ? <NavBarIcon icon={faSearch} /> : null }
                <input type="search" 
                    placeholder="Search Elbow Archive"
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlue}
                />
            </div>
        );
    }
}

export default SearchItem;
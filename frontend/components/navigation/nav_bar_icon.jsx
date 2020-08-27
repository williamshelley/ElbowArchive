import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBarIcon = ({ icon, onClick, hoverText }) => {
    return (
        <div className="icon" onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            {hoverText && <span className="hover-text">{hoverText}</span>}
        </div>
    );
}

export default NavBarIcon;
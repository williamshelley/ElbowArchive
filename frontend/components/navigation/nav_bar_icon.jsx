import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBarIcon = ({ icon, onClick, hoverText, id }) => {
    return (
        <div className="icon" onClick={onClick} id={id}>
            <FontAwesomeIcon icon={icon} />
            {hoverText && <span className="hover-text">{hoverText}</span>}
        </div>
    );
}

export default NavBarIcon;
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBarIcon = ({ icon, onClick, hoverText, id, children }) => {
    return (
        <div className="icon" onClick={onClick} id={id}>
            <FontAwesomeIcon icon={icon} />
            {hoverText && <span className="hover-text">{hoverText}</span>}
            {children}
        </div>
    );
}

export default NavBarIcon;
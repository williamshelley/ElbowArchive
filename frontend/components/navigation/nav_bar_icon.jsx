import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBarIcon = ({ icon, onClick }) => {
    return (
        <div className="icon" onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
        </div>
    );
}

export default NavBarIcon;
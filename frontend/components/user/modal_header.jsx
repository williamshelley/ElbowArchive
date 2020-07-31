import React from "react";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import NavBarIcon from "../navigation/nav_bar_icon";

const ModalHeader = ({ title, onExitClick }) => {
    return (
        <div className="header">
            <h3>{title}</h3>
            <NavBarIcon icon={faTimes} onClick={onExitClick} />
        </div>
    );
};

export default ModalHeader;
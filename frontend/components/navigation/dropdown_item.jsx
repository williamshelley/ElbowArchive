import React from "react";
import NavBarIcon from "./nav_bar_icon";

const DropdownItem = ({ label, icon, onClick }) => {
    return (
        <div className="item" onClick={onClick}>
            <NavBarIcon icon={icon} />
            <label>{label}</label>
        </div>
    );
};

export default DropdownItem;
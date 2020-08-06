import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileHeaderButton = ({ message, icon, style, onClick }) => {
    return (
        <div style={style} className="item" onClick={onClick}>
            <FontAwesomeIcon icon={icon} />
            { message }
        </div>
    );
}

export default ProfileHeaderButton;
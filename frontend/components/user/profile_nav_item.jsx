import React from "react";
import { safePush } from "../../util/navigation_util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileNavItem = ({ history, label, icon, to }) => {
    return (
        <div className="nav-item" onClick={() => safePush(history, to)}>
            { icon ? <FontAwesomeIcon icon={icon} /> : null }
            { label ? label : null }
        </div>
    );
};

export default ProfileNavItem;
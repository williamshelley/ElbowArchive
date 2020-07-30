import React from "react";
import { safePush } from "../../util/navigation_util";

const ProfileNavItem = ({ history, label, children, to }) => {
    return (
        <div className="item" onClick={() => safePush(history, to)}>
            {label}
            {children}
        </div>
    );
};

export default ProfileNavItem;
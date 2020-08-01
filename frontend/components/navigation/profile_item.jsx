import React from "react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import NavBarIcon from "./nav_bar_icon";
import { safePush } from "../../util/navigation_util";
import { PROFILE_PATH } from "../../util/path_util";

const ProfileItem = ({ user, history }) => {
    const onClick = (e) => {
        e.preventDefault();
        safePush(history, `/profile/${user.id}`);
    }
    
    return (
        <div className="profile-item" onClick={onClick}>
            <NavBarIcon icon={faUser} />
            <p>{user.first_name}</p>
        </div>
    );
}

export default ProfileItem;